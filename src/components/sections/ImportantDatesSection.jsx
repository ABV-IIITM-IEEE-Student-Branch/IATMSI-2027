import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { importantDates } from '../../data/conferenceData';


export default function ImportantDatesSection() {
    return (
        <div className="bg-neutral-50 pb-16">
            

            <section className="py-8 md:py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <SectionHeader
                        title="Conference Timeline"
                        subtitle="Plan your submission and participation according to these important milestones"
                    />
                    <div className="overflow-hidden rounded-2xl border border-neutral-200 border-t-2 border-t-[#D4A244] shadow-sm bg-[#FAF8F5]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#5B1824] border-b-2 border-[#D4A244]">
                                    <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-white">
                                        S.No.
                                    </th>
                                    <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-white">
                                        Activity / Milestone
                                    </th>
                                    <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-white">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-white">
                                        Action / Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {importantDates.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`transition-colors hover:bg-amber-500/5 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}`}
                                    >
                                        <td className="px-6 py-4 text-sm font-bold text-amber-700">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2.5">
                                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.isDeadline ? 'bg-amber-500 ring-2 ring-amber-500/30' : 'bg-[#5B1824]'}`}></span>
                                                <span className="text-sm font-bold text-neutral-800">
                                                    {item.activity}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-neutral-700">
                                            {item.oldDate && (
                                                <span className="line-through text-red-500/80 mr-2 text-xs">{item.oldDate}</span>
                                            )}
                                            <span className={item.oldDate ? 'text-amber-800 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30' : 'text-neutral-800'}>
                                                {item.date}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {item.link === 'coming_soon' ? (
                                                <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/30 whitespace-nowrap">
                                                    Coming Soon
                                                </span>
                                            ) : item.link ? (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3.5 py-1.5 border border-amber-500/50 text-xs font-bold rounded-lg shadow-sm text-white bg-[#5B1824] hover:bg-[#722332] transition-all whitespace-nowrap">
                                                    Open Portal →
                                                </a>
                                            ) : (
                                                <span className="text-neutral-400 font-medium px-4">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5 flex items-center gap-6 justify-center text-xs font-semibold text-slate-500">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            Important Deadline
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary-600"></span>
                            Notification / Event
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
