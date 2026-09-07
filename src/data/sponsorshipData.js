// Sponsorship & Exhibits data - IATMSI-2027

export const sponsorshipData = {
    title: "Be a Sponsor or Partner",
    subtitle: "Partner with IEEE IATMSI-2027 to showcase your organization, connect with leading global researchers, and foster technological innovation.",

    introText: "IEEE IATMSI 2027 offers exceptional sponsorship and partnership opportunities for corporate organizations, academic institutions, and industry leaders to gain global visibility, network with key decision makers, and support social innovation and technology research.",

    // Both on Drive rather than /wp-content, and both using the
    // `uc?export=download` form so they download rather than open in a viewer.
    // Same reasoning as the templates in oral/posterGuidelinesData.js.
    documents: [
        {
            title: "IATMSI-2027 Sponsorship Flyer",
            description: "Quick overview of sponsorship opportunities, branding packages, and exhibitor benefits.",
            url: "https://drive.google.com/uc?export=download&id=1VVYqANVdWpkCtTzT1mSlSGuUknGe_P6K"
        },
        {
            title: "IATMSI-2027 Sponsorship Brochure",
            description: "Comprehensive breakdown of sponsorship tiers, booth inclusions, and advertisement packages.",
            url: "https://drive.google.com/uc?export=download&id=1VxfHpaF0MbHBCVHeipmBcIoS6XLB3qdf"
        }
    ],

    queriesIntro: "Any queries or discussions related to sponsorship or corporate partnership can be addressed to our dedicated sponsorship committee:",

    contactEmails: [
        "iatmsi@iiitm.ac.in"
    ],

    committee: [
        {
            role: "Industry Relations & Sponsorship Committee Chair",
            name: "Dr. Rakesh Chowdhury",
            designation: "Chair, Industry Relations & Sponsorship Committee",
            affiliation: "ABV-IIITM Gwalior, India",
            phone: "+91-9576490959",
            email: "bjana@iiitm.ac.in"
        },
        {
            role: "Conference Chair",
            name: "Dr. Somesh Kumar",
            designation: "Conference Chair, IEEE IATMSI-2027",
            affiliation: "ABV-IIITM Gwalior, India",
            phone: "+91-8962280784",
            email: "iatmsi@iiitm.ac.in"
        }
    ]
};

// UI labels for this section — kept in data so every visible word is editable.
export const sponsorshipLabels = {
    partnershipOpportunities: "Partnership Opportunities",
    sponsorshipFlyerBrochure: "Sponsorship Flyer & Brochure",
    downloadDocumentPdf: "Download Document (.pdf)",
    sponsorshipPartnershipQueries: "Sponsorship & Partnership Queries",
    sponsorshipChairsContacts: "Sponsorship Chairs & Contacts",
};
