import React from 'react';
import { InterlockingCirclesIcon, MapPinIcon, ChartTrendingUpIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group bg-slate-900/40 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-slate-700/50 text-center transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col h-full">
        <div className="mx-auto mb-8 text-cyan-400 w-20 h-20 flex items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-cyan-500/50 flex-shrink-0 shadow-inner">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight italic transition-colors duration-300 group-hover:text-cyan-400">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-lg">{description}</p>
    </div>
);

const WhyChooseUs: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

    const features = [
        {
            icon: <MapPinIcon className="w-8 h-8" />,
            title: 'We Know the Shore',
            description: "No generic templates or distant agencies. We live here, shop here, and understand exactly what makes South Jersey businesses tick.",
        },
        {
            icon: <InterlockingCirclesIcon className="w-8 h-8" />,
            title: 'One-on-One Partner',
            description: "You work directly with us, not account managers. We talk face-to-face, understand your real goals, and deliver exactly what you need.",
        },
        {
            icon: <ChartTrendingUpIcon className="w-8 h-8" />,
            title: 'Built for Real Results',
            description: "A pretty website is useless if it doesn't bring in business. We build with a single focus: getting you more calls, more leads, and more sales.",
        },
    ];

    return (
        <section
            id="why-us"
            ref={sectionRef}
            className="relative py-24 md:py-32 bg-slate-800 overflow-hidden"
            aria-labelledby="why-us-heading"
        >
             <div className="absolute inset-y-0 w-full h-full bg-grid-pattern-20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="container mx-auto px-6 relative max-w-7xl">
                <div 
                    className={`text-center mb-20 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    {/* 3. Pre-header accent framing matching the logo's custom line elements */}
                    <div className="flex items-center justify-center gap-3.5 mb-4">
                        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500"></span>
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 uppercase inline-block font-outfit">
                            Why Partner With Us
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="why-us-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">The Local Advantage</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">We don't just design websites. We partner with local Cape May County businesses to help them win.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-500 ease-out ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${150 + index * 100}ms` }}
                        >
                            <FeatureCard {...feature} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;