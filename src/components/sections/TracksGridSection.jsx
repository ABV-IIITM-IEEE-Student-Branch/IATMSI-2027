import { useState } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { tracks, cfpData, tracksGridLabels } from '../../data/tracksData';
import {
  approvedSpecialSessions,
  specialSessionsPageContent,
  specialSessionsLabels,
} from '../../data/specialSessionsData';
import { siteConfig } from '../../data/siteConfig';

export default function TracksGridSection() {
  const { title, subtitle, downloadCfpUrl, theme, introText, xploreNote } = cfpData;
  const [activeModalFlyer, setActiveModalFlyer] = useState(null);

  return (
    <SectionContainer dataSource="tracksData specialSessionsData siteConfig" id="call-for-papers-tracks-section">
      <SectionHeader title={title} subtitle={subtitle} centered={true} />

      {/* CFP Download & Theme Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
              {tracksGridLabels.conferenceTheme}
            </span>
            <h3 className="text-lg md:text-xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
              “{theme}”
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#special-sessions"
              className="inline-flex items-center gap-2 bg-[#FAF5EB] !text-[#722332] hover:bg-[#F3EAD3] px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider border border-[#C59B27]/60 shadow-xs transition-all self-start md:self-auto flex-shrink-0"
            >
              <span>{tracksGridLabels.specialSessionsBannerButton}</span>
              <svg className="w-4 h-4 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href={downloadCfpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-2.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all self-start md:self-auto flex-shrink-0"
            >
              <span>{tracksGridLabels.downloadOfficialCfpPdf}</span>
              <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
          {introText}
        </p>

        {/* IEEE Xplore Indexing Note */}
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm font-semibold text-[#4A121A]">
          <span className="font-black text-[#722332] uppercase mr-2">{tracksGridLabels.ieeeXplorePublication}</span>
          {xploreNote}
        </div>
      </div>

      {/* 6 Technical Tracks Grid */}
      <div className="space-y-8">
        <div className="border-b border-[#C59B27]/30 pb-3 flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-black text-[#4A121A] uppercase tracking-wide">
            {tracksGridLabels.technicalTracksSubtopics}
          </h3>
          <span className="text-xs font-bold text-neutral-500 uppercase">
            Tracks 1 – 6
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-2xl p-6 md:p-7 border-2 border-[#C59B27]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#722332] text-[#FAF5EB] flex items-center justify-center font-black text-sm flex-shrink-0 border border-[#C59B27]/40">
                    T{track.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-black uppercase text-[#722332] tracking-wider block mb-0.5">
                      Track {track.number}
                    </span>
                    <h4 className="text-base md:text-lg font-black text-[#4A121A] leading-snug">
                      {track.title}
                    </h4>
                  </div>
                </div>

                <div className="border-t border-[#C59B27]/20 pt-4">
                  <h5 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-3">
                    {tracksGridLabels.topicsOfInterest}
                  </h5>
                  <ul className="space-y-2">
                    {track.description.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#722332] mt-2 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Sessions Section: Placed Right Below the Tracks */}
      <div id="special-sessions" className="pt-14 scroll-mt-24 space-y-8">
        <div className="border-b-2 border-[#C59B27]/40 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs">
                Approved Special Sessions
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-[#4A121A] uppercase tracking-wide">
              {specialSessionsPageContent.headerTitle}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-neutral-600 max-w-md font-medium leading-relaxed">
            {specialSessionsPageContent.headerSubtitle}
          </p>
        </div>

        {/* Special Session Cards */}
        <div className="space-y-10">
          {approvedSpecialSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-3xl border-2 border-[#C59B27]/40 shadow-lg overflow-hidden transition-all duration-300"
            >
              {/* Card Header Banner */}
              <div className="bg-gradient-to-r from-[#203a43] via-[#0f2027] to-[#203a43] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#C59B27]/60">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#C59B27] text-[#2F0B11] tracking-wider shadow-sm">
                    {session.sessionCode}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#FAF5EB]">
                    <span className="w-4 h-4 rounded-full bg-[#C59B27] text-[#203a43] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#203a43]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {session.approvedBadge || specialSessionsLabels.sessionApprovedBadge}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{session.dates}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{session.venue}</span>
                  </div>
                </div>
              </div>

              {/* Card Body: Left Column (Flyer + Chairs) & Right Column (Topics + CFP) */}
              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Poster preview + Organizers */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-neutral-50 rounded-2xl p-3 border-2 border-[#C59B27]/40 shadow-sm space-y-3">
                    <div
                      className="relative cursor-pointer overflow-hidden rounded-xl group/poster shadow-md border border-[#C59B27]/30"
                      onClick={() => setActiveModalFlyer(session)}
                    >
                      <img
                        src={session.flyerImage}
                        alt={session.flyerAlt}
                        className="w-full h-auto object-cover rounded-xl group-hover/poster:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 text-[#4A121A] font-bold text-xs rounded-xl shadow-lg uppercase tracking-wider backdrop-blur-xs">
                          <svg className="w-4 h-4 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          {specialSessionsPageContent.viewFullPosterLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      <a
                        href={session.flyerImage}
                        download="Quantum_Photonics_Special_Session_Flyer.jpg"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4A121A] hover:bg-[#611822] !text-[#FAF5EB] font-bold text-xs rounded-xl border border-[#C59B27] shadow-sm transition-all text-center uppercase tracking-wider"
                      >
                        <svg className="w-4 h-4 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{specialSessionsPageContent.downloadPosterLabel}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setActiveModalFlyer(session)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF5EB] hover:bg-[#F3EAD3] text-[#722332] font-bold text-xs rounded-xl border border-[#C59B27]/60 transition-all uppercase tracking-wider"
                      >
                        <svg className="w-4 h-4 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{specialSessionsPageContent.viewFullPosterLabel}</span>
                      </button>
                    </div>
                  </div>

                  {/* Organizers & Chairs */}
                  <div className="bg-[#FAF5EB] rounded-2xl p-6 border-2 border-[#C59B27]/40 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#C59B27]/30 pb-3">
                      <span className="w-7 h-7 rounded-lg bg-[#722332] text-[#FAF5EB] flex items-center justify-center text-xs font-bold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </span>
                      <h4 className="text-sm font-black uppercase text-[#4A121A] tracking-wider">
                        {specialSessionsPageContent.chairsTitle}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {session.sessionChairs.map((chair) => (
                        <div key={chair.id} className="p-3.5 bg-white rounded-xl border border-[#C59B27]/30 shadow-xs space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#C59B27] block">
                            {chair.role}
                          </span>
                          <h5 className="text-sm font-extrabold text-[#4A121A]">
                            {chair.name}
                          </h5>
                          <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                            {chair.designation}
                          </p>
                          <p className="text-xs font-semibold text-[#722332]">
                            {chair.affiliation}
                          </p>
                          {chair.email && (
                            <a
                              href={`mailto:${chair.email}`}
                              className="inline-flex items-center gap-1.5 text-xs text-[#722332] hover:text-[#4A121A] font-semibold pt-1 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="underline">{chair.email}</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#C59B27]/20 text-xs text-neutral-600 space-y-1.5">
                      <span className="font-bold uppercase tracking-wider text-[#4A121A] block">
                        {specialSessionsPageContent.contactTitle}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-700">Email:</span>
                        <a href={`mailto:${session.contactEmail}`} className="text-[#722332] font-bold hover:underline">
                          {session.contactEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-700">Web:</span>
                        <span className="text-neutral-700 font-medium">{session.contactWebsite}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Title, Overview, Topics, Submission Callout */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-3 border-b border-[#C59B27]/30 pb-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#722332]/10 text-[#722332] text-xs font-black uppercase tracking-wider">
                      {session.theme}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#4A121A] leading-tight tracking-wide">
                      {session.title}
                    </h3>
                  </div>

                  {/* Overview */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-black uppercase tracking-wider text-[#722332] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                      {specialSessionsPageContent.overviewTitle}
                    </h4>
                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium text-justify">
                      {session.invitationText}
                    </p>
                  </div>

                  {/* Suggested Topics of Interest Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#C59B27]/30 pb-2">
                      <h4 className="text-sm font-black uppercase tracking-wider text-[#722332] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                        {specialSessionsPageContent.topicsTitle}
                      </h4>
                      <span className="text-xs font-bold text-neutral-500 uppercase">
                        {session.topics.length} Key Subtopics
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {session.topics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#FCF9F2] rounded-xl border border-[#C59B27]/30 hover:border-[#C59B27] hover:bg-white shadow-xs transition-all flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-md bg-[#722332] text-[#FAF5EB] flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-neutral-800 leading-snug">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submission Invitation Box */}
                  <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl p-6 border-2 border-[#C59B27]/50 shadow-sm space-y-3">
                    <h4 className="text-sm font-black uppercase tracking-wider text-[#4A121A] flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {specialSessionsPageContent.submissionTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium text-justify">
                      {session.submissionInvitation}
                    </p>
                  </div>

                  {/* Guidelines */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-black uppercase tracking-wider text-[#722332] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                      {specialSessionsPageContent.guidelinesTitle}
                    </h4>
                    <ul className="space-y-2">
                      {session.guidelines.map((guide, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#722332] mt-2 flex-shrink-0" />
                          <span>{guide}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Submission Action */}
                  <div className="pt-2 flex items-center">
                    <a
                      href={siteConfig.externalLinks.submissionPortal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4A121A] hover:bg-[#611822] !text-[#FAF5EB] font-black text-xs sm:text-sm rounded-xl border border-[#C59B27] shadow-md transition-all transform hover:-translate-y-0.5 uppercase tracking-wider text-center"
                    >
                      <span>{specialSessionsPageContent.submitPaperLabel}</span>
                      <svg className="w-4 h-4 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Flyer Preview */}
      {activeModalFlyer && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveModalFlyer(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl max-h-[94vh] w-full overflow-hidden flex flex-col shadow-2xl border border-[#C59B27]/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#4A121A] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#C59B27]/40">
              <div className="min-w-0 pr-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F0CB6F] block">
                  {activeModalFlyer.sessionCode} • {specialSessionsLabels.sessionApprovedBadge}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold truncate text-[#FAF5EB]">
                  {activeModalFlyer.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={activeModalFlyer.flyerImage}
                  download="Quantum_Photonics_Special_Session_Flyer.jpg"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C59B27] hover:bg-[#D4A936] text-[#2F0B11] text-xs font-bold transition-colors shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span className="hidden sm:inline">{specialSessionsPageContent.downloadPosterLabel}</span>
                </a>

                <button
                  onClick={() => setActiveModalFlyer(null)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={specialSessionsLabels.closeModal}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-neutral-900/95 flex items-center justify-center p-3 sm:p-5">
              <img
                src={activeModalFlyer.flyerImage}
                alt={activeModalFlyer.flyerAlt}
                className="max-h-[78vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
