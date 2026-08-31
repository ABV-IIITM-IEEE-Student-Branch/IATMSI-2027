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

    return useMemo(() => {
        const overrides = Object.fromEntries(
            visitorCountData.countries.map((c) => [c.code, c.name]),
        );
        const offset = visitorCountData.displayOffset || 0;

        const real = Object.entries(data?.countries || {}).sort((a, b) => b[1] - a[1]);
        const realTotal = real.reduce((sum, [, count]) => sum + count, 0);
        const shownTotal = realTotal + offset;

        // Spread the offset across countries in proportion to real visits, so
        // the rows still add up to the total rather than visibly disagreeing
        // with it. Rounding leftovers go to the largest, which is where a
        // one-off difference is least noticeable.
        const scaled = real.map(([code, count]) => ({
            code,
            count: realTotal > 0 ? Math.round((count / realTotal) * shownTotal) : count,
        }));
        const drift = shownTotal - scaled.reduce((sum, c) => sum + c.count, 0);
        if (scaled.length > 0) scaled[0].count += drift;

        return {
            /** Null until the first response, so callers can avoid flashing a zero. */
            loaded: data !== null,
            total: shownTotal,
            totalLabel: shownTotal.toLocaleString(),
            countries: scaled.map(({ code, count }) => ({
                id: code,
                code,
                name: nameFor(code, overrides),
                flagUrl: `https://flagcdn.com/w40/${code}.png`,
                count,
                countLabel: count.toLocaleString(),
            })),
        };
    }, [data]);
}
