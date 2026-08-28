// Hero data - IATMSI-2027

export const heroCarousel = [
    { id: 'hero-1', url: 'https://lh3.googleusercontent.com/d/1jfjqS4ydZoXdrQ86N7tw__DXNo1Bfl68', alt: 'Pashupatinath Temple, Kathmandu' },
    { id: 'hero-2', url: 'https://lh3.googleusercontent.com/d/1G1lQQFS0ZSucuc_odQN1KudHWJbUe-Pn', alt: 'Patan Durbar Square, Kathmandu Valley' },
    { id: 'hero-3', url: 'https://lh3.googleusercontent.com/d/1esFxz0CH5lkthUsye_01jEdzsN2dHpCY', alt: 'Swayambhunath Stupa, Kathmandu' },
];

export const heroCta = {
    primary: {
        label: 'Call for Papers',
        route: '/call-for-papers/tracks',
        isExternal: false,
    },
    secondary: {
        label: 'Submit Paper',
        route: 'https://cmt3.research.microsoft.com/IATMSI2027/Submission/Index',
        isExternal: true,
    }
};

export const heroTagline = '(Conference Record: #73195) Scopus Indexed, Hybrid Event, May 20-22, 2027';

// Wording around the hero's generated lines. The conference name and dates
// beside these come from conferenceData, so only the fixed words live here.
export const heroLabels = {
    welcomePrefix: 'Welcome to',
};
