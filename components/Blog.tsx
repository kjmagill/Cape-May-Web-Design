import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { blogPosts, BlogPost } from './blogPosts';
import { CalendarDaysIcon, UserIcon, ArrowRightIcon } from './icons';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <div className="group bg-slate-800 rounded-xl shadow-lg border border-slate-700 h-full flex flex-col overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:border-cyan-500/80 hover:shadow-2xl hover:shadow-cyan-500/10">
        <a href={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/9]">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        </a>
        <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4 text-sm text-slate-400 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{post.date}</span>
                </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 flex-grow">
                 <a href={`/blog/${post.slug}`} className="hover:text-cyan-400 transition-colors duration-200">{post.title}</a>
            </h3>
            <p className="text-slate-400 mb-4">{post.excerpt}</p>
            <a href={`/blog/${post.slug}`} className="mt-auto text-cyan-400 font-semibold inline-flex items-center space-x-2 group-hover:text-cyan-300">
                <span>Read More</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
        </div>
    </div>
);

const Blog: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });
    
    // Show the 3 most recent posts
    const recentPosts = blogPosts.slice(0, 3);

    return (
        <section 
            id="blog" 
            ref={sectionRef}
            className="py-16 md:py-20 bg-slate-800"
        >
            <div className="container mx-auto px-6">
                <div 
                    className={`text-center mb-12 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Fuel Your Growth: Digital Marketing Insights</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">Actionable advice and local marketing tips to help your business thrive online.</p>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
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
                <div className="text-center mt-16">
                     <a href="/blog" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg shadow-cyan-500/30">
                        <span>View All Posts</span>
                        <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Blog;