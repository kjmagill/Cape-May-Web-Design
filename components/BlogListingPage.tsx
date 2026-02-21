import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { blogPosts } from './blogPosts';
import BlogCard from './BlogCard';
import { useSeo } from '../hooks/useSeo';

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
            <main className="pt-32 md:pt-40 pb-24 md:pb-32">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div 
                        className={`text-center mb-20 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">The Jersey Shore Business &amp; Web Journal</h1>
                        <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
                           A curated collection of web design trends, local SEO strategies, and digital marketing insights to help businesses in South Jersey succeed.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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