import React from 'react';
import { CodeIcon, ShoppingCartIcon, BullseyeIcon, GearIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 hover:border-cyan-500/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col h-full">
        <div className="mb-4 text-cyan-400 transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

const Services: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });
    
    const servicesData = [
        {
            icon: <CodeIcon className="w-12 h-12" />,
            title: 'Custom Website Design',
            description: 'We create stunning, responsive websites tailored to your unique brand. Our designs captivate visitors and convert them into loyal customers.',
        },
        {
            icon: <ShoppingCartIcon className="w-12 h-12" />,
            title: 'E-commerce Stores That Sell',
            description: 'Launch a powerful online store that drives sales. We build secure, user-friendly e-commerce platforms designed to scale with your business.',
        },
        {
            icon: <BullseyeIcon className="w-12 h-12" />,
            title: 'Targeted SEO & Marketing',
            description: 'Increase your online visibility and attract more customers. Our proven SEO and marketing strategies are designed to deliver qualified traffic.',
        },
        {
            icon: <GearIcon className="w-12 h-12" />,
            title: 'Custom Apps & Automations',
            description: 'Gain a competitive edge with custom software. We build applications and automation tools to streamline processes and boost efficiency.',
        },
    ];

    return (
        <section 
            id="services" 
            ref={sectionRef}
            className="py-16 md:py-20 bg-slate-900"
        >
            <div className="container mx-auto px-6">
                <div 
                    className={`text-center mb-12 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Our Web Design Services</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">From stunning designs to powerful marketing, we offer everything your South Jersey business needs to succeed online.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map((service, index) => (
                         <div
                            key={index}
                            className={`transition-all duration-500 ease-out ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${150 + index * 100}ms` }}
                        >
                            <ServiceCard {...service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;