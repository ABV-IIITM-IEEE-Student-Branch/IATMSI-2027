// Oral Presenter's Guidelines data - IATMSI-2027

export const oralGuidelinesData = {
    title: "Oral Presenter’s Guidelines",
    subtitle: "Complete presentation structure, time management, template download, and session guidelines for oral presenters at IATMSI-2027.",

    // Downloads the .pptx rather than opening it in Google Slides.
    //
    // The `uc?export=download` form serves the file exactly as it was uploaded.
    // The alternative, docs.google.com/.../export/pptx, re-exports through
    // Slides — which can shift fonts and layout, and this is a template authors
    // are meant to build on, so the original bytes are the point.
    //
    // Also moved off /wp-content: that path is on the domain this site is
    // taking over, where the SPA rewrite would return the app's HTML instead
    // of a file.
    downloadTemplateUrl: "https://drive.google.com/uc?export=download&id=18Kzjpg_DIcoC2T5Vli4MyFE6CBDfgR0S",

    timeAllotment: {
        totalTime: "15 Minutes",
        presentationTime: "10 Minutes",
        qaTime: "5 Minutes",
        note: "It is compulsory to follow the official presentation template of IATMSI-2027."
    },

    paragraphs: [
        "There is NO EXCUSE for using more than your allotted time. Rehearse your presentation several times; projecting slides and doing anything else you would otherwise expect to do at the meeting. It is a discourtesy to your audience, the Session Chair and the other speakers to exceed your allotted time. The Session Chairs are instructed to adhere to the printed schedule for the session. With parallel sessions this is critical to the overall success of the conference.",
        "Presenters are required to present their paper as a live, offline or online (as mentioned in the schedule) presentation mode, followed by Q&A during their scheduled timeslot. Live presentation of Oral papers is a requirement for publication in IEEE Xplore. For online presenters, Google Meet team links of each Track and their time slot is provided in the program schedule.",
        "Presentations should be clearly structured and should contain the essential elements of the accepted formal paper. Please include such content as the problem, the background, the innovative approach, the new results, and any comparative evaluation that the author wishes to present.",
        "The presenter should prepare a reasonable number of PowerPoint slides, so as not to exceed the time limit. Typically, 1 slide is presented in 1 minute. Slides should not be overcrowded by text and graphics. Too much text should be avoided."
    ],

    structureElements: [
        "Problem Statement",
        "Background & Motivation",
        "Innovative Approach / Methodology",
        "Key Research Results",
        "Comparative Evaluation & Discussion"
    ],

    goldenRuleNote: "Prepare approximately 10 slides (1 slide per 1 minute of presentation speech). Avoid overcrowding slides with excessive text or complex diagrams."
};

// UI labels for this section — kept in data so every visible word is editable.
export const oralGuidelinesLabels = {
    officialPresentationTemplate: "Official Presentation Template",
    downloadPresentationFormatPptx: "Download Presentation Format (.pptx)",
    totalAllottedTime: "Total Allotted Time",
    presentationSpeech: "Presentation Speech",
    liveQADiscussion: "Live Q&A Discussion",
    strictTimeManagementScheduleAdherence: "Strict Time Management & Schedule Adherence",
    livePresentationIeeeXplorePolicy: "Live Presentation & IEEE Xplore Policy",
    recommendedSlideStructure: "Recommended Slide Structure",
    slideDesignPaceGuidelines: "Slide Design & Pace Guidelines",
    goldenRuleOfThumb: "Golden Rule of Thumb",
};
