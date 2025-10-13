import React from 'react';
import { SparklesIcon, MapPinIcon, BullseyeIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-slate-900/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-slate-700 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-cyan-500/10">
        <div className="mx-auto mb-6 text-cyan-400 w-16 h-16 flex items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
);

const WhyChooseUs: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

    const features = [
        {
            icon: <MapPinIcon className="w-8 h-8" />,
            title: 'Local Cape May Expertise',
            description: "We're not just developers; we're your neighbors. We understand the unique market and charm of Cape May, helping you connect with the community.",
        },
        {
            icon: <SparklesIcon className="w-8 h-8" />,
            title: 'Personalized, Boutique Service',
            description: "You're more than just a project. We work closely with you, offering dedicated support and a personalized strategy from start to finish.",
        },
        {
            icon: <BullseyeIcon className="w-8 h-8" />,
            title: 'Commitment to Your Success',
            description: 'We build websites that get results. Our focus is on creating a powerful online asset that drives growth and achieves your business goals.',
        },
    ];

    return (
        <section
            id="why-us"
            ref={sectionRef}
            className={`relative py-20 bg-slate-800 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
             <div className="absolute inset-y-0 w-full h-full bg-grid-slate-700/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="container mx-auto px-6 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-white">Why Choose Us?</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Your partner in digital excellence, right here in Cape May.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;