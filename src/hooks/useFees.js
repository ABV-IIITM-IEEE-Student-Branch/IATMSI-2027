import { useEffect, useState } from 'react';

/**
 * The fee table, fetched from the server.
 *
 * Fetched rather than imported so the page shows the same numbers the server
 * charges. Keeping a copy in `src/data` would mean two tables that can drift
 * apart, and the drift would only show up once someone had been charged the
 * wrong amount.
 *
 * `loaded` stays false until the first response, so the table can be held back
 * rather than flashing empty prices.
 */
export function useFees() {
    const [fees, setFees] = useState(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/fees')
            .then((response) => (response.ok ? response.json() : Promise.reject(new Error('unavailable'))))
            .then((result) => {
                if (!cancelled) setFees(result);
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { fees, loaded: fees !== null, failed };
}

/** Formats an amount the same way the server does on the receipt. */
export function formatFee(amount, currency) {
    if (typeof amount !== 'number') return '—';
    const value = amount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US');
    return currency === 'INR' ? `₹${value}` : `$${value}`;
}
