import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { blogPosts } from './blogPosts';
import { ArrowLeftIcon, CalendarDaysIcon, UserIcon } from './icons';

const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
             <div className="bg-slate-900 min-h-screen text-slate-300">
                <Header />
                <main className="pt-32 pb-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl font-extrabold text-white mb-6">Post Not Found</h1>
                        <p className="text-slate-400 mb-8">Sorry, we couldn't find the blog post you were looking for.</p>
                        <a href="/blog" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
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
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
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
                            
                            <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white">
                                {post.content}
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
