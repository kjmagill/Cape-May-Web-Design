import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface TechItem {
    name: string;
    description: string;
    icon: React.ReactNode;
}

const TechStack: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });

    const technologies: TechItem[] = [
        {
            name: "React",
            description: "High-Performance Interfaces",
            icon: (
                <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5 stroke-current fill-none" strokeWidth={1.5}>
                    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                </svg>
            )
        },
        {
            name: "Next.js",
            description: "Server-Authoritative Apps",
            icon: (
                <svg viewBox="0 0 180 180" className="w-5 h-5 fill-current">
                    <path fillRule="evenodd" clipRule="evenodd" d="M90 180c49.706 0 90-40.294 90-90S139.706 0 90 0 0 40.294 0 90s40.294 90 90 90zm33.582-117.06h-5.068v39.705l-33.864-47.534C80.803 51.523 75.885 50 70.36 50H65v80h10.37V74.12l34.86 48.91c4.542 4.41 10.311 6.97 16.536 6.97h6.816V62.94zm-14.816 12.94h8v33.42c0 5.58-4.42 10.58-10.58 10.58s-10.58-5-10.58-10.58V75.88h8c5.29 0 5.16 0 5.16 0z" />
                </svg>
            )
        },
        {
            name: "TypeScript",
            description: "Robust, Type-Safe Logic",
            icon: (
                <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
                    <path d="M0 0h100v100H0z" fill="none"/>
                    <path d="M8 8h84v84H8z" fill="none" stroke="currentColor" strokeWidth={6}/>
                    <path d="M42 36h-8v6h4v30h6V42h4v-6zm32 11c-2.4-1.8-6-2.5-9-2.5-8 0-11.5 5.5-11.5 12.5s3 12.5 10 12.5c3.5 0 6.5-.8 8.5-2.5l-2-4.5c-1.5 1-3.5 1.5-5.5 1.5-4 0-5.5-3-5.5-7s1.5-7 5.5-7c2 0 3.5.5 4.5 1.2z" />
                </svg>
            )
        },
        {
            name: "Node.js",
            description: "Highly Scalable APIs",
            icon: (
                <svg viewBox="0 0 256 284" className="w-5 h-5 fill-current">
                    <path d="M141.2 5.1c-8.2-4.7-18.2-4.7-26.3 0L24.7 57.1C16.6 61.8 11.6 70.4 11.6 79.8v104.1c0 9.4 5 18 13.1 22.7l90.1 52c8.2 4.7 18.2 4.7 26.3 0l90.1-52c8.2-4.7 13.1-13.3 13.1-22.7V79.8c0-9.4-5-18-13.1-22.7L141.2 5.1z" fill="none" stroke="currentColor" strokeWidth="12" />
                    <path d="M128 142.1m-35 0a35 35 0 1 0 70 0 35 35 0 1 0 -70 0" />
                </svg>
            )
        },
        {
            name: "GitHub",
            description: "Direct Client Control",
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
            )
        },
        {
            name: "Shopify",
            description: "Local Retail E-commerce",
            icon: (
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                    <path d="M422.5 168.3c-6.1-4.3-13.6-6.3-21.1-5.6l-24.9 2.2c-5.8-21.2-16.1-40.8-30-57.5-1.6-1.9-3.2-3.8-4.9-5.6-13.3-14.6-29.6-26.2-47.9-33.8-19.1-8-39.6-11.8-60.1-11.4-20.5.4-40.7 5-59.5 13.8-18 8.4-33.8 20.7-46.3 36-12.8 15.6-22.1 33.7-27.5 53.2l-28.7-2.6c-7.5-.7-15 1.3-21.1 5.6-6.1 4.3-10.2 11-11.4 18.5l-26.5 174.4c-1.8 11.6 2 23.3 10.1 31.8 8.1 8.5 19.6 13.3 31.5 13l308.2-7.5c11.9-.3 23.1-5.5 30.7-14.4s11.2-20.6 9.8-32.3L434 186.8c-1.3-7.5-5.4-14.2-11.5-18.5zM232.8 108.4c12-5.6 25-8.5 38.1-8.7 13.2-.2 26.3 2.1 38.5 6.9 11.7 4.6 22.2 12 30.7 21.4 8 8.8 14.1 19.1 18.1 30.2l-149.3 13.2c1.9-22.9 11.1-44.5 23.9-63z" />
                </svg>
            )
        },
        {
            name: "Booqable",
            description: "Advanced Rental & Booking Engines",
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5v14h3a4.5 4.5 0 1 0 0-9H9" />
                    <circle cx="13.5" cy="14" r="1.5" />
                </svg>
            )
        },
        {
            name: "Vercel",
            description: "Serverless Global Hosting",
            icon: (
                <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                    <path fillRule="evenodd" d="M256,48,496,464H16Z" />
                </svg>
            )
        }
    ];

    return (
        <section 
            id="tech-stack" 
            ref={sectionRef}
            className="py-5 sm:py-6 bg-slate-950/20 border-y border-slate-800/40 relative overflow-hidden"
            aria-labelledby="tech-stack-heading"
        >
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div 
                    className={`flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                >
                    {/* Left Mini label */}
                    <div className="flex-shrink-0 text-center lg:text-left">
                        <span id="tech-stack-heading" className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-slate-500 uppercase">
                            Engineered With
                        </span>
                    </div>

                    {/* Logos flex list */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-3 sm:gap-x-10 md:gap-x-12">
                        {technologies.map((tech, index) => (
                            <div 
                                key={index} 
                                className="group flex items-center gap-2.5 transition-all duration-300"
                                title={`${tech.name} — ${tech.description}`}
                            >
                                <div 
                                    className="text-slate-500 hover:text-cyan-400 transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-105 flex items-center justify-center"
                                    aria-label={tech.name}
                                >
                                    {tech.icon}
                                </div>
                                <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-500 group-hover:text-slate-300 transition-colors duration-300 select-none">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
