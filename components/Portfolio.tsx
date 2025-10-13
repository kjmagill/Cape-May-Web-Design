import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const PortfolioItem: React.FC<{ imgUrl: string; title: string; category: string }> = ({ imgUrl, title, category }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex flex-col justify-end p-6">
            <h3 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{title}</h3>
            <p className="text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">{category}</p>
        </div>
    </div>
);

const Portfolio: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

    const projects = [
        { imgUrl: 'https://picsum.photos/id/1015/800/600', title: 'The Beachcomber Cafe', category: 'Restaurant & Hospitality' },
        { imgUrl: 'https://picsum.photos/id/1040/800/600', title: 'Sunset Realty', category: 'Real Estate' },
        { imgUrl: 'https://picsum.photos/id/1060/800/600', title: 'Ocean Breeze Boutique', category: 'E-commerce' },
        { imgUrl: 'https://picsum.photos/id/22/800/600', title: 'Cape May Adventures', category: 'Tourism & Events' },
        { imgUrl: 'https://picsum.photos/id/219/800/600', title: 'Lighthouse Legal', category: 'Professional Services' },
        { imgUrl: 'https://picsum.photos/id/305/800/600', title: 'Saltwater Artisans', category: 'Portfolio & Gallery' },
    ];

    return (
        <section 
            id="portfolio" 
            ref={sectionRef}
            className={`py-20 bg-slate-800 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-white">Featured Projects</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">A glimpse into the digital solutions we've crafted for our clients.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <PortfolioItem key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;