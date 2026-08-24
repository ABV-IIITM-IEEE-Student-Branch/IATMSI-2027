import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { venueTravelData } from '../../data/venueTravelData';
import { venueTravelLabels } from '../../data/venueTravelData';

export default function VenueTravelKathmanduSection() {
    const {
        title,
        subtitle,
        venueInfo,
        weatherConditions,
        howToReach,
        attractions,
    } = venueTravelData;

    return (
        <SectionContainer dataSource="venueTravelData" id="venue-travel-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Venue Location Overview */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-4">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3 py-1 rounded-full shadow-xs inline-block mb-2">
                            {venueTravelLabels.conferenceVenue}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            {venueInfo.city}
                        </h3>
                    </div>
                    <span className="text-xs font-black text-[#722332] bg-[#722332]/10 px-3.5 py-1.5 rounded-full border border-[#C59B27]/30 self-start md:self-auto">
                        {venueInfo.name}
                    </span>
                </div>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {venueInfo.description}
                </p>

                {/* Google Maps Embed Frame */}
                <div className="rounded-xl overflow-hidden border border-[#C59B27]/40 shadow-sm h-72 md:h-80 w-full">
                    <iframe
                        title="Kathmandu Venue Map"
                        src={venueInfo.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            {/* 2. Weather Conditions */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                        {venueTravelLabels.weatherConditionsInKathmandu}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-600 font-semibold mt-1">
                        {weatherConditions.season}
                    </p>
                </div>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {weatherConditions.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {weatherConditions.highlights.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40">
                            <span className="text-xs font-extrabold uppercase text-[#722332] block mb-1">
                                {item.label}
                            </span>
                            <span className="text-sm font-black text-[#4A121A]">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. How to Reach Kathmandu */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {venueTravelLabels.howToReachKathmandu}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* By Air */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black uppercase text-[#FAF5EB] bg-[#722332] px-2.5 py-0.5 rounded-full">
                                {venueTravelLabels.byAir}
                            </span>
                            <h4 className="text-sm font-black text-[#4A121A]">{howToReach.byAir.title}</h4>
                        </div>
                        <p className="text-xs font-bold text-[#722332]">
                            {howToReach.byAir.airportName}
                        </p>
                        <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                            {howToReach.byAir.description}
                        </p>
                    </div>

                    {/* By Road */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black uppercase text-[#FAF5EB] bg-[#722332] px-2.5 py-0.5 rounded-full">
                                {venueTravelLabels.byRoad}
                            </span>
                            <h4 className="text-sm font-black text-[#4A121A]">{howToReach.byRoad.title}</h4>
                        </div>
                        <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed pt-2">
                            {howToReach.byRoad.description}
                        </p>
                    </div>
                </div>

                {/* Local Transport Options */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 space-y-3">
                    <h4 className="text-sm font-black text-[#722332] uppercase tracking-wider">
                        {howToReach.localTransport.title}
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-neutral-700 font-medium">
                        {howToReach.localTransport.options.map((opt, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                                <span className="w-2 h-2 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                                <span>{opt}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 4. Kathmandu Nearby Attractions */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                        {venueTravelLabels.kathmanduNearbyAttractions}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-600 font-semibold mt-1">
                        {venueTravelLabels.exploreUnescoWorldHeritageSitesHimalayan}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attractions.map((site) => (
                        <div
                            key={site.id}
                            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-xl overflow-hidden border border-[#C59B27]/40 shadow-xs hover:shadow-md hover:border-[#C59B27] transition-all flex flex-col justify-between group"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={site.image}
                                    alt={site.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <span className="absolute bottom-3 left-3 text-[11px] font-black text-white bg-[#722332]/90 px-2.5 py-0.5 rounded-full border border-[#C59B27]/40">
                                    {site.tagline}
                                </span>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-base font-black text-[#4A121A] group-hover:text-[#722332] transition-colors mb-1.5">
                                        {site.name}
                                    </h4>
                                    <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                                        {site.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
