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

  // Footer acknowledgments (e.g., CMT disclaimer)
  acknowledgments: [],
};

// Visitor's Count data
export const visitorCountData = {
  title: "Visitor's Count",
  totalLabel: "Total Visitors",
  baseCount: 48920,
  countries: [
    { id: 'in', code: 'in', name: 'India', flagUrl: 'https://flagcdn.com/w40/in.png', count: '28,450' },
    { id: 'np', code: 'np', name: 'Nepal', flagUrl: 'https://flagcdn.com/w40/np.png', count: '8,320' },
    { id: 'us', code: 'us', name: 'USA', flagUrl: 'https://flagcdn.com/w40/us.png', count: '4,150' },
    { id: 'de', code: 'de', name: 'Germany', flagUrl: 'https://flagcdn.com/w40/de.png', count: '2,640' },
    { id: 'gb', code: 'gb', name: 'UK', flagUrl: 'https://flagcdn.com/w40/gb.png', count: '1,980' },
    { id: 'jp', code: 'jp', name: 'Japan', flagUrl: 'https://flagcdn.com/w40/jp.png', count: '1,420' },
    { id: 'au', code: 'au', name: 'Australia', flagUrl: 'https://flagcdn.com/w40/au.png', count: '1,120' },
    { id: 'ca', code: 'ca', name: 'Canada', flagUrl: 'https://flagcdn.com/w40/ca.png', count: '840' },
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
