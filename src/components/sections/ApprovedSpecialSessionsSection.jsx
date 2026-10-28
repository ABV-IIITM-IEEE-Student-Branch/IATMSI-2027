import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import {
  approvedSpecialSessions,
  specialSessionsHomeSection,
  specialSessionsLabels,
} from '../../data/specialSessionsData';
import { ROUTES } from '../../constants/routes';

export default function ApprovedSpecialSessionsSection() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SectionContainer dataSource="specialSessionsData" id="approved-special-sessions">
      <SectionHeader
        title={specialSessionsHomeSection.title}
        subtitle={specialSessionsHomeSection.subtitle}
        centered={true}
      />

      <div className="relative group/carousel">
        {/* Navigation Arrows for Carousel */}
        {approvedSpecialSessions.length > 1 && (
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#C59B27]/60 shadow-lg text-[#4A121A] flex items-center justify-center hover:bg-[#FAF5EB] hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
          >
            <svg className="w-5 h-5 text-[#4A121A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {approvedSpecialSessions.length > 1 && (
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#C59B27]/60 shadow-lg text-[#4A121A] flex items-center justify-center hover:bg-[#FAF5EB] hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
          >
            <svg className="w-5 h-5 text-[#4A121A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Sessions Cards Container */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-6 sm:gap-8 overflow-x-auto pb-4 pt-2 px-1 scroll-smooth no-scrollbar ${
            approvedSpecialSessions.length <= 2 ? 'justify-center flex-wrap md:flex-nowrap' : 'justify-start'
          }`}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {approvedSpecialSessions.map((session) => (
            <div
              key={session.id}
              className="w-full max-w-[340px] sm:max-w-[380px] flex-shrink-0 flex flex-col bg-white rounded-2xl border-2 border-[#C59B27]/40 shadow-md hover:shadow-2xl hover:border-[#C59B27] transition-all duration-300 overflow-hidden transform hover:-translate-y-1.5"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Approved Badge Banner Header */}
              <div className="bg-gradient-to-r from-[#203a43] via-[#0f2027] to-[#203a43] px-4 py-2.5 flex items-center justify-center gap-2 border-b border-[#C59B27]/40">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C59B27] text-white shadow-xs">
                  <svg className="w-3.5 h-3.5 text-[#203a43]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-[#FAF5EB]">
                  {session.approvedBadge || specialSessionsLabels.sessionApprovedBadge}
                </span>
              </div>

              {/* Poster Image Preview (links to special sessions on CFP page) */}
              <Link
                to={ROUTES.SPECIAL_SESSIONS}
                className="block relative bg-neutral-100 overflow-hidden aspect-[1/1.38] group/img"
              >
                <img
                  src={session.flyerImage}
                  alt={session.flyerAlt}
                  className="w-full h-full object-cover sm:object-contain object-top group-hover/img:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>

              {/* Session Meta & Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#722332]/10 text-[#722332] border border-[#722332]/20">
                      {session.sessionCode}
                    </span>
                    <span className="text-[11px] font-bold text-neutral-500 uppercase">
                      {session.dates}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[#4A121A] leading-snug line-clamp-2">
                    {session.title}
                  </h3>
                </div>

                {/* Single Primary Action: Link to CFP Special Session */}
                <div className="pt-3 border-t border-neutral-100">
                  <Link
                    to={ROUTES.SPECIAL_SESSIONS}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4A121A] hover:bg-[#611822] !text-[#FAF5EB] font-bold text-xs rounded-xl border border-[#C59B27] shadow-sm transition-all transform hover:-translate-y-0.5 text-center uppercase tracking-wider"
                  >
                    <span>{specialSessionsHomeSection.viewDetailsLabel}</span>
                    <svg className="w-3.5 h-3.5 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
