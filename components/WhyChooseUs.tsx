import React from 'react';
import { InterlockingCirclesIcon, MapPinIcon, ChartTrendingUpIcon, UserIcon, InfinityIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group bg-slate-900/40 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-slate-700/50 text-center transition-all duration-500 transform lg:hover:-translate-y-2 lg:hover:shadow-2xl lg:hover:shadow-cyan-500/10 flex flex-col h-full">
        <div className="mx-auto mb-8 text-cyan-400 w-20 h-20 flex items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700 transition-all duration-500 lg:group-hover:scale-110 lg:group-hover:rotate-3 lg:group-hover:border-cyan-500/50 flex-shrink-0 shadow-inner">
            {icon}
        </div>
        <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight transition-colors duration-300 lg:group-hover:text-cyan-400">{title}</h3>
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
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">We don't just design websites. We integrate advanced AI-driven workflows and automation systems to help local Cape May County businesses scale.</p>
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

                {/* Modern AI & Automation Tech Stack / Capability Panel */}
                <div 
                    className={`mt-24 bg-slate-900/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-700/50 relative overflow-hidden transition-all duration-1000 ease-out shadow-[0_0_50px_rgba(6,182,212,0.05)] hover:shadow-[0_0_60px_rgba(6,182,212,0.12)] ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: '500ms' }}
                >
                    {/* Atmospheric Glow Elements */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Section Header */}
                    <div className="relative z-10 max-w-3xl mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold tracking-wider uppercase mb-4 shadow-sm shadow-cyan-500/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            [ Intelligent Automation ]
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-white italic tracking-tight leading-tight">
                            Autonomous Agency Solutions
                        </h3>
                        <p className="text-slate-400 mt-3 text-lg leading-relaxed">
                            We go beyond static page layouts. We design and deploy custom digital agents and robust automation pipelines that run your business operations 24/7.
                        </p>
                    </div>

                    {/* 3 Large, Impactful Cards */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-slate-900/60 p-8 rounded-2xl border border-slate-700/50 lg:hover:border-cyan-500/40 lg:hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between h-full shadow-lg shadow-black/20 lg:hover:-translate-y-1">
                            <div>
                                <div className="text-cyan-400 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 lg:group-hover:scale-110 lg:group-hover:border-cyan-500/40 transition-all duration-300 mb-6 shadow-inner">
                                    <ChartTrendingUpIcon className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-cyan-400 font-extrabold text-[11px] tracking-wider block mb-2">01 // AUTOMATIONS</span>
                                <h4 className="text-white font-extrabold text-xl tracking-tight lg:group-hover:text-cyan-300 transition-colors duration-300">Smart Pipelines</h4>
                            </div>
                            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
                                Automate lead capture, score prospects, draft service contracts, and synchronize your CRM platforms seamlessly with no manual data entry.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-slate-900/60 p-8 rounded-2xl border border-slate-700/50 lg:hover:border-cyan-500/40 lg:hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between h-full shadow-lg shadow-black/20 lg:hover:-translate-y-1">
                            <div>
                                <div className="text-cyan-400 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 lg:group-hover:scale-110 lg:group-hover:border-cyan-500/40 transition-all duration-300 mb-6 shadow-inner">
                                    <UserIcon className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-cyan-400 font-extrabold text-[11px] tracking-wider block mb-2">02 // DIGITAL AGENTS</span>
                                <h4 className="text-white font-extrabold text-xl tracking-tight lg:group-hover:text-cyan-300 transition-colors duration-300">Digital Employees</h4>
                            </div>
                            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
                                Deploy highly trained conversational agents that answer customer inquiries, schedule client meetings, and qualify incoming South Jersey leads 24/7.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-slate-900/60 p-8 rounded-2xl border border-slate-700/50 lg:hover:border-cyan-500/40 lg:hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between h-full shadow-lg shadow-black/20 lg:hover:-translate-y-1">
                            <div>
                                <div className="text-cyan-400 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 lg:group-hover:scale-110 lg:group-hover:border-cyan-500/40 transition-all duration-300 mb-6 shadow-inner">
                                    <InfinityIcon className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-cyan-400 font-extrabold text-[11px] tracking-wider block mb-2">03 // INGESTION</span>
                                <h4 className="text-white font-extrabold text-xl tracking-tight lg:group-hover:text-cyan-300 transition-colors duration-300">System Glue</h4>
                            </div>
                            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
                                Connect legacy databases, email accounts, and billing software like QuickBooks directly to state-of-the-art AI systems with zero friction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;