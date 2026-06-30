import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './icons';

const Hero: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Trigger animation shortly after component mounts to ensure a smooth transition
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100); 

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    // Effect to check screen size for conditional linking
    useEffect(() => {
        const checkIsMobile = () => {
            // Use Tailwind's 'lg' breakpoint (1024px) as the threshold
            setIsMobile(window.innerWidth < 1024);
        };
        checkIsMobile(); // Check on initial render
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const quoteHref = isMobile ? '#contact-form' : '#contact';

    return (
        <section
            id="home"
            className="relative min-h-dynamic-screen flex flex-col items-center justify-center text-center px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden"
        >
            <div className="absolute inset-0 bg-grid-pattern-40 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            
            {/* Subtle background ambient glows to introduce the vivid royal blue and cyan brand colors in a highly refined, classy manner */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                <h1 className="text-[8.5vw] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.75rem] xl:text-[5.5rem] font-black leading-[1.08] tracking-tighter mb-6 sm:mb-8">
                    <span className={`block whitespace-nowrap italic px-2 -mx-2 transition-all duration-1000 ease-out text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        More Than a Website.
                    </span>
                    <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 whitespace-nowrap italic px-2 -mx-2 pb-3 -mb-3 transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        A Growth Engine.
                    </span>
                </h1>
                <div className="px-2 md:px-0">
                    <p
                        className={`text-base sm:text-lg md:text-[1.125rem] lg:text-xl text-slate-300/90 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed transition-all duration-1000 ease-out delay-500 ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        We design high-impact websites and AI-powered systems engineered to drive real growth for South Jersey businesses.
                    </p>
                    <div
                        className={`flex flex-col sm:flex-row items-center justify-center space-y-3.5 sm:space-y-0 sm:space-x-4 max-w-[280px] sm:max-w-none mx-auto transition-all duration-700 ease-out delay-500 ${
                            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        {/* Primary button with precise layout, elegant tracking, and balanced, premium glow shadows */}
                        <a 
                            href={quoteHref} 
                            className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:from-cyan-200 hover:via-sky-300 hover:to-blue-400 text-white text-shadow-cta font-bold text-sm sm:text-[15.5px] py-3 px-7 sm:py-3.5 sm:px-9 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-[0_1px_2px_rgba(34,211,238,0.1),_0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.15),_0_0_30px_rgba(34,211,238,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-slate-900"
                        >
                            <span className="absolute inset-0 w-full h-full rounded-full bg-slate-950/15 group-hover:bg-slate-950/5 transition-colors duration-300 pointer-events-none" />
                            <span className="relative z-10 tracking-tight">Start Growing Today</span>
                            <ArrowRightIcon className="relative z-10 w-4 h-4 sm:w-[18px] sm:h-[18px] text-white transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        {/* Secondary Premium Glass Button, perfectly matched in height and padding proportions */}
                        <a 
                            href="#portfolio" 
                            aria-label="View our portfolio of recent work" 
                            className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-950/40 backdrop-blur-sm border border-slate-700/80 hover:bg-slate-900/65 hover:border-cyan-400/80 text-slate-200 hover:text-white font-semibold text-sm sm:text-[15.5px] py-3 px-7 sm:py-3.5 sm:px-9 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800 shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.06)] shadow-black/10"
                        >
                            View Our Work
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;