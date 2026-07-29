import { feeStructure, registrationNotes, registrationProcess } from '../../data/registrationData';

export default function RegistrationFeeTable() {
    return (
        <div className="space-y-8">
            {/* Fee Table */}
            <div className="overflow-x-auto shadow-sm rounded-2xl border border-neutral-200 border-t-2 border-t-[#D4A244] bg-[#FAF8F5]">
                <table className="w-full border-collapse">
                    <thead>
                        {/* Header Row 1 */}
                        <tr>
                            <th colSpan="5" className="p-4 text-center font-extrabold text-base bg-[#5B1824] text-white uppercase tracking-wider border-b-2 border-[#D4A244]">
                                Registration Fee Structure (IATMSI-2027)
                            </th>
                        </tr>
                        {/* Header Row 2 */}
                        <tr>
                            <th rowSpan="2" className="p-3.5 text-center font-bold text-sm bg-[#3C0C16] text-white border-r border-[#5B1824]">
                                Author&apos;s Category
                            </th>
                            <th colSpan="2" className="p-3 text-center font-bold text-sm bg-[#FDF7E7] text-amber-900 border-r border-amber-500/30">
                                Early Bird Registration
                            </th>
                            <th colSpan="2" className="p-3 text-center font-bold text-sm bg-[#722332] text-white">
                                Regular Registration
                            </th>
                        </tr>
                        {/* Header Row 3 */}
                        <tr className="bg-[#722332] text-white text-xs font-semibold">
                            <th className="p-3 text-center border-r border-amber-500/30 bg-[#FBF0CF] text-amber-900">Indian (INR)</th>
                            <th className="p-3 text-center border-r border-[#8A2E3D] bg-[#FBF0CF] text-amber-900">Foreign (USD)</th>
                            <th className="p-3 text-center border-r border-[#8A2E3D]">Indian (INR)</th>
                            <th className="p-3 text-center">Foreign (USD)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                        {feeStructure.map((row, index) => (
                            <tr key={index} className={`transition-colors hover:bg-amber-500/5 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}`}>
                                <td className="p-4 font-bold text-neutral-800 text-sm border-r border-neutral-200">
                                    {row.category}
                                </td>
                                <td className="p-4 text-center font-extrabold text-amber-800 bg-[#FDF7E7]/60 border-r border-amber-500/20">{row.earlyBirdIndian}</td>
                                <td className="p-4 text-center font-extrabold text-amber-800 bg-[#FDF7E7]/60 border-r border-neutral-200">{row.earlyBirdForeign}</td>
                                <td className="p-4 text-center font-bold text-neutral-700 border-r border-neutral-200">{row.regularIndian}</td>
                                <td className="p-4 text-center font-bold text-neutral-700">{row.regularForeign}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Notes */}
            <div className="bg-amber-500/5 border border-amber-500/20 border-l-4 border-l-[#D4A244] rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-neutral-900 mb-3 flex items-center gap-2">
                    <span className="text-[#D4A244]">◆</span>
                    Important Registration Notes
                </h3>
                <ul className="space-y-2.5">
                    {registrationNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm text-neutral-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A244] mt-2 shrink-0" />
                            {note}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Registration Instructions */}
            <div className="pt-8 border-t border-neutral-200">
                <h3 className="text-xl font-extrabold text-[#5B1824] mb-8 flex items-center gap-3">
                    <span className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 text-amber-700 rounded-xl flex items-center justify-center text-sm font-bold">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </span>
                    Registration Process & Guidelines
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {registrationProcess.map((item, index) => (
                        <div key={index} className="relative group">
                            {/* Connector line for desktop */}
                            {index < registrationProcess.length - 1 && (
                                <div className="hidden lg:block absolute top-6 left-[60%] w-full h-[2px] bg-neutral-200">
                                    <div className="h-full bg-[#D4A244] w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>
                            )}

                            <div className="relative bg-[#FAF8F5] rounded-2xl p-6 border border-neutral-200 border-t-2 border-t-[#5B1824] shadow-sm hover:shadow-md hover:border-[#D4A244] transition-all z-10">
                                <div className="w-12 h-12 bg-amber-500/10 text-amber-800 border border-amber-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#5B1824] group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                    </svg>
                                </div>
                                <div className="text-xs font-bold text-amber-800 mb-2 tracking-widest">STEP {String(item.step).padStart(2, '0')}</div>
                                <h4 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h4>
                                <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
