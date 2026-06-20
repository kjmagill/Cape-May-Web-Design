import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useImageLoader } from '../hooks/useImageLoader';
import { ArrowRightIcon } from './icons';

const PortfolioItem: React.FC<{ imgUrl: string; title: string; category: string }> = ({ imgUrl, title, category }) => {
    const isLoading = useImageLoader(imgUrl);

    return (
        <div className="group flex flex-col h-full">
            <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/2] transition-all duration-500 lg:hover:shadow-2xl lg:hover:shadow-cyan-500/20 bg-slate-700 border border-slate-700/50 lg:hover:border-cyan-500/50">
                {isLoading && (
                    <div className="absolute inset-0 bg-slate-700 animate-pulse z-0"></div>
                )}
                <img 
                    src={imgUrl} 
                    alt={`Portfolio image for ${title}, a ${category} project.`} 
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transform lg:group-hover:scale-110 transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} filter brightness-[0.85] saturate-[0.8] lg:group-hover:brightness-50 lg:group-hover:blur-[2px]`} 
                />
                
                {/* Desktop Hover Overlay - Hidden on Mobile */}
                <div className="hidden lg:flex absolute inset-0 flex flex-col justify-center items-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-900/40 backdrop-blur-[2px]">
                    <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        {title}
                    </h3>
                    <div className="w-12 h-0.5 bg-cyan-500 my-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 ease-out"></div>
                    <p className="text-cyan-400 font-bold text-xs uppercase tracking-[0.25em] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 ease-out">
                        {category}
                    </p>
                </div>
            </div>
            
            {/* Mobile Info - Visible only on Mobile (< 1024px) */}
            <div className="mt-5 lg:hidden px-1">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-white text-xl font-bold tracking-tight leading-tight">{title}</h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                         <ArrowRightIcon className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-cyan-400/80 font-bold text-[10px] uppercase tracking-[0.2em] mt-1.5">{category}</p>
            </div>
        </div>
    );
};


const Portfolio: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

    const projects = [
        { 
            imgUrl: 'https://kjmagill.com/img/projects/gp_social.png', 
            title: 'Golden Paver Restorations', 
            category: 'Paver Cleaning and Restoration Services', 
            url: 'https://goldenpaver.com' 
        },
        { 
            imgUrl: 'https://kjmagill.com/img/projects/cantocurb_project.png', 
            title: 'CanToCurb.com', 
            category: 'Trash and Recycling Valet Services', 
            url: 'https://cantocurb.com' 
        },
        { 
            imgUrl: 'https://kjmagill.com/img/projects/todesko_banner.jpg', 
            title: 'Todesko Bookkeeping', 
            category: 'Professional Bookkeeping Services', 
            url: 'https://todeskobookkeeping.com' 
        },
        { 
            imgUrl: 'https://kjmagill.com/img/projects/tmc_project.png', 
            title: 'Tom Magill Construction', 
            category: 'NJ Home Builder and Remodeler', 
            url: 'https://tommagillconstruction.com' 
        },
        { 
            imgUrl: 'https://kjmagill.com/img/projects/contrax.jpg', 
            title: 'Contrax.finance', 
            category: 'Permissionless DeFi Vaults', 
            url: 'https://contrax.finance' 
        },
        { 
            imgUrl: 'https://kjmagill.com/img/projects/care_for_life.jpg', 
            title: 'Care For Life', 
            category: 'Global Non-profit Organization', 
            url: 'https://careforlife.org' 
        },
    ];

    return (
        <section 
            id="portfolio" 
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-800"
            aria-labelledby="portfolio-heading"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div 
                    className={`text-center mb-20 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    {/* 3. Pre-header accent framing matching the logo's custom line elements */}
                    <div className="flex items-center justify-center gap-3.5 mb-4">
                        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-blue-500"></span>
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase inline-block">
                            Successful Deployments
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-blue-500"></span>
                    </div>
                    <h2 id="portfolio-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">Our Recent Work</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">Take a look at some of the stunning, high-performance websites and applications we've recently delivered.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.url}
                            target={project.url.startsWith('http') ? '_blank' : '_self'}
                            rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`block transition-all duration-500 ease-out rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${150 + index * 100}ms` }}
                            aria-label={`View project: ${project.title}`}
                        >
                            <PortfolioItem {...project} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;