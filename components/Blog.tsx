import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { blogPosts } from './blogPosts';
import BlogCard from './BlogCard';

const Blog: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });
    
    // Show the 3 most recent posts
    const recentPosts = blogPosts.slice(0, 3);

    return (
        <section 
            id="blog" 
            ref={sectionRef}
            className="py-16 md:py-20 bg-slate-800"
            aria-labelledby="blog-heading"
        >
            <div className="container mx-auto px-6">
                <div 
                    className={`text-center mb-12 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 id="blog-heading" className="text-3xl sm:text-4xl font-extrabold text-white">Fuel Your Growth: Digital Marketing Insights</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Actionable advice and local marketing tips to help your business thrive online.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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