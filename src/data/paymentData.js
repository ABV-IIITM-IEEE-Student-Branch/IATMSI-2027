// Registration & payment - IATMSI-2027
//
// Every word this page puts on screen lives here, so it stays editable like
// the rest of the site.
//
// Not here: the fee amounts. Those come from /api/fees, where they are covered
// by tests that check the table is complete and internally consistent. A second
// copy in this file would be one more thing that can quietly disagree.

export const registrationFormData = {
    title: "Registration & Payment",
    subtitle: "Fees, and how to pay them, for IATMSI-2027 delegates.",

    feeTableTitle: "Registration Fee Structure",
    earlyBirdBadge: "Early bird pricing is active",
    regularBadge: "Regular pricing is active",
    earlyBirdUntilLabel: "Early bird rates apply until",

    // Column headings, worded as the conference's published fee table has them.
    // The dates in the two period headings are NOT here — they are taken from
    // the server's early-bird cutoff, so a caption cannot disagree with the
    // date people are actually charged by.
    columnCategory: "Category",
    columnEarly: "Early Bird Registration",
    columnRegular: "Regular Registration",
    untilLabel: "Until",
    afterLabel: "After",
    columnIndian: "Indian/Nepali Delegates",
    columnInternational: "International Delegates",
    memberShort: "IEEE Member",
    nonMemberShort: "Non-IEEE Member",

    // Footnote under the table, and the categories that carry the marker.
    feeFootnoteMarker: "#",
    feeFootnote: "A certificate will be issued to all the registered attendees.",
    feeFootnoteCategories: ["coauthor_without_kit", "coauthor_with_kit"],

    // Step 1 — who is registering. Each route is different enough that the
    // choice is worth making explicitly rather than inferring from a dropdown.
    chooserTitle: "How To Register",
    chooserNote: "Choose the option that applies to you. Fees are charged in Indian Rupees (₹) for delegates from India and Nepal, and in US Dollars ($) for everyone else.",

    // --- Indian & Nepali Delegates: Bank transfer only, then the registration form ------------
    indianNepaliTitle: "Indian & Nepali Delegates",
    indianNepaliBadge: "Bank Transfer Only",
    indianNepaliBlurb: "Transfer the fee for your category via direct bank transfer (NEFT / RTGS / IMPS / SWIFT) using the banking details below, then fill in the registration form with your transaction reference.",
    indianNepaliNote: "Confirmed manually by the registration committee. Keep your bank transfer / UTR transaction reference safe.",
    indianNepaliButton: "Fill Registration Form",
    indianNepaliFormUrl: "https://forms.gle/6W79XUvjbeHZxRPM6",
    bankDetails: {
        accountHolder: "Vidhilekha soft solutions Pvt ltd",
        bankName: "HDFC",
        accountNumber: "50200071655472",
        ifscCode: "HDFC0003740",
        swiftCode: "HDFCINBB",
    },
    bankLabels: {
        accountHolder: "A/c Holder",
        bankName: "Bank",
        accountNumber: "A/c Number",
        ifscCode: "IFSC Code",
        swiftCode: "SWIFT Code",
        copy: "Copy",
        copied: "Copied!",
    },

    // --- International: one payment link per category -----------------------
    internationalTitle: "International Delegates",
    internationalBadge: "Online Payment",
    internationalBlurb: "Pay online using the payment link for your registration category.",
    internationalNote: "Your registration is confirmed once the payment is received.",

    /**
     * A Cashfree payment form per category and membership.
     *
     * Each form is fixed at one amount, so there is a link for every priced
     * combination rather than one per category — which is why the card asks
     * two questions before it shows a button.
     *
     * `id` matches the category ids in the fee table, so the amount shown
     * beside the button is read from the same source the table renders from.
     * A link pointing at the wrong form is then visible rather than silent:
     * the payer sees the fee here and the amount on Cashfree's page, and a
     * mismatch between them is the one thing they are placed to notice.
     */
    internationalLinks: [
        {
            id: 'tutorial',
            label: 'Tutorial / Workshop Attendee',
            urls: {
                ieee: 'https://payments.cashfree.com/forms/tutorial',
                non_ieee: 'https://payments.cashfree.com/forms/tutorialnonieee1',
            },
        },
        {
            id: 'student',
            label: 'Student Author',
            urls: {
                ieee: 'https://payments.cashfree.com/forms/studentieee',
                non_ieee: 'https://payments.cashfree.com/forms/studentnonieee',
            },
        },
        {
            id: 'professional',
            label: 'Professional Author',
            urls: {
                ieee: 'https://payments.cashfree.com/forms/professional_IEEE',
                non_ieee: 'https://payments.cashfree.com/forms/professional_nonIEEE',
            },
        },
        {
            id: 'coauthor_without_kit',
            label: 'Co-Author / Attendee — without conference kit',
            urls: {
                ieee: 'https://payments.cashfree.com/forms/CoAuthorsieee',
                non_ieee: 'https://payments.cashfree.com/forms/coauthors',
            },
        },
        {
            id: 'coauthor_with_kit',
            label: 'Co-Author / Attendee — with conference kit',
            urls: {
                ieee: 'https://payments.cashfree.com/forms/KitCoAuthorsieee',
                non_ieee: 'https://payments.cashfree.com/forms/KitCoAuthorsnonieee',
            },
        },
    ],

    internationalSelectLabel: "Registration Category",
    internationalSelectPlaceholder: "Select your category…",
    internationalMembershipLabel: "IEEE Membership",
    internationalMembershipPlaceholder: "Select your membership status…",
    internationalAmountLabel: "Amount to pay",
    internationalPayButton: "Proceed to Payment",

    internationalPendingNote: "Payment links for international delegates are being finalised. Please check back shortly, or write to iatmsi@iiitm.ac.in and the organising committee will send you the link for your category.",

    feeNote: "All fees are inclusive of applicable taxes. Any payment gateway charges, if any, are borne by the registrant.",
    refundNote: "Registration fees are non-refundable for all categories.",
    feeTableUnavailable: "The fee table could not be loaded. Please refresh the page, or contact the organisers.",
};
