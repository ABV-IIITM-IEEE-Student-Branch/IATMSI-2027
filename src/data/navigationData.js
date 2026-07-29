// Navigation data - IATMSI-2027

export const footerQuickLinks = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'important-dates', label: 'Important Dates', path: '/important-dates' },
  { id: 'paper-submission', label: 'Submit a Paper', path: '/call-for-papers/paper-submission' },
  { id: 'registration', label: 'Registration', path: '/registration' },
];

export const navigationTree = [
  { id: 'home', label: 'Home', type: 'link', path: '/' },
  {
    id: 'about',
    label: 'About',
    type: 'dropdown',
    items: [
      { id: 'about-iatmsi', label: 'About IATMSI-2027', path: '/about' },
      { id: 'history', label: 'IATMSI History', path: '/about/history' },
      { id: 'committees', label: 'Committees', path: '/committee' },
      { id: 'track-chairs', label: 'Track Chairs', path: '/about/track-chairs' },
    ]
  },
  {
    id: 'call-for-papers',
    label: 'Call for Papers',
    type: 'dropdown',
    items: [
      { id: 'tracks', label: 'Conference Tracks', path: '/call-for-papers/tracks' },
      { id: 'paper-submission', label: 'Paper Submission', path: '/call-for-papers/paper-submission' },
      { id: 'important-dates', label: 'Important Dates', path: '/important-dates' },
      { id: 'call-for-reviewers', label: 'Call for Reviewers', path: '/call-for-reviewers' },
    ]
  },
  {
    id: 'program',
    label: 'Program',
    type: 'dropdown',
    items: [
      { id: 'conference-program', label: 'Conference Program', path: '/conference-program' },
      { id: 'keynote', label: 'Keynote & Invited Talks', path: '/keynote' },
      { id: 'workshops', label: 'Workshops & Tutorials', path: '/workshops' },
    ]
  },
  {
    id: 'authors-registration',
    label: 'Authors & Registration',
    type: 'dropdown',
    items: [
      { id: 'registration', label: 'Registration & Fees', path: '/registration' },
      { id: 'camera-ready', label: 'Camera Ready Submission', path: '/authors/camera-ready' },
      { id: 'copyright', label: 'IEEE E-Copyright', path: '/authors/copyright' },
      { id: 'oral-guidelines', label: 'Oral Presenter Guidelines', path: '/authors/oral-guidelines' },
      { id: 'poster-guidelines', label: 'Poster Presenter Guidelines', path: '/authors/poster-guidelines' },
    ]
  },
  {
    id: 'awards-sponsorship',
    label: 'Awards & Sponsorship',
    type: 'dropdown',
    items: [
      { id: 'hardnovate', label: 'Hardnovate Contest', path: '/awards/hardnovate' },
      { id: 'rising-researcher', label: 'Rising Researcher Award', path: '/awards/rising-researcher' },
      { id: 'excellence-research', label: 'Excellence in Research Award', path: '/awards/excellence' },
      { id: 'doctoral-dissertation', label: 'IEEE Doctoral Dissertation Award', path: '/awards/doctoral' },
      { id: 'best-paper', label: 'Best Paper Awards', path: '/awards/best-paper' },
      { id: 'fellowships', label: 'Travel/Registration Grants', path: '/awards/fellowships' },
      { id: 'sponsorship', label: 'Sponsorship & Exhibits', path: '/sponsorship' },
    ]
  },
  {
    id: 'venue-travel',
    label: 'Venue & Travel',
    type: 'dropdown',
    items: [
      { id: 'venue-travel-info', label: 'Venue & Travel Info', path: '/authors/venue-travel' },
      { id: 'travel-visa', label: 'Travel Visa Info', path: '/travel/visa' },
      { id: 'explore-gwalior', label: 'Explore Gwalior', path: '/travel/explore-gwalior' },
      { id: 'contact', label: 'Contact Us & FAQs', path: '/contact' },
    ]
  }
];
