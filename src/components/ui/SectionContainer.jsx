export default function SectionContainer({
    children,
    className = '',
    background = 'white',
    id,
}) {
    const backgrounds = {
        white: 'bg-white',
        light: 'bg-neutral-50',
        primary: 'bg-primary-50',
        dark: 'text-white',
    };

    const style = background === 'dark' ? { backgroundColor: '#002855' } : {};

    return (
        <section id={id} className={`py-8 md:py-12 ${background === 'dark' ? 'bg-[#002855] text-white' : ''} ${background === 'primary' ? 'bg-primary-50' : ''} ${className}`} style={style}>
            {background === 'white' || background === 'light' ? (
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-100 rounded-[2.5rem] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 p-8 md:p-14">
                        {children}
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
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-wider uppercase mb-3">
                {title}
            </h2>
            
            {/* Regal Gold Diamond Line Motif */}
            <div className={`flex items-center gap-3 my-3 ${centered ? 'justify-center' : 'justify-start'}`}>
                <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
                <span className="text-amber-500 text-xs font-bold select-none">◆</span>
                <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
            </div>

            {subtitle && (
                <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mt-2">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
