import { useMemo, useState } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { registrationFormData } from '../../data/paymentData';
import { useFees, formatFee } from '../../hooks/useFees';

/**
 * Online registration and payment.
 *
 * The form collects who is registering; the amount is decided by the server
 * and shown here for confirmation only. Nothing about the price is submitted —
 * `/api/create-order` recalculates it from the same table this displays.
 *
 * Checkout itself happens on Cashfree's own page, so no card details are ever
 * entered into this site.
 */

const CASHFREE_SDK = 'https://sdk.cashfree.com/js/v3/cashfree.js';

/**
 * Loads Cashfree's SDK on demand, once.
 *
 * A tag left behind by a load that already failed is discarded rather than
 * waited on: its `load` event has been and gone, so attaching to it would hang
 * the button on "Opening secure checkout…" with nothing ever resolving it.
 */
let cashfreePromise = null;

function loadCashfree() {
    if (window.Cashfree) return Promise.resolve(window.Cashfree);
    if (cashfreePromise) return cashfreePromise;

    cashfreePromise = new Promise((resolve, reject) => {
        document.querySelectorAll(`script[src="${CASHFREE_SDK}"]`).forEach((tag) => tag.remove());

        const script = document.createElement('script');
        script.src = CASHFREE_SDK;
        script.addEventListener('load', () => {
            if (window.Cashfree) resolve(window.Cashfree);
            else reject(new Error('Payment gateway loaded but did not initialise.'));
        });
        script.addEventListener('error', () => {
            // Cleared so a retry starts a fresh load rather than returning
            // this same rejected promise forever.
            cashfreePromise = null;
            reject(new Error('Could not load the payment gateway.'));
        });
        document.body.appendChild(script);
    });

    return cashfreePromise;
}

// Column order in the published table: period, then delegate type, then
// membership. Named rather than inlined so the three header rows and the body
// cannot drift out of step with each other.
const PERIOD_ORDER = ['early', 'regular'];
const REGION_ORDER = ['indian_nepali', 'international'];
const MEMBERSHIP_ORDER = ['ieee', 'non_ieee'];

/**
 * Amounts as the conference publishes them: symbol after the number, no
 * thousands separator. Deliberately different from `formatFee`, which is used
 * where a single amount has to be read at a glance rather than compared down
 * a column.
 */
function formatPublishedFee(amount, currency) {
    if (typeof amount !== 'number') return '—';
    return `${amount}${currency === 'INR' ? '₹' : '$'}`;
}

/** "15th Feb. 2027" */
function formatCutoff(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const day = date.getDate();
    const ordinal =
        day % 10 === 1 && day !== 11 ? 'st'
        : day % 10 === 2 && day !== 12 ? 'nd'
        : day % 10 === 3 && day !== 13 ? 'rd'
        : 'th';
    return `${day}${ordinal} ${date.toLocaleDateString('en-GB', { month: 'short' })}. ${date.getFullYear()}`;
}

const EMPTY = {
    fullName: '',
    email: '',
    phone: '',
    affiliation: '',
    country: '',
    region: '',
    category: '',
    membership: '',
    ieeeNumber: '',
    paperId: '',
    paperTitle: '',
};

function Field({ label, hint, children }) {
    return (
        <label className="block">
            <span className="block text-[11px] font-black uppercase tracking-wider text-[#722332] mb-1.5">
                {label}
                {hint && <span className="ml-1.5 font-medium normal-case tracking-normal text-neutral-500">({hint})</span>}
            </span>
            {children}
        </label>
    );
}

const INPUT_CLASS =
    'w-full rounded-xl border border-[#C59B27]/50 bg-white px-3.5 py-2.5 text-sm text-[#2F0B11] ' +
    'placeholder:text-neutral-400 focus:border-[#722332] focus:outline-none focus:ring-2 focus:ring-[#C59B27]/30 transition-colors';

export default function RegistrationFormSection() {
    const d = registrationFormData;
    const { fees, loaded, failed } = useFees();

    const [form, setForm] = useState(EMPTY);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const set = (name) => (event) => {
        setForm((previous) => ({ ...previous, [name]: event.target.value }));
        setError('');
    };

    // What this registrant will pay, read from the same table the server uses.
    // Shown for confirmation only — it is never sent back.
    const quote = useMemo(() => {
        const { category, region, membership } = form;
        if (!fees || !category || !region || !membership) return null;
        const amount = fees.table?.[category]?.[fees.currentPeriod]?.[region]?.[membership];
        if (typeof amount !== 'number') return null;
        return {
            amount,
            currency: region === 'international' ? 'USD' : 'INR',
            period: fees.currentPeriod,
        };
    }, [fees, form]);

    const isEarly = fees?.currentPeriod === 'early';

    /*
        The date in each period heading comes from the server's cutoff, not
        from editable text. Two copies could disagree, and the one people would
        act on is the one that is only a caption.
    */
    const periodHeading = (period) => {
        const cutoff = formatCutoff(fees?.earlyBirdCutoff);
        return period === 'early'
            ? `${d.columnEarly} (${d.untilLabel} ${cutoff})`
            : `${d.columnRegular} (${d.afterLabel} ${cutoff})`;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Only the registrant's own details. No amount, currency or
                // period — the server works those out for itself.
                body: JSON.stringify(form),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                setError(result.error || d.genericError);
                setSubmitting(false);
                return;
            }

            const Cashfree = await loadCashfree();
            const cashfree = Cashfree({ mode: result.mode === 'production' ? 'production' : 'sandbox' });

            // Replaces this page. Cashfree returns the payer to
            // /registration/payment?order_id=… once they are done.
            const checkout = await cashfree.checkout({
                paymentSessionId: result.paymentSessionId,
                redirectTarget: '_self',
            });

            // It reports some failures by resolving with an error rather than
            // throwing. Without this the page would sit on "Opening secure
            // checkout…" indefinitely, having never navigated anywhere.
            if (checkout?.error) {
                throw new Error(checkout.error.message || 'Checkout could not be opened.');
            }
        } catch (submitError) {
            console.error('[registration]', submitError);
            setError(d.genericError);
            setSubmitting(false);
        }
    }

    return (
        <SectionContainer dataSource="paymentData" id="registration-form-section">
            <SectionHeader title={d.title} subtitle={d.subtitle} centered={true} />

            {/*
                Said out loud, because nothing else would show it. On sandbox
                keys everything behaves exactly as if it worked — checkout
                completes and the registration is confirmed — while no money
                moves. Left unnoticed in production that is a page quietly
                handing out free registrations.
            */}
            {loaded && fees.mode === 'sandbox' && (
                <p className="mb-6 text-center text-xs md:text-sm font-black uppercase tracking-wider text-[#8A4B1C] bg-[#FDF3E7] border-2 border-[#8A4B1C]/40 rounded-xl px-4 py-3">
                    {d.sandboxNotice}
                </p>
            )}

            {loaded && !fees.paymentsConfigured && (
                <p className="mb-6 text-center text-xs md:text-sm font-bold text-[#722332] bg-[#FAF5EB] border-2 border-[#C59B27]/50 rounded-xl px-4 py-3">
                    {d.unavailableNotice}
                </p>
            )}

            {/* Fee table, straight from the server */}
            <div className="bg-white rounded-2xl p-5 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C59B27]/30 pb-4">
                    <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wide">
                        {d.feeTableTitle}
                    </h3>
                    {loaded && (
                        <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                            isEarly
                                ? 'bg-[#F0F7EE] text-[#2F5A2A] border-[#2F5A2A]/30'
                                : 'bg-[#FAF5EB] text-[#722332] border-[#C59B27]/50'
                        }`}>
                            {isEarly ? d.earlyBirdBadge : d.regularBadge}
                        </span>
                    )}
                </div>

                {loaded ? (
                    <>
                    <div className="overflow-x-auto -mx-1 px-1">
                        {/*
                            Laid out like the conference's published fee table:
                            one column per membership within each delegate type,
                            within each period. Eight amount columns, so it
                            scrolls sideways on a phone rather than wrapping
                            into something unreadable.
                        */}
                        <table className="fee-table">
                            <thead>
                                <tr>
                                    <th rowSpan={3} className="fee-category align-middle w-[22%]">
                                        {d.columnCategory}
                                    </th>
                                    {PERIOD_ORDER.map((period) => (
                                        <th key={period} colSpan={4} className="fee-period">
                                            {periodHeading(period)}
                                        </th>
                                    ))}
                                </tr>
                                <tr>
                                    {PERIOD_ORDER.map((period) =>
                                        REGION_ORDER.map((region) => (
                                            <th key={`${period}-${region}`} colSpan={2} className="fee-region">
                                                {region === 'indian_nepali' ? d.columnIndian : d.columnInternational}
                                            </th>
                                        )),
                                    )}
                                </tr>
                                <tr>
                                    {PERIOD_ORDER.map((period) =>
                                        REGION_ORDER.map((region) =>
                                            MEMBERSHIP_ORDER.map((membership) => (
                                                <th key={`${period}-${region}-${membership}`} className="fee-member">
                                                    {membership === 'ieee' ? d.memberShort : d.nonMemberShort}
                                                </th>
                                            )),
                                        ),
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {fees.categories.map((category) => (
                                    <tr key={category}>
                                        <td className="fee-category-cell">
                                            {fees.categoryLabels[category]}
                                            {(d.feeFootnoteCategories || []).includes(category) && (
                                                <sup className="font-black text-[#722332]">{d.feeFootnoteMarker}</sup>
                                            )}
                                        </td>
                                        {PERIOD_ORDER.map((period) =>
                                            REGION_ORDER.map((region) =>
                                                MEMBERSHIP_ORDER.map((membership) => (
                                                    <td
                                                        key={`${period}-${region}-${membership}`}
                                                        className="fee-amount"
                                                    >
                                                        {formatPublishedFee(
                                                            fees.table[category][period][region][membership],
                                                            region === 'international' ? 'USD' : 'INR',
                                                        )}
                                                    </td>
                                                )),
                                            ),
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {d.feeFootnote && (
                        <p className="text-[11.5px] font-bold text-[#8A1C1C]">
                            {d.feeFootnoteMarker} {d.feeFootnote}
                        </p>
                    )}
                    </>
                ) : failed ? (
                    /*
                        Fees come from the server, so if that request fails
                        there is no price to show and the button below stays
                        disabled. Saying so beats an animation that never
                        finishes — the page would otherwise look like it was
                        still loading, forever.
                    */
                    <p role="alert" className="text-xs font-bold text-[#8A1C1C] bg-[#FDF0F0] border border-[#8A1C1C]/30 rounded-xl px-4 py-3">
                        {d.genericError}
                    </p>
                ) : (
                    <div className="h-24 rounded-xl bg-[#FAF5EB]/70 animate-pulse" />
                )}

                {/*
                    While early-bird pricing is live, say when it ends. It is
                    the one thing on this table a registrant might act on today
                    rather than next month.
                */}
                {loaded && isEarly && (
                    <p className="text-[11.5px] font-bold text-[#2F5A2A]">
                        {d.earlyBirdUntilLabel}{' '}
                        {new Date(fees.earlyBirdCutoff).toLocaleDateString(undefined, {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                )}

                <p className="text-[11.5px] text-neutral-600 leading-relaxed">{d.feeTableNote}</p>
            </div>

            {/* The form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wide">
                        {d.formTitle}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1.5">{d.formNote}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label={d.labels.fullName}>
                        <input required type="text" value={form.fullName} onChange={set('fullName')} placeholder={d.placeholders.fullName} className={INPUT_CLASS} />
                    </Field>

                    <Field label={d.labels.email}>
                        <input required type="email" value={form.email} onChange={set('email')} placeholder={d.placeholders.email} className={INPUT_CLASS} />
                    </Field>

                    <Field label={d.labels.phone}>
                        <input required type="tel" value={form.phone} onChange={set('phone')} placeholder={d.placeholders.phone} className={INPUT_CLASS} />
                    </Field>

                    <Field label={d.labels.affiliation} hint={d.optionalHint}>
                        <input type="text" value={form.affiliation} onChange={set('affiliation')} placeholder={d.placeholders.affiliation} className={INPUT_CLASS} />
                    </Field>

                    <Field label={d.labels.region}>
                        <select required value={form.region} onChange={set('region')} className={INPUT_CLASS}>
                            <option value="">{d.selectPlaceholder}</option>
                            {Object.entries(d.regionOptions).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label={d.labels.country} hint={d.optionalHint}>
                        <input type="text" value={form.country} onChange={set('country')} placeholder={d.placeholders.country} className={INPUT_CLASS} />
                    </Field>

                    <div className="md:col-span-2">
                        <Field label={d.labels.category}>
                            <select required value={form.category} onChange={set('category')} className={INPUT_CLASS}>
                                <option value="">{d.selectPlaceholder}</option>
                                {(fees?.categories || []).map((category) => (
                                    <option key={category} value={category}>{fees.categoryLabels[category]}</option>
                                ))}
                            </select>
                        </Field>
                    </div>

                    <Field label={d.labels.membership}>
                        <select required value={form.membership} onChange={set('membership')} className={INPUT_CLASS}>
                            <option value="">{d.selectPlaceholder}</option>
                            {Object.entries(d.membershipOptions).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </Field>

                    {/* Only asked for when the member rate is being claimed. */}
                    {form.membership === 'ieee' && (
                        <Field label={d.labels.ieeeNumber}>
                            <input required type="text" value={form.ieeeNumber} onChange={set('ieeeNumber')} placeholder={d.placeholders.ieeeNumber} className={INPUT_CLASS} />
                        </Field>
                    )}

                    <Field label={d.labels.paperId} hint={d.optionalHint}>
                        <input type="text" value={form.paperId} onChange={set('paperId')} placeholder={d.placeholders.paperId} className={INPUT_CLASS} />
                    </Field>

                    <div className="md:col-span-2">
                        <Field label={d.labels.paperTitle} hint={d.optionalHint}>
                            <input type="text" value={form.paperTitle} onChange={set('paperTitle')} placeholder={d.placeholders.paperTitle} className={INPUT_CLASS} />
                        </Field>
                    </div>
                </div>

                {/* What they will be charged */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl border-2 border-[#C59B27]/50 p-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <span className="block text-[11px] font-black uppercase tracking-widest text-[#722332]">
                            {d.summaryTitle}
                        </span>
                        {quote ? (
                            <span className="block text-[11.5px] text-neutral-600 mt-1">
                                {d.summaryPeriodLabel}: {quote.period === 'early' ? d.columnEarly : d.columnRegular}
                            </span>
                        ) : (
                            <span className="block text-[11.5px] text-neutral-600 mt-1 max-w-md">
                                {d.summaryChooseFirst}
                            </span>
                        )}
                    </div>
                    <span className="text-2xl md:text-3xl font-black text-[#4A121A]">
                        {quote ? formatFee(quote.amount, quote.currency) : '—'}
                    </span>
                </div>

                {error && (
                    <p role="alert" className="text-xs font-bold text-[#8A1C1C] bg-[#FDF0F0] border border-[#8A1C1C]/30 rounded-xl px-4 py-3">
                        {error}
                    </p>
                )}

                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={submitting || !quote}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] disabled:opacity-50 disabled:cursor-not-allowed px-7 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all"
                    >
                        {submitting ? d.payingButton : d.payButton}
                    </button>

                    <p className="text-[11.5px] text-neutral-600 leading-relaxed">{d.secureNote}</p>
                    <p className="text-[11.5px] font-bold text-[#722332]">{d.refundNote}</p>
                </div>
            </form>
        </SectionContainer>
    );
}
