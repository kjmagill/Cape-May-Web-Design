import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ProcessStep {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    icon: React.ReactNode;
}

const Process: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15, triggerOnce: true });

    const steps: ProcessStep[] = [
        {
            number: "01",
            badge: "Security",
            title: "Private Repositories",
            subtitle: "Tailored, secure development environments",
            description: "Every web application or automation suite we design starts inside a secure, private GitHub repository. Your custom-engineered source code, core proprietary assets, and configuration structures are fully shielded from the public.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
            )
        },
        {
            number: "02",
            badge: "Accountability",
            title: "Client Transparency",
            subtitle: "Full developer access to your project",
            description: "We believe in radical transparency. We provision direct, read-only developer access to your private repository on day one. You can monitor the commit logs, watch active progress, and verify that your system is built correctly.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            )
        },
        {
            number: "03",
            badge: "Control",
            title: "Zero-Fee Content Editing",
            subtitle: "Update text and images directly inside GitHub",
            description: "Avoid expensive retainer contracts and high hourly rates. We train you and your staff to perform straightforward text adjustments, adjust seasonal hours, or upload fresh images directly in GitHub's intuitive visual editor with zero code required.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            )
        },
        {
            number: "04",
            badge: "Flexibility",
            title: "Headless Content Tools",
            subtitle: "Seamless editors for complex data fields",
            description: "For more complex, data-heavy content needs, we build lightweight headless content editors. Effortlessly publish news updates, adjust inventory, manage local SEO keywords, or showcase new portfolio entries in a fast, customized interface.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
            )
        }
    ];

    return (
        <section 
            id="process" 
            ref={sectionRef}
            className="relative py-24 md:py-32 bg-slate-800 overflow-hidden border-t border-slate-700/30"
            aria-labelledby="process-heading"
        >
            <div className="absolute inset-y-0 w-full h-full bg-grid-pattern-20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="container mx-auto px-6 relative max-w-7xl">
                
                {/* Header Section */}
                <div 
                    className={`text-center mb-20 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    <div className="flex items-center justify-center gap-3.5 mb-4">
                        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500"></span>
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 uppercase inline-block">
                            Tailored Workflow
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="process-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">
                        Our Transparent Process
                    </h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
                        We don't hide your code behind proprietary platforms. We combine secure development, complete visibility, and intuitive self-management tools to keep you in total control.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-700 ease-out ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${150 + index * 120}ms` }}
                        >
                            <div className="group bg-slate-950/40 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-700/50 lg:hover:border-cyan-500/30 transition-all duration-500 transform lg:hover:-translate-y-1 lg:hover:shadow-2xl lg:hover:shadow-cyan-500/5 flex flex-col h-full relative overflow-hidden">
                                
                                {/* Background Decorative Number */}
                                <div className="absolute right-6 top-2 font-mono text-8xl font-black text-slate-800/10 pointer-events-none select-none transition-colors duration-500 lg:group-hover:text-cyan-500/5">
                                    {step.number}
                                </div>

                                <div className="flex items-start gap-5 mb-6">
                                    <div className="text-cyan-400 w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-900/85 border border-slate-700/80 transition-all duration-500 lg:group-hover:scale-110 lg:group-hover:border-cyan-500/50 flex-shrink-0 shadow-inner">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <span className="font-mono text-cyan-400 font-extrabold text-[10px] sm:text-[11px] tracking-wider block mb-1 uppercase">
                                            {step.number} // {step.badge}
                                        </span>
                                        <h3 className="text-2xl font-black text-white tracking-tight transition-colors duration-300 lg:group-hover:text-cyan-400">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                                <h4 className="text-slate-300 font-bold text-base sm:text-lg mb-3 tracking-wide">
                                    {step.subtitle}
                                </h4>
                                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Process;
