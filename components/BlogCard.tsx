import React from 'react';
import { BlogPost } from './blogPosts';
import { CalendarDaysIcon, UserIcon, ArrowRightIcon } from './icons';
import { useImageLoader } from '../hooks/useImageLoader';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const isLoading = useImageLoader(post.imageUrl);

    return (
        <div className="group bg-slate-800 rounded-2xl shadow-lg border border-slate-700 h-full flex flex-col overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:border-cyan-500/80 hover:shadow-2xl hover:shadow-cyan-500/10">
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden aspect-[16/9] relative bg-slate-700">
                {isLoading && (
                    <div className="absolute inset-0 bg-slate-700 animate-pulse"></div>
                )}
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-black/30 ${isLoading ? 'opacity-0' : 'opacity-100'} filter brightness-75 saturate-90 group-hover:filter-none`}
                />
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
};

export default BlogCard;