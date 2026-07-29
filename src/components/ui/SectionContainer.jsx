// Vertical Ornament Bar Sub-component (matching user screenshot)
function VerticalBarOrnament({ className = '' }) {
    return (
        <div className={`flex flex-col items-center justify-between pointer-events-none select-none h-full py-4 ${className}`}>
            {/* Top Diamond */}
            <span className="text-[#C59B27] text-xs font-bold leading-none">◆</span>
            {/* Upper Line */}
            <div className="w-[1px] flex-1 bg-gradient-to-b from-[#C59B27]/70 via-[#C59B27]/30 to-[#C59B27]/70 my-2" />
            {/* Middle Filigree Knot */}
            <div className="flex flex-col items-center my-1 text-[#C59B27]/80">
                <span className="text-[10px] leading-none opacity-80">✧</span>
                <span className="text-sm font-black leading-none my-1">◈</span>
                <span className="text-[10px] leading-none opacity-80">✧</span>
            </div>
            {/* Lower Line */}
            <div className="w-[1px] flex-1 bg-gradient-to-b from-[#C59B27]/70 via-[#C59B27]/30 to-[#C59B27]/70 my-2" />
            {/* Bottom Diamond */}
            <span className="text-[#C59B27] text-xs font-bold leading-none">◆</span>
        </div>
    );
}

export default function SectionContainer({
    children,
    className = '',
    background = 'white',
    id,
}) {
    const style = background === 'dark' ? { backgroundColor: '#2B080C' } : {};

    return (
        <section id={id} className={`py-6 md:py-10 ${background === 'dark' ? 'bg-[#2B080C] text-white' : ''} ${className}`} style={style}>
            {background === 'white' || background === 'light' ? (
                <div className="max-w-[92rem] mx-auto px-2 sm:px-4 lg:px-6">
                    {/* Outer Card with Maroon Frame & Shadow */}
                    <div className="bg-[#FAF5EB] rounded-2xl md:rounded-[2.25rem] shadow-xl border border-[#2B080C]/30 p-2 sm:p-3 relative overflow-hidden">
                        {/* Inner Inset Gold Frame */}
                        <div className="border border-[#C59B27]/50 rounded-xl md:rounded-[1.75rem] p-5 sm:p-8 md:p-12 lg:px-16 relative bg-[#FCF9F2]">
                            
                            {/* 4 Corner Diamonds */}
                            <span className="absolute top-2.5 left-2.5 text-[#C59B27] text-xs select-none font-bold">◆</span>
                            <span className="absolute top-2.5 right-2.5 text-[#C59B27] text-xs select-none font-bold">◆</span>
                            <span className="absolute bottom-2.5 left-2.5 text-[#C59B27] text-xs select-none font-bold">◆</span>
                            <span className="absolute bottom-2.5 right-2.5 text-[#C59B27] text-xs select-none font-bold">◆</span>

                            {/* Left & Right Vertical Ornament Bars (Desktop) */}
                            <div className="hidden xl:block absolute left-3 top-8 bottom-8 w-4">
                                <VerticalBarOrnament />
                            </div>
                            <div className="hidden xl:block absolute right-3 top-8 bottom-8 w-4">
                                <VerticalBarOrnament />
                            </div>

                            {/* Content Inner Container */}
                            <div className="xl:px-8">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            )}
        </section>
    );
}

export function SectionHeader({
    title,
    subtitle,
    centered = true,
    className = '',
}) {
    return (
        <div className={`mb-10 md:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#2B080C] tracking-wider uppercase mb-3">
                {title}
            </h2>
            
            {/* Regal Gold Diamond Line Motif */}
            <div className={`flex items-center gap-3 my-3 ${centered ? 'justify-center' : 'justify-start'}`}>
                <span className="text-[#C59B27] text-xs select-none">✧</span>
                <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C59B27] to-[#C59B27] rounded-full" />
                <span className="text-[#C59B27] text-sm font-bold select-none">◆</span>
                <div className="h-[1.5px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C59B27] to-[#C59B27] rounded-full" />
                <span className="text-[#C59B27] text-xs select-none">✧</span>
            </div>

            {subtitle && (
                <p className="text-sm md:text-base text-neutral-700 max-w-3xl mx-auto leading-relaxed font-normal mt-2">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
