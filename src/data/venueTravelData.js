// Venue and Travel data for Kathmandu, Nepal - IATMSI-2027

export const venueTravelData = {
    title: "Venue & Travel Information - Kathmandu, Nepal",
    subtitle: "Complete guide on reaching Kathmandu, venue location, expected weather conditions, and UNESCO World Heritage attractions around Kathmandu Valley.",

    venueInfo: {
        city: "Kathmandu, Nepal",
        name: "Tribhuvan University & Associated Conference Facilities",
        address: "Kathmandu Valley, Nepal",
        description: "Kathmandu, the historic capital city of Nepal, sits in a bowl-shaped valley surrounded by the Himalayan mountains. Renowned for its rich cultural heritage, ancient temples, and vibrant atmosphere, Kathmandu offers a memorable blend of academic exchange and historic exploration.",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.026410291992!2d85.2750!3d27.6811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18151c8413b5%3A0xc3412586dfc9eb8f!2sTribhuvan%20University!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
    },

    weatherConditions: {
        season: "Spring / Early Season Climate",
        avgTemp: "18°C – 25°C (64°F – 77°F)",
        eveningTemp: "10°C – 14°C (Cool evenings)",
        description: "Kathmandu enjoys very pleasant and mild weather during the conference period. Days are generally warm and sunny with clear blue skies offering views of surrounding peaks, while evenings can be cool. Light layers and a jacket for the evening are recommended.",
        highlights: [
            { label: "Daytime Temperature", value: "20°C – 24°C (Pleasant & Sunny)" },
            { label: "Night Temperature", value: "10°C – 14°C (Cool / Crisp)" },
            { label: "Humidity", value: "Moderate & Comfortable" },
            { label: "Clothing Recommended", value: "Smart Casuals with Light Jacket for evenings" }
        ]
    },

    howToReach: {
        byAir: {
            title: "By Air (Flight)",
            airportName: "Tribhuvan International Airport (KTM), Kathmandu",
            distanceToVenue: "Approx. 8–10 km from major city centers and venue",
            description: "Tribhuvan International Airport (KTM) is Nepal's primary international gateway, offering direct and connecting flights from major cities across Asia, the Middle East, Europe, and North America. Pre-paid taxis and hotel transfer services are readily available at the airport arrivals terminal."
        },
        byRoad: {
            title: "By Road / Overland Transit",
            description: "For delegates traveling from India, major border transit points like Sonauli (Uttar Pradesh), Raxaul (Bihar), and Kakarbhitta (West Bengal) offer tourist bus and private vehicle connectivity to Kathmandu."
        },
        localTransport: {
            title: "Local Transport in Kathmandu",
            options: [
                "Pre-paid Airport Taxis: Available directly outside the international arrivals hall.",
                "Ride-Hailing Apps: InDrive and Pathao are widely used across Kathmandu for affordable taxi and motorbike rides.",
                "Hotel Transfers: Many partner hotels offer dedicated airport pick-up and drop-off services upon request."
            ]
        }
    },

    attractions: [
        {
            id: 1,
            name: "Pashupatinath Temple",
            tagline: "Sacred UNESCO World Heritage Hindu Temple",
            description: "One of the most sacred Hindu temple complexes in the world, located on the banks of the Bagmati River in Kathmandu.",
            image: "https://lh3.googleusercontent.com/d/1jfjqS4ydZoXdrQ86N7tw__DXNo1Bfl68"
        },
        {
            id: 2,
            name: "Swayambhunath Stupa (Monkey Temple)",
            tagline: "Iconic Hilltop Stupa with Panoramic City Views",
            description: "An ancient religious complex atop a hill in the Kathmandu Valley, offering breathtaking 360-degree views of Kathmandu.",
            image: "https://lh3.googleusercontent.com/d/1esFxz0CH5lkthUsye_01jEdzsN2dHpCY"
        },
        {
            id: 3,
            name: "Boudhanath Stupa",
            tagline: "One of the Largest Spherical Stupas in the World",
            description: "A massive mandala-style stupa and a central hub of Tibetan Buddhism in Nepal, surrounded by vibrant cafes and monasteries.",
            image: "https://lh3.googleusercontent.com/d/1WKdDNnMJERGax-sOWbcUMVoeVoHOTNnj"
        },
        {
            id: 4,
            name: "Kathmandu Durbar Square",
            tagline: "Historic Royal Palace & Pagoda Architecture",
            description: "The ancient royal palace square of the Malla kings, featuring intricately carved wooden temples and the Kumari Ghar.",
            image: "https://lh3.googleusercontent.com/d/1uOSHNkoTaoVXDUTux0gd0jA_9KmjjPJD"
        },
        {
            id: 5,
            name: "Patan Durbar Square & Museum",
            tagline: "City of Fine Arts & Newari Craftsmanship",
            description: "Situated in Lalitpur, famous for its magnificent Newari architecture, bronze sculptures, and rich artistic traditions.",
            image: "https://lh3.googleusercontent.com/d/1G1lQQFS0ZSucuc_odQN1KudHWJbUe-Pn"
        },
        {
            id: 6,
            name: "Nagarkot Himalayan Viewpoint",
            tagline: "Scenic Sunrise Point over the Himalayan Range",
            description: "Located 32 km east of Kathmandu, famous for stunning panoramic sunrise views over Mt. Everest and Himalayan peaks.",
            image: "https://lh3.googleusercontent.com/d/1MgNczbj5uoSIBGLGcYWM9mjVgRMUOwJ5"
        }
    ]
};

// UI labels for this section — kept in data so every visible word is editable.
export const venueTravelLabels = {
    conferenceVenue: "Conference Venue",
    weatherConditionsInKathmandu: "Weather Conditions in Kathmandu",
    howToReachKathmandu: "How to Reach Kathmandu",
    byAir: "By Air",
    byRoad: "By Road",
    kathmanduNearbyAttractions: "Kathmandu Nearby Attractions",
    exploreUnescoWorldHeritageSitesHimalayan: "Explore UNESCO World Heritage Sites & Himalayan vistas across Kathmandu Valley.",
};
