import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { registrationPageData } from '../../data/registrationData';
import { registrationLabels } from '../../data/registrationData';

export default function RegistrationSection() {
    const {
        title,
        subtitle,
        overview,
        feeTableStatus,
        guidelines,
    } = registrationPageData;

    return (
        <SectionContainer dataSource="registrationData" id="registration-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Overview & Fee Table Placeholder Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                        {registrationLabels.onlineRegistration}
                    </span>
                    <p className="text-xs md:text-sm text-neutral-800 font-bold leading-relaxed">
                        {overview}
                    </p>
                </div>

                {/* Fee Table Status Callout */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border-2 border-[#C59B27]/50 text-center space-y-2">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#722332]">
                        {registrationLabels.registrationCategoryFeeStructure}
                    </h4>
                    <span className="text-xl md:text-2xl font-black text-[#4A121A] bg-white px-6 py-2 rounded-full border border-[#C59B27]/40 inline-block shadow-xs">
                        {feeTableStatus}
                    </span>
                </div>
            </div>

            {/* 2. General Registration Guidelines */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {registrationLabels.registrationGuidelinesInclusions}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guidelines.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </SectionContainer>
    );
}
