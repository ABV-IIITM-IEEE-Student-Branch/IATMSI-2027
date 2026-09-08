// Policy pages - IATMSI-2027
//
// Required by the payment gateway before a merchant account is approved, and
// linked from the footer where its reviewers look for them.
//
// Everything here restates what the conference already publishes — the
// registration guidelines on /registration and the fee table — rather than
// introducing new terms. Where the two could differ, the guidelines are the
// authority and this should be corrected to match, not the other way round.
//
// The organising committee should read both pages before registration opens:
// they describe what the conference is committing to, and nobody but the
// organisers can confirm that.

const CONTACT_EMAIL = 'iatmsi@iiitm.ac.in';

export const termsData = {
    title: 'Terms and Conditions',
    subtitle: 'The terms on which registrations for IEEE IATMSI-2027 are accepted.',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: 'September 2026',

    sections: [
        {
            heading: 'About this conference',
            paragraphs: [
                'IEEE IATMSI-2027, the IEEE International Conference on Interdisciplinary Approaches in Technology and Management for Social Innovation, is organised by ABV-IIITM Gwalior in association with the IEEE Madhya Pradesh Section and the IEEE Nepal Section. The conference is scheduled for 20–22 May 2027 in Kathmandu, Nepal.',
                'These terms apply to everyone who registers for the conference through this website.',
            ],
        },
        {
            heading: 'Registration and fees',
            paragraphs: [
                'Registration fees are those published in the fee table on the registration page. The fee that applies to you depends on your delegate category, your IEEE membership status, and whether you register before or after the early-bird deadline.',
                'Fees are charged in Indian Rupees (₹) for delegates registering from India and Nepal, and in US Dollars ($) for all other delegates. These are separately published prices, not a currency conversion of one another.',
                'All fees are inclusive of applicable taxes and levies. Any payment gateway charges, and any taxes or levies on them, are borne by the registrant.',
                'One author registration covers one paper. At least one author of an accepted paper must complete registration by the camera-ready submission deadline for that paper to appear in the conference programme.',
            ],
        },
        {
            heading: 'Concession categories',
            paragraphs: [
                'The IEEE member rate requires a valid, active IEEE membership number, which must be provided during registration and may be verified against IEEE records.',
                'The student rate is available to full-time students enrolled for a degree or diploma at a university or comparable institution. Proof of enrolment showing your name and current status may be requested.',
                'Where a concession is claimed but cannot be substantiated, the organisers may ask for the difference between the rate paid and the applicable rate before confirming attendance.',
            ],
        },
        {
            heading: 'Payments',
            paragraphs: [
                'Card, net banking and wallet payments are processed by Cashfree Payments. Your card details are entered on their secure page and are never seen or stored by this website.',
                'A registration is confirmed only once the payment has been confirmed by the payment gateway. Reaching the confirmation page is not by itself proof of payment.',
                'Where payment is made by UPI transfer, the registration is confirmed by the registration committee after the transfer has been verified against the conference account.',
            ],
        },
        {
            heading: 'Presentation and publication',
            paragraphs: [
                'Accepted papers are published subject to IEEE\'s scope and quality requirements. IEEE reserves the right to exclude a paper from IEEE Xplore if it is not presented at the conference.',
                'Registration includes admission to all technical sessions and the electronic proceedings. Categories other than the tutorial rate also include a registration kit, refreshments, lunches, a certificate, cultural event coupons and one gala dinner coupon. Registration kits are provided to in-person attendees only.',
            ],
        },
        {
            heading: 'Changes to the programme',
            paragraphs: [
                'The organisers may alter the programme, session timings, speakers or venue arrangements where circumstances require it. Any such change will be published on this website.',
            ],
        },
        {
            heading: 'Contact',
            paragraphs: [
                `Questions about these terms can be sent to ${CONTACT_EMAIL}. Please include your Order ID if your question concerns a registration you have already paid for.`,
            ],
        },
    ],
};

export const refundsData = {
    title: 'Refunds and Cancellations',
    subtitle: 'The refund position for IEEE IATMSI-2027 registrations.',
    lastUpdatedLabel: 'Last updated',
    lastUpdated: 'September 2026',

    sections: [
        {
            // Stated first and without qualification, because it is the one
            // thing someone reading this page needs to know before paying.
            heading: 'Registration fees are non-refundable',
            paragraphs: [
                'Registration fees for IEEE IATMSI-2027 are non-refundable. This applies to every registration category, and to cancellations for any reason, including non-attendance and inability to travel.',
                'This is stated in the registration guidelines published on the registration page, and registrants confirm it as part of completing payment.',
            ],
        },
        {
            heading: 'Cancelling a registration',
            paragraphs: [
                'A registration cannot be cancelled for a refund. If you are unable to attend, please write to us so your name can be removed from the attendance and catering lists.',
            ],
        },
        {
            // The gateway expects a merchant to say what happens here, and it
            // is also the case registrants actually contact organisers about.
            heading: 'Payments that failed or were charged twice',
            paragraphs: [
                'If money left your account but your registration was not confirmed, the transaction did not complete. Amounts debited against a failed or incomplete transaction are reversed automatically by your bank or card issuer, usually within 5 to 7 working days.',
                'If you were charged twice for the same registration, or a reversal has not appeared after 7 working days, write to us with your Order ID and the date and amount of the transaction. Confirmed duplicate charges are refunded in full to the original payment method.',
                'Approved refunds are processed within 7 working days of confirmation. The time taken for the amount to appear in your account after that depends on your bank or card issuer.',
            ],
        },
        {
            heading: 'Transferring a registration',
            paragraphs: [
                'A paid registration may be transferred to another person from the same institution, at the discretion of the organising committee, provided the request is made in writing before the conference and the replacement qualifies for the same registration category.',
            ],
        },
        {
            heading: 'If the conference is cancelled',
            paragraphs: [
                'If the organisers cancel the conference outright, registrants will be contacted directly about the arrangements that apply. Postponement or a change of format does not by itself entitle a registrant to a refund.',
            ],
        },
        {
            heading: 'How to reach us',
            paragraphs: [
                `Write to ${CONTACT_EMAIL} with your Order ID, the registered name and email address, and the date and amount of the payment. Queries about payments are answered by the registration committee.`,
            ],
        },
    ],
};
