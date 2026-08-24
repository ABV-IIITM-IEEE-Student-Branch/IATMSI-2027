// Travel data - IATMSI-2027

export const visaInfo = {
  intro: 'We look forward to welcoming you to **IATMSI-2027** at ABV-IIITM, Gwalior, India! To ensure a smooth visa application process, please follow the instructions below.',
  types: [
    {
      name: 'e-Conference Visa',
      description: 'Available for nationals of select countries. Apply online through the official Indian e-Visa portal.',
      eligibility: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
    },
    {
      name: 'Traditional Conference Visa',
      description: 'Required for those not eligible for an e-Conference Visa. Apply through the nearest Indian Embassy or Consulate.',
      eligibility: 'https://indianvisaonline.gov.in/',
    }
  ],
  requiredDocuments: [
    '**Valid Passport:** Must be valid for at least six months from your planned arrival date in India with at least two blank pages.',
    '**Visa Invitation Letter:** An official invitation letter from the IATMSI-2027 organizing committee. Fill out the visa letter request form (link below).',
    '**Clearance from Ministry of External Affairs (MEA):** Political clearance documents from MEA, Government of India (attached in your confirmation email).',
    '**Clearance from Ministry of Home Affairs (MHA):** Event clearance documents. Delegates from Afghanistan, Pakistan, Iraq, Sudan, foreigners of Pakistani origin, and stateless persons should contact iatmsi2027@iiitm.ac.in directly.',
    '**Passport-Sized Photo:** A recent colour photograph with a white background (specific dimensions as per portal requirements).',
    '**Accommodation Details:** Proof of hotel booking or conference accommodation at ABV-IIITM, Gwalior.',
    '**Flight Itinerary:** A copy of your return/onward flight itinerary.',
  ],
  invitationLetterInfo: 'To receive your official visa invitation letter, please email us at the address below with your full name, passport number, affiliation, and paper ID (if applicable).',
  applicationSteps: [
    'Visit the official e-Visa portal: indianvisaonline.gov.in',
    'Fill in the application form and upload the required documents.',
    'Pay the visa fee online using accepted international payment methods.',
    'You will receive your Electronic Travel Authorization (ETA) via email, typically within 3–5 business days.',
    'Print the ETA and carry it when travelling to India.'
  ],
  applicationStepsTraditional: [
    'Locate the nearest Indian Embassy or Consulate in your country.',
    'Download and complete the visa application form from indianvisaonline.gov.in',
    'Submit your application along with the required documents in person or via mail.',
    'Pay the visa fee as per embassy guidelines.',
    'Visa processing typically takes 2–3 weeks.',
  ],
  processingTime: '3-5 Days for e-Conference, 2-3 Weeks for Traditional.',
  warningNote: 'We strongly recommend applying for your visa at least **8–10 weeks** before the conference dates (May 20-22, 2027) to account for processing delays. For any assistance, contact us at iatmsi2027@iiitm.ac.in.',
};

export const venueInfo = {
  description: 'ABV-Indian Institute of Information Technology & Management\nMorena Link Road, Gwalior, Madhya Pradesh - 474015, India',
  directionsFromAirport: {
    name: 'Rajmata Vijaya Raje Scindia Airport (GWL)',
    distance: '~10 km',
    time: '~25 min',
    steps: [
        'The airport is well-connected to major Indian cities including Delhi, Mumbai, and Bengaluru.',
        'Pre-paid taxis and auto-rickshaws are available at the airport exit.',
        'App-based cabs (Ola, Uber) can be booked directly from the terminal.',
        'Head towards Morena Link Road - the institute campus is located along this road.',
    ],
  },
  directionsFromRailway: {
    name: 'Gwalior Junction Railway Station',
    distance: '~5 km',
    time: '~15 min',
    steps: [
        'Gwalior Junction is a major stop on the Delhi–Chennai and Delhi–Mumbai rail corridors.',
        'Auto-rickshaws are readily available outside the station (fare: ₹50–70 to campus).',
        'Ola/Uber cabs can also be booked from the station.',
        'Take the road towards Morena; ABV-IIITM campus is located on Morena Link Road, about 5 km north.',
    ],
  },
  fromMajorCities: [
    {
      city: 'Delhi',
      distance: '320 km',
      time: '3.5 - 4 hours',
      mode: 'Train (Shatabdi/Vande Bharat) or Road (NH 44)',
    },
    {
      city: 'Agra',
      distance: '120 km',
      time: '2 hours',
      mode: 'Train or Road',
    },
    {
      city: 'Jhansi',
      distance: '100 km',
      time: '1.5 - 2 hours',
      mode: 'Train or Road',
    }
  ],
  localTransportTips: [
      '**Auto-Rickshaws:** Widely available. Negotiate fare before boarding or use prepaid booths if available.',
      '**App Cabs:** Ola and Uber operate in Gwalior and are recommended for transparent pricing.',
      '**City Buses:** Public buses run on major routes but may not be convenient with heavy luggage.',
      '**Language:** Hindi is primarily spoken. Basic English is understood by most cab drivers.',
  ],
};

export const exploreIntro = 'Gwalior, known as the **City of Music** and one of the most historic cities in central India, offers conference attendees a chance to explore centuries of royal heritage, stunning architecture, and vibrant culture - all within easy reach of the ABV-IIITM campus.';

export const exploreClosingTitle = 'Need help planning your visit?';

export const exploreClosingNote = 'The conference organizing committee will be happy to assist you with local travel recommendations during the event. An information desk will be available at the registration counter.';

export const attractions = [
    {
        id: 'gwalior-fort',
        name: 'Gwalior Fort',
        tagline: 'The Pearl Amongst Fortresses',
        description: 'One of India\'s most imposing hill forts, Gwalior Fort sits atop a rocky massif rising 100 meters above the city. Its massive walls enclose palaces, temples, and water tanks. The Man Mandir Palace, adorned with vibrant ceramic tiles, and the ancient Chaturbhuj Temple - home to the second oldest recorded use of the number zero - are among its highlights.',
        highlight: 'Must-visit • UNESCO Tentative List',
        image: 'https://www.indiaholidaymall.com/images/blog/Gwalior-Fort.jpg',
    },
    {
        id: 'jai-vilas-palace',
        name: 'Jai Vilas Palace & Scindia Museum',
        tagline: 'Royal Grandeur & Living History',
        description: 'This magnificent 19th-century palace, still partially occupied by the Scindia royal family, blends Italian, Tuscan, and Corinthian architecture. The Scindia Museum within houses the world\'s largest pair of chandeliers, a silver toy train that served after-dinner drinks, and an extensive collection of royal artefacts.',
        highlight: 'Entry fee applies • Photography restricted in museum',
        image: 'https://www.fabhotels.com/blog/wp-content/uploads/2019/06/Jai-Vilas-Palace_600.jpg',
    },
    {
        id: 'teli-ka-mandir',
        name: 'Teli Ka Mandir',
        tagline: 'Architectural Marvel of the 9th Century',
        description: 'Standing at 30 meters, Teli Ka Mandir is the tallest structure within Gwalior Fort. This unique temple blends Dravidian and Indo-Aryan architectural styles, with a rectangular sanctum and an ornate roof that resembles South Indian temples. Its intricate carvings of flying couples, river goddesses, and serpentine motifs are remarkable.',
        highlight: 'Inside Gwalior Fort • Free entry with fort ticket',
        image: 'https://hblimg.mmtcdn.com/content/hubble/img/gwalior/mmt/activities/t_trp/m_activities_gwalior_teli_ka_mandir_l_391_588.jpg',
    },
    {
        id: 'tomb-of-tansen',
        name: 'Tomb of Tansen',
        tagline: 'Tribute to a Musical Legend',
        description: 'The memorial of Miyan Tansen, one of the greatest musicians in Indian history and one of the "Nine Gems" of Emperor Akbar\'s court. The tomb is set in a serene garden surrounded by tamarind trees. The annual Tansen Music Festival, held every November-December, attracts classical musicians from across India.',
        highlight: 'Cultural landmark • Near Ghaus Mohammad\'s Tomb',
        image: 'https://www.trawell.in/admin/images/upload/169220756Gwalior_Mohammed_Ghaus_Tomb_Main.jpg',
    },
    {
        id: 'sun-temple',
        name: 'Sun Temple (Surya Mandir)',
        tagline: 'Modern Marvel Inspired by Konark',
        description: 'Built in the late 20th century, this striking temple is inspired by the iconic Konark Sun Temple of Odisha. Dedicated to the Sun God, it stands on a lotus-shaped base surrounded by smaller chariots. The red sandstone structure and intricate carvings make it a popular spot for both devotees and architecture enthusiasts.',
        highlight: 'Open daily • Sunrise visits recommended',
        image: 'https://www.trawell.in/admin/images/upload/169220550Gwalior_Sun_Temple_Main.jpg',
    },
    {
        id: 'gujari-mahal',
        name: 'Gujari Mahal - Archaeological Museum',
        tagline: 'Treasures from the Heart of India',
        description: 'Originally built by Raja Man Singh Tomar for his Gujar queen Mrignayani, this 15th-century palace now serves as the State Archaeological Museum. Its collection includes rare sculptures, inscriptions, and the famous Shalabhanjika - a graceful tree nymph sculpture that is one of the finest examples of Indian sculptural art.',
        highlight: 'At the base of Gwalior Fort • Entry fee applies',
        image: 'https://www.madhyapradeshdmc.com/images/gujari-mahal-01.webp',
    },
];
