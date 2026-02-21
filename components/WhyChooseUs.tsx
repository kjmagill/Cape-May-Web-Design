import React from 'react';
import { InterlockingCirclesIcon, MapPinIcon, ChartTrendingUpIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group bg-slate-900/40 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-slate-700/50 text-center transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col h-full">
        <div className="mx-auto mb-8 text-cyan-400 w-20 h-20 flex items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-cyan-500/50 flex-shrink-0 shadow-inner">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-lg">{description}</p>
    </div>
);

const WhyChooseUs: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

    const features = [
        {
            icon: <MapPinIcon className="w-8 h-8" />,
            title: 'Deep Local Market Insight',
            description: "Based in Cape May, we know the shore. We leverage our understanding of local seasons and market trends to build websites that truly connect.",
        },
        {
            icon: <InterlockingCirclesIcon className="w-8 h-8" />,
            title: 'A Personalized Approach to Every Project',
            description: "You're more than a client to us. We work closely with you to understand your specific goals and craft a solution that perfectly fits your vision.",
        },
        {
            icon: <ChartTrendingUpIcon className="w-8 h-8" />,
            title: 'A Strategic Focus on Growth',
            description: 'We measure our success by yours. Our websites are engineered not just to look good, but to generate leads, drive sales, and grow your business.',
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
                    <h2 id="why-us-heading" className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">The Local Advantage</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">We're more than a web design agency; we're your local partner dedicated to the success of businesses in our community.</p>
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