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
      { id: 'committees', label: 'IATMSI Committees', path: '/committee' },
      { id: 'track-chairs', label: 'Track Chairs', path: '/about/track-chairs' },
    ]
  },
  {
    id: 'for-authors',
    label: 'For Authors',
    type: 'dropdown',
    items: [
      { id: 'camera-ready', label: 'Instructions for Camera Ready Paper Submission', path: '/authors/camera-ready' },
      { id: 'copyright', label: 'Instructions for IEEE E-Copyright Submission', path: '/authors/copyright' },
      { id: 'oral-guidelines', label: 'Oral Presenter\'s Guidelines', path: '/authors/oral-guidelines' },
      { id: 'poster-guidelines', label: 'Poster Presenter\'s Guidelines', path: '/authors/poster-guidelines' },
      { id: 'venue-travel', label: 'Venue/Travel', path: '/authors/venue-travel' },
      { id: 'gallery', label: 'Gallery', path: '/authors/gallery' },
    ]
  },
  { id: 'call-for-papers', label: 'Call for Papers', type: 'link', path: '/call-for-papers/tracks' },
  { id: 'conference-program', label: 'Conference Program', type: 'link', path: '/conference-program' },
  { id: 'paper-submission', label: 'Paper Submission', type: 'link', path: '/call-for-papers/paper-submission' },
  { id: 'sponsorship', label: 'Sponsorship/Exhibits', type: 'link', path: '/sponsorship' },
  { id: 'registration', label: 'Registration', type: 'link', path: '/registration' },
  { id: 'important-dates', label: 'Important Dates', type: 'link', path: '/important-dates' },
  { id: 'call-for-reviewers', label: 'Call for Reviewers', type: 'link', path: '/call-for-reviewers' },
  { id: 'workshops', label: 'Workshops/Tutorials', type: 'link', path: '/workshops' },
  {
    id: 'awards',
    label: 'Awards/Grants',
    type: 'dropdown',
    items: [
      { id: 'hardnovate', label: 'Hardnovate Contest', path: '/awards/hardnovate' },
      { id: 'rising-researcher', label: 'Rising Researcher Award', path: '/awards/rising-researcher' },
      { id: 'excellence-research', label: 'Excellence in Research Award', path: '/awards/excellence' },
      { id: 'doctoral-dissertation', label: 'IEEE Doctoral Dissertation Award', path: '/awards/doctoral' },
      { id: 'simulation-excellence', label: 'Simulation Excellence Award', path: '/awards/simulation' },
      { id: 'best-paper', label: 'Best Paper Awards', path: '/awards/best-paper' },
      { id: 'fellowships', label: 'Fellowships (Travel/Registration Grants)', path: '/awards/fellowships' },
    ]
  },
  { id: 'keynote', label: 'Keynote and Invited Talks', type: 'link', path: '/keynote' },
  {
    id: 'help',
    label: 'Help',
    type: 'dropdown',
    items: [
      { id: 'contact', label: 'Contact Us', path: '/contact' },
      { id: 'faqs', label: 'FAQs', path: '/help/faqs' },
    ]
  },
  {
    id: 'extra',
    label: 'Extra',
    type: 'dropdown',
    items: [
      { id: 'travel-visa', label: 'Travel Visa Info', path: '/travel/visa' },
      { id: 'explore-gwalior', label: 'Explore Gwalior', path: '/travel/explore-gwalior' },
    ]
  }
];
