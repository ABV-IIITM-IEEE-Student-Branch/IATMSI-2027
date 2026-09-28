import { useState } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { registrationFormData } from '../../data/paymentData';
import { useFees } from '../../hooks/useFees';

/**
 * Registration fees, and how to pay them.
 *
 * No payment is taken here. Indian and Nepali delegates transfer to the
 * official conference bank account and record it on a form; international delegates use
 * a payment link issued per category. Both are confirmed by the organising
 * committee, so this page's only job is to show the correct fee and send
 * people to the right place.
 */

// Column order in the published table: period, then delegate type, then
// membership. Named rather than inlined so the three header rows and the body
// cannot drift out of step with each other.
const PERIOD_ORDER = ['early', 'regular'];
const REGION_ORDER = ['indian_nepali', 'international'];
const MEMBERSHIP_ORDER = ['ieee', 'non_ieee'];

/**
 * Amounts as the conference publishes them: symbol after the number, no
 * thousands separator.
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

export default function RegistrationFormSection() {
    const d = registrationFormData;
    const { fees, loaded, failed } = useFees();

    const isEarly = fees?.currentPeriod === 'early';

    /*
        The date in each period heading comes from the fee table's own cutoff,
        not from editable text. Two copies could disagree, and the one people
        would act on is the one that is only a caption.
    */
    const periodHeading = (period) => {
        const cutoff = formatCutoff(fees?.earlyBirdCutoff);
        return period === 'early'
            ? `${d.columnEarly} (${d.untilLabel} ${cutoff})`
            : `${d.columnRegular} (${d.afterLabel} ${cutoff})`;
    };

    return (
        <SectionContainer dataSource="paymentData" id="registration-form-section">
            <SectionHeader title={d.title} subtitle={d.subtitle} centered={true} />

            {/* The published fee table. */}
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
                        {d.feeTableUnavailable}
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

                <p className="text-[11.5px] text-neutral-600 leading-relaxed">{d.feeNote}</p>
            </div>

            {/* How to pay. One route each; both confirmed by the committee. */}
            <div className="bg-white rounded-2xl p-5 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-5">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wide">
                        {d.chooserTitle}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1.5">{d.chooserNote}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                    <BankTransferCard d={d} />
                    <InternationalCard d={d} fees={fees} />
                </div>

                <p className="text-[11.5px] font-bold text-[#722332]">{d.refundNote}</p>
            </div>
        </SectionContainer>
    );
}

/**
 * Indian & Nepali delegates: pay via direct bank transfer, then fill the Google Form.
 */
function BankTransferCard({ d }) {
    const [copiedKey, setCopiedKey] = useState(null);

    const handleCopy = (key, value) => {
        if (!navigator?.clipboard?.writeText) return;
        navigator.clipboard.writeText(value);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const details = d.bankDetails;
    const labels = d.bankLabels || {};

    return (
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl border-2 border-[#C59B27]/50 p-5 flex flex-col justify-between gap-3 h-full">
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-black text-[#4A121A] uppercase tracking-wide">
                        {d.indianNepaliTitle}
                    </h4>
                    {d.indianNepaliBadge && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C59B27]/20 text-[#722332] border border-[#C59B27]/40 whitespace-nowrap">
                            {d.indianNepaliBadge}
                        </span>
                    )}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">{d.indianNepaliBlurb}</p>

                {details && (
                    <div className="bg-white/95 rounded-xl border border-[#C59B27]/40 p-3.5 space-y-2 text-xs shadow-xs">
                        <div className="flex justify-between items-center text-[11.5px] pb-1.5 border-b border-neutral-100">
                            <span className="text-neutral-500 font-semibold">{labels.bankName || 'Bank'}:</span>
                            <span className="font-bold text-[#4A121A]">{details.bankName}</span>
                        </div>
                        <div className="flex justify-between items-start text-[11.5px] pb-1.5 border-b border-neutral-100">
                            <span className="text-neutral-500 font-semibold">{labels.accountHolder || 'A/c Holder'}:</span>
                            <span className="font-bold text-[#4A121A] text-right ml-2">{details.accountHolder}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11.5px] pb-1.5 border-b border-neutral-100">
                            <span className="text-neutral-500 font-semibold">{labels.accountNumber || 'A/c Number'}:</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-[#4A121A] tracking-wider">{details.accountNumber}</span>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('accountNumber', details.accountNumber)}
                                    aria-label="Copy Account Number"
                                    className="p-1 rounded text-neutral-400 hover:text-[#722332] hover:bg-[#FAF5EB] transition-all duration-200 cursor-pointer"
                                    title={copiedKey === 'accountNumber' ? (labels.copied || 'Copied!') : (labels.copy || 'Copy')}
                                >
                                    {copiedKey === 'accountNumber' ? (
                                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[11.5px] pb-1.5 border-b border-neutral-100">
                            <span className="text-neutral-500 font-semibold">{labels.ifscCode || 'IFSC Code'}:</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-[#4A121A] tracking-wider">{details.ifscCode}</span>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('ifscCode', details.ifscCode)}
                                    aria-label="Copy IFSC Code"
                                    className="p-1 rounded text-neutral-400 hover:text-[#722332] hover:bg-[#FAF5EB] transition-all duration-200 cursor-pointer"
                                    title={copiedKey === 'ifscCode' ? (labels.copied || 'Copied!') : (labels.copy || 'Copy')}
                                >
                                    {copiedKey === 'ifscCode' ? (
                                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[11.5px]">
                            <span className="text-neutral-500 font-semibold">{labels.swiftCode || 'SWIFT Code'}:</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-[#4A121A] tracking-wider">{details.swiftCode}</span>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('swiftCode', details.swiftCode)}
                                    aria-label="Copy SWIFT Code"
                                    className="p-1 rounded text-neutral-400 hover:text-[#722332] hover:bg-[#FAF5EB] transition-all duration-200 cursor-pointer"
                                    title={copiedKey === 'swiftCode' ? (labels.copied || 'Copied!') : (labels.copy || 'Copy')}
                                >
                                    {copiedKey === 'swiftCode' ? (
                                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {d.indianNepaliNote && (
                    <p className="text-[11px] text-neutral-600 leading-relaxed italic">{d.indianNepaliNote}</p>
                )}
            </div>

            <div className="mt-auto pt-2">
                <a
                    href={d.indianNepaliFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#C59B27] bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] shadow-sm transition-all duration-300 ease-in-out"
                >
                    <span>{d.indianNepaliButton}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

/**
 * The international route: pick a category, then pay.
 *
 * A dropdown rather than one button per category. The list is the same either
 * way, but this leaves a single button on screen that names one amount,
 * instead of five that a payer has to choose correctly between — and the
 * choice is the part they can get wrong.
 *
 * The button appears only once a category is chosen; there is nowhere for it
 * to lead before that.
 */
function InternationalCard({ d, fees }) {
    const [categoryId, setCategoryId] = useState('');
    const [membership, setMembership] = useState('');

    const links = d.internationalLinks || [];
    const category = links.find((link) => link.id === categoryId);
    const url = category && membership ? category.urls?.[membership] : null;

    /*
        The fee for what was chosen, read from the same table above rather than
        written beside the link. Each Cashfree form is fixed at one amount, so
        this is the payer's chance to notice a link pointing at the wrong one —
        they see the figure here and again on Cashfree's page, and only a
        mismatch between the two would reveal it.
    */
    const amount =
        fees && categoryId && membership
            ? fees.table?.[categoryId]?.[fees.currentPeriod]?.international?.[membership]
            : null;

    return (
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl border-2 border-[#C59B27]/50 p-5 flex flex-col justify-between gap-3 h-full">
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-black text-[#4A121A] uppercase tracking-wide">
                        {d.internationalTitle}
                    </h4>
                    {d.internationalBadge && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C59B27]/20 text-[#722332] border border-[#C59B27]/40 whitespace-nowrap">
                            {d.internationalBadge}
                        </span>
                    )}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">{d.internationalBlurb}</p>
                <p className="text-[11px] text-neutral-600 leading-relaxed italic">{d.internationalNote}</p>
            </div>

            {links.length > 0 ? (
                <div className="mt-auto pt-1 space-y-3">
                    <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-wider text-[#722332] mb-1.5">
                            {d.internationalSelectLabel}
                        </span>
                        <select
                            value={categoryId}
                            onChange={(event) => setCategoryId(event.target.value)}
                            className="w-full rounded-xl border border-[#C59B27]/50 bg-white px-3.5 py-2.5 text-sm text-[#2F0B11] focus:border-[#722332] focus:outline-none focus:ring-2 focus:ring-[#C59B27]/30 transition-colors"
                        >
                            <option value="">{d.internationalSelectPlaceholder}</option>
                            {links.map((link) => (
                                <option key={link.id} value={link.id}>{link.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block">
                        <span className="block text-[11px] font-black uppercase tracking-wider text-[#722332] mb-1.5">
                            {d.internationalMembershipLabel}
                        </span>
                        <select
                            value={membership}
                            onChange={(event) => setMembership(event.target.value)}
                            className="w-full rounded-xl border border-[#C59B27]/50 bg-white px-3.5 py-2.5 text-sm text-[#2F0B11] focus:border-[#722332] focus:outline-none focus:ring-2 focus:ring-[#C59B27]/30 transition-colors"
                        >
                            <option value="">{d.internationalMembershipPlaceholder}</option>
                            <option value="ieee">{d.memberShort}</option>
                            <option value="non_ieee">{d.nonMemberShort}</option>
                        </select>
                    </label>

                    {url && (
                        <>
                            {typeof amount === 'number' && (
                                <p className="flex items-baseline justify-between gap-2 text-xs bg-white border border-[#C59B27]/40 rounded-xl px-4 py-2.5">
                                    <span className="font-black uppercase tracking-wider text-[#722332]">
                                        {d.internationalAmountLabel}
                                    </span>
                                    <span className="text-lg font-black text-[#4A121A]">${amount}</span>
                                </p>
                            )}

                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#C59B27] bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] shadow-sm transition-all duration-300 ease-in-out"
                            >
                                <span>{d.internationalPayButton}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </>
                    )}
                </div>
            ) : (
                <p className="mt-auto text-[11.5px] font-bold text-[#8A4B1C] bg-[#FDF3E7] border border-[#8A4B1C]/30 rounded-xl px-4 py-3 leading-relaxed">
                    {d.internationalPendingNote}
                </p>
            )}
        </div>
    );
}
