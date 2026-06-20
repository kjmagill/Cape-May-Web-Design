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
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.12] tracking-tight mb-5 sm:mb-8">
                    <span className={`block whitespace-nowrap italic transition-all duration-1000 ease-out text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        More Than a Website.
                    </span>
                    <span className={`block text-cyan-400 whitespace-nowrap italic transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        A Growth Engine.
                    </span>
                </h1>
                <div className="px-2 md:px-0">
                    <p
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-all duration-1000 ease-out delay-500 ${
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
                        {/* 2. Primary button using precise cyan and teal ocean-inspired classy gradient with enhanced readable text shadow */}
                        <a href={quoteHref} className="w-full sm:w-auto group inline-flex items-center justify-center space-x-2 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-teal-600 hover:to-cyan-500 text-white font-bold text-base sm:text-lg text-shadow-cta py-3 px-6 sm:py-4 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 shadow-lg shadow-cyan-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800 hover:animate-pulse-glow">
                            <span>Start Growing Today</span>
                            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        <a href="#portfolio" aria-label="View our portfolio of recent work" className="w-full sm:w-auto bg-slate-900/40 backdrop-blur-xs border-2 border-slate-700 hover:bg-slate-800 hover:border-cyan-500 text-white font-bold text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800">
                            View Our Work
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;