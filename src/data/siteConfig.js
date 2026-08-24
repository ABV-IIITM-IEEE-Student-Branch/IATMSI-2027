// Site configuration - IATMSI-2027

export const siteConfig = {
  // Footer copyright year
  copyrightYear: 2027,

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
    conferenceLogo: 'https://lh3.googleusercontent.com/d/1dt8Et6kaR5nAmXBTq286s2AlE3AwQ2oH',
    partnerLogos: [
      { id: 'ieee-mp', url: 'https://lh3.googleusercontent.com/d/1V_wpkVHk196JZwxUX68JBYLceWWm-B4A', alt: 'IEEE Madhya Pradesh Section' },
      { id: 'abv-iiitm', url: 'https://lh3.googleusercontent.com/d/1pzDFkI_kSgO-rRu5D2T2dhzR_LJO8o04', alt: 'ABV-IIITM IEEE Student Branch' },
      { id: 'ieee-nepal', url: 'https://lh3.googleusercontent.com/d/1VM2PNLLvcSb2w2slRYbumIVUM1a1jmJ5', alt: 'IEEE Nepal Section' }
    ],
    instituteLogo: 'https://lh3.googleusercontent.com/d/1LNtqXOXfvsyYZaclWSc2QM-yzpxov1vw',
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

  // Footer acknowledgments (e.g., CMT disclaimer)
  acknowledgments: [
    'The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.',
  ],
};
