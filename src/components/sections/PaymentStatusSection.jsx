import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { paymentStatusData } from '../../data/paymentData';
import { ROUTES } from '../../constants/routes';

/**
 * Where Cashfree returns the payer after checkout.
 *
 * Nothing in the URL is treated as proof of payment — the query string is just
 * whatever was opened. The order id is used to ask our server, which in turn
 * asks Cashfree, and only that answer decides what is shown here.
 *
 * A payment can be a second or two behind the redirect, so a pending result is
 * retried a few times before it is reported as unpaid.
 */

const RETRY_DELAYS = [1500, 2500, 4000, 6000];

function useReceipt(orderId) {
    const [state, setState] = useState({ status: 'checking', receipt: null });

    useEffect(() => {
        if (!orderId) {
            setState({ status: 'not-found', receipt: null });
            return undefined;
        }

        let cancelled = false;
        let timer;

        async function check(attempt) {
            try {
                const response = await fetch(`/api/payment-status?order_id=${encodeURIComponent(orderId)}`);
                if (cancelled) return;

                if (response.status === 404) {
                    setState({ status: 'not-found', receipt: null });
                    return;
                }
                if (!response.ok) throw new Error(`status ${response.status}`);

                const { receipt } = await response.json();
                if (cancelled) return;

                if (receipt.status === 'PENDING' && attempt < RETRY_DELAYS.length) {
                    // Still settling. Keep the spinner rather than telling
                    // someone their payment failed a second before it lands.
                    timer = setTimeout(() => check(attempt + 1), RETRY_DELAYS[attempt]);
                    return;
                }

                setState({ status: receipt.status.toLowerCase(), receipt });
            } catch {
                if (cancelled) return;
                if (attempt < RETRY_DELAYS.length) {
                    timer = setTimeout(() => check(attempt + 1), RETRY_DELAYS[attempt]);
                } else {
                    // Not "not found". We failed to ask — which is a different
                    // thing, and telling someone who has just paid that their
                    // registration does not exist is the wrong way to say it.
                    setState({ status: 'error', receipt: null });
                }
            }
        }

        check(0);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [orderId]);

    return state;
}

function ReceiptRow({ label, value }) {
    if (!value) return null;
    return (
        <div className="flex flex-wrap items-baseline justify-between gap-2 py-2.5 border-b border-[#C59B27]/25 last:border-b-0">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#722332]">{label}</span>
            <span className="text-sm font-bold text-[#2F0B11] text-right break-words max-w-[62%]">{value}</span>
        </div>
    );
}

export default function PaymentStatusSection() {
    const d = paymentStatusData;
    const [params] = useSearchParams();
    const orderId = params.get('order_id');
    const { status, receipt } = useReceipt(orderId);

    const headings = {
        checking: [d.checkingTitle, d.checkingText],
        paid: [d.successTitle, d.successText],
        pending: [d.pendingTitle, d.pendingText],
        failed: [d.failedTitle, d.failedText],
        'not-found': [d.notFoundTitle, d.notFoundText],
        error: [d.errorTitle, d.errorText],
    };
    const [heading, blurb] = headings[status] || headings.error;

    return (
        <SectionContainer dataSource="paymentData" id="payment-status-section">
            <SectionHeader title={d.title} centered={true} />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Outcome */}
                <div
                    className={`rounded-2xl border-2 p-6 text-center print:hidden ${
                        status === 'paid'
                            ? 'bg-[#F2F8F0] border-[#2F5A2A]/40'
                            : status === 'checking'
                              ? 'bg-white border-[#C59B27]/40'
                              : 'bg-[#FDF6F3] border-[#8A4B1C]/30'
                    }`}
                >
                    {status === 'checking' && (
                        <div className="w-8 h-8 mx-auto mb-3 rounded-full border-[3px] border-[#C59B27]/30 border-t-[#722332] animate-spin" />
                    )}
                    <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wide">{heading}</h3>
                    <p className="text-xs md:text-sm text-neutral-700 mt-2 leading-relaxed">{blurb}</p>

                    {orderId && status !== 'checking' && (
                        <p className="text-[11px] text-neutral-500 mt-3 font-mono break-all">{d.fields.orderId}: {orderId}</p>
                    )}
                </div>

                {/* Receipt — only once payment is confirmed */}
                {status === 'paid' && receipt && (
                    <>
                        <div className="bg-white rounded-2xl border-2 border-[#C59B27]/50 p-6 md:p-8 print:border-0 print:p-0">
                            <div className="text-center border-b-2 border-[#C59B27]/40 pb-4 mb-4">
                                <h4 className="text-base md:text-lg font-black text-[#4A121A] uppercase tracking-widest">
                                    {d.receiptTitle}
                                </h4>
                                <p className="text-xs font-bold text-[#722332] mt-1">{d.receiptSubtitle}</p>
                            </div>

                            <ReceiptRow label={d.fields.orderId} value={receipt.orderId} />
                            <ReceiptRow label={d.fields.paymentId} value={receipt.paymentId} />
                            <ReceiptRow label={d.fields.name} value={receipt.fullName} />
                            <ReceiptRow label={d.fields.email} value={receipt.email} />
                            <ReceiptRow label={d.fields.affiliation} value={receipt.affiliation} />
                            <ReceiptRow label={d.fields.category} value={receipt.categoryLabel} />
                            <ReceiptRow
                                label={d.fields.rate}
                                value={`${receipt.periodLabel} · ${receipt.membershipLabel} · ${receipt.regionLabel}`}
                            />
                            <ReceiptRow label={d.fields.ieeeNumber} value={receipt.ieeeNumber} />
                            <ReceiptRow label={d.fields.paperId} value={receipt.paperId} />
                            <ReceiptRow label={d.fields.paperTitle} value={receipt.paperTitle} />
                            <ReceiptRow
                                label={d.fields.paidOn}
                                value={receipt.paidAt ? new Date(receipt.paidAt).toLocaleString() : null}
                            />

                            <div className="flex items-baseline justify-between gap-2 pt-4 mt-2 border-t-2 border-[#C59B27]/40">
                                <span className="text-xs font-black uppercase tracking-widest text-[#722332]">
                                    {d.fields.amount}
                                </span>
                                <span className="text-2xl font-black text-[#4A121A]">{receipt.amountLabel}</span>
                            </div>

                            <p className="text-[11px] text-neutral-500 mt-5 leading-relaxed">{d.keepSafeNote}</p>
                        </div>

                        {/*
                            Printing is the download. The browser's own "Save as
                            PDF" produces a better document than anything a PDF
                            library would render here, works offline, and keeps
                            a dependency out of the bundle.
                        */}
                        <div className="text-center print:hidden">
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
                                </svg>
                                {d.downloadButton}
                            </button>
                        </div>
                    </>
                )}

                {(status === 'failed' || status === 'pending' || status === 'not-found' || status === 'error') && (
                    <div className="text-center print:hidden">
                        <Link
                            to={ROUTES.REGISTRATION}
                            className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all"
                        >
                            {d.retryButton}
                        </Link>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
}
