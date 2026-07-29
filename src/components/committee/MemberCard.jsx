export default function MemberCard({ member }) {
    const initials = member.name === 'TBD'
        ? '?'
        : member.name
            .split(' ')
            .filter(n => !['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.'].includes(n))
            .map(n => n.charAt(0))
            .join('')
            .slice(0, 2);

    return (
        <div className="flex-1 w-full min-w-[240px] max-w-[260px] bg-[#FAF8F5] rounded-2xl border border-neutral-200 border-t-2 border-t-[#5B1824] p-5 text-center shadow-sm hover:shadow-md hover:border-[#D4A244] transition-all flex flex-col items-center justify-start group">
            {/* Avatar */}
            {member.profileUrl ? (
                <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="block relative group flex-shrink-0">
                    <div
                        className="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl mb-3.5 mx-auto flex items-center justify-center text-lg font-extrabold text-amber-300 shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-105 bg-[#5B1824] ring-2 ring-[#D4A244]/60"
                    >
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>
                </a>
            ) : (
                <div
                    className="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl mb-3.5 mx-auto flex items-center justify-center text-lg font-extrabold text-amber-300 shadow-sm overflow-hidden flex-shrink-0 bg-[#5B1824] ring-2 ring-[#D4A244]/60"
                >
                    {member.image ? (
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        initials
                    )}
                </div>
            )}

            {/* Details */}
            <div className="flex flex-col flex-grow items-center justify-start w-full">
                <h3 className="text-base xl:text-lg font-extrabold text-[#5B1824] leading-snug mb-1 text-center w-full">
                    {member.profileUrl ? (
                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-700 transition-colors">
                            {member.name}
                        </a>
                    ) : (
                        member.name
                    )}
                </h3>

                {member.designation && (
                    <span className="inline-block px-2.5 py-0.5 my-1 text-[11px] font-bold text-amber-900 bg-[#FBF0CF] border border-amber-500/30 rounded-full text-center">
                        {member.designation}
                    </span>
                )}

                {member.affiliation && (
                    <p className="text-neutral-600 text-xs xl:text-xs font-medium leading-relaxed text-center w-full mt-1">
                        {member.affiliation}
                    </p>
                )}

                {member.email && (
                    <a
                        href={`mailto:${member.email}`}
                        className="mt-2.5 text-[#5B1824] hover:text-amber-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{member.email}</span>
                    </a>
                )}
            </div>
        </div>
    );
}
