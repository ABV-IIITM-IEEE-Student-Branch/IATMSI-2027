import SectionContainer from '../ui/SectionContainer';
import { registrationPageData, registrationLabels } from '../../data/registrationData';

/**
 * The registration rules.
 *
 * Everything that used to introduce this section — the heading, the "payment
 * is accepted in these currencies" overview, the pointer to the fee table —
 * described a page where registration had not been built yet. The section
 * above now does all of that and takes the payment, so what is left here is
 * the part that is policy rather than instruction: refunds, student proof,
 * one registration per paper, and what the fee includes.
 */
export default function RegistrationSection() {
    const { guidelines } = registrationPageData;

    return (
        <SectionContainer dataSource="registrationData" id="registration-section">
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
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
