import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="absolute inset-0 bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="relative z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                    Crafting <span className="text-cyan-400">Digital Experiences</span>
                    <br />
                    in Cape May
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                    We build beautiful, high-performance websites that capture the essence of your brand and grow your business.
                </p>
                <div className="flex justify-center space-x-4">
                    <a href="#portfolio" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30">
                        View Our Work
                    </a>
                    <a href="#contact" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;