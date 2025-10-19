import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const PortfolioItem: React.FC<{ imgUrl: string; title: string; category: string }> = ({ imgUrl, title, category }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{title}</h3>
            <p className="text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">{category}</p>
        </div>
    </div>
);

const Portfolio: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

    const projects = [
        { imgUrl: 'https://i.postimg.cc/L5qwBkSd/golden-paver.png', title: 'Golden Paver Restorations', category: 'goldenpaver.com', url: 'https://goldenpaver.com' },
        { imgUrl: 'https://kjmagill.com/img/projects/contrax.jpg', title: 'Contrax', category: 'contrax.finance', url: 'https://contrax.finance' },
        { imgUrl: 'https://kjmagill.com/img/projects/todesko_banner.jpg', title: 'Todesko Bookkeeping', category: 'todeskobookkeeping.com', url: 'https://todeskobookkeeping.com' },
        { imgUrl: 'https://kjmagill.com/img/projects/kids_fly.jpg', title: 'Kids Fly', category: 'React web app', url: 'https://github.com/KidsFly-1/Frontend/tree/master' },
        { imgUrl: 'https://kjmagill.com/img/projects/care_for_life.jpg', title: 'Care For Life', category: 'Offline-first Android app', url: 'https://careforlife.org' },
        { imgUrl: 'https://kjmagill.com/img/projects/airbnb_tool.jpg', title: 'Airbnb Host Tool', category: 'React web app', url: 'https://github.com/AirBnB-dream-team/Front-End' },
    ];

    return (
        <section 
            id="portfolio" 
            ref={sectionRef}
            className="py-16 md:py-20 bg-slate-800"
        >
            <div className="container mx-auto px-6">
                <div 
                    className={`text-center mb-12 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Showcasing Local Excellence</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">We're proud to share the stunning websites we've built for businesses right here in our coastal community.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.url}
                            target={project.url.startsWith('http') ? '_blank' : '_self'}
                            rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`block transition-all duration-500 ease-out ${
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