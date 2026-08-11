import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { importantDates } from '../../data/conferenceData';

export default function ImportantDatesSection() {
    return (
        <SectionContainer id="important-dates-section">
            <SectionHeader
                title="Important Dates"
                subtitle="Mark your calendar with key deadlines and milestones for IATMSI-2027"
                centered={true}
            />

            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm overflow-hidden">
                <div className="overflow-x-auto rounded-xl border border-[#C59B27]/40">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#FAF5EB] via-[#F5EBDC] to-[#FAF5EB] text-[#722332] border-b-2 border-[#C59B27]">
                                <th className="p-4 text-xs md:text-sm font-black uppercase tracking-wider border-r border-[#C59B27]/30 text-[#722332] bg-[#FAF5EB]">
                                    Activity / Event
                                </th>
                                <th className="p-4 text-xs md:text-sm font-black uppercase tracking-wider text-[#722332] bg-[#FAF5EB]">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#C59B27]/20 text-xs md:text-sm text-neutral-800 font-medium">
                            {importantDates.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className={idx % 2 === 0 ? 'bg-[#FFFDF9]' : 'bg-[#FAF5EB]/60 hover:bg-[#FAF5EB]'}
                                >
                                    <td className="p-4 font-bold text-[#4A121A] border-r border-[#C59B27]/20">
                                        {item.activity}
                                    </td>
                                    <td className="p-4 font-black text-[#722332]">
                                        {item.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SectionContainer>
    );
}
