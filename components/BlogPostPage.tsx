import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { blogPosts } from './blogPosts';
import { ArrowLeftIcon, CalendarDaysIcon, UserIcon } from './icons';
import { useSeo } from '../hooks/useSeo';

const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
    const post = blogPosts.find(p => p.slug === slug);
    
    useSeo({
        title: post ? `${post.title} | Cape May Web Design` : 'Post Not Found | Cape May Web Design',
        description: post ? post.excerpt : "Sorry, we couldn't find the blog post you were looking for.",
        ogImage: post ? post.imageUrl : undefined,
        twitterImage: post ? post.imageUrl : undefined,
        canonicalUrl: post ? `https://www.capemaywebdesign.com/blog/${post.slug}` : undefined
    });
    
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [slug]);

    if (!post) {
        return (
             <div className="bg-slate-900 min-h-screen text-slate-300">
                <Header />
                <main className="pt-24 md:pt-32 pb-16 md:pb-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl font-extrabold text-white mb-6">Post Not Found</h1>
                        <p className="text-slate-400 mb-8">Sorry, we couldn't find the blog post you were looking for.</p>
                        <a href="/blog" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                            <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                            <span>Back to Blog</span>
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
    
    return (
        <div className="bg-slate-900 min-h-screen text-slate-300">
            <Header />
            <main className="pt-24 md:pt-32 pb-16 md:pb-20">
                <div className="container mx-auto px-6">
                    <div 
                        className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <div className="mb-8">
                            <a href="/blog" className="group inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                                <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span>Back to Blog</span>
                            </a>
                        </div>

                        <article>
                            <header className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
                                <div className="text-slate-400 flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <UserIcon className="w-5 h-5" />
                                        <span>By {post.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CalendarDaysIcon className="w-5 h-5" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </header>
                            
                            {/* FIX: Property 'content' does not exist on type 'BlogPost'. Replaced with 'excerpt'. */}
                            <div className="prose prose-invert prose-lg tracking-wide prose-p:leading-loose prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white">
                                <p>{post.excerpt}</p>
                                <p className="mt-6">
                                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-semibold hover:text-cyan-300 no-underline">
                                        Continue reading this article &rarr;
                                    </a>
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPostPage;