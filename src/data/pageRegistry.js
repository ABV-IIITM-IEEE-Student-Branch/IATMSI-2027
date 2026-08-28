// Page Registry - IATMSI-2027

// Every available section, and the data files it renders content from.
//
// `requiresData` must list every data file a section reads. Besides
// documenting the section, it is what lets an external editor know which file
// a piece of on-screen text came from when the same words appear in more than
// one place (a page title duplicated here and in the section's own data, say).
// A section whose list is wrong or missing simply falls back to being
// non-editable in place, never to editing the wrong field.
export const sectionManifest = [
    { id: 'hero', component: 'HeroSection', requiresData: ['heroData', 'conferenceData', 'pageRegistry'] },
    { id: 'intro', component: 'IntroSection', requiresData: ['conferenceData'] },
    { id: 'aboutInstitute', component: 'AboutInstitute', requiresData: ['conferenceData'] },
    { id: 'aboutFullSection', component: 'AboutFullSection', requiresData: ['conferenceData'] },
    { id: 'aboutRationaleSection', component: 'AboutRationaleSection', requiresData: ['conferenceData'] },
    { id: 'aboutObjectivesSection', component: 'AboutObjectivesSection', requiresData: ['conferenceData'] },
    { id: 'historySection', component: 'HistorySection', requiresData: ['historyData'] },
    { id: 'trackChairsSection', component: 'TrackChairsSection', requiresData: ['trackChairsData'] },
    { id: 'cameraReadySection', component: 'CameraReadySection', requiresData: ['cameraReadyData', 'siteConfig'] },
    { id: 'copyrightSection', component: 'CopyrightSection', requiresData: ['copyrightData'] },
    { id: 'oralGuidelinesSection', component: 'OralGuidelinesSection', requiresData: ['oralGuidelinesData'] },
    { id: 'posterGuidelinesSection', component: 'PosterGuidelinesSection', requiresData: ['posterGuidelinesData'] },
    { id: 'venueTravelKathmanduSection', component: 'VenueTravelKathmanduSection', requiresData: ['venueTravelData'] },
    { id: 'venueDirectionsSection', component: 'VenueDirectionsSection', requiresData: ['conferenceData', 'travelData'] },
    { id: 'travelVisaSection', component: 'TravelVisaSection', requiresData: ['travelData'] },
    { id: 'exploreGwaliorSection', component: 'ExploreGwaliorSection', requiresData: ['travelData'] },
    { id: 'faqsSection', component: 'FaqsSection', requiresData: ['faqsData'] },
    { id: 'hardnovateSection', component: 'HardnovateSection', requiresData: ['hardnovateData'] },
    { id: 'risingResearcherSection', component: 'RisingResearcherSection', requiresData: ['risingResearcherData'] },
    { id: 'excellenceResearchSection', component: 'ExcellenceResearchSection', requiresData: ['excellenceResearchData'] },
    { id: 'doctoralAwardSection', component: 'DoctoralAwardSection', requiresData: ['doctoralAwardData'] },
    { id: 'simulationAwardSection', component: 'SimulationAwardSection', requiresData: ['simulationAwardData'] },
    { id: 'bestPaperAwardSection', component: 'BestPaperAwardSection', requiresData: ['bestPaperAwardData'] },
    { id: 'fellowshipsSection', component: 'FellowshipsSection', requiresData: ['fellowshipsData'] },
    { id: 'sponsorshipSection', component: 'SponsorshipSection', requiresData: ['sponsorshipData'] },
    { id: 'callForReviewersSection', component: 'CallForReviewersSection', requiresData: ['reviewerData'] },
    { id: 'committeeSection', component: 'CommitteeSection', requiresData: ['committeeData'] },
    { id: 'contactSection', component: 'ContactSection', requiresData: ['contactData'] },
    { id: 'importantDatesSection', component: 'ImportantDatesSection', requiresData: ['conferenceData'] },
    { id: 'paperSubmissionSection', component: 'PaperSubmissionSection', requiresData: ['submissionData'] },
    { id: 'registrationSection', component: 'RegistrationSection', requiresData: ['registrationData'] },
    { id: 'tracksGridSection', component: 'TracksGridSection', requiresData: ['tracksData'] },
    { id: 'submissionCtaSection', component: 'SubmissionCtaSection', requiresData: ['siteConfig', 'tracksData'] },

    // Home page sections
    { id: 'aboutConfSection', component: 'AboutConfSection', requiresData: ['conferenceData', 'homeData'] },
    { id: 'programScheduleSection', component: 'ProgramScheduleSection', requiresData: ['homeData'] },
    { id: 'callForPapersSection', component: 'CallForPapersSection', requiresData: ['homeData'] },
    { id: 'themeTracksSection', component: 'ThemeTracksSection', requiresData: ['homeData'] },
    { id: 'awardsContestSection', component: 'AwardsContestSection', requiresData: ['homeData'] },
    { id: 'teaserVideosSection', component: 'TeaserVideosSection', requiresData: ['homeData'] },
    { id: 'patronChairsSection', component: 'PatronChairsSection', requiresData: ['homeData'] },
    { id: 'supportersSection', component: 'SupportersSection', requiresData: ['homeData'] },

    { id: 'divider', component: 'Divider', requiresData: [] },
    { id: 'placeholder', component: 'PlaceholderSection', requiresData: [] },
];

export const pageRegistry = [
    // --- HOME ---
    {
        id: 'home',
        title: 'Home',
        path: '/',
        sections: [
            { sectionId: 'hero', props: { isHomePage: true } },
            { sectionId: 'aboutConfSection', props: {} },
            // { sectionId: 'programScheduleSection', props: {} },
            { sectionId: 'callForPapersSection', props: {} },
            { sectionId: 'awardsContestSection', props: {} },
            { sectionId: 'teaserVideosSection', props: {} },
            { sectionId: 'patronChairsSection', props: {} },
            { sectionId: 'supportersSection', props: {} },
        ]
    },

    // --- ABOUT ---
    {
        id: 'about',
        title: 'ABOUT IATMSI-2027',
        path: '/about',
        sections: [
            { sectionId: 'hero', props: { title: "About the Conference", subtitle: `IEEE International Conference on Interdisciplinary Approaches in Technology and Management for Social Innovation (IATMSI-2027)` } },
            { sectionId: 'aboutFullSection', props: {} }
        ]
    },
    {
        id: 'history',
        title: 'IATMSI HISTORY',
        path: '/about/history',
        sections: [
            { sectionId: 'hero', props: { title: "IATMSI History & Heritage", subtitle: `Explore the journey, proceedings, and research achievements of previous IATMSI editions (2022–2026).` } },
            { sectionId: 'historySection', props: {} }
        ]
    },
    {
        id: 'committee',
        title: 'IATMSI COMMITTEES',
        path: '/committee',
        sections: [
            { sectionId: 'hero', props: { title: "Organizing Committee", subtitle: `Meet the distinguished organizing committee of IATMSI-2027.` } },
            { sectionId: 'committeeSection', props: {} }
        ]
    },
    {
        id: 'track-chairs',
        title: 'TRACK CHAIRS',
        path: '/about/track-chairs',
        sections: [
            { sectionId: 'hero', props: { title: "Thematic Track Chairs", subtitle: `Distinguished academic and industry leaders managing the 6 thematic technical tracks of IATMSI-2027.` } },
            { sectionId: 'trackChairsSection', props: {} }
        ]
    },

    // --- FOR AUTHORS ---
    {
        id: 'camera-ready',
        title: 'INSTRUCTIONS FOR CAMERA READY PAPER SUBMISSION',
        path: '/authors/camera-ready',
        sections: [
            { sectionId: 'hero', props: { title: "Camera-Ready Submission Guidelines", subtitle: `Step-by-step instructions for IEEE PDF eXpress verification, copyright clearance, and CMT final upload.` } },
            { sectionId: 'cameraReadySection', props: {} }
        ]
    },
    {
        id: 'copyright',
        title: 'INSTRUCTIONS FOR IEEE E-COPYRIGHT SUBMISSION',
        path: '/authors/copyright',
        sections: [
            { sectionId: 'hero', props: { title: "IEEE e-Copyright Submission", subtitle: `Step-by-step procedure for completing the IEEE Electronic Copyright Form (eCF) via Microsoft CMT.` } },
            { sectionId: 'copyrightSection', props: {} }
        ]
    },
    {
        id: 'oral-guidelines',
        title: 'ORAL PRESENTER\'S GUIDELINES',
        path: '/authors/oral-guidelines',
        sections: [
            { sectionId: 'hero', props: { title: "Oral Presenter's Guidelines", subtitle: `Official presentation template, time allotment, slide recommendations, and presentation mode requirements.` } },
            { sectionId: 'oralGuidelinesSection', props: {} }
        ]
    },
    {
        id: 'poster-guidelines',
        title: 'POSTER PRESENTER\'S GUIDELINES',
        path: '/authors/poster-guidelines',
        sections: [
            { sectionId: 'hero', props: { title: "Poster Presenter's Guidelines", subtitle: `Official poster board dimensions, template download link, session defense rules, and design specifications.` } },
            { sectionId: 'posterGuidelinesSection', props: {} }
        ]
    },
    {
        id: 'venue-travel',
        title: 'VENUE/TRAVEL',
        path: '/authors/venue-travel',
        sections: [
            { sectionId: 'hero', props: { title: "Venue & Travel Information", subtitle: `Kathmandu venue location, expected weather conditions, transit routes, and UNESCO World Heritage attractions.` } },
            { sectionId: 'venueTravelKathmanduSection', props: {} }
        ]
    },
    {
        id: 'gallery',
        title: 'GALLERY',
        path: '/authors/gallery',
        sections: [
            { sectionId: 'hero', props: { title: "Gallery", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Gallery' } }
        ]
    },

    // --- CALL FOR PAPERS (Tracks) ---
    {
        id: 'tracks',
        title: 'CALL FOR PAPERS',
        path: '/call-for-papers/tracks',
        sections: [
            { sectionId: 'hero', props: { title: "Call for Papers", subtitle: `Submit your research across our technical tracks covering green and sustainable technologies.` } },
            { sectionId: 'tracksGridSection', props: {} },
            { sectionId: 'submissionCtaSection', props: {} }
        ]
    },

    // --- CONFERENCE PROGRAM ---
    {
        id: 'conference-program',
        title: 'CONFERENCE PROGRAM',
        path: '/conference-program',
        sections: [
            { sectionId: 'hero', props: { title: "Conference Program", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Conference Program' } }
        ]
    },

    // --- PAPER SUBMISSION ---
    {
        id: 'paper-submission',
        title: 'PAPER SUBMISSION',
        path: '/call-for-papers/paper-submission',
        sections: [
            { sectionId: 'hero', props: { title: "Paper Submission & Camera-Ready", subtitle: `Everything you need from initial submission to final upload` } },
            { sectionId: 'paperSubmissionSection', props: {} }
        ]
    },

    // --- SPONSORSHIP/EXHIBITS ---
    {
        id: 'sponsorship',
        title: 'SPONSORSHIP/EXHIBITS',
        path: '/sponsorship',
        sections: [
            { sectionId: 'hero', props: { title: "Be a Sponsor or Partner", subtitle: `Partner with IEEE IATMSI-2027 to showcase your organization and support technological innovation` } },
            { sectionId: 'sponsorshipSection', props: {} }
        ]
    },

    // --- REGISTRATION ---
    {
        id: 'registration',
        title: 'REGISTRATION',
        path: '/registration',
        sections: [
            { sectionId: 'hero', props: { title: "Registration", subtitle: `Register for IATMSI-2027 and secure your participation in this premier international conference.` } },
            { sectionId: 'registrationSection', props: {} }
        ]
    },

    // --- IMPORTANT DATES ---
    {
        id: 'important-dates',
        title: 'IMPORTANT DATES',
        path: '/important-dates',
        sections: [
            { sectionId: 'hero', props: { title: "Important Dates", subtitle: `Mark your calendar with these key deadlines and dates for IATMSI-2027.` } },
            { sectionId: 'importantDatesSection', props: {} }
        ]
    },

    // --- CALL FOR REVIEWERS ---
    {
        id: 'call-for-reviewers',
        title: 'CALL FOR REVIEWERS',
        path: '/call-for-reviewers',
        sections: [
            { sectionId: 'hero', props: { title: "Call for Reviewers", subtitle: `Join the technical review committee for IATMSI-2027.` } },
            { sectionId: 'callForReviewersSection', props: {} }
        ]
    },

    // --- WORKSHOPS/TUTORIALS ---
    {
        id: 'workshops',
        title: 'WORKSHOPS/TUTORIALS',
        path: '/workshops',
        sections: [
            { sectionId: 'hero', props: { title: "Workshops & Tutorials", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Workshops & Tutorials' } }
        ]
    },

    // --- AWARDS ---
    {
        id: 'hardnovate',
        title: 'HARDNOVATE CONTEST',
        path: '/awards/hardnovate',
        sections: [
            { sectionId: 'hero', props: { title: "Hardnovate Contest", subtitle: `Innovate. Build. Showcase — National Hardware Innovation Contest` } },
            { sectionId: 'hardnovateSection', props: {} }
        ]
    },
    {
        id: 'rising-researcher',
        title: 'RISING RESEARCHER AWARD',
        path: '/awards/rising-researcher',
        sections: [
            { sectionId: 'hero', props: { title: "Rising Researcher Award", subtitle: `Recognizing early-career excellence across Engineering, Science, and Management` } },
            { sectionId: 'risingResearcherSection', props: {} }
        ]
    },
    {
        id: 'excellence-research',
        title: 'EXCELLENCE IN RESEARCH AWARD',
        path: '/awards/excellence',
        sections: [
            { sectionId: 'hero', props: { title: "Excellence in Research Award", subtitle: `Honoring mid-career & senior research leaders in Engineering, Science, and Management` } },
            { sectionId: 'excellenceResearchSection', props: {} }
        ]
    },
    {
        id: 'dissertation-award',
        title: 'IEEE DOCTORAL DISSERTATION AWARD',
        path: '/awards/dissertation',
        sections: [
            { sectionId: 'hero', props: { title: "IEEE Doctoral Dissertation Award", subtitle: `Exclusive research forum and award for recent and graduating PhD scholars` } },
            { sectionId: 'doctoralAwardSection', props: {} }
        ]
    },
    {
        id: 'doctoral-award-direct',
        title: 'IEEE DOCTORAL DISSERTATION AWARD',
        path: '/awards/doctoral',
        sections: [
            { sectionId: 'hero', props: { title: "IEEE Doctoral Dissertation Award", subtitle: `Exclusive research forum and award for recent and graduating PhD scholars` } },
            { sectionId: 'doctoralAwardSection', props: {} }
        ]
    },
    {
        id: 'simulation-excellence',
        title: 'SIMULATION EXCELLENCE AWARD',
        path: '/awards/simulation',
        sections: [
            { sectionId: 'hero', props: { title: "Simulation Excellence Award", subtitle: `Recognizing computational modeling, accuracy, and simulation validation excellence` } },
            { sectionId: 'simulationAwardSection', props: {} }
        ]
    },
    {
        id: 'best-paper',
        title: 'BEST PAPER AWARDS',
        path: '/awards/best-paper',
        sections: [
            { sectionId: 'hero', props: { title: "Best Paper Awards", subtitle: `Recognizing outstanding technical contributions and presentation excellence` } },
            { sectionId: 'bestPaperAwardSection', props: {} }
        ]
    },
    {
        id: 'fellowships',
        title: 'FELLOWSHIPS (TRAVEL/REGISTRATION GRANTS)',
        path: '/awards/fellowships',
        sections: [
            { sectionId: 'hero', props: { title: "IEEE IATMSI 2027 Fellowship Program", subtitle: `Registration waivers, accommodation, and travel grants for students and faculty` } },
            { sectionId: 'fellowshipsSection', props: {} }
        ]
    },

    // --- KEYNOTE AND INVITED TALKS ---
    {
        id: 'keynote',
        title: 'KEYNOTE AND INVITED TALKS',
        path: '/keynote',
        sections: [
            { sectionId: 'hero', props: { title: "Keynote & Invited Talks", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Keynote and Invited Talks' } }
        ]
    },

    // --- HELP ---
    {
        id: 'contact',
        title: 'CONTACT US',
        path: '/contact',
        sections: [
            { sectionId: 'hero', props: { title: "Contact Us", subtitle: `Get in touch with the IATMSI-2027 organizing committee.` } },
            { sectionId: 'contactSection', props: {} }
        ]
    },
    {
        id: 'faqs',
        title: 'FAQS',
        path: '/help/faqs',
        sections: [
            { sectionId: 'hero', props: { title: "Frequently Asked Questions", subtitle: `Find quick answers to common questions regarding paper submission, registration, certificates, and policies.` } },
            { sectionId: 'faqsSection', props: {} }
        ]
    },
    {
        id: 'faqs-direct',
        title: 'FAQS',
        path: '/faqs',
        sections: [
            { sectionId: 'hero', props: { title: "Frequently Asked Questions", subtitle: `Find quick answers to common questions regarding paper submission, registration, certificates, and policies.` } },
            { sectionId: 'faqsSection', props: {} }
        ]
    }
];
