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

    // --- India & Nepal: UPI transfer, then the registration form ------------
    indianTitle: "Indian & Nepali Delegates",
    indianBlurb: "Transfer the fee for your category to the conference UPI account, then fill in the registration form with your transaction reference.",
    indianNote: "Confirmed manually by the registration committee. Keep your UPI transaction reference safe.",
    indianButton: "Pay by UPI & Fill Form",
    indianFormUrl: "https://forms.gle/6W79XUvjbeHZxRPM6",

    // --- International: one payment link per category -----------------------
    internationalTitle: "International Delegates",
    internationalBlurb: "Pay online using the payment link for your registration category.",
    internationalNote: "Your registration is confirmed once the payment is received.",

    /**
     * One entry per category, each with the link the organisers issue for it.
     *
     * Empty until those links exist. While it is empty the card shows
     * `internationalPendingNote` instead of buttons — an empty list of ways to
     * pay would otherwise read as a broken page rather than as one where
     * something has not opened yet.
     *
     * To add them: one { id, label, url } per category, ids matching the
     * categories in the fee table above.
     */
    internationalLinks: [
        { id: 'tutorial', label: 'Tutorial / Workshop Attendee', url: 'https://example.com/iatmsi-2027/tutorial' },
        { id: 'student', label: 'Student Author', url: 'https://example.com/iatmsi-2027/student' },
        { id: 'professional', label: 'Professional Author', url: 'https://example.com/iatmsi-2027/professional' },
        { id: 'coauthor_without_kit', label: 'Co-Author / Attendee — without kit', url: 'https://example.com/iatmsi-2027/coauthor-no-kit' },
        { id: 'coauthor_with_kit', label: 'Co-Author / Attendee — with kit', url: 'https://example.com/iatmsi-2027/coauthor-with-kit' },
    ],

    // Shown after a category is chosen, so the button always names one amount
    // rather than asking people to pick the right link out of five.
    internationalSelectLabel: "Registration Category",
    internationalSelectPlaceholder: "Select your category…",
    internationalPayButton: "Proceed to Payment",

    internationalPendingNote: "Payment links for international delegates are being finalised. Please check back shortly, or write to iatmsi@iiitm.ac.in and the organising committee will send you the link for your category.",

    feeNote: "All fees are inclusive of applicable taxes. Any payment gateway charges, if any, are borne by the registrant.",
    refundNote: "Registration fees are non-refundable for all categories.",
    feeTableUnavailable: "The fee table could not be loaded. Please refresh the page, or contact the organisers.",
};
