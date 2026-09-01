import nodemailer from 'nodemailer';

/**
 * Outgoing mail, over SMTP with an app password.
 *
 * An app password rather than the account password: it can be revoked on its
 * own, and Google will not accept the account password here anyway. It lives
 * only in the environment.
 *
 * A fresh connection per invocation, because a serverless function cannot keep
 * one open between requests. At a conference's registration volume that is
 * nothing; `pool: true` would only add a connection that is torn down before
 * it gets reused.
 */

export function mailerCredentials() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  return user && pass ? { user, pass } : null;
}

export function isMailerConfigured() {
  return Boolean(mailerCredentials());
}

/**
 * Timeouts, set explicitly because the defaults are unusable here.
 *
 * Nodemailer waits 2 minutes to connect and 10 minutes on the socket. A
 * serverless function is killed after 10-60 seconds, so with the defaults an
 * unresponsive mail server gets the *function* torn down before nodemailer
 * ever reports an error — which means the caller's `catch` never runs and
 * whatever it was going to undo stays undone.
 *
 * These are well inside the function's budget, so a dead SMTP server fails
 * fast and as an ordinary error.
 */
const SMTP_TIMEOUTS = {
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 8000,
};

export async function sendMail({ to, subject, text, html }) {
  const credentials = mailerCredentials();
  if (!credentials) throw new Error('Mail is not configured.');

  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    // 465 is implicit TLS; 587 starts plaintext and upgrades via STARTTLS.
    secure: port === 465,
    auth: credentials,
    ...SMTP_TIMEOUTS,
  });

  return transport.sendMail({
    from: process.env.MAIL_FROM || `IATMSI 2027 <${credentials.user}>`,
    to,
    subject,
    text,
    html,
  });
}
