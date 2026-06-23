
import React, { useEffect } from 'react';
import { CodeIcon, SparklesIcon, BullseyeIcon, GearIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SERVICES_DATA = [
    {
        title: 'Custom Website Design',
        description: 'Stunning, responsive websites tailored for Cape May businesses. Our designs captivate visitors and convert them into loyal customers.',
        id: 'service-web-design',
        serviceType: 'Web Design'
    },
    {
        title: 'Brand Strategy & Identity',
        description: 'We craft cohesive brand identities for South Jersey startups and established shops. From logos to strategy, we ensure you make an impact.',
        id: 'service-branding',
        serviceType: 'Brand Strategy'
    },
    {
        title: 'Local SEO & Marketing',
        description: 'Dominate local search in Wildwood, Ocean City, and Cape May. Our proven SEO strategies are designed to deliver qualified local traffic.',
        id: 'service-seo',
        serviceType: 'Search Engine Optimization'
    },
    {
        title: 'Custom Apps & Automations',
        description: 'Gain a competitive edge with custom software. We build applications and automation tools for businesses throughout Cape May County.',
        id: 'service-apps',
        serviceType: 'Software Development'
    }
];

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string; indexVal: number }> = ({ icon, title, description, indexVal }) => (
    <div className="group bg-slate-800/50 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col h-full relative overflow-hidden">
        {/* Precise brand numbering style mapped after technical logs */}
        <div className="absolute top-0 right-0 p-5 font-mono text-xs text-slate-700 group-hover:text-cyan-500/20 font-semibold transition-colors duration-500 select-none">
            [0{indexVal}]
        </div>
        <div className="mb-6 text-cyan-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-white mb-4 tracking-tight italic transition-colors duration-300 group-hover:text-cyan-400">{title}</h3>
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
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500 uppercase inline-block font-outfit">
                            Elite Capabilities
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="services-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">Our Professional Services</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">From stunning designs to powerful marketing, we offer everything your South Jersey business needs to succeed online.</p>
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
