import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
