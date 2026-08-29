import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { visitorCountData } from '../../data/siteConfig';
import { useVisitorCounts } from '../../hooks/useVisitorCounts';

/**
 * The full country breakdown.
 *
 * The footer carries a short summary; everything lives here, so a site with
 * visitors from eighty countries doesn't grow an eighty-row footer.
 */
export default function VisitorStatsSection() {
    const { loaded, total, totalLabel, countries } = useVisitorCounts();

    return (
        <SectionContainer id="visitor-stats" dataSource="siteConfig">
            <SectionHeader
                title={visitorCountData.pageTitle}
                subtitle={visitorCountData.pageSubtitle}
                centered={true}
            />

            {/* Headline figures */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
                <div className="bg-[#FCF9F2] rounded-2xl border-2 border-[#C59B27]/40 p-5 text-center">
                    <p className="font-mono text-3xl md:text-4xl font-black text-[#4A121A]">
                        {totalLabel}
                    </p>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#722332] mt-1">
                        {visitorCountData.totalLabel}
                    </p>
                </div>
                <div className="bg-[#FCF9F2] rounded-2xl border-2 border-[#C59B27]/40 p-5 text-center">
                    <p className="font-mono text-3xl md:text-4xl font-black text-[#4A121A]">
                        {countries.length}
                    </p>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#722332] mt-1">
                        {visitorCountData.countriesLabel}
                    </p>
                </div>
            </div>

            {loaded && countries.length === 0 && (
                <p className="text-center text-sm text-neutral-600 italic">
                    {visitorCountData.emptyLabel}
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {countries.map((country, index) => (
                    <div
                        key={country.id}
                        className="flex items-center gap-3 bg-white rounded-xl border border-[#C59B27]/30 px-4 py-3 hover:border-[#C59B27] hover:shadow-md transition-all"
                    >
                        <span className="font-mono text-[11px] font-black text-[#C59B27] w-6 flex-shrink-0">
                            {visitorCountData.rankLabel}
                            {index + 1}
                        </span>
                        <img
                            src={country.flagUrl}
                            alt={country.name}
                            loading="lazy"
                            className="w-7 h-5 object-cover rounded-xs border border-neutral-300 flex-shrink-0"
                        />
                        <span className="flex-1 min-w-0 truncate text-sm font-bold text-[#4A121A]">
                            {country.name}
                        </span>
                        <span className="font-mono text-sm font-black text-[#722332] flex-shrink-0">
                            {country.countLabel}
                        </span>
                    </div>
                ))}
            </div>

            {/* Proportions read better as one bar than as a number per row. */}
            {countries.length > 1 && (
                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="flex h-3 rounded-full overflow-hidden border border-[#C59B27]/40">
                        {countries.slice(0, 12).map((country, index) => (
                            <span
                                key={country.id}
                                title={`${country.name} — ${country.countLabel}`}
                                style={{
                                    width: `${(country.count / total) * 100}%`,
                                    backgroundColor: index % 2 ? '#C59B27' : '#722332',
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </SectionContainer>
    );
}
