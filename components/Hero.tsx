import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ArrowRightIcon } from './icons';

const Hero: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-b from-slate-900 to-slate-800"
        >
            <div className="absolute inset-0 bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="relative z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                    <span className={`block transition-all duration-500 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        Crafting <span className="text-cyan-400">Digital Experiences</span>
                    </span>
                    <span className={`block transition-all duration-500 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        in Cape May
                    </span>
                </h1>
                <p
                    className={`text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 transition-all duration-500 ease-out delay-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                >
                    We build beautiful, high-performance websites that capture the essence of your brand and grow your business.
                </p>
                <div
                    className={`flex justify-center space-x-4 transition-all duration-500 ease-out delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'
                    }`}
                >
                    <a href="#portfolio" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-cyan-500/30">
                        <span>View Our Work</span>
                        <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a href="#contact" className="bg-transparent border-2 border-slate-600 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;