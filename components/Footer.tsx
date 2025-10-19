import React from 'react';
import { CapeMayLogo, PhoneIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Footer: React.FC = () => {
    const [footerRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });

    const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        // If on the landing page, smooth scroll to top
        if (window.location.pathname === '/') {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        // On other pages, the default href="/" will navigate to the homepage.
    };

    const LogoText: React.FC = () => (
        <div className="flex flex-col leading-tight text-left">
            <div className="font-oswald text-2xl font-bold text-white uppercase tracking-wider">
                Cape May
            </div>
            <div className="font-oswald text-sm font-bold text-cyan-400 uppercase tracking-[0.2em]">
                Web Design
            </div>
        </div>
    );

    return (
        <footer ref={footerRef} className="bg-slate-900 border-t border-slate-800" role="contentinfo">
            <div className="container mx-auto px-6 py-8 text-center text-slate-400">
                <div
                    className={`flex justify-center items-center mb-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '100ms' }}
                >
                    <a href="/" onClick={handleLogoClick} className="flex items-center space-x-4">
                        <CapeMayLogo className="w-10 h-10" />
                        <LogoText />
                    </a>
                </div>
                <p 
                    className={`mb-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    Building beautiful and functional websites from the heart of Cape May.
                </p>
                <div 
                    className={`mb-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '300ms' }}
                >
                    <a 
                        href="tel:6093006464" 
                        className="inline-flex items-center justify-center space-x-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-600 hover:border-cyan-500 text-lg font-semibold text-slate-200 hover:text-white py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        <PhoneIcon className="w-5 h-5 text-cyan-400"/>
                        <span>(609) 300-6464</span>
                    </a>
                </div>
                 <div 
                    className={`flex justify-center space-x-6 mb-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '400ms' }}
                 >
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Cape May Web Design on Facebook" className="inline-block hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1">Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Cape May Web Design on Instagram" className="inline-block hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1">Instagram</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Cape May Web Design on LinkedIn" className="inline-block hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1">LinkedIn</a>
                </div>
                <div 
                    className={`flex flex-col sm:flex-row justify-center items-center gap-y-2 sm:gap-x-4 mb-6 text-sm transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '500ms' }}
                >
                    <a href="/blog" className="hover:text-cyan-400 transition-colors">Blog</a>
                    <span className="text-slate-600 hidden sm:block">|</span>
                    <a href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                    <span className="text-slate-600 hidden sm:block">|</span>
                    <a href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                </div>
                <p 
                    className={`text-sm transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: '600ms' }}
                >&copy; {new Date().getFullYear()} Cape May Web Design. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;