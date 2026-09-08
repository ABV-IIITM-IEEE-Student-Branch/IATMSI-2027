// Online registration & payment - IATMSI-2027
//
// Every word the payment flow puts on screen lives here, so it stays editable
// like the rest of the site.
//
// What is deliberately NOT here: the fee amounts. Those come from the server
// (`api/_lib/fees.js`) and are fetched at runtime, because a price is not
// content — an accidental edit to a number in this file would change what
// people are charged, and the two copies could quietly disagree.

export const registrationFormData = {
    title: "Online Registration & Payment",
    subtitle: "Register and pay securely by card, UPI, net banking or wallet. Your fee is calculated automatically from the category you choose.",

    feeTableTitle: "Registration Fee Structure",
    feeTableNote: "All fees are inclusive of applicable taxes. Payment gateway charges, if any, are borne by the registrant.",
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

    // Step 1 — who is registering. The choice sets the currency and the fee
    // band, so it is asked as a deliberate choice rather than a dropdown
    // buried in the form.
    chooserTitle: "Choose How You Are Registering",
    chooserNote: "Your delegate category decides the currency and the fee band, so please pick the one that applies to you.",

    indianTitle: "Indian & Nepali Delegates",
    indianBlurb: "Fees are charged in Indian Rupees (₹). Pay by UPI, card, net banking or wallet.",
    indianButton: "Register Here",

    internationalTitle: "International Delegates",
    internationalBlurb: "Fees are charged in US Dollars ($). Pay by international card.",
    internationalButton: "Register Here",

    // Step 2 — Indian and Nepali delegates only. UPI settles straight into the
    // conference account and is confirmed by the committee; everything else
    // goes through the gateway and confirms itself.
    methodTitle: "Choose Your Payment Method",
    changeRegionLabel: "← Choose a different delegate category",

    upiTitle: "Pay by UPI",
    upiBlurb: "Transfer the fee to the conference UPI account, then fill in the registration form with your transaction reference.",
    upiNote: "Confirmed manually by the registration committee. Keep your UPI transaction reference safe.",
    upiButton: "Pay by UPI & Fill Form",

    gatewayTitle: "Card, Net Banking or Wallet",
    gatewayBlurb: "Pay securely online and receive your receipt straight away.",
    gatewayNote: "Confirmed automatically the moment payment succeeds.",
    gatewayButton: "Register & Pay Online",

    closeLabel: "Close",

    formTitle: "Registration Details",
    formNote: "Please use the name and email you want printed on your certificate and receipt.",

    labels: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        affiliation: "Affiliation / Institution",
        country: "Country",
        region: "Registering From",
        category: "Registration Category",
        membership: "IEEE Membership",
        ieeeNumber: "IEEE Membership Number",
        paperId: "Paper ID",
        paperTitle: "Paper Title",
    },

    placeholders: {
        fullName: "As it should appear on your certificate",
        email: "you@institution.edu",
        phone: "+91 98765 43210",
        affiliation: "e.g. ABV-IIITM Gwalior",
        country: "e.g. India",
        ieeeNumber: "e.g. 90210347",
        paperId: "If you are presenting a paper",
        paperTitle: "If you are presenting a paper",
    },

    optionalHint: "Optional",

    regionOptions: {
        indian_nepali: "India / Nepal",
        international: "Outside India & Nepal",
    },

    membershipOptions: {
        ieee: "IEEE Member",
        non_ieee: "Not an IEEE Member",
    },

    selectPlaceholder: "Please choose…",

    summaryTitle: "Amount Payable",
    summaryPeriodLabel: "Rate",
    summaryChooseFirst: "Choose a category, region and membership status to see your fee.",

    payButton: "Proceed to Secure Payment",
    payingButton: "Opening secure checkout…",

    secureNote: "Payments are processed by Cashfree. Your card details are entered on their secure page and are never seen or stored by this site.",
    refundNote: "Registration fees are non-refundable for all categories.",

    sandboxNotice: "Test mode — no real money will be charged.",
    unavailableNotice: "Online payment is not enabled yet. Please use the bank transfer instructions below.",
    genericError: "Something went wrong. Please try again, or contact the organisers if it keeps happening.",
};

export const paymentStatusData = {
    title: "Registration Payment",

    checkingTitle: "Checking your payment…",
    checkingText: "This only takes a moment. Please don't close this page.",

    successTitle: "Registration Confirmed",
    // Two versions, because the page must not promise an email that was never
    // sent. Receipts are skipped entirely when mail is unconfigured, and can
    // fail on their own; telling someone to watch their inbox in either case
    // just sends them looking for something that will not arrive.
    successText: "Your payment has been received. A copy of this receipt has been emailed to you.",
    successTextNoEmail: "Your payment has been received. Please download or print this receipt for your records — it has not been emailed.",

    pendingTitle: "Payment Not Completed",
    pendingText: "We haven't received a payment for this registration. If money has left your account, it will be reversed automatically — please contact the organisers with your Order ID.",

    failedTitle: "Payment Unsuccessful",
    failedText: "The payment did not go through and you have not been charged. You can start again from the registration page.",

    notFoundTitle: "Registration Not Found",
    notFoundText: "We couldn't find a registration for this link. Please check the link in your email, or start again from the registration page.",

    // Shown when we could not reach our own records — deliberately worded so
    // that someone who has just paid is not told their registration is missing.
    errorTitle: "Could Not Check Your Payment",
    errorText: "We couldn't reach our records just now. If you have completed a payment it is safe — please reload this page in a few minutes, or contact the organisers with your Order ID.",

    receiptTitle: "Registration Receipt",
    receiptSubtitle: "IEEE IATMSI-2027",

    fields: {
        orderId: "Order ID",
        paymentId: "Payment ID",
        name: "Name",
        email: "Email",
        affiliation: "Affiliation",
        category: "Category",
        rate: "Rate",
        ieeeNumber: "IEEE Membership No.",
        paperId: "Paper ID",
        paperTitle: "Paper Title",
        paidOn: "Paid On",
        amount: "Amount Paid",
    },

    downloadButton: "Download Receipt",
    retryButton: "Back to Registration",
    keepSafeNote: "Please keep this receipt for your records. You will need your Order ID for any queries.",
};
