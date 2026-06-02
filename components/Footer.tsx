import React, { useState } from 'react';
import { CapeMayLogo, PhoneIcon, EnvelopeIcon, ClipboardIcon, CheckIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Footer: React.FC = () => {
    const [footerRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });
    const [copied, setCopied] = useState(false);

    const handleCopy = async (event?: React.MouseEvent<HTMLButtonElement>) => {
        const button = event?.currentTarget;
        if (button) {
            button.blur();
        }
        try {
            await navigator.clipboard.writeText('capemaywebdesign@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            if (path === '/index.html' && window.history.pushState) {
                window.history.pushState({}, '', '/');
            }
        }
    };

    const LogoText: React.FC = () => (
        <div className="flex flex-col leading-tight text-left">
            <div className="font-oswald text-2xl sm:text-[1.75rem] font-bold text-white uppercase tracking-wider">
                Cape May
            </div>
            <div className="font-oswald text-sm sm:text-[1rem] font-bold text-cyan-400 uppercase tracking-[0.2em] ml-px">
                Web Design
            </div>
        </div>
    );

    return (
        <footer ref={footerRef} className="bg-slate-900 border-t border-slate-800" role="contentinfo">
            <div className="container mx-auto px-6 pt-16 pb-12 max-w-7xl">
                {/* Upper Section */}
                <div className="flex flex-col items-center text-center">
                    {/* Brand Logo & Title */}
                    <div
                        className={`mb-4 transition-all duration-700 ease-out ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <a 
                            href="/" 
                            onClick={handleLogoClick} 
                            aria-label="Cape May Web Design - Home" 
                            className="flex items-center space-x-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md hover:opacity-90 transition-opacity duration-300"
                        >
                            <CapeMayLogo className="w-10 h-10 sm:w-12 sm:h-12" />
                            <LogoText />
                        </a>
                    </div>

                    {/* Slogan */}
                    <p 
                        className={`text-slate-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed transition-all duration-700 ease-out delay-100 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        Empowering local businesses to make waves online.
                    </p>

                    {/* Contact Buttons */}
                    <div 
                        className={`w-full max-w-2xl mb-10 transition-all duration-700 ease-out delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4">
                            {/* Phone Button */}
                            <a 
                                href="tel:6093006464" 
                                className="w-full sm:w-auto h-11 sm:h-12 inline-flex items-center justify-center space-x-2.5 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-sm sm:text-base font-semibold text-slate-200 hover:text-white px-5 rounded-full transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-950"
                            >
                                <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400"/>
                                <span>(609) 300-6464</span>
                            </a>

                            {/* Email Button with Copy Option */}
                            <div className="w-full sm:w-auto h-11 sm:h-12 inline-flex items-center justify-between sm:justify-start bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-sm sm:text-base font-semibold text-slate-200 hover:text-white pl-5 pr-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500 focus-within:ring-offset-slate-950">
                                <a 
                                    href="mailto:capemaywebdesign@gmail.com" 
                                    className="inline-flex items-center justify-center space-x-2.5 focus:outline-none focus-visible:underline rounded pr-3"
                                >
                                    <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400"/>
                                    <span className="text-xs sm:text-sm md:text-base">capemaywebdesign@gmail.com</span>
                                </a>
                                <div className="relative flex items-center border-l border-slate-800 pl-2">
                                    <button
                                        onClick={handleCopy}
                                        type="button"
                                        className="p-1.5 text-slate-500 hover:text-cyan-400 focus:text-cyan-400 rounded transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                                        title="Copy email address"
                                        aria-label="Copy email address"
                                    >
                                        {copied ? (
                                            <CheckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                                        ) : (
                                            <ClipboardIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        )}
                                    </button>
                                    {copied && (
                                        <span role="tooltip" className="absolute left-1/2 -translate-x-1/2 -top-11 bg-slate-950 text-white text-xs px-2.5 py-1.5 rounded shadow-xl whitespace-nowrap transition-all duration-200 z-10 border border-slate-800">
                                            Copied!
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social links */}
                    <div 
                        className={`flex justify-center space-x-8 mb-10 transition-all duration-700 ease-out delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <a href="https://www.facebook.com/capemaywebdesign" target="_blank" rel="noopener noreferrer" aria-label="Visit Cape May Web Design on Facebook" className="text-slate-400 hover:text-cyan-400 text-sm font-semibold transition-all duration-300 hover:-translate-y-[1px] focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">Facebook</a>
                        <a href="https://www.linkedin.com/company/capemaywebdesign" target="_blank" rel="noopener noreferrer" aria-label="Visit Cape May Web Design on LinkedIn" className="text-slate-400 hover:text-cyan-400 text-sm font-semibold transition-all duration-300 hover:-translate-y-[1px] focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">LinkedIn</a>
                        <a href="https://github.com/Cape-May-Web-Design" target="_blank" rel="noopener noreferrer" aria-label="Visit Cape May Web Design on GitHub" className="text-slate-400 hover:text-cyan-400 text-sm font-semibold transition-all duration-300 hover:-translate-y-[1px] focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">GitHub</a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-900/80 my-8" />

                {/* Lower Section (Legal & Copyright) */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-slate-500 text-xs sm:text-sm">
                    {/* Legal Links */}
                    <div className="flex items-center gap-5 order-1 md:order-2">
                        <a href="https://www.freeprivacypolicy.com/live/0ca54af8-fd0f-4c58-a1f2-19da2b034053" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">Privacy Policy</a>
                        <span className="text-slate-800" aria-hidden="true">|</span>
                        <span className="relative group cursor-not-allowed text-slate-500" title="Our Terms of Service page is coming soon.">
                            Terms of Service
                            <span className="absolute hidden lg:block -top-10 left-1/2 -translate-x-1/2 w-max bg-slate-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700/50">
                                Coming Soon
                            </span>
                        </span>
                    </div>

                    {/* Copyright Note */}
                    <p className="order-2 md:order-1 font-medium">
                        &copy; {new Date().getFullYear()} Cape May Web Design. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
