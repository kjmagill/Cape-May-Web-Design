import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ArrowRightIcon } from './icons';

const Hero: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 md:py-20 bg-gradient-to-b from-slate-900 to-slate-800"
        >
            <div className="absolute inset-0 bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                    <span className={`block transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        More Than a Website.
                    </span>
                    <span className={`block text-cyan-400 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        A Growth Engine.
                    </span>
                </h1>
                <p
                    className={`text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 transition-all duration-700 ease-out delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    We build strategic, performance-driven websites that don't just look great—they deliver measurable results and fuel your business growth.
                </p>
                <div
                    className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 ease-out delay-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                >
                    <a href="#contact" className="w-full sm:w-auto group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-cyan-500/30">
                        <span>Start Growing Today</span>
                        <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a href="#portfolio" className="w-full sm:w-auto bg-transparent border-2 border-slate-600 hover:bg-slate-600 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                        View Our Work
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;