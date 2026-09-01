/**
 * Cashfree Payment Gateway.
 *
 * Orders are created server-side with an amount this server decided, which is
 * the whole point: the browser is handed a session id, never a price. It then
 * opens Cashfree's own checkout, so card details never touch this site and
 * nothing here falls inside PCI scope.
 */

const API_VERSION = '2023-08-01';

export function isProduction() {
  return process.env.CASHFREE_MODE === 'production';
}

export function apiBase() {
  return isProduction()
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';
}

export function cashfreeCredentials() {
  const clientId = process.env.CASHFREE_CLIENT_ID;
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
  return clientId && clientSecret ? { clientId, clientSecret } : null;
}

function headers({ clientId, clientSecret }) {
  return {
    'Content-Type': 'application/json',
    'x-api-version': API_VERSION,
    'x-client-id': clientId,
    'x-client-secret': clientSecret,
  };
}

/**
 * Cashfree rejects customer ids and phone numbers that don't match its
 * expectations, and the errors are opaque, so normalise before sending.
 */
function normalisePhone(phone) {
  const digits = String(phone || '').replace(/[^\d]/g, '');
  // It wants a plain national number; strip an Indian country code if present.
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits.slice(-10) || '9999999999';
}

export async function createOrder({
  orderId,
  amount,
  currency,
  customerId,
  name,
  email,
  phone,
  returnUrl,
  notifyUrl,
}) {
  const credentials = cashfreeCredentials();
  if (!credentials) {
    throw new Error('Cashfree credentials are not configured.');
  }

  const response = await fetch(`${apiBase()}/orders`, {
    method: 'POST',
    headers: headers(credentials),
    body: JSON.stringify({
      order_id: orderId,
      order_amount: amount,
      order_currency: currency,
      customer_details: {
        customer_id: customerId,
        customer_name: name,
        customer_email: email,
        customer_phone: normalisePhone(phone),
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: notifyUrl,
      },
    }),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Cashfree's message is useful to us but may name internal fields, so it
    // goes to the log while the caller shows something plainer.
    throw new Error(
      `Cashfree rejected the order (${response.status}): ${body?.message || 'unknown error'}`,
    );
  }

  return {
    orderId: body.order_id,
    paymentSessionId: body.payment_session_id,
  };
}

/**
 * Asks Cashfree what actually happened to an order.
 *
 * The browser coming back from checkout proves nothing — anyone can open the
 * return URL with any order id. Payment state is only ever read from here or
 * from a signature-verified webhook.
 */
export async function fetchOrder(orderId) {
  const credentials = cashfreeCredentials();
  if (!credentials) {
    throw new Error('Cashfree credentials are not configured.');
  }

  const response = await fetch(
    `${apiBase()}/orders/${encodeURIComponent(orderId)}`,
    { headers: headers(credentials) },
  );

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Could not read order ${orderId} (${response.status}): ${body?.message || 'unknown error'}`,
    );
  }

  return {
    orderId: body.order_id,
    orderStatus: body.order_status, // ACTIVE | PAID | EXPIRED | TERMINATED
    orderAmount: body.order_amount,
    orderCurrency: body.order_currency,
  };
}

/**
 * The individual payment attempts against an order.
 *
 * Needed when a webhook never arrived: the order says PAID, but confirming a
 * registration also wants the payment id and the amount actually taken, and
 * those only exist here.
 */
export async function fetchPayments(orderId) {
  const credentials = cashfreeCredentials();
  if (!credentials) {
    throw new Error('Cashfree credentials are not configured.');
  }

  const response = await fetch(
    `${apiBase()}/orders/${encodeURIComponent(orderId)}/payments`,
    { headers: headers(credentials) },
  );

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Could not read payments for ${orderId} (${response.status}): ${body?.message || 'unknown error'}`,
    );
  }

  return Array.isArray(body) ? body : [];
}
