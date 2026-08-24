// Tracks & Call for Papers data - IATMSI-2027

export const cfpData = {
    title: "Call for Papers",
    subtitle: "Submit your original research across our 6 thematic technical tracks for IATMSI-2027.",
    downloadCfpUrl: "https://iatmsi.iiitm.ac.in/wp-content/uploads/2026/07/CFP-IATMSI-2027_v1.pdf",
    theme: "Enabling the Change! Social Innovation for Sustainable Societies",
    introText: "IATMSI-2027 will serve as a dynamic platform, facilitating the convergence of researchers, academics, and industry practitioners. This event aims to foster the exchange of ideas and the sharing of recent research breakthroughs across a multitude of domains, including healthcare, agriculture, intelligent transportation, VLSI, and renewable electronics, along with their real-world applications. Under the theme “Enabling the Change! Social Innovation for Sustainable Societies,” this flagship conference is poised to deliver a comprehensive exploration of technology and management, emphasizing interdisciplinarity and quality. All accepted and presented papers will undergo submission for possible inclusion into IEEE Xplore subject to meeting IEEE Xplore’s scope and quality requirements. The conference’s scope is intentionally broad, encompassing an array of topics, which include but are not limited to:",
    xploreNote: "All accepted and presented papers will undergo submission for possible inclusion into IEEE Xplore subject to meeting IEEE Xplore’s scope and quality requirements."
};

export const tracks = [
    {
        id: 'track1',
        number: 1,
        title: 'Innovative Solutions for Healthcare, Biomedical Engineering and Sustainable Development',
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        description: [
            'Biomedical Instrumentation and Sensors',
            'Bioengineering, Bioinformatics, Infection biology, Environmental Biotechnology',
            'IoT and Soft Computing Applications in Healthcare',
            'AI, Blockchain and Cloud computing in Healthcare',
            'Healthcare Mobile and Web Applications & Telemedicine',
            'Accelerating Healthcare with Data and AI to Meet COVID-19 Challenges',
            'Ethics, Privacy, and Security in Healthcare',
            'Technology and Digital Health',
            'Other Related areas of Healthcare'
        ]
    },
    {
        id: 'track2',
        number: 2,
        title: 'Power, Control, Energy, and Intelligent Transportation Technologies',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        description: [
            'Intelligent Transportation, Internet of Vehicles',
            'Control, Communication and Automation Enabled Technologies',
            'Mechatronics and Robotics Technologies',
            'Blockchain, Inter-Vehicle Wireless Communications Technologies',
            'Electric and Hybrid-Electric Vehicles',
            'Power Systems and Smart Grids',
            'Nano-Fluids Dynamics for Industrial Applications',
            'Renewable and Sustainable Energy Solutions',
            'Smart Grid, Electric Vehicle, Battery Management System, Grid integration with RES, Electric actuators, Servo drives, and IoT interfaces',
            'Machine Vibration & Condition Monitoring',
            'Signal Processing for Machine Health Monitoring and RFID 3D Scanning',
            'Intelligent Reflecting Surfaces',
            'Reconfigurable Intelligent Surfaces',
            'Unmanned Aerial Vehicles/Drones Technology',
            'Other Related areas'
        ]
    },
    {
        id: 'track3',
        number: 3,
        title: 'AI, Data Science, IoT, and Computer Vision-Enabled Technologies',
        icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        description: [
            'Image Processing and Computational Intelligence in Agriculture',
            'Biotechnology Solutions for Sustainable Agriculture',
            'Applications of Image and Video Processing for Industrial Applications',
            'Machine Learning & AI Approaches to Manufacturing Applications',
            'High-Performance Computing, Cloud Computing, IoT based Technologies',
            'Machine Learning (ML), Deep Learning and Natural Language Processing (NLP)',
            'Data Privacy and Protection, Cyber Security, Surveillance and Fraud Detection',
            'Applications of AR/VR for Customer Engagement, Application of AI & ML in Management',
            'Other Related areas'
        ]
    },
    {
        id: 'track4',
        number: 4,
        title: 'Green, Flexible Electronics, VLSI, Communication, and Sensor-Based Technologies',
        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
        description: [
            'Wireless Sensor Networks, Advances in Sensor Technology',
            'Nanotechnology and Senor Based Solutions for Environment-Friendly Agriculture',
            'Green Technology and Rural Environmental Concerns',
            'Technology in Agriculture for Sustainable Development',
            'Hybrid Systems, Biosensors',
            'Optical and Wireless Communications; Technologies for 5G and beyond Communication',
            'Antenna Design',
            'VLSI Design, Embedded System and Emerging Technologies for the Social Change',
            'IC Design and Testing, Flexible Electronics and sustainable Technologies',
            'Communication Technologies and Networks, Digital Manufacturing',
            'Signal & Image Processing, LORA Functioning in Industrial Environment',
            'Mobile HMI for Electronic Products',
            'Nanotechnology Based Human-Centered Designs',
            'Other Related areas'
        ]
    },
    {
        id: 'track5',
        number: 5,
        title: 'IT-enabled Management for Social Innovation',
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        description: [
            'Entrepreneurship, Innovation, with Information Technology',
            'Technological Forecasting and Social Change',
            'Technology Roadmaps for Transition Management',
            'IT Enabled Marketing',
            'Consumer Technology',
            'Big Data Analytics',
            'Business Analytics',
            'Sustainable Manufacturing through IT Enabled Technologies',
            'Paradigm Shift in Human Resource Practices through the use of Digital Technologies',
            'Health Care Management for Healthy Society',
            'Technology-Enabled Financial Management',
            'Other Related areas'
        ]
    },
    {
        id: 'track6',
        number: 6,
        title: 'Quantum Technologies, Digital Twins, Industry 5.0 and Smart Manufacturing',
        icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
        description: [
            'Quantum Computing and Communications',
            'Quantum Sensing and Security',
            'Quantum AI and Emerging Applications',
            'Digital Twin Modeling and Simulation',
            'AI-Driven Digital Twins',
            'Smart Factories and Industry 5.0',
            'Human–Machine Collaboration',
            'Industrial IoT and Cyber-Physical Systems',
            'Intelligent Manufacturing and Automation',
            'Robotics and Autonomous Systems',
            'Additive Manufacturing and 3D Printing',
            'Smart Supply Chains and Logistics',
            'Industrial Data Analytics and AI',
            'Edge, Cloud, and Digital Manufacturing',
            'Sustainable and Green Manufacturing',
            'Industrial Cybersecurity and Resilience',
            'AR/VR/XR for Industrial Applications',
            'Advanced Monitoring, Control, and Maintenance',
            'Other Related areas'
        ]
    }
];

export const submissionCta = {
    title: "Ready to Submit Your Paper?",
    description: "Submit your camera-ready manuscript on Microsoft CMT. Final submission deadline is December 20, 2026.",
    buttonLabel: "Submit via CMT Portal"
};

// UI labels for this section — kept in data so every visible word is editable.
export const tracksGridLabels = {
    conferenceTheme: "Conference Theme",
    downloadOfficialCfpPdf: "Download Official CFP (.pdf)",
    ieeeXplorePublication: "IEEE Xplore Publication:",
    technicalTracksSubtopics: "Technical Tracks & Subtopics",
    topicsOfInterest: "Topics of Interest:",
};
