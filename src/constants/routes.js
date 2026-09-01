// Route constants for the application
export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    HISTORY: '/about/history',
    COMMITTEE: '/committee',
    VISITORS: '/visitors',
    TRACK_CHAIRS: '/about/track-chairs',
    
    // For Authors
    CAMERA_READY: '/authors/camera-ready',
    COPYRIGHT: '/authors/copyright',
    ORAL_GUIDELINES: '/authors/oral-guidelines',
    POSTER_GUIDELINES: '/authors/poster-guidelines',
    VENUE_TRAVEL: '/authors/venue-travel',
    GALLERY: '/authors/gallery',
    
    // Main Pages
    TRACKS: '/call-for-papers/tracks',
    PROGRAM: '/conference-program',
    PAPER_SUBMISSION: '/call-for-papers/paper-submission',
    SPONSORSHIP: '/sponsorship',
    REGISTRATION: '/registration',
    // Where Cashfree returns the payer after checkout, with ?order_id=…
    PAYMENT_STATUS: '/registration/payment',
    IMPORTANT_DATES: '/important-dates',
    CALL_FOR_REVIEWERS: '/call-for-reviewers',
    WORKSHOPS: '/workshops',
    
    // Awards & Grants
    HARDNOVATE: '/awards/hardnovate',
    RISING_RESEARCHER: '/awards/rising-researcher',
    EXCELLENCE_RESEARCH: '/awards/excellence',
    DOCTORAL_AWARD: '/awards/doctoral',
    SIMULATION_AWARD: '/awards/simulation',
    BEST_PAPER: '/awards/best-paper',
    FELLOWSHIPS: '/awards/fellowships',
    
    // Others & Help
    KEYNOTE: '/keynote',
    CONTACT: '/contact',
    FAQS: '/help/faqs',
};

// Navigation items in required order
export const NAV_ITEMS = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Paper Submission', path: ROUTES.PAPER_SUBMISSION },
    { label: 'Registration', path: ROUTES.REGISTRATION },
    { label: 'Committee', path: ROUTES.COMMITTEE },
    { label: 'Contact Us', path: ROUTES.CONTACT },
];
