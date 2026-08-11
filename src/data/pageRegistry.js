// Page Registry - IATMSI-2027

export const sectionManifest = [
    { id: 'hero', component: 'HeroSection', requiresData: ['heroData'] },
    { id: 'intro', component: 'IntroSection', requiresData: ['conferenceData'] },
    { id: 'aboutInstitute', component: 'AboutInstitute', requiresData: ['conferenceData'] },
    { id: 'aboutFullSection', component: 'AboutFullSection', requiresData: ['conferenceData'] },
    { id: 'historySection', component: 'HistorySection', requiresData: ['historyData'] },
    { id: 'trackChairsSection', component: 'TrackChairsSection', requiresData: ['trackChairsData'] },
    { id: 'cameraReadySection', component: 'CameraReadySection', requiresData: ['cameraReadyData'] },
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
            { sectionId: 'programScheduleSection', props: {} },
            { sectionId: 'callForPapersSection', props: {} },
            { sectionId: 'themeTracksSection', props: {} },
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
            { sectionId: 'hero', props: { title: "IEEE e-Copyright", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'IEEE e-Copyright' } }
        ]
    },
    {
        id: 'oral-guidelines',
        title: 'ORAL PRESENTER\'S GUIDELINES',
        path: '/authors/oral-guidelines',
        sections: [
            { sectionId: 'hero', props: { title: "Oral Presenter's Guidelines", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: "Oral Presenter's Guidelines" } }
        ]
    },
    {
        id: 'poster-guidelines',
        title: 'POSTER PRESENTER\'S GUIDELINES',
        path: '/authors/poster-guidelines',
        sections: [
            { sectionId: 'hero', props: { title: "Poster Presenter's Guidelines", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: "Poster Presenter's Guidelines" } }
        ]
    },
    {
        id: 'venue-travel',
        title: 'VENUE/TRAVEL',
        path: '/authors/venue-travel',
        sections: [
            { sectionId: 'hero', props: { title: "Venue & Travel", subtitle: `Directions, Visa Information, and Exploring Gwalior` } },
            { sectionId: 'venueDirectionsSection', props: {} },
            { sectionId: 'travelVisaSection', props: {} },
            { sectionId: 'exploreGwaliorSection', props: {} }
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
            { sectionId: 'hero', props: { title: "Sponsorship & Exhibits", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Sponsorship and Exhibits' } }
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
            { sectionId: 'hero', props: { title: "Call for Reviewers", subtitle: `` } },
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
            { sectionId: 'placeholder', props: { title: 'Workshops and Tutorials' } }
        ]
    },

    // --- AWARDS/GRANTS ---
    {
        id: 'hardnovate',
        title: 'HARDNOVATE CONTEST',
        path: '/awards/hardnovate',
        sections: [
            { sectionId: 'hero', props: { title: "Hardnovate Contest", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Hardnovate Contest' } }
        ]
    },
    {
        id: 'rising-researcher',
        title: 'RISING RESEARCHER AWARD',
        path: '/awards/rising-researcher',
        sections: [
            { sectionId: 'hero', props: { title: "Rising Researcher Award", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Rising Researcher Award' } }
        ]
    },
    {
        id: 'excellence-research',
        title: 'EXCELLENCE IN RESEARCH AWARD',
        path: '/awards/excellence',
        sections: [
            { sectionId: 'hero', props: { title: "Excellence in Research Award", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Excellence in Research Award' } }
        ]
    },
    {
        id: 'doctoral-dissertation',
        title: 'IEEE DOCTORAL DISSERTATION AWARD',
        path: '/awards/doctoral',
        sections: [
            { sectionId: 'hero', props: { title: "IEEE Doctoral Dissertation Award", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'IEEE Doctoral Dissertation Award' } }
        ]
    },
    {
        id: 'simulation-excellence',
        title: 'SIMULATION EXCELLENCE AWARD',
        path: '/awards/simulation',
        sections: [
            { sectionId: 'hero', props: { title: "Simulation Excellence Award", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Simulation Excellence Award' } }
        ]
    },
    {
        id: 'best-paper',
        title: 'BEST PAPER AWARDS',
        path: '/awards/best-paper',
        sections: [
            { sectionId: 'hero', props: { title: "Best Paper Awards", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Best Paper Awards' } }
        ]
    },
    {
        id: 'fellowships',
        title: 'FELLOWSHIPS (TRAVEL/REGISTRATION GRANTS)',
        path: '/awards/fellowships',
        sections: [
            { sectionId: 'hero', props: { title: "Fellowships & Grants", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'Fellowships and Grants' } }
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
            { sectionId: 'hero', props: { title: "Frequently Asked Questions", subtitle: `` } },
            { sectionId: 'placeholder', props: { title: 'FAQs' } }
        ]
    },

    // --- EXTRA ---
    {
        id: 'travel-visa',
        title: 'Travel Visa Information (Old)',
        path: '/travel/visa',
        sections: [
            { sectionId: 'hero', props: { title: "Travel Visa Information", subtitle: `Complete visa guidance for IATMSI-2027 international attendees` } },
            { sectionId: 'travelVisaSection', props: {} }
        ]
    },
    {
        id: 'explore-gwalior',
        title: 'Explore Gwalior (Old)',
        path: '/travel/explore-gwalior',
        sections: [
            { sectionId: 'hero', props: { title: "Explore Gwalior", subtitle: `Discover the rich heritage and culture of the City of Music` } },
            { sectionId: 'exploreGwaliorSection', props: {} }
        ]
    },
    {
        id: 'venue-directions',
        title: 'Venue & Directions (Old)',
        path: '/travel/venue',
        sections: [
            { sectionId: 'hero', props: { title: "Venue & Directions", subtitle: `How to reach ABV-IIITM, Gwalior for IATMSI-2027` } },
            { sectionId: 'venueDirectionsSection', props: {} }
        ]
    }
];
