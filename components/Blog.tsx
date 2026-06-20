import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { blogPosts } from './blogPosts';
import BlogCard from './BlogCard';

const Blog: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
    
    // Show the 3 most recent posts
    const recentPosts = blogPosts.slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": recentPosts.map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "BlogPosting",
                "headline": post.title,
                "author": {
                    "@type": "Person",
                    "name": post.author
                },
                "datePublished": post.date,
                "url": post.url,
                "image": post.imageUrl,
                "description": post.excerpt
            }
        }))
    };

    return (
        <section 
            id="blog" 
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-800"
            aria-labelledby="blog-heading"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
                            Insights & Strategy
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="blog-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">Fuel Your Growth: Digital Insights</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">Actionable advice and local marketing tips to help your business thrive online.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {recentPosts.map((post, index) => (
                         <div
                            key={index}
                            className={`transition-all duration-500 ease-out ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ transitionDelay: `${150 + index * 100}ms` }}
                        >
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;