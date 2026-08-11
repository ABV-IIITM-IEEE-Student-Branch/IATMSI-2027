// Registration data - IATMSI-2027

export const registrationPageData = {
    title: "Registration Guidelines & Payment Details",
    subtitle: "Complete registration instructions for Indian/Nepal delegates and International delegates for IATMSI-2027.",

    overview: "IATMSI-2027 registration can be done online, and payment in Indian Rupees (₹) or Nepali Rupees (NPR) & US Dollars ($) is only accepted.",

    feeTableStatus: "Will update Soon",

    guidelines: [
        "Please note that the fees shown above are inclusive of all taxes and levies. Any gateway charges along with applicable taxes or levies, if any, will have to be borne by the registrant.",
        "IEEE member fees discount is only applicable if an active IEEE membership number is provided in the registration form. IEEE members are requested to upload IEEE membership details during the online registration process, if registering under IEEE category.",
        "Students are defined as full-time students, enrolled for degrees or diplomas with a university or another similar institution. The proof of enrollment (Valid Student ID showing name and current status) should be scanned and uploaded on the registration system.",
        "All registrations include admission to all technical sessions and E-proceeding.",
        "At least one of the authors must complete an author registration by the final camera-ready paper submission deadline for their paper to be included in the final program of the conference.",
        "One author registration covers only one paper.",
        "For any registration category, no refunds will be made in any case.",
        "Registration fees of all categories except tutorial include a registration kit, Presentation slot, Refreshments (Morning and Evening) and 3 Lunches, Copy of Conference Proceedings (Soft Copy), Certificate, Eligibility for all technical sessions, cultural event coupons and one-day Gala dinner coupon. A registration kit will be provided only to the offline attendees."
    ],

    indianDelegatesSection: {
        title: "1. Registration for Indian & Nepal Delegates (Paper Presenters/co-authors attendees, workshop/tutorial attendees & other Participants only)",
        instruction: "Choose your registration category from the fee table and transfer the corresponding amount into any of the below mentioned two accounts:",
        accounts: [
            { label: "Account Number 1", detail: "will update soon" },
            { label: "Account Number 2", detail: "will update soon" }
        ],
        googleFormText: "After the payment, kindly fill the registration form given below:",
        formUrl: "https://forms.gle/6W79XUvjbeHZxRPM6",
        buttonLabel: "Registration (Indian Delegates)"
    },

    internationalDelegatesSection: {
        title: "2. Registration for International Authors & Participants only",
        instruction: "International Authors who want to pay fees in dollars ($) by credit/debit card etc. can pay by this method. All the international authors have to select the second option i.e. International (stripe) gateway on the Explara portal. The online registration system is now available at the following link:",
        explaraUrl: "https://in.explara.com/e/ieee-iatmsi-2027",
        buttonLabel: "Registration (International Delegates)",
        stepsTitle: "Steps of Registration for the International Authors and Participants:",
        steps: [
            {
                step: 1,
                title: "Step 1: Open Explara Portal",
                text: "Click on the above link: https://in.explara.com/e/ieee-iatmsi-2027"
            },
            {
                step: 2,
                title: "Step 2: Select Registration Category",
                text: "Click on Register and select the appropriate category of registration fees.",
                image: "https://lh3.googleusercontent.com/d/1Dqh_jUy4PjjbOW3VQjXI8GHoVfpUxMEV"
            },
            {
                step: 3,
                title: "Step 3: Fill Buyer & Attendee Details",
                text: "Fill the buyer details and Attendee Details. Note that you have to select the international transaction mentioned in the buyer details (rounded in red in the picture below). Then you have to fill in the details like country, state, address, etc.",
                image: "https://lh3.googleusercontent.com/d/1Uj3OKMkS08H3-RHGO-RkBAoVhr66gHDS"
            },
            {
                step: 4,
                title: "Step 4: Confirm Author & Paper Details",
                text: "Fill the buyer details and Attendee Details carefully. In the Attendee details, if you are not able to fill in all the author details, or the paper title due to space limitations, then you can fill the short form."
            },
            {
                step: 5,
                title: "Step 5: Select Stripe International Gateway & Complete Payment",
                text: "After clicking on the Proceed tab, the screen shown below will appear. On the left-hand side, there are two options. You must select the second option, which is circled in red. Only after selecting this option will your international card details be accepted.\n\nAfter selecting the Stripe option, the red arrow shown in the picture will automatically move to the second option.\n\nAfter that, fill in your card details and click Pay Now. The payment amount will be deducted from your card, and a registration completion message will be displayed on the screen or sent to your registered email address.",
                images: [
                    "https://lh3.googleusercontent.com/d/16PWPJH-WHZc9gjpaPLsTZK1gMbCdX1Tr",
                    "https://lh3.googleusercontent.com/d/1JPbSEtt1d-4QrT7wGdNrmkjDPaZceswZ"
                ]
            }
        ]
    }
};
