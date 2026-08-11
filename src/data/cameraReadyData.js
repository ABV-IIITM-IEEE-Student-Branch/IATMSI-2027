// Camera Ready Submission data - IATMSI-2027

export const cameraReadyData = {
    title: "Instructions for Camera-Ready Paper Submission",
    subtitle: "Complete step-by-step guide for formatting, copyright clearance, IEEE PDF eXpress verification, and CMT final upload for IATMSI-2027.",
    
    importantDates: [
        { activity: "Call for Papers", date: "20th June 2026", isDeadline: false },
        { activity: "Submission Due Date", date: "20th December 2026", isDeadline: true },
        { activity: "Registration Open", date: "15th Oct. 2026", isDeadline: false },
        { activity: "Notification of Acceptance", date: "30th Jan. 2027", isDeadline: false },
        { activity: "Early-Bird Registration Closes", date: "15th Feb. 2027", isDeadline: true },
        { activity: "Camera-Ready Paper Due", date: "20th March 2027", isDeadline: true },
        { activity: "Last Date of Registration", date: "30th March 2027", isDeadline: true },
    ],

    submissionOverview: {
        intro: "Please incorporate all reviewers' comments and suggestions received via the notification email when preparing your final camera-ready paper for the proceedings.",
        pageLimit: "Strict maximum limit of six (06) pages.",
        deadline: "20th March 2027",
        registrationPolicy: "At least one author MUST complete Full Author Registration and present the accepted paper at IATMSI-2027 for the paper to be considered for inclusion on IEEE Xplore Digital Library. Each registration covers ONE (01) participant. Participating co-authors must register separately under their appropriate registration category.",
        paymentFormUrl: "https://forms.gle/6W79XUvjbeHZxRPM6",
        plagiarismPolicy: "The similarity index of your manuscript MUST be below 25% using standard plagiarism-checking software (e.g. Turnitin) prior to submitting the final camera-ready paper. Papers with a similarity index exceeding 25% will NOT be included in the conference proceedings or IEEE Xplore.",
        ieeeTemplateUrl: "https://www.ieee.org/conferences/publishing/templates.html",
        cmtPortalUrl: "https://cmt3.research.microsoft.com",
    },

    copyrightClearance: {
        title: "Instructions for Copyright Clearance Notice",
        description: "Before generating your final PDF, add the appropriate copyright clearance code notice to the bottom of the first page of your source document (LaTeX / Word). Refer to the official IEEE template to replace the dummy footnote with the correct code based on author affiliation:",
        notices: [
            {
                category: "For papers in which all authors are employed by the U.S. Government",
                code: "U.S. Government work not protected by U.S. copyright"
            },
            {
                category: "For papers in which all authors are employed by a Crown government (UK, Canada, and Australia)",
                code: "979-8-3315-4677-9/27/$31.00 ©2027 Crown"
            },
            {
                category: "For papers in which all authors are employed by the European Union",
                code: "979-8-3315-4677-9/27/$31.00 ©2027 European Union"
            },
            {
                category: "For all other papers",
                code: "979-8-3315-4677-9/27/$31.00 ©2027 IEEE"
            }
        ]
    },

    pdfExpressInstructions: {
        title: "Instructions for Authors to Create Final PDF via IEEE PDF eXpress",
        conferenceId: "68868X",
        signupUrl: "https://ieee-pdf-express.org/account/signup",
        loginUrl: "https://ieee-pdf-express.org/",
        steps: [
            {
                step: 1,
                title: "Create IEEE PDF eXpress Account",
                details: "Visit https://ieee-pdf-express.org/ and click 'Create Account' or navigate directly to https://ieee-pdf-express.org/account/signup if you do not have an existing account."
            },
            {
                step: 2,
                title: "Enter Conference ID & Credentials",
                details: "Enter 68868X as the Conference ID (Conference ID for IEEE IATMSI), enter your email address, and set a password. Follow online prompts to verify your account."
            },
            {
                step: 3,
                title: "Associate Account with IATMSI-2027",
                details: "Log into your account with Conference ID 68868X, email address, and password. Complete your user profile and associate your account with the conference."
            },
            {
                step: 4,
                title: "Create New Paper Title",
                details: "Navigate to your PDF eXpress Dashboard and click 'Create New Title'."
            },
            {
                step: 5,
                title: "Enter Paper Title & Details",
                details: "Type the exact title of your accepted paper as submitted to CMT and continue."
            },
            {
                step: 6,
                title: "Upload Source File (Word / LaTeX PDF)",
                details: "Choose your manuscript file (Word format or LaTeX generated PDF) and click Continue to start the conversion/checking process."
            },
            {
                step: 7,
                title: "Conversion & PDF Verification",
                details: "PDF eXpress will convert and check your manuscript against IEEE format compliance specifications."
            },
            {
                step: 8,
                title: "Download Verified PDF & Approve",
                details: "Upon successful verification message, click the 'Download PDF' icon to save the PDF eXpress verified PDF. Click the 'Approve' icon to send verification confirmation to the publication chair."
            },
            {
                step: 9,
                title: "Upload Final PDF to Microsoft CMT",
                details: "Log into Microsoft CMT portal, select your paper, click 'Create camera-ready submission', and upload the PDF eXpress-verified PDF file as your final camera-ready submission."
            }
        ]
    }
};
