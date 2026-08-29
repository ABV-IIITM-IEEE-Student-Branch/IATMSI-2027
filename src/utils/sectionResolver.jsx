import AboutRationaleSection from '../components/sections/AboutRationaleSection';
import AboutObjectivesSection from '../components/sections/AboutObjectivesSection';
import AboutFullSection from '../components/sections/AboutFullSection';
import HistorySection from '../components/sections/HistorySection';
import TrackChairsSection from '../components/sections/TrackChairsSection';
import CameraReadySection from '../components/sections/CameraReadySection';
import CopyrightSection from '../components/sections/CopyrightSection';
import OralGuidelinesSection from '../components/sections/OralGuidelinesSection';
import PosterGuidelinesSection from '../components/sections/PosterGuidelinesSection';
import VenueTravelKathmanduSection from '../components/sections/VenueTravelKathmanduSection';
import FaqsSection from '../components/sections/FaqsSection';
import HardnovateSection from '../components/sections/HardnovateSection';
import RisingResearcherSection from '../components/sections/RisingResearcherSection';
import ExcellenceResearchSection from '../components/sections/ExcellenceResearchSection';
import DoctoralAwardSection from '../components/sections/DoctoralAwardSection';
import SimulationAwardSection from '../components/sections/SimulationAwardSection';
import BestPaperAwardSection from '../components/sections/BestPaperAwardSection';
import FellowshipsSection from '../components/sections/FellowshipsSection';
import SponsorshipSection from '../components/sections/SponsorshipSection';
import TracksGridSection from '../components/sections/TracksGridSection';
import SubmissionCtaSection from '../components/sections/SubmissionCtaSection';
import CallForReviewersSection from '../components/sections/CallForReviewersSection';
import CommitteeSection from '../components/sections/CommitteeSection';
import ContactSection from '../components/sections/ContactSection';
import ExploreGwaliorSection from '../components/sections/ExploreGwaliorSection';
import ImportantDatesSection from '../components/sections/ImportantDatesSection';
import PaperSubmissionSection from '../components/sections/PaperSubmissionSection';
import RegistrationSection from '../components/sections/RegistrationSection';
import TravelVisaSection from '../components/sections/TravelVisaSection';
import VenueDirectionsSection from '../components/sections/VenueDirectionsSection';
import HeroSection from '../components/sections/HeroSection';
import IntroSection from '../components/sections/IntroSection';
import AboutInstitute from '../components/sections/AboutInstitute';
import PlaceholderSection from '../components/sections/PlaceholderSection';
import VisitorStatsSection from '../components/sections/VisitorStatsSection';

// Home Page Specific Sections
import AboutConfSection from '../components/sections/AboutConfSection';
import ProgramScheduleSection from '../components/sections/ProgramScheduleSection';
import CallForPapersSection from '../components/sections/CallForPapersSection';
import ThemeTracksSection from '../components/sections/ThemeTracksSection';
import AwardsContestSection from '../components/sections/AwardsContestSection';
import TeaserVideosSection from '../components/sections/TeaserVideosSection';
import PatronChairsSection from '../components/sections/PatronChairsSection';
import SupportersSection from '../components/sections/SupportersSection';

// Temporary inline component for Divider
function Divider() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <hr className="border-t-2 border-neutral-200" />
        </div>
    );
}

export const sectionResolver = {
    hero: HeroSection,
    intro: IntroSection,
    aboutInstitute: AboutInstitute,
    divider: Divider,
    aboutRationaleSection: AboutRationaleSection,
    aboutObjectivesSection: AboutObjectivesSection,
    aboutFullSection: AboutFullSection,
    historySection: HistorySection,
    trackChairsSection: TrackChairsSection,
    cameraReadySection: CameraReadySection,
    copyrightSection: CopyrightSection,
    oralGuidelinesSection: OralGuidelinesSection,
    posterGuidelinesSection: PosterGuidelinesSection,
    venueTravelKathmanduSection: VenueTravelKathmanduSection,
    faqsSection: FaqsSection,
    hardnovateSection: HardnovateSection,
    risingResearcherSection: RisingResearcherSection,
    excellenceResearchSection: ExcellenceResearchSection,
    doctoralAwardSection: DoctoralAwardSection,
    simulationAwardSection: SimulationAwardSection,
    bestPaperAwardSection: BestPaperAwardSection,
    fellowshipsSection: FellowshipsSection,
    sponsorshipSection: SponsorshipSection,
    callForReviewersSection: CallForReviewersSection,
    committeeSection: CommitteeSection,
    contactSection: ContactSection,
    exploreGwaliorSection: ExploreGwaliorSection,
    importantDatesSection: ImportantDatesSection,
    paperSubmissionSection: PaperSubmissionSection,
    registrationSection: RegistrationSection,
    tracksGridSection: TracksGridSection,
    submissionCtaSection: SubmissionCtaSection,
    travelVisaSection: TravelVisaSection,
    venueDirectionsSection: VenueDirectionsSection,
    placeholder: PlaceholderSection,
    visitorStatsSection: VisitorStatsSection,

    // Home Page Sections
    aboutConfSection: AboutConfSection,
    programScheduleSection: ProgramScheduleSection,
    callForPapersSection: CallForPapersSection,
    themeTracksSection: ThemeTracksSection,
    awardsContestSection: AwardsContestSection,
    teaserVideosSection: TeaserVideosSection,
    patronChairsSection: PatronChairsSection,
    supportersSection: SupportersSection,
};
