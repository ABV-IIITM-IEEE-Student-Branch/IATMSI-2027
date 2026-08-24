import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { conferenceInfo } from '../../data/conferenceData';
import { heroCarousel, heroCta, heroTagline } from '../../data/heroData';

export default function HeroSection({ title, subtitle, isHomePage = false }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance carousel only on home page
    useEffect(() => {
        if (!isHomePage) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroCarousel.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHomePage]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroCarousel.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroCarousel.length) % heroCarousel.length);
    };

    return (
        <>
            <section className={`relative w-full overflow-hidden ${isHomePage ? 'h-[77vh] min-h-[550px] max-h-[770px]' : 'h-[50vh] min-h-[400px] max-h-[500px]'}`}>
                {/* Carousel Container */}
                <div className="absolute inset-0">
                    {heroCarousel.map((image, index) => (
                        <div
                            key={image.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Dark overlay */}
                <div className={`absolute inset-0 ${isHomePage ? 'bg-black/60' : 'bg-black/80'}`} />

                {/* Content Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center px-4 pt-24 pb-8 md:pt-32`}>
                    <div className="text-center text-white px-4 max-w-7xl w-full">
                        {/* Welcome Line */}
                        <p className="text-white text-xl md:text-2xl font-bold tracking-widest uppercase mb-3 drop-shadow-lg">
                            Welcome to {conferenceInfo.shortTitle}
                        </p>

                        {/* Date & Venue Label */}
                        <p className="text-white text-sm md:text-base uppercase tracking-[0.2em] mb-6 font-semibold drop-shadow-md">
                            {conferenceInfo.dates} • {conferenceInfo.venue.shortName}
                        </p>

                        {/* Main Title */}
                        <div className="flex flex-col gap-4 mb-6">
                            <h1 className="text-white font-light leading-tight drop-shadow-lg">
                                {/* Per-page title comes from pageRegistry; only the
                                    fallback comes from conferenceData. Naming the
                                    source here keeps an editor from confusing the
                                    two when both hold the same words. */}
                                <span
                                    data-weavr-source={title ? 'pageRegistry' : 'conferenceData'}
                                    className="block text-xl md:text-2xl lg:text-3xl font-black mb-2 leading-snug text-white drop-shadow-xl uppercase tracking-widest"
                                >
                                    {title || conferenceInfo.fullTitle}
                                </span>
                            </h1>
                        </div>

                        {/* Subtitle / Tagline */}
                        {(subtitle || (isHomePage && heroTagline)) && (
                            <p
                                data-weavr-source={subtitle ? 'pageRegistry' : 'heroData'}
                                className="hidden md:block text-sm md:text-base font-bold !text-white mb-8 max-w-6xl mx-auto drop-shadow-[0_4px_6px_rgba(0,0,0,1)] tracking-wide leading-relaxed"
                            >
                                {subtitle || heroTagline}
                            </p>
                        )}

                        {/* CTA Buttons - Home Page only */}
                        {isHomePage && (
                            <div className="flex flex-row gap-3 justify-center mt-4 md:mt-6">
                                <Link
                                    to={ROUTES[heroCta.primary.route]}
                                    className="!text-[#4A121A] bg-[#FCF9F2] hover:bg-white border-2 border-[#C59B27] inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-3 text-xs md:text-base font-extrabold rounded-xl shadow-xl transition-all hover:-translate-y-0.5"
                                >
                                    {heroCta.primary.label}
                                </Link>
                                <Link
                                    to={ROUTES[heroCta.secondary.route]}
                                    className="!text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/40 inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-3 text-xs md:text-base font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
                                >
                                    {heroCta.secondary.label}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Carousel Navigation Arrows */}
                {isHomePage && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 hidden md:flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none"
                            aria-label="Previous slide"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 hidden md:flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none"
                            aria-label="Next slide"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Carousel Dots */}
                {isHomePage && (
                    <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {heroCarousel.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all focus:outline-none ${index === currentSlide
                                    ? 'bg-white w-6'
                                    : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}


            </section>

            {/* Mobile Tagline Strip */}
            {isHomePage && (
                <div className="bg-primary-900 md:hidden py-[6px] px-6 text-center border-t border-white/10 flex items-center justify-center">
                    <p className="text-white m-0 text-xs font-bold tracking-wider uppercase leading-snug opacity-100 italic">
                        {heroTagline}
                    </p>
                </div>
            )}
        </>
    );
}
