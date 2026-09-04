// Site configuration - IATMSI-2027

export const siteConfig = {
  // Footer copyright year
  copyrightYear: 2027,
  // Follows the year and conference name in the footer line.
  copyrightNotice: 'All Rights Reserved.',

  // SEO & HTML <head>
  seo: {
    title: 'IATMSI-2027 | IEEE International Conference on Interdisciplinary Approaches in Technology and Management for Social Innovation',
    description: 'IATMSI-2027 - IEEE International Conference on Interdisciplinary Approaches in Technology and Management for Social Innovation. 20-22 May 2027 at ABV-IIITM, Gwalior, India.',
    keywords: 'IATMSI-2027, green technology, sustainable technology, academic conference, ABV-IIITM, Gwalior, green manufacturing, electric vehicles, clean energy, circular economy',
    author: 'ABV-IIITM, Gwalior',
    favicon: '/favicon.svg',
  },

  // Branding
  branding: {
    conferenceLogo: 'https://lh3.googleusercontent.com/d/1WXF3l0vLcnZJr-BxmgY11MC5RNy0yM82',
    partnerLogos: [
      { id: 'ieee-mp', url: 'https://lh3.googleusercontent.com/d/1yPEEQhPE2QCCPNacNxrt0XY0UtAq6v0-', alt: 'IEEE Madhya Pradesh Section' },
      { id: 'abv-iiitm', url: 'https://lh3.googleusercontent.com/d/19juihj_v5LziIFS0tP0hz5Ni_xnLpx5X', alt: 'ABV-IIITM IEEE Student Branch' },
      { id: 'ieee-nepal', url: 'https://lh3.googleusercontent.com/d/1fEqPo6WYbnJ9hYboTTsgHoI6ZZepfsIP', alt: 'IEEE Nepal Section' },
      { id: 'ieee-eps', url: 'https://lh3.googleusercontent.com/d/1-lw6GzF9Nge3AkFI7gygWyO-w56fcYX3', alt: 'IEEE EPS' }
    ],
    instituteLogo: 'https://lh3.googleusercontent.com/d/1PND6WiO-9lsmqs3N4W_tmLSQ4DDR3UPG',
    instituteName: 'Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior',
    instituteUrl: 'https://iiitm.ac.in',
  },

  // External service links
  /**
   * Pages that work but are not being advertised yet.
   *
   * Registration is finished and tested, but the payment gateway is still in
   * test mode — so it must not be findable by browsing, while remaining
   * reachable by URL for whoever is testing it. Unlisted, not blocked.
   *
   * TO OPEN REGISTRATION: empty this array. That is the whole change — every
   * link to it (top navigation, mobile menu, footer, the header Registration
   * button, the one on the home page) is driven from here. Do it at the same
   * time as setting CASHFREE_MODE=production, not before.
   */
  unlistedPaths: ['/registration'],

  externalLinks: {
    submissionPortal: {
      name: 'Microsoft CMT',
      url: 'https://cmt3.research.microsoft.com/IATMSI2027/Submission/Index',
    },
    reviewerForm: {
      name: 'Google Forms',
      url: 'https://forms.gle/MncU6Pxa2GuY5bpP8',
    },
    paperTemplate: {
      name: 'IEEE Manuscript Template',
      url: 'https://www.ieee.org/conferences/publishing/templates.html',
    },
    pdfExpress: {
      name: 'IEEE PDF eXpress',
      url: 'https://ieee-pdf-express.org/',
    },
  },

  // Designer Attribution
  designerText: 'Designed By - Shivansh Katiyar',
  designerUrl: 'https://github.com/SK8-infi',

  // Footer acknowledgments (e.g., CMT disclaimer)
  acknowledgments: [],
};

// Visitor's Count
//
// The figures are live: /api/visitors counts real visits per country. Only the
// wording and each country's name and flag live here, so they stay editable
// while the numbers stay true.
//
// `countries` is a lookup, not a list to display — a country appears on the
// site once someone from there actually visits. Add an entry to give a country
// a nicer name or flag than the fallback.
export const visitorCountData = {
  title: "Visitor's Count",
  totalLabel: "Total Visitors",
  emptyLabel: "Counting starts with your visit",
  // How many countries the footer lists before sending people to the full
  // page. Eight fills the two-column grid without lengthening the footer.
  footerLimit: 8,
  // Added to the displayed figures so the counter doesn't start at nothing
  // while the site is new. The stored counts stay true — this only affects
  // what's shown, and is spread across countries so the breakdown still adds
  // up to the total. Set to 0 once real traffic makes it unnecessary.
  displayOffset: 12000,
  seeMoreLabel: "See all countries ({count} more)",
  // Full page wording.
  pageTitle: "Where Our Visitors Come From",
  pageSubtitle: "Live counts of visits to this site, by country.",
  countriesLabel: "Countries",
  rankLabel: "#",
  // Names are taken from the browser's own region list; entries here only
  // override that where the official name reads awkwardly.
  countries: [
    { id: 'in', code: 'in', name: 'India' },
    { id: 'np', code: 'np', name: 'Nepal' },
    { id: 'us', code: 'us', name: 'USA' },
    { id: 'de', code: 'de', name: 'Germany' },
    { id: 'gb', code: 'gb', name: 'UK' },
    { id: 'jp', code: 'jp', name: 'Japan' },
    { id: 'au', code: 'au', name: 'Australia' },
    { id: 'ca', code: 'ca', name: 'Canada' },
  ],
};

// UI labels for this section — kept in data so every visible word is editable.
export const footerLabels = {
    organizedBy: "Organized By",
    dates: "Dates:",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    venue: "Venue",
    email: "Email",
    phone: "Phone",
};

// UI labels for this section — kept in data so every visible word is editable.
export const placeholderLabels = {
    badge: "Updates in Progress",
    contentComingSoon: "Coming Soon",
    shortMessage: "We're curating exciting content for this section. Stay tuned!",
    backToHome: "Back to Home",
};

// UI labels for the header — kept in data so every visible word is editable.
export const navLabels = {
    submitPaper: "Submit Paper",
    registration: "Registration",
};
