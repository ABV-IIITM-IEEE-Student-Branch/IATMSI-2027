// Hero data - IATMSI-2027

export const heroCarousel = [
    { id: 'hero-1', url: 'https://lh3.googleusercontent.com/d/1OoQlP6Ucwi-7L4Oe_0Sl8TCAu8urbm2w', alt: 'ABV-IIITM, Gwalior Campus' },
    { id: 'hero-2', url: 'https://lh3.googleusercontent.com/d/1AczsTl9ZAEC0j4xj6NSey5ml9YsMBISh', alt: 'Academic session' },
    { id: 'hero-3', url: 'https://lh3.googleusercontent.com/d/1sWTOeNuVDQxUhysQfr9DS6z9aJ5Lypj5', alt: 'Research presentation' },
    { id: 'hero-4', url: 'https://lh3.googleusercontent.com/d/1bDYy_ReDauwg-bWK_cXmcHeNcSC7EWVh', alt: 'ABV-IIITM, Gwalior' },
];

export const heroCta = {
    primary: {
        label: 'Register Now',
        route: '/registration',
    },
    secondary: {
        label: 'View Tracks',
        route: '/call-for-papers/tracks',
    }
};

export const heroTagline = '(Conference Record: #73195) Scopus Indexed, Hybrid Event, May 20-22, 2027';

// Wording around the hero's generated lines. The conference name and dates
// beside these come from conferenceData, so only the fixed words live here.
export const heroLabels = {
    welcomePrefix: 'Welcome to',
};
