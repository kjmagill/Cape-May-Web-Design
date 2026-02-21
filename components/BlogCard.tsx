import React from 'react';
import { BlogPost } from './blogPosts';
import { UserIcon, ArrowRightIcon, ClockIcon } from './icons';
import { useImageLoader } from '../hooks/useImageLoader';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const isLoading = useImageLoader(post.imageUrl);

    return (
        <div className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 h-full flex flex-col overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden aspect-[16/9] relative bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800">
                {isLoading && (
                    <div className="absolute inset-0 bg-slate-700 animate-pulse"></div>
                )}
                <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    crossOrigin="anonymous"
                    className={`w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} filter brightness-[0.85] saturate-[0.8] group-hover:filter-none`}
                />
            </a>
            <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6 text-xs font-bold uppercase tracking-widest text-cyan-400/80 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{post.author}</span>
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight">
                     <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">{post.title}</a>
                </h3>
                <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-lg">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-900/40 px-3 py-1 rounded-full border border-cyan-500/10">{tag}</span>
                    ))}
                </div>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold inline-flex items-center space-x-2 group-hover:text-cyan-300 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                    <span className="text-sm uppercase tracking-widest">Read More</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </a>
            </div>
        </div>
    );
};

export default BlogCard;
