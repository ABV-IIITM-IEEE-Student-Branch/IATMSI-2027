import { Link } from 'react-router-dom';
import SectionContainer from '../ui/SectionContainer';
import Card, { CardTitle, CardDescription } from '../ui/Card';
import { aboutInstitute, instituteHighlights } from '../../data/conferenceData';

export default function AboutInstitute() {
    return (
        <div className="space-y-1">
            {/* About ABV-IIITM, Gwalior */}
            <SectionContainer background="white" className="!pt-16 !pb-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Text Content */}
                    <div className="order-2 lg:order-2 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-neutral-900">
                                {aboutInstitute.iiitmHeading}
                            </h2>
                            <div className="w-16 sm:w-20 h-1.5 bg-primary-600 rounded-full" />
                        </div>
                        <p className="text-neutral-600 leading-relaxed text-base sm:text-base text-justify">
                            {aboutInstitute.iiitm}
                        </p>
                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-1">
                        <div className="relative max-w-full">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-[2rem] opacity-60" />
                            <div className="absolute -inset-2 bg-white/40 rounded-[2rem] backdrop-blur-sm" />

                            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-white/50 bg-gray-50">
                                <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500" />
                                <img
                                    src={aboutInstitute.iiitmImage}
                                    alt={aboutInstitute.iiitmImageAlt}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>

            {/* About CoE - Sustainable Technology & Green Mobility */}
            <SectionContainer background="light" className="border-t border-neutral-200 !py-16">
                <div className="space-y-16 max-w-7xl mx-auto">
                    {/* Top part: CoE Content */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative max-w-full">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-[2rem] opacity-60" />
                                <div className="absolute -inset-2 bg-white/40 rounded-[2rem] backdrop-blur-sm" />

                                <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-white/50 bg-white">
                                    <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500" />
                                    <img
                                        src={aboutInstitute.coeImage}
                                        alt={aboutInstitute.coeImageAlt}
                                        className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="order-2 lg:order-1 space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-neutral-900">
                                    {aboutInstitute.coeHeading}
                                </h2>
                                <div className="w-16 sm:w-20 h-1.5 bg-primary-600 rounded-full" />
                            </div>
                            <p className="text-neutral-600 leading-relaxed text-base sm:text-base text-justify">
                                {aboutInstitute.coe}
                            </p>
                        </div>
                    </div>

                    {/* Bottom part: Highlights Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {instituteHighlights.map((highlight, index) => (
                            <HighlightCard
                                key={index}
                                icon={
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={highlight.icon} />
                                    </svg>
                                }
                                title={highlight.title}
                                description={highlight.description}
                                link={highlight.link}
                            />
                        ))}
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
}

function HighlightCard({ icon, title, description, link }) {
    return (
        <Link to={link} className="group h-full">
            <Card className="h-full text-center group-hover:border-primary-200 transition-colors flex flex-col items-center">
                <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-700 group-hover:bg-primary-200 transition-colors">
                    {icon}
                </div>
                <CardTitle className="group-hover:text-primary-700 transition-colors">
                    {title}
                </CardTitle>
                <CardDescription className="flex-1">{description}</CardDescription>
            </Card>
        </Link>
    );
}
