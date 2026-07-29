import { pageRegistry } from '../data/pageRegistry';
import { sectionResolver } from '../utils/sectionResolver';
import NavigationMenu from '../components/layout/NavigationMenu';
import LatestUpdates from '../components/sections/LatestUpdates';
import Navbar from '../components/layout/Navbar';

export default function DynamicPage({ pageId }) {
    const pageConfig = pageRegistry.find(p => p.id === pageId);

    if (!pageConfig) {
        return <div className="p-8 text-center text-red-500 font-bold">Error: Page "{pageId}" not found in registry.</div>;
    }

    const heroSection = pageConfig.sections.find(s => s.sectionId === 'hero');
    const otherSections = pageConfig.sections.filter(s => s.sectionId !== 'hero');

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
                    <SectionRenderer key="hero" section={heroSection} />
                    <LatestUpdates />
                    <div className="sticky top-0 z-40">
                        <NavigationMenu />
                    </div>
                </div>
            )}

            {/* Rest of the page sections */}
            <div className="flex flex-col relative z-10">
                {otherSections.map((section, index) => (
                    <SectionRenderer 
                        key={`${section.sectionId}-${index}`} 
                        section={section} 
                    />
                ))}
            </div>
        </>
    );
}

// Helper to render a section
function SectionRenderer({ section }) {
    const Component = sectionResolver[section.sectionId];
    if (!Component) {
        console.warn(`Component not found for sectionId: ${section.sectionId}`);
        return null;
    }
    return <Component {...section.props} />;
}
