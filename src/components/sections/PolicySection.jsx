import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { termsData, refundsData } from '../../data/policyData';

const POLICIES = {
    terms: termsData,
    refunds: refundsData,
};

/**
 * A policy page: heading, then numbered sections of prose.
 *
 * One component for both, because they differ only in their words. Which one
 * to render comes from the page registry as a `policy` prop.
 */
export default function PolicySection({ policy = 'terms' }) {
    const data = POLICIES[policy] || termsData;

    return (
        <SectionContainer dataSource="policyData" id={`policy-${policy}-section`}>
            <SectionHeader title={data.title} subtitle={data.subtitle} centered={true} />

            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-7">
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-[#722332] border-b border-[#C59B27]/30 pb-4">
                    {data.lastUpdatedLabel}: {data.lastUpdated}
                </p>

                {data.sections.map((section) => (
                    <div key={section.heading} className="space-y-3">
                        <h3 className="text-base md:text-lg font-black text-[#4A121A] uppercase tracking-wide">
                            {section.heading}
                        </h3>
                        {section.paragraphs.map((paragraph, index) => (
                            <p key={index} className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
