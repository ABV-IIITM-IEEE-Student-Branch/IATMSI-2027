import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';

const execAsync = promisify(exec);
const projectRoot = dirname(fileURLToPath(import.meta.url));

// Escapes text for safe insertion into an HTML attribute or element content.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Replaces the content="..." value of a <meta name="X" ...> tag in an HTML string.
function replaceMetaContent(html, name, value) {
  const pattern = new RegExp(
    `(<meta[^>]*name=["']${name}["'][^>]*content=["'])[^"']*(["'][^>]*>)`,
    'i'
  );
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Keeps index.html's <title> and SEO <meta> tags in sync with
      // siteConfig.seo (src/data/siteConfig.js) so that data file remains
      // the single source of truth per .agents/AGENTS.md - editing the
      // static HTML directly is harmless, this plugin overwrites it.
      name: 'html-seo-from-siteconfig',
      async transformIndexHtml(html) {
        const { siteConfig } = await import('./src/data/siteConfig.js');
        const { title, description, keywords, author } = siteConfig.seo;

        let result = html.replace(
          /<title>[\s\S]*?<\/title>/i,
          `<title>${escapeHtml(title)}</title>`
        );
        result = replaceMetaContent(result, 'description', description);
        result = replaceMetaContent(result, 'keywords', keywords);
        result = replaceMetaContent(result, 'author', author);
        return result;
      },
    },
    {
      /**
       * Runs the `api/` serverless functions under `vite dev`.
       *
       * In production Vercel does this. Without it the endpoints simply 404
       * locally, so the fee table, the registration form and the receipt page
       * could only ever be tested by deploying — which is a poor place to
       * discover that an order request is malformed.
       *
       * Development only (`apply: 'serve'`), so it is not part of any build and
       * cannot affect the deployed site.
       */
      name: 'local-api-functions',
      apply: 'serve',

      /**
       * Puts `.env.local` into `process.env` for the handlers below.
       *
       * Vite reads .env files, but only exposes `VITE_`-prefixed values, and
       * only to the browser bundle. Server-side keys are deliberately not
       * among them — which is right, but it means the functions here would see
       * nothing without this. The empty prefix asks for everything.
       *
       * Development only, like the rest of this plugin. Nothing about it
       * reaches a build.
       */
      config(_config, { mode }) {
        Object.assign(process.env, loadEnv(mode, projectRoot, ''));
      },

      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url, 'http://localhost');
          if (!url.pathname.startsWith('/api/')) return next();

          // Only ever a bare function name — no slashes, no traversal.
          const name = url.pathname.slice('/api/'.length);
          if (!/^[a-zA-Z0-9_-]+$/.test(name)) return next();

          const file = resolve(projectRoot, 'api', `${name}.js`);
          if (!existsSync(file)) return next();

          const send = (code, payload, headers = {}) => {
            res.writeHead(code, { 'Content-Type': 'application/json', ...headers });
            res.end(typeof payload === 'string' ? payload : JSON.stringify(payload));
          };

          try {
            // Cache-busted so edits to a handler are picked up without a restart.
            const module = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
            const handler = module.default;

            req.query = Object.fromEntries(url.searchParams);

            // Mirrors Vercel: bodies are parsed unless the handler opts out,
            // which the webhook does because it needs the raw bytes.
            const parseBody = module.config?.api?.bodyParser !== false;
            if (parseBody && req.method !== 'GET' && req.method !== 'HEAD') {
              const raw = await new Promise((done, fail) => {
                let data = '';
                req.on('data', (chunk) => { data += chunk; });
                req.on('end', () => done(data));
                req.on('error', fail);
              });
              try {
                req.body = raw ? JSON.parse(raw) : {};
              } catch {
                return send(400, { error: 'Malformed JSON body.' });
              }
            }

            const shim = {
              statusCode: 200,
              setHeader: (key, value) => res.setHeader(key, value),
              status(code) { this.statusCode = code; return this; },
              json(payload) { send(this.statusCode, payload); return this; },
              send(payload) { send(this.statusCode, payload); return this; },
              end() { res.end(); },
            };

            await handler(req, shim);
          } catch (error) {
            server.config.logger.error(`[local-api] ${name} threw: ${error.stack || error}`);
            send(500, { error: String(error.message || error) });
          }
        });
      },
    },
    {
      name: 'weavr-git-publisher',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          // Handle CORS preflight OPTIONS request
          if (req.method === 'OPTIONS') {
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            });
            res.end();
            return;
          }

          if (req.url === '/api/git-push' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const { commitMessage } = JSON.parse(body || '{}');
                const msg = commitMessage || 'content(weavr): update conference site content and sections';
                console.log('[Weavr Git Publisher] Staging, committing & pushing in C:/Github/IATMSI...');

                await execAsync('git add .', { cwd: 'C:/Github/IATMSI' });
                try {
                  await execAsync(`git commit -m "${msg}"`, { cwd: 'C:/Github/IATMSI' });
                } catch (commitErr) {
                  console.log('[Weavr Git Publisher] Commit notice (no changes to commit):', commitErr.message);
                }

                const { stdout } = await execAsync('git push origin main', { cwd: 'C:/Github/IATMSI' });
                console.log('[Weavr Git Publisher] Git push result:', stdout);

                res.writeHead(200, {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                });
                res.end(
                  JSON.stringify({
                    success: true,
                    stdout,
                    message: 'Successfully committed & pushed live to GitHub (SK8-infi/IATMSI-2027)!',
                  })
                );
              } catch (err) {
                console.error('[Weavr Git Publisher Error]', err);
                res.writeHead(500, {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
          next();
        });
      },
    },
  ],
  base: '/',
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
