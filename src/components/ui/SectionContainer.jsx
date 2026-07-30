// Vertical Ornament Bar Sub-component
function VerticalBarOrnament({ className = '' }) {
    return (
        <div className={`flex flex-col items-center justify-between pointer-events-none select-none h-full py-2 ${className}`}>
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
        </div>
    );
}

export default function SectionContainer({
    children,
    className = '',
    background = 'white',
    id,
}) {
    const style = background === 'dark' ? { backgroundColor: '#4A121A' } : {};

    return (
        <section id={id} className={`py-6 md:py-10 ${background === 'dark' ? 'bg-[#4A121A] text-white' : ''} ${className}`} style={style}>
            {background === 'white' || background === 'light' ? (
                <div className="max-w-[92rem] mx-auto px-2 sm:px-4 lg:px-6">
                    {/* Single Frame Card Container */}
                    <div className="bg-[#FCF9F2] rounded-2xl md:rounded-[2rem] border border-[#C59B27]/60 p-5 sm:p-8 md:p-12 lg:px-16 relative overflow-hidden">

                        {/* Left & Right Vertical Ornament Bars (Desktop) */}
                        <div className="hidden xl:block absolute left-4 top-8 bottom-8 w-4">
                            <VerticalBarOrnament />
                        </div>
                        <div className="hidden xl:block absolute right-4 top-8 bottom-8 w-4">
                            <VerticalBarOrnament />
                        </div>

                        {/* Content Inner Container */}
                        <div className="xl:px-8">
                            {children}
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
            <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-[#4A121A] tracking-wider uppercase mb-3">
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
