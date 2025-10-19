import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './icons';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-6 right-6 z-50
                w-12 h-12 rounded-full
                bg-slate-800/70 backdrop-blur-sm
                border-2 border-slate-700
                flex items-center justify-center
                shadow-lg
                transition-all duration-300 ease-in-out
                transform hover:scale-105 hover:-translate-y-1 hover:border-cyan-500 hover:bg-slate-700/80 hover:shadow-lg hover:shadow-cyan-500/20
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            `}
            aria-label="Scroll to top"
        >
            <ArrowUpIcon className="w-6 h-6" />
        </button>
    );
};

export default ScrollToTopButton;