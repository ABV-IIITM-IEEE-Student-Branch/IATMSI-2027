import { pageRegistry, sectionManifest } from '../data/pageRegistry';
import { sectionResolver } from '../utils/sectionResolver';
import NavigationMenu from '../components/layout/NavigationMenu';
import LatestUpdates from '../components/sections/LatestUpdates';
import Navbar from '../components/layout/Navbar';

export default function DynamicPage({ pageId }) {
    const pageConfig = pageRegistry.find(p => p.id === pageId);

    if (!pageConfig) {
        return <div className="p-8 text-center text-red-500 font-bold">Error: Page "{pageId}" not found in registry.</div>;
    }

    // Each section carries its position in pageConfig.sections, not its
    // position on screen. The hero is lifted out and rendered above the rest,
    // so the two stop matching after the first section — and the position is
    // what a visual editor adds, removes and reorders by. Getting it from the
    // map below would aim every edit one slot off.
    const sections = pageConfig.sections.map((section, index) => ({ section, index }));
    const heroSection = sections.find(s => s.section.sectionId === 'hero');
    const otherSections = sections.filter(s => s.section.sectionId !== 'hero');

    return (
        <>
            {/* Unified Sticky Header for Non-Hero Pages */}
            <div className={`z-50 w-full flex flex-col ${heroSection ? 'fixed md:sticky top-0 h-0 overflow-visible' : 'sticky top-0 bg-[#FAF5EB] shadow-sm'}`}>
                <Navbar />
                
                {!heroSection && (
                    <div className="flex flex-col w-full shadow-md">
                        <LatestUpdates />
                        <NavigationMenu />
                    </div>
                )}
            </div>

            {/* Hero Section and its below-the-fold components */}
            {heroSection && (
                <div className="relative">
                    <SectionRenderer
                        key="hero"
                        section={heroSection.section}
                        index={heroSection.index}
                        pageId={pageConfig.id}
                    />
                    <LatestUpdates />
                    <div className="sticky top-0 z-40">
                        <NavigationMenu />
                    </div>
                </div>
            )}

            {/* Rest of the page sections */}
            <div className="flex flex-col relative z-10">
                {otherSections.map(({ section, index }) => (
                    <SectionRenderer
                        key={`${section.sectionId}-${index}`}
                        section={section}
                        index={index}
                        pageId={pageConfig.id}
                    />
                ))}
            </div>
        </>
    );
}

// Helper to render a section
function SectionRenderer({ section, index, pageId }) {
    const Component = sectionResolver[section.sectionId];
    if (!Component) {
        console.warn(`Component not found for sectionId: ${section.sectionId}`);
        return null;
    }

    // Tag the section with the data files it renders from, so an external
    // editor can tell which file a piece of on-screen text belongs to when the
    // same words appear in several places. `display: contents` keeps this
    // wrapper out of layout entirely.
    const manifestEntry = sectionManifest.find(s => s.id === section.sectionId);
    const sources = manifestEntry?.requiresData ?? [];

    // The page and position this section sits at in pageRegistry, which is
    // what a visual editor needs to move or remove it. Always emitted, even
    // for a section with no data files of its own: a section can be
    // rearranged whether or not any of its text is editable.
    //
    // Because the wrapper is `display: contents` it has no box of its own, so
    // an editor sizing an overlay to it has to take the union of its
    // children's rectangles rather than its own.
    return (
        <div
            data-weavr-page={pageId}
            data-weavr-section={index}
            data-weavr-section-id={section.sectionId}
            data-weavr-source={sources.length ? sources.join(' ') : undefined}
            style={{ display: 'contents' }}
        >
            <Component {...section.props} />
        </div>
    );
}
