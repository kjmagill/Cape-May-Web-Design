

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { blogPosts } from './blogPosts';
import { ArrowLeftIcon, CalendarDaysIcon, UserIcon, ClockIcon } from './icons';
import { useSeo } from '../hooks/useSeo';

const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
    const post = blogPosts.find(p => p.slug === slug);
    
    useSeo({
        title: post ? `${post.title} | Cape May Web Design` : 'Post Not Found | Cape May Web Design',
        description: post ? post.excerpt : 'The requested blog post could not be found.',
        keywords: post ? post.tags.join(', ') : '',
        canonicalUrl: post ? `https://www.capemaywebdesign.com/blog/${post.slug}` : undefined
    });

    const jsonLd = React.useMemo(() => post ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "datePublished": post.date,
        "url": post.url,
        "image": post.imageUrl,
        "description": post.excerpt,
        "publisher": {
            "@type": "Organization",
            "name": "Cape May Web Design",
            "logo": {
                "@type": "ImageObject",
                "url": "https://kjmagill.com/img/logos/cmwd_logo.png"
            }
        }
    } : null, [post]);

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
                        <a 
                            href="/blog" 
                            className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:from-cyan-200 hover:via-sky-300 hover:to-blue-400 text-white text-shadow-cta font-extrabold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-[0_1px_2px_rgba(34,211,238,0.15),_0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_4px_12px_rgba(59,130,246,0.15),_0_0_25px_rgba(34,211,238,0.45)]"
                        >
                            <ArrowLeftIcon className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-1" />
                            <span>Back to Blog</span>
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
    
    useEffect(() => {
        if (!jsonLd) return;
        try {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = 'blog-post-structured-data';
            script.innerHTML = JSON.stringify(jsonLd);
            document.head.appendChild(script);

            return () => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
        } catch (error) {
            console.error("Failed to inject BlogPost JSON-LD script:", error);
        }
    }, [slug, jsonLd]);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-300">
            <Header />
            <main className="pt-32 md:pt-40 pb-24 md:pb-32">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div 
                        className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    >
                        <div className="mb-12">
                            <a href="/blog" className="group inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                                <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span className="font-semibold">Back to Blog</span>
                            </a>
                        </div>

                        <article>
                            <header className="mb-12">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">{post.title}</h1>
                                <div className="text-slate-400 flex flex-wrap items-center gap-x-8 gap-y-3">
                                    <div className="flex items-center space-x-2.5">
                                        <UserIcon className="w-5 h-5 text-cyan-500/80" />
                                        <span className="font-medium">By {post.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-2.5">
                                        <CalendarDaysIcon className="w-5 h-5 text-cyan-500/80" />
                                        <span className="font-medium">{post.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-2.5">
                                        <ClockIcon className="w-5 h-5 text-cyan-500/80" />
                                        <span className="font-medium">{post.readingTime}</span>
                                    </div>
                                </div>
                            </header>
                            
                            <div className="flex flex-wrap gap-2.5 mb-12">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-sm font-semibold text-cyan-200 bg-cyan-900/60 px-4 py-2 rounded-full border border-cyan-500/20">{tag}</span>
                                ))}
                            </div>
                            
                            <div className="prose prose-invert prose-lg md:prose-xl tracking-wide prose-p:leading-relaxed prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white prose-headings:tracking-tight">
                                <p>{post.excerpt}</p>
                                <p className="mt-6">
                                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-semibold hover:text-cyan-300 no-underline focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
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
