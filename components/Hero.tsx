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
            className="relative min-h-dynamic-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 md:py-20 bg-gradient-to-b from-slate-900 to-slate-800"
        >
            <div className="absolute inset-0 bg-grid-pattern-40 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                    <span className={`block transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        More Than a Website.
                    </span>
                    <span className={`block text-cyan-400 transition-all duration-700 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        A Growth Engine.
                    </span>
                </h1>
                <p
                    className={`text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 transition-all duration-700 ease-out delay-400 ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    We build strategic, performance-driven websites to help local businesses establish a strong online presence and fuel business growth.
                </p>
                <div
                    className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 ease-out delay-500 ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <a href={quoteHref} className="w-full sm:w-auto group inline-flex items-center justify-center space-x-2 border-2 border-transparent bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-lg [text-shadow:0_1px_3px_rgb(0_0_0_/_0.3)] py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-cyan-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800 hover:animate-pulse-glow">
                        <span>Start Growing Today</span>
                        <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a href="#portfolio" aria-label="View our portfolio of recent work" className="w-full sm:w-auto bg-transparent border-2 border-slate-600 hover:bg-slate-600 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800">
                        View Our Work
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;