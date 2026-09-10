import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { registrationFormData } from '../../data/paymentData';
import { useFees } from '../../hooks/useFees';

/**
 * Registration fees, and how to pay them.
 *
 * No payment is taken here. Indian and Nepali delegates transfer to the
 * conference UPI account and record it on a form; international delegates use
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RouteCard
                        title={d.indianTitle}
                        blurb={d.indianBlurb}
                        note={d.indianNote}
                        actions={[{ id: 'upi', label: d.indianButton, url: d.indianFormUrl }]}
                        emphasis
                    />
                    <RouteCard
                        title={d.internationalTitle}
                        blurb={d.internationalBlurb}
                        note={(d.internationalLinks || []).length ? d.internationalNote : null}
                        actions={d.internationalLinks || []}
                        pendingNote={d.internationalPendingNote}
                        warning={d.internationalLinksArePlaceholders ? d.internationalPlaceholderWarning : null}
                    />
                </div>

                <p className="text-[11.5px] font-bold text-[#722332]">{d.refundNote}</p>
            </div>
        </SectionContainer>
    );
}

/**
 * One way of registering: what it is, what it means, and where it goes.
 *
 * With no actions it shows `pendingNote` instead. An empty card would read as
 * a broken page rather than as one where something has not opened yet.
 */
function RouteCard({ title, blurb, note, actions = [], pendingNote, warning, emphasis = false }) {
    const buttonClass = emphasis
        ? 'bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] border-[#C59B27]'
        : 'bg-white !text-[#722332] hover:bg-[#FAF5EB] border-[#C59B27]';

    return (
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl border-2 border-[#C59B27]/50 p-5 flex flex-col gap-3">
            <h4 className="text-base font-black text-[#4A121A] uppercase tracking-wide">{title}</h4>
            <p className="text-xs text-neutral-700 leading-relaxed">{blurb}</p>
            {note && <p className="text-[11px] text-neutral-600 leading-relaxed italic">{note}</p>}

            {/*
                Buttons that look ready but go nowhere are worse than no
                buttons, so while they are placeholders the card says so.
            */}
            {warning && (
                <p className="text-[11.5px] font-black uppercase tracking-wider text-[#8A1C1C] bg-[#FDF0F0] border-2 border-[#8A1C1C]/40 rounded-xl px-4 py-2.5 leading-relaxed">
                    {warning}
                </p>
            )}

            <div className="flex flex-col gap-2 mt-auto pt-1">
                {actions.length > 0 ? (
                    actions.map((action) => (
                        <a
                            key={action.id}
                            href={action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 shadow-sm transition-all ${buttonClass}`}
                        >
                            <span>{action.label}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    ))
                ) : (
                    <p className="text-[11.5px] font-bold text-[#8A4B1C] bg-[#FDF3E7] border border-[#8A4B1C]/30 rounded-xl px-4 py-3 leading-relaxed">
                        {pendingNote}
                    </p>
                )}
            </div>
        </div>
    );
}
