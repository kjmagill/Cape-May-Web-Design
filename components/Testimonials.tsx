import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TestimonialCard: React.FC<{ quote: string; name: string; company: string }> = ({ quote, name, company }) => (
    <figure className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-slate-700/50 flex flex-col h-full transition-all duration-500 transform hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
        <blockquote className="text-slate-300 italic mb-8 flex-grow text-lg leading-relaxed">
            <p>"{quote}"</p>
        </blockquote>
        <figcaption className="flex items-center pt-6 border-t border-slate-700/50">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 flex items-center justify-center font-bold text-white text-xl mr-4 flex-shrink-0 shadow-lg shadow-cyan-500/20" aria-hidden="true">
                {name.charAt(0)}
            </div>
            <div>
                <cite className="font-bold text-white not-italic text-lg tracking-tight">{name}</cite>
                <div className="text-cyan-400/80 text-sm font-medium uppercase tracking-wider mt-0.5">{company}</div>
            </div>
        </figcaption>
    </figure>
);

const Testimonials: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

    const testimonialsData = [
        {
            quote: "When we started Golden Paver, we didn't even have a logo, let alone a website. KJ helped us build our brand from the ground up and created a website that looks like a well-established company. We're already seeing local leads coming in directly through the new site!",
            name: "Josh & Chris",
            company: "Golden Paver Owners",
        },
        {
            quote: "As a CPA and small business owner, I needed a website that projected professionalism and expertise to my clients. KJ designed a clean, modern site that makes scheduling consultations incredibly simple. It’s one of the best investments I’ve made in my business so far.",
            name: "Lauren T.",
            company: "Certified Public Accountant",
        },
        {
            quote: "My online business was basically invisible before I found this guy. He built me a great-looking website and somehow got me to the top of Google search results for my niche. Now, my phone's constantly buzzing with new sales & leads. This has completely changed the game for me.",
            name: "Mike M.",
            company: "E-commerce Entrepreneur",
        },
    ];

    return (
        <section 
            id="testimonials" 
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-900"
            aria-labelledby="testimonials-heading"
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
                            Local Testimonials
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="testimonials-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">Trusted by Shore Businesses</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">Hear directly from local business owners about how our work has impacted their success.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {testimonialsData.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-500 ease-out ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${150 + index * 100}ms` }}
                        >
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;