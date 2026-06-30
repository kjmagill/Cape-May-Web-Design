
import React, { useEffect } from 'react';
import { CodeIcon, SparklesIcon, BullseyeIcon, GearIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SERVICES_DATA = [
    {
        title: 'Custom Website Design',
        description: 'Fast, modern websites built to turn local traffic into actual customers. No templates or bloat, just clean design that works.',
        id: 'service-web-design',
        serviceType: 'Web Design'
    },
    {
        title: 'Brand Strategy & Identity',
        description: 'Complete visual identities designed to stand out. We build your logos, typography, and guidelines so your business looks established from day one.',
        id: 'service-branding',
        serviceType: 'Brand Strategy'
    },
    {
        title: 'Local SEO & Marketing',
        description: 'Get your business found on Google where it actually matters. We optimize your local presence to bring in real phone calls and walk-ins.',
        id: 'service-seo',
        serviceType: 'Search Engine Optimization'
    },
    {
        title: 'AI Workflows & Automations',
        description: 'Smart AI workflows, integrations, and autonomous digital agents built to eliminate tedious tasks and automate your daily business operations.',
        id: 'service-apps',
        serviceType: 'AI & Smart Automation'
    }
];

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string; indexVal: number }> = ({ icon, title, description, indexVal }) => (
    <div className="group bg-slate-800/50 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-slate-700/50 lg:hover:border-cyan-500/50 transition-all duration-500 transform lg:hover:-translate-y-2 lg:hover:shadow-2xl lg:hover:shadow-cyan-500/10 flex flex-col h-full relative overflow-hidden">
        <div className="mb-6 text-cyan-400 transition-transform duration-500 lg:group-hover:scale-110 lg:group-hover:rotate-3">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-white mb-4 tracking-tight transition-colors duration-300 lg:group-hover:text-cyan-400">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-lg">{description}</p>
    </div>
);

const Services: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
    
    const servicesData = [
        {
            icon: <CodeIcon className="w-12 h-12" />,
            ...SERVICES_DATA[0]
        },
        {
            icon: <SparklesIcon className="w-12 h-12" />,
            ...SERVICES_DATA[1]
        },
        {
            icon: <BullseyeIcon className="w-12 h-12" />,
            ...SERVICES_DATA[2]
        },
        {
            icon: <GearIcon className="w-12 h-12" />,
            ...SERVICES_DATA[3]
        },
    ];

    useEffect(() => {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Web Design Services",
            "itemListElement": SERVICES_DATA.map((service, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Service",
                    "@id": `https://www.capemaywebdesign.com/#${service.id}`,
                    "name": service.title,
                    "description": service.description,
                    "serviceType": service.serviceType,
                    "provider": {
                        "@id": "https://www.capemaywebdesign.com/#organization"
                    },
                    "areaServed": {
                        "@type": "AdministrativeArea",
                        "name": "Cape May County"
                    }
                }
            }))
        };

        try {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = 'services-structured-data';
            script.innerHTML = JSON.stringify(structuredData);
            document.head.appendChild(script);

            return () => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
        } catch (error) {
            console.error("Failed to inject Services JSON-LD script:", error);
        }
    }, []);


    return (
        <section 
            id="services" 
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-900"
            aria-labelledby="services-heading"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div 
                    className={`text-center mb-20 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    {/* 3. Pre-header accent framing matching the logo's custom line elements */}
                    <div className="flex items-center justify-center gap-3.5 mb-4">
                        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500"></span>
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 uppercase inline-block font-outfit">
                            Our Expertise
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="services-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">Our Professional Services</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">From modern web designs to intelligent AI-driven automations, we build the digital leverage your South Jersey business needs to win.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {servicesData.map((service, index) => (
                         <div
                            key={index}
                            className={`transition-all duration-500 ease-out ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${150 + index * 100}ms` }}
                        >
                            <ServiceCard {...service} indexVal={index + 1} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
