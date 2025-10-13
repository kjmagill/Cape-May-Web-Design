import React from 'react';
import { SparklesIcon, MapPinIcon, BullseyeIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group bg-slate-900/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-slate-700 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
        <div className="mx-auto mb-6 text-cyan-400 w-16 h-16 flex items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700 transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
);

const WhyChooseUs: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });

    const features = [
        {
            icon: <MapPinIcon className="w-8 h-8" />,
            title: 'Truly Local Expertise',
            description: "We're based right here in Cape May. We understand the local market, the tourist seasons, and what makes a shore town business thrive online.",
        },
        {
            icon: <SparklesIcon className="w-8 h-8" />,
            title: 'Dedicated, Personalized Service',
            description: "You're not just another client. We work directly with you to understand your unique goals, ensuring a final product that truly represents your brand.",
        },
        {
            icon: <BullseyeIcon className="w-8 h-8" />,
            title: 'Focused on Your Results',
            description: 'Our primary goal is your success. We design websites that don\'t just look good—they attract customers, generate leads, and grow your bottom line.',
        },
    ];

    return (
        <section
            id="why-us"
            ref={sectionRef}
            className="relative py-20 bg-slate-800"
        >
             <div className="absolute inset-y-0 w-full h-full bg-grid-slate-700/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="container mx-auto px-6 relative">
                <div 
                    className={`text-center mb-16 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-4xl font-extrabold text-white">The Cape May Advantage</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">We're more than a web design agency; we're your local partner dedicated to the success of businesses in our community.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
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