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

/** Loads Cashfree's SDK on demand, once. */
function loadCashfree() {
    if (window.Cashfree) return Promise.resolve(window.Cashfree);

    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${CASHFREE_SDK}"]`);
        const script = existing || document.createElement('script');
        script.addEventListener('load', () => resolve(window.Cashfree));
        script.addEventListener('error', () => reject(new Error('Could not load the payment gateway.')));
        if (!existing) {
            script.src = CASHFREE_SDK;
            document.body.appendChild(script);
        }
    });
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
    const { fees, loaded } = useFees();

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
            await cashfree.checkout({
                paymentSessionId: result.paymentSessionId,
                redirectTarget: '_self',
            });
        } catch (submitError) {
            console.error('[registration]', submitError);
            setError(d.genericError);
            setSubmitting(false);
        }
    }

    return (
        <SectionContainer dataSource="paymentData" id="registration-form-section">
            <SectionHeader title={d.title} subtitle={d.subtitle} centered={true} />

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
                    <div className="overflow-x-auto -mx-1 px-1">
                        <table className="w-full min-w-[640px] border-collapse text-left">
                            <thead>
                                <tr>
                                    <th rowSpan={2} className="align-bottom p-2.5 text-[11px] font-black uppercase tracking-wider text-[#722332] border-b-2 border-[#C59B27]/50">
                                        {d.columnCategory}
                                    </th>
                                    <th colSpan={2} className="p-2.5 text-center text-[11px] font-black uppercase tracking-wider text-[#722332] border-b border-[#C59B27]/30">
                                        {d.columnEarly}
                                    </th>
                                    <th colSpan={2} className="p-2.5 text-center text-[11px] font-black uppercase tracking-wider text-[#722332] border-b border-[#C59B27]/30">
                                        {d.columnRegular}
                                    </th>
                                </tr>
                                <tr>
                                    {['early', 'regular'].map((period) => (
                                        [
                                            <th key={`${period}-in`} className="p-2.5 text-[10.5px] font-bold uppercase tracking-wide text-neutral-600 border-b-2 border-[#C59B27]/50">
                                                {d.columnIndian}
                                            </th>,
                                            <th key={`${period}-intl`} className="p-2.5 text-[10.5px] font-bold uppercase tracking-wide text-neutral-600 border-b-2 border-[#C59B27]/50">
                                                {d.columnInternational}
                                            </th>,
                                        ]
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fees.categories.map((category) => (
                                    <tr key={category} className="odd:bg-[#FFFDF9] even:bg-[#FAF5EB]/60">
                                        <td className="p-2.5 text-xs font-bold text-[#4A121A] border-b border-[#C59B27]/20 leading-snug">
                                            {fees.categoryLabels[category]}
                                        </td>
                                        {['early', 'regular'].map((period) => (
                                            ['indian_nepali', 'international'].map((region) => {
                                                const cell = fees.table[category][period][region];
                                                const currency = region === 'international' ? 'USD' : 'INR';
                                                return (
                                                    <td key={`${period}-${region}`} className="p-2.5 text-xs border-b border-[#C59B27]/20 whitespace-nowrap">
                                                        <span className="block font-black text-[#722332]">
                                                            {d.memberShort} {formatFee(cell.ieee, currency)}
                                                        </span>
                                                        <span className="block text-neutral-600 font-medium">
                                                            {d.nonMemberShort} {formatFee(cell.non_ieee, currency)}
                                                        </span>
                                                    </td>
                                                );
                                            })
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="h-24 rounded-xl bg-[#FAF5EB]/70 animate-pulse" />
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
