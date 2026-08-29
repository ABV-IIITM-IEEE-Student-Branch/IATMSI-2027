import { useEffect, useMemo, useState } from 'react';
import { visitorCountData } from '../data/siteConfig';

/**
 * Turns a country code into a readable name.
 *
 * Uses the browser's own region names rather than shipping a table of ~250
 * countries: it's always current, translated, and nothing to maintain. The
 * list in siteConfig is only for overriding where the official name is
 * unwieldy — "United States of America" as "USA", say.
 */
function nameFor(code, overrides) {
    if (overrides[code]) return overrides[code];

    try {
        const display = new Intl.DisplayNames(['en'], { type: 'region' });
        return display.of(code.toUpperCase()) || code.toUpperCase();
    } catch {
        // Very old browsers, or a code the runtime doesn't recognise.
        return code.toUpperCase();
    }
}

/**
 * Live visitor counts per country, largest first.
 *
 * Shared by the footer summary and the full statistics page so both show the
 * same figures from one request shape.
 */
export function useVisitorCounts() {
    const [data, setData] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/visitors')
            .then((response) => (response.ok ? response.json() : null))
            .then((result) => {
                if (!cancelled && result) setData(result);
            })
            .catch(() => {
                // A counter is decoration; losing it must not disturb the page.
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const countries = useMemo(() => {
        const overrides = Object.fromEntries(
            visitorCountData.countries.map((c) => [c.code, c.name]),
        );

        return Object.entries(data?.countries || {})
            .sort((a, b) => b[1] - a[1])
            .map(([code, count]) => ({
                id: code,
                code,
                name: nameFor(code, overrides),
                flagUrl: `https://flagcdn.com/w40/${code}.png`,
                count,
                countLabel: count.toLocaleString(),
            }));
    }, [data]);

    return {
        /** Null until the first response, so callers can avoid flashing a zero. */
        loaded: data !== null,
        total: data?.total || 0,
        totalLabel: (data?.total || 0).toLocaleString(),
        countries,
    };
}
