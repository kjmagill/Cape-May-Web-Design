import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { blogPosts, BlogPost } from './blogPosts';
import { 
    ArrowLeftIcon, 
    ArrowRightIcon,
    CalendarDaysIcon, 
    UserIcon, 
    ClockIcon,
    CheckIcon,
    ClipboardIcon
} from './icons';
import { useSeo } from '../hooks/useSeo';

// Helper to calculate reading time dynamically based on word count
const calculateReadingTime = (post: BlogPost): string => {
    if (!post) return '1 min read';
    
    let wordCount = 0;
    const textToCount = `${post.title} ${post.excerpt}`;
    wordCount += textToCount.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    if (post.content && post.content.length > 0) {
        post.content.forEach(paragraph => {
            wordCount += paragraph.trim().split(/\s+/).filter(w => w.length > 0).length;
        });
    } else {
        // Fallback static text count
        wordCount += 100; 
    }
    
    const wpm = 200; // Average reading speed (words per minute)
    const minutes = Math.max(1, Math.ceil(wordCount / wpm));
    return `${minutes} min read`;
};

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
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [slug]);

    // Load and save interactive likes state via localStorage
    useEffect(() => {
        if (!post) return;
        const storedLikes = localStorage.getItem(`likes-${slug}`);
        const userLiked = localStorage.getItem(`liked-${slug}`);
        if (storedLikes) {
            setLikes(parseInt(storedLikes, 10));
        } else {
            // Seed a consistent, realistic social-proof number based on slug length
            const seededLikes = Math.abs((slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 35) + 24);
            setLikes(seededLikes);
            localStorage.setItem(`likes-${slug}`, seededLikes.toString());
        }
        if (userLiked === 'true') {
            setHasLiked(true);
        } else {
            setHasLiked(false);
        }
    }, [slug, post]);

    const handleLike = () => {
        if (hasLiked) {
            const newLikes = likes - 1;
            setLikes(newLikes);
            setHasLiked(false);
            localStorage.setItem(`likes-${slug}`, newLikes.toString());
            localStorage.removeItem(`liked-${slug}`);
        } else {
            const newLikes = likes + 1;
            setLikes(newLikes);
            setHasLiked(true);
            localStorage.setItem(`likes-${slug}`, newLikes.toString());
            localStorage.setItem(`liked-${slug}`, 'true');
        }
    };

    const handleCopyLink = () => {
        if (typeof window === 'undefined') return;
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error('Failed to copy link: ', err);
        });
    };

    // Track active scrolling progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollPercent(Math.min(100, Math.max(0, scrolled)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Dynamically calculate reading time based on actual content
    const computedReadingTime = React.useMemo(() => {
        if (!post) return '1 min read';
        return calculateReadingTime(post);
    }, [post]);

    // Get related posts (excluding the current post)
    const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Top Reading Progress Bar (always floats on top of viewport) */}
            <div 
                className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 z-[110] transition-all duration-100 ease-out"
                style={{ width: `${scrollPercent}%` }}
                id="reading-progress-bar"
                role="progressbar"
                aria-valuenow={Math.round(scrollPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
            />

            <Header />
            <main className="pt-32 md:pt-40 pb-24 md:pb-32">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div 
                        className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    >
                        {/* Top Navigation Row */}
                        <div className="mb-10 flex items-center justify-between">
                            <a 
                                href="/blog" 
                                className="group inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm text-sm sm:text-base"
                            >
                                <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span className="font-semibold">Back to Blog Listing</span>
                            </a>
                        </div>

                        {/* Article with sticky side bar layout */}
                        <div className="relative">
                            
                            {/* Desktop Social share Sidebar Panel (Floats beautifully next to article) */}
                            <div className="hidden xl:block absolute -left-24 top-0 h-full">
                                <div className="sticky top-44 flex flex-col items-center space-y-5 py-5 px-2 bg-slate-950/60 backdrop-blur-md border border-slate-800/80 rounded-full shadow-2xl">
                                    {/* Like Clap Button */}
                                    <button 
                                        onClick={handleLike}
                                        className={`group p-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                                            hasLiked 
                                                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/25 scale-105 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
                                                : 'text-slate-400 hover:text-rose-500 border border-transparent hover:bg-slate-800/60'
                                        }`}
                                        title="Appreciate this post"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={hasLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={hasLiked ? "0" : "1.5"} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        <span className="block text-[10px] font-extrabold text-center mt-1 font-mono">{likes}</span>
                                    </button>

                                    {/* Divider */}
                                    <div className="w-6 h-[1px] bg-slate-800/80" />

                                    {/* Copy Link Button */}
                                    <div className="relative group/copy-tip">
                                        <button 
                                            onClick={handleCopyLink}
                                            className={`p-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                                                copied 
                                                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.1)]' 
                                                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-transparent'
                                            }`}
                                            title="Copy link to clipboard"
                                        >
                                            {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
                                        </button>
                                        {copied && (
                                            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-950 text-white text-[11px] font-semibold py-1.5 px-3 rounded-md shadow-2xl border border-slate-800 whitespace-nowrap animate-fade-in z-50">
                                                Link Copied!
                                            </div>
                                        )}
                                    </div>

                                    {/* Share on X */}
                                    <a 
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full text-slate-400 hover:text-sky-400 hover:bg-slate-800/60 border border-transparent transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                                        title="Share on X"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>

                                    {/* Share on LinkedIn */}
                                    <a 
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full text-slate-400 hover:text-blue-500 hover:bg-slate-800/60 border border-transparent transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                                        title="Share on LinkedIn"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <article className="bg-slate-950/20 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800/30">
                                <header className="mb-8">
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-[1.12] tracking-tight mb-6">
                                        {post.title}
                                    </h1>
                                    <div className="text-slate-400 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm border-b border-slate-800/60 pb-6">
                                        <div className="flex items-center space-x-2 bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/50">
                                            <UserIcon className="w-4 h-4 text-cyan-400/80" />
                                            <span className="font-medium text-slate-300">By {post.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/50">
                                            <CalendarDaysIcon className="w-4 h-4 text-cyan-400/80" />
                                            <span className="font-medium text-slate-300">{post.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/50">
                                            <ClockIcon className="w-4 h-4 text-cyan-400/80" />
                                            <span className="font-medium text-slate-300">{computedReadingTime}</span>
                                        </div>
                                        <button
                                            onClick={handleCopyLink}
                                            className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                                                copied 
                                                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/35 shadow-[0_0_10px_rgba(34,211,238,0.15)]' 
                                                    : 'bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-800/60 border-slate-800/50 hover:border-cyan-500/30'
                                            }`}
                                            title="Copy article link to clipboard"
                                        >
                                            {copied ? (
                                                <>
                                                    <CheckIcon className="w-4 h-4 text-cyan-400" />
                                                    <span className="font-bold text-xs tracking-tight">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ClipboardIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                                    <span className="font-bold text-xs tracking-tight">Copy Link</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </header>
                                
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.tags.map(tag => (
                                        <span 
                                            key={tag} 
                                            className="text-xs font-bold text-cyan-300 bg-cyan-950/50 px-3.5 py-1.5 rounded-full border border-cyan-500/15 uppercase tracking-wider"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Featured Header Image */}
                                <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-10 border border-slate-800/80 bg-slate-950">
                                    <img 
                                        src={post.imageUrl} 
                                        alt={post.title} 
                                        className="object-cover w-full h-full"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                
                                <div className="prose prose-invert prose-lg md:prose-xl tracking-wide max-w-none prose-p:leading-relaxed prose-p:text-slate-300/95 prose-headings:text-white prose-strong:text-white prose-headings:tracking-tight">
                                    <p className="text-lg md:text-xl text-slate-200/90 font-medium border-l-2 border-cyan-500 pl-4 py-1.5 my-6 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    
                                    {post.content && post.content.length > 0 ? (
                                        post.content.map((paragraph, index) => (
                                            <p key={index} className="mt-6 leading-relaxed text-slate-300/90">
                                                {paragraph}
                                            </p>
                                        ))
                                    ) : (
                                        <>
                                            <p className="mt-8 leading-relaxed">
                                                Cape May Web Design delivers bespoke, conversion-optimized systems engineered to establish absolute authority in your local South Jersey marketplace. This high-value article uncovers core tactical steps to elevate user engagement, secure Google map packs, and craft pristine aesthetic interfaces that generate direct client actions.
                                            </p>
                                            
                                            <p className="mt-6 leading-relaxed">
                                                To maximize performance and stay up-to-date with current visual trends, we recommend reading the complete deep-dive publication directly on the publisher's platform.
                                            </p>
                                        </>
                                    )}
                                    
                                    <p className="mt-10">
                                        <a 
                                            href={post.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="group inline-flex items-center space-x-2.5 bg-cyan-500/10 text-cyan-300 font-bold hover:text-white hover:bg-cyan-500/20 py-3.5 px-6 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 border border-cyan-500/20"
                                        >
                                            <span>Continue reading this article on the publisher platform</span>
                                            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </a>
                                    </p>
                                </div>

                                {/* Responsive Engagement / Sharing Section at base (Visible on mobile/tablet, acts as summary on desktop) */}
                                <div className="border-t border-slate-800/70 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                                        <button 
                                            onClick={handleLike}
                                            className={`group flex items-center justify-center space-x-3 py-2.5 px-5 rounded-full transition-all duration-300 border w-full sm:w-auto ${
                                                hasLiked 
                                                    ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]' 
                                                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-rose-500/30 hover:text-rose-400 hover:bg-rose-500/5'
                                            }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill={hasLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={hasLiked ? "0" : "1.5"} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                            <span className="font-bold text-sm tracking-tight">
                                                {hasLiked ? 'Post Liked!' : 'Appreciate Post'}
                                            </span>
                                            <span className="px-2 py-0.5 text-xs bg-slate-950/70 text-slate-400 rounded-md font-mono border border-slate-800">
                                                {likes}
                                            </span>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t border-slate-800/40 sm:border-t-0 pt-4 sm:pt-0">
                                        <span className="text-sm font-semibold text-slate-400">Share:</span>
                                        <div className="flex items-center space-x-2">
                                            {/* Copy link trigger */}
                                            <div className="relative group/inline-copy">
                                                <button 
                                                    onClick={handleCopyLink}
                                                    className={`p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all duration-200 ${
                                                        copied ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' : ''
                                                    }`}
                                                    title="Copy link to clipboard"
                                                >
                                                    {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
                                                </button>
                                                {copied && (
                                                    <div className="absolute bottom-12 left-1/2 -translate-y-1/2 bg-slate-950 text-white text-[10px] font-semibold py-1 px-2.5 rounded shadow-lg border border-slate-800 whitespace-nowrap animate-fade-in">
                                                        Link Copied!
                                                    </div>
                                                )}
                                            </div>

                                            {/* Twitter/X */}
                                            <a 
                                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 hover:border-sky-500/30 transition-all duration-200"
                                                title="Share on X"
                                            >
                                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            </a>

                                            {/* LinkedIn */}
                                            <a 
                                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-blue-500 border border-slate-800 hover:border-blue-500/30 transition-all duration-200"
                                                title="Share on LinkedIn"
                                            >
                                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* High-Conversion consultation web audit CTA card */}
                        <div className="relative overflow-hidden my-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[90px] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                                <div className="max-w-xl">
                                    <span className="text-[11px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 uppercase inline-block mb-3 font-sans">
                                        Grow Your Local Business
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-4">
                                        Is Your Website Attracting Real South Jersey Customers?
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                        Many local websites lose clients because they load slowly or aren't optimized for local search. Let us review your page speed, mobile performance, and local rankings with a completely free 15-minute video walkthrough.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400 text-xs font-semibold">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-cyan-400 text-base">✓</span>
                                            <span>Free Screen-Recording Analysis</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-cyan-400 text-base">✓</span>
                                            <span>Keyword & Search Gaps Report</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-cyan-400 text-base">✓</span>
                                            <span>Exact Speed & Mobile Fixes</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-cyan-400 text-base">✓</span>
                                            <span>Zero Obligations or Pressure</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row lg:flex-col justify-center gap-4 shrink-0 w-full lg:w-auto">
                                    <a 
                                        href="/#contact" 
                                        className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:from-cyan-200 hover:via-sky-300 hover:to-blue-400 text-white text-shadow-cta font-bold py-3.5 px-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-[0_1px_2px_rgba(34,211,238,0.1),_0_0_12px_rgba(34,211,238,0.15)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.15),_0_0_25px_rgba(34,211,238,0.45)] text-center text-sm w-full sm:w-1/2 lg:w-full"
                                    >
                                        <span>Request Free Audit</span>
                                        <ArrowRightIcon className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>
                                    <a 
                                        href="tel:6093006464" 
                                        className="inline-flex items-center justify-center space-x-2 bg-slate-950/60 backdrop-blur-sm border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold py-3.5 px-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] text-center text-sm w-full sm:w-1/2 lg:w-full"
                                    >
                                        <span>Call Now: (609) 300-6464</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Read Next Section / Related Articles */}
                        {relatedPosts.length > 0 && (
                            <div className="border-t border-slate-800/60 pt-16 mt-16">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                                        More From Our Insights
                                    </h4>
                                    <a 
                                        href="/blog" 
                                        className="group flex items-center space-x-1 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                                    >
                                        <span>View All Posts</span>
                                        <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {relatedPosts.map((rPost) => (
                                        <a 
                                            key={rPost.slug}
                                            href={`/blog/${rPost.slug}`}
                                            className="group relative flex flex-col h-full bg-slate-950/20 hover:bg-slate-950/50 rounded-2xl border border-slate-800/40 hover:border-slate-700/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
                                        >
                                            {/* Image container */}
                                            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 bg-slate-950">
                                                <img 
                                                    src={rPost.imageUrl} 
                                                    alt={rPost.title}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                    referrerPolicy="no-referrer"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="text-[10px] font-bold text-cyan-200 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-500/15 uppercase tracking-wider">
                                                        {rPost.tags[0]}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center space-x-3 text-xs text-slate-400 mb-2.5 font-mono">
                                                        <span>{rPost.date}</span>
                                                        <span>•</span>
                                                        <span>{calculateReadingTime(rPost)}</span>
                                                    </div>
                                                    <h5 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug mb-2">
                                                        {rPost.title}
                                                    </h5>
                                                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                                                        {rPost.excerpt}
                                                    </p>
                                                </div>
                                                <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors mt-auto">
                                                    <span>Read Article</span>
                                                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPostPage;
