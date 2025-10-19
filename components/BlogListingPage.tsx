import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { blogPosts, BlogPost } from './blogPosts';
import { CalendarDaysIcon, UserIcon, ArrowRightIcon } from './icons';
import { useSeo } from '../hooks/useSeo';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <div className="group bg-slate-800 rounded-2xl shadow-lg border border-slate-700 h-full flex flex-col overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:border-cyan-500/80 hover:shadow-2xl hover:shadow-cyan-500/10">
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden aspect-[16/9]">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg group-hover:shadow-black/30" />
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
                 <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-200">{post.title}</a>
            </h3>
            <p className="text-slate-400 mb-4">{post.excerpt}</p>
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-auto text-cyan-400 font-semibold inline-flex items-center space-x-2 group-hover:text-cyan-300">
                <span>Read More</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
        </div>
    </div>
);

const BlogListingPage: React.FC = () => {
    useSeo({
        title: 'Blog | Cape May Web Design',
        description: 'A curated collection of web design trends, local SEO strategies, and digital marketing insights to help businesses in South Jersey succeed.',
        canonicalUrl: 'https://www.capemaywebdesign.com/blog'
    });

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100); // small delay to ensure render
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-300">
            <Header />
            <main className="pt-24 md:pt-32 pb-16 md:pb-20">
                <div className="container mx-auto px-6">
                    <div 
                        className={`text-center mb-16 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white">The Jersey Shore Business &amp; Web Journal</h1>
                        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                           A curated collection of web design trends, local SEO strategies, and digital marketing insights to help businesses in South Jersey succeed.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <div
                                key={post.slug}
                                className={`transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${150 + index * 100}ms` }}
                            >
                                <BlogCard post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogListingPage;