import { feeStructure, registrationNotes, registrationProcess } from '../../data/registrationData';

export default function RegistrationFeeTable() {
    return (
        <div className="space-y-8">
            {/* Fee Table */}
            <div className="overflow-x-auto shadow-lg rounded-2xl border border-slate-200 border-t-2 border-t-amber-500">
                <table className="w-full border-collapse">
                    <thead>
                        {/* Header Row 1 */}
                        <tr>
                            <th colSpan="5" className="p-4 text-center font-extrabold text-base bg-[#002855] text-white uppercase tracking-wider border-b-2 border-amber-500">
                                Registration Fee Structure (IATMSI-2027)
                            </th>
                        </tr>
                        {/* Header Row 2 */}
                        <tr>
                            <th rowSpan="2" className="p-3.5 text-center font-bold text-sm bg-slate-900 text-white border-r border-slate-700">
                                Author&apos;s Category
                            </th>
                            <th colSpan="2" className="p-3 text-center font-bold text-sm bg-amber-500/20 text-amber-900 border-r border-amber-500/40">
                                Early Bird Registration
                            </th>
                            <th colSpan="2" className="p-3 text-center font-bold text-sm bg-slate-800 text-white">
                                Regular Registration
                            </th>
                        </tr>
                        {/* Header Row 3 */}
                        <tr className="bg-slate-800 text-white text-xs font-semibold">
                            <th className="p-3 text-center border-r border-slate-700 bg-amber-500/10 text-amber-900">Indian (INR)</th>
                            <th className="p-3 text-center border-r border-slate-700 bg-amber-500/10 text-amber-900">Foreign (USD)</th>
                            <th className="p-3 text-center border-r border-slate-700">Indian (INR)</th>
                            <th className="p-3 text-center">Foreign (USD)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {feeStructure.map((row, index) => (
                            <tr key={index} className={`transition-colors hover:bg-amber-500/5 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}`}>
                                <td className="p-4 font-bold text-slate-800 text-sm border-r border-slate-200">
                                    {row.category}
                                </td>
                                <td className="p-4 text-center font-extrabold text-amber-700 bg-amber-500/5 border-r border-amber-500/20">{row.earlyBirdIndian}</td>
                                <td className="p-4 text-center font-extrabold text-amber-700 bg-amber-500/5 border-r border-slate-200">{row.earlyBirdForeign}</td>
                                <td className="p-4 text-center font-bold text-slate-700 border-r border-slate-200">{row.regularIndian}</td>
                                <td className="p-4 text-center font-bold text-slate-700">{row.regularForeign}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Notes */}
            <div className="bg-amber-500/5 border border-amber-500/20 border-l-4 border-l-amber-500 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-amber-500">◆</span>
                    Important Registration Notes
                </h3>
                <ul className="space-y-2.5">
                    {registrationNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                            {note}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Registration Instructions */}
            <div className="pt-8 border-t border-slate-200">
                <h3 className="text-xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 text-amber-600 rounded-xl flex items-center justify-center text-sm font-bold">
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
                                <div className="hidden lg:block absolute top-6 left-[60%] w-full h-[2px] bg-slate-200">
                                    <div className="h-full bg-amber-500 w-0 group-hover:w-full transition-all duration-500"></div>
                                </div>
                            )}

                            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 border-t-2 border-t-amber-500/80 shadow-sm hover:shadow-lg hover:border-amber-500 transition-all z-10">
                                <div className="w-12 h-12 bg-amber-500/10 text-amber-600 border border-amber-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                    </svg>
                                </div>
                                <div className="text-xs font-bold text-amber-600 mb-2 tracking-widest">STEP {String(item.step).padStart(2, '0')}</div>
                                <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
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
