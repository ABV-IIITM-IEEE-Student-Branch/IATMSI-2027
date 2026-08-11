import { useState, useRef } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import {
    conferencePatrons,
    generalChairs,
    conferenceChairs,
    organizingCoreCommittee,
    publicityCommittee,
    registrationCommittee,
    publicationCommittee,
    phdForumCommittee,
    fellowshipAwardCommittee,
    financeSponsorshipCommittee,
    workshopTutorialCommittee,
    webCommittee,
    technicalProgrammeCommittee,
    advisoryCommittee,
} from '../../data/committeeData';

const committeeGroups = [
    { id: 'patrons', title: 'Conference Patrons', data: conferencePatrons },
    { id: 'general-chairs', title: 'General Chairs', data: generalChairs },
    { id: 'conference-chairs', title: 'Conference Chair', data: conferenceChairs },
    { id: 'core-committee', title: 'Organizing & Core Committee', data: organizingCoreCommittee },
    { id: 'publicity', title: 'Publicity & Promotion Committee', data: publicityCommittee },
    { id: 'registration', title: 'Registration Committee', data: registrationCommittee },
    { id: 'publication', title: 'Publication Committee', data: publicationCommittee },
    { id: 'phd-forum', title: 'PhD Forum Committee', data: phdForumCommittee },
    { id: 'fellowship', title: 'Fellowship & Award Committee', data: fellowshipAwardCommittee },
    { id: 'finance', title: 'Finance & Sponsorship Committee', data: financeSponsorshipCommittee },
    { id: 'workshop', title: 'Workshop & Tutorial Committee', data: workshopTutorialCommittee },
    { id: 'web', title: 'Web Committee', data: webCommittee },
    { id: 'tpc', title: 'Technical Programme Committee', data: technicalProgrammeCommittee },
    { id: 'advisory', title: 'Advisory Committee', data: advisoryCommittee },
];

function MemberTextCard({ member }) {
    return (
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border-l-4 border-[#C59B27] border-y border-r border-[#C59B27]/30 shadow-xs hover:shadow-md hover:border-[#C59B27] transition-all flex flex-col justify-between group">
            <div>
                <h4 className="text-sm md:text-base font-black text-[#4A121A] leading-snug group-hover:text-[#722332] transition-colors">
                    {member.name}
                </h4>
                {member.role && member.role !== 'Member' && member.role !== 'Organizing Committee Member' && (
                    <span className="text-[11px] font-black text-[#722332] bg-white px-2.5 py-0.5 rounded-full border border-[#C59B27]/30 inline-block my-1.5 uppercase tracking-wider">
                        {member.role}
                    </span>
                )}
            </div>
            <p className="text-xs text-neutral-700 font-semibold leading-relaxed mt-1">
                {member.affiliation}
            </p>
        </div>
    );
}

export default function CommitteeSection() {
    const [selectedTab, setSelectedTab] = useState('all');
    const scrollContainerRef = useRef(null);

    const scrollTabs = (direction) => {
        if (scrollContainerRef.current) {
            const amount = direction === 'left' ? -280 : 280;
            scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const filteredGroups = selectedTab === 'all'
        ? committeeGroups
        : committeeGroups.filter(g => g.id === selectedTab);

    return (
        <SectionContainer id="committee-section">
            <SectionHeader
                title="IATMSI-2027 Committees"
                subtitle="Distinguished international leadership, advisory board, and committee chairs guiding IEEE IATMSI-2027."
                centered={true}
            />

            {/* Committee Category Quick Nav Bar with Flex Scroll Controls */}
            <div className="flex items-center gap-2 mb-8">
                {/* Left Scroll Arrow */}
                <button
                    onClick={() => scrollTabs('left')}
                    aria-label="Scroll Tabs Left"
                    className="hidden sm:flex z-10 w-8 h-8 rounded-full bg-[#722332] text-[#FAF5EB] items-center justify-center shadow-md border border-[#C59B27] hover:bg-[#5B1824] transition-all transform hover:scale-105 flex-shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar scroll-smooth px-1"
                >
                    <button
                        onClick={() => setSelectedTab('all')}
                        className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                            selectedTab === 'all'
                                ? 'bg-[#722332] text-[#FAF5EB] border-[#C59B27] shadow-md'
                                : 'bg-white text-[#4A121A] border-[#C59B27]/40 hover:bg-[#FAF5EB]'
                        }`}
                    >
                        All Committees ({committeeGroups.reduce((acc, g) => acc + g.data.length, 0)})
                    </button>
                    {committeeGroups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => setSelectedTab(group.id)}
                            className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                                selectedTab === group.id
                                    ? 'bg-[#722332] text-[#FAF5EB] border-[#C59B27] shadow-md'
                                    : 'bg-white text-[#4A121A] border-[#C59B27]/40 hover:bg-[#FAF5EB]'
                            }`}
                        >
                            {group.title} ({group.data.length})
                        </button>
                    ))}
                </div>

                {/* Right Scroll Arrow */}
                <button
                    onClick={() => scrollTabs('right')}
                    aria-label="Scroll Tabs Right"
                    className="hidden sm:flex z-10 w-8 h-8 rounded-full bg-[#722332] text-[#FAF5EB] items-center justify-center shadow-md border border-[#C59B27] hover:bg-[#5B1824] transition-all transform hover:scale-105 flex-shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Committee Groups List */}
            <div className="space-y-10">
                {filteredGroups.map((group) => (
                    <div key={group.id} className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm">
                        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#C59B27]/30">
                            <h3 className="text-lg md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase flex items-center gap-2.5">
                                <span className="w-3 h-3 rounded-full bg-[#722332]" />
                                {group.title}
                            </h3>
                            <span className="text-xs font-black text-[#722332] bg-[#722332]/10 px-3 py-1 rounded-full border border-[#C59B27]/30 flex-shrink-0">
                                {group.data.length} Members
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {group.data.map((member, index) => (
                                <MemberTextCard key={index} member={member} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
