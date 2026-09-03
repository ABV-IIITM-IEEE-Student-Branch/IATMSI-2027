// Paper Submission data - IATMSI-2027

export const paperSubmissionData = {
    title: "How to Submit paper in IATMSI-2027",
    subtitle: "Complete submission instructions, IEEE manuscript templates, Microsoft CMT portal link, and publication policies.",

    cmtUrl: "https://cmt3.research.microsoft.com/IATMSI2027",
    // Same file as the Call for Papers page links to. See tracksData.js for why
    // it is on Drive rather than /wp-content.
    cfpPdfUrl: "https://drive.google.com/uc?export=download&id=1OLmtqkqmlOjP97Px7jU5EDMb-Zvha2iM",
    ieeeTemplatesUrl: "https://www.ieee.org/conferences/publishing/templates.html",
    docLatexUrl: "https://app.doclatex.com/",
    submissionDeadline: "20th December 2026",

    formattingText: [
        "Prospective authors are encouraged to submit full papers in PDF format not exceeding 6 pages in double-column includes all figures, tables, and references. The paper must follow the standard IEEE template (https://www.ieee.org/conferences/publishing/templates.html). Papers not compliant with the IEEE template including appropriate referencing or exceeding the page limit will be returned without review. To convert the paper in IEEE conference latex template with pdf to submit, the automated services of app.doclatex.com (https://app.doclatex.com/) can also be availed. This is also suitable for non latex users too.",
        "Only original papers that have not been published or submitted for publication elsewhere will be considered. The paper must clearly indicate the research area, main results, and contributions. All accepted and presented papers will undergo submission for possible inclusion into IEEE Xplore subject to meeting IEEE Xplore’s scope and quality requirements.",
        "Submission of a scientific paper is considered a commitment that, upon acceptance, authors will submit their camera-ready version for inclusion in the formal proceedings and will present the paper at the conference. Each accepted contribution must have at least one paid registration by the time the camera-ready paper is submitted for inclusion in the proceedings. IATMSI reserves the right to remove from IEEE Xplore papers and posters not presented at the symposium."
    ],

    cmtPortalText: "For you to be able to access the submission system as an author, reviewer, program committee member, session chair, etc., you need to create an account on Microsoft CMT using the Submit button given below:",

    latexPreferenceText: "We prefer the submission in LaTeX format. Kindly prepare your paper in LaTeX format for the proper IEEE format.",

    cmtDisclaimerAndReviewProcess: "The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support. Accepted papers will be assigned to a regular technical session. All papers will go through a rigorous, single-blind reviewing process. At least one author of an accepted paper will have to register at the conference in order to submit the final version. All accepted papers presented at the conference will be published in the conference proceeding and submitted to IEEE Xplore for publication subject to their norms. They should satisfy the requirements given in the publication policy.",

    copyrightRequirement: "The E-Copyright form must be submitted by the author or presenter at the time of registration.",

    ieeePolicies: {
        title: "IEEE Policies",
        description: "IEEE reserves the right to exclude a paper from distribution after the conference (e.g., by not including it in IEEE Xplore) if the paper is not presented at the conference. Papers are reviewed on the basis that they do not contain plagiarized material and have not been submitted to any other conference at the same time (double submission). These matters are taken very seriously and IEEE will take action against any author who has engaged in either practice."
    }
};

// UI labels for this section — kept in data so every visible word is editable.
export const paperSubmissionLabels = {
    manuscriptGuidelinesPageLimit: "Manuscript Guidelines & Page Limit",
    ieeeConferenceTemplates: "IEEE Conference Templates",
    automatedDoclatexConverter: "Automated DocLatex Converter",
    submissionPortal: "Submission Portal",
    microsoftCmtSubmission: "Microsoft CMT Submission",
    submissionDeadline: "Submission Deadline",
    submitAPaperMicrosoftCmt: "Submit a Paper (Microsoft CMT)",
    downloadCallForPapersPdf: "Download Call for Papers (.pdf)",
    ieeeManuscriptFormats: "IEEE Manuscript Formats:",
    ieeeTemplatesWebpage: "IEEE Templates Webpage",
    latexTemplate: "LaTeX Template",
    msWordDocTemplate: "MS Word (.doc) Template",
    reviewingProcessPeerReviewSystem: "Reviewing Process & Peer-Review System",
};
