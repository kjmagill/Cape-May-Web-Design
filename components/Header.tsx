import React, { useState, useEffect, useRef } from 'react';
import { PhoneIcon, ArrowRightIcon, EnvelopeIcon } from './icons';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    // Effect to check screen size for conditional linking
    useEffect(() => {
        const checkIsMobile = () => {
            // Use Tailwind's 'lg' breakpoint (1024px) as the threshold
            setIsMobile(window.innerWidth < 1024);
        };
        checkIsMobile(); // Check on initial render
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);


    // Handle scroll effect for header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll, handle Esc key, and manage focus when menu is open
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
                toggleRef.current?.focus();
            }

            if (event.key === 'Tab' && isMenuOpen) {
                const focusableElements = menuRef.current?.querySelectorAll(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                
                if (!focusableElements || !toggleRef.current) return;

                const elements = Array.from(focusableElements) as HTMLElement[];
                // Add the toggle button to the focusable elements list since it's the "close" button
                const allFocusable = [toggleRef.current, ...elements];
                
                const firstElement = allFocusable[0];
                const lastElement = allFocusable[allFocusable.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        if (isMenuOpen) {
            document.documentElement.classList.add('overflow-hidden');
            document.addEventListener('keydown', handleKeyDown);
            
            // Focus the first link in the menu when opened
            const firstLink = menuRef.current?.querySelector('a');
            if (firstLink) {
                setTimeout(() => (firstLink as HTMLElement).focus(), 100);
            }
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }

        return () => {
            document.documentElement.classList.remove('overflow-hidden');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);


    const [activeHash, setActiveHash] = useState('');

    useEffect(() => {
        const handleHashChange = () => setActiveHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Set initial hash
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Why Us', href: '#why-us' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Blog', href: '#blog' },
    ];

    const quoteHref = isMobile ? '#contact-form' : '#contact';

    const handleLinkClick = (href: string) => {
        setIsMenuOpen(false);
        setActiveHash(href);
    };

    const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const path = window.location.pathname;
        // If on the landing page, which can be '/' or '/index.html', smooth scroll to top
        if (path === '/' || path === '/index.html') {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            // Also, update the URL to be the clean root path if necessary
            if (path === '/index.html' && window.history.pushState) {
                window.history.pushState({}, '', '/');
            }
        }
        // On other pages, the default href="/" will navigate to the homepage.
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMenuOpen ? 'z-30' : 'z-50'} ${isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/20 to-transparent'}`}>
                <div className="container mx-auto px-6 lg:px-4 xl:px-6 py-4 flex justify-between items-center">
                    <a href="/" onClick={handleLogoClick} aria-label="Cape May Web Design - Home" className="flex items-center mr-4 xl:mr-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md hover:opacity-90 transition-opacity duration-300">
                        <img src="https://kjmagill.com/img/logos/cmwd_logo_w_text.png" alt="Cape May Web Design" className="h-12 md:h-14 w-auto object-contain" referrerPolicy="no-referrer" />
                    </a>
                    <nav role="navigation" aria-label="Main" className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="relative text-slate-300 hover:text-white transition-colors duration-300 py-1 text-sm xl:text-base after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="tel:6093006464" 
                            className="relative text-slate-300 hover:text-white transition-colors duration-300 py-1 flex items-center space-x-2 text-sm xl:text-base after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
                        >
                            <PhoneIcon className="w-4 h-4 xl:w-5 xl:h-5" />
                            <span>(609) 300-6464</span>
                        </a>
                        <a href={quoteHref} className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-bold [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] py-2.5 px-4 xl:py-3 xl:px-5 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900 hover:animate-pulse-glow">
                           <span className="text-sm xl:text-base">Get a Quote</span>
                           <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </nav>
                </div>
            </header>

            <button 
                ref={toggleRef}
                className={`fixed top-4 right-6 lg:hidden z-[60] w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isMenuOpen 
                        ? 'bg-slate-800 border-slate-700 text-white shadow-lg' 
                        : isScrolled 
                            ? 'bg-slate-900/80 border-slate-800/80 text-white backdrop-blur-sm' 
                            : 'bg-black/30 border-white/10 text-white backdrop-blur-xs'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                aria-label="Toggle navigation menu" 
                aria-expanded={isMenuOpen} 
                aria-controls="mobile-menu"
            >
                {/* Animated Hamburger/Close Icon with responsive centering */}
                <div className="relative w-5 h-5 flex items-center justify-center">
                    <span className={`absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                    <span className={`absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
                </div>
            </button>

            {/* Mobile Menu Panel */}
            <div 
                id="mobile-menu"
                ref={menuRef}
                tabIndex={-1}
                className={`fixed top-0 right-0 h-full w-[85%] sm:w-[380px] bg-slate-950 border-l border-slate-900 z-50 transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden ${isMenuOpen ? 'translate-x-0 opacity-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]' : 'translate-x-full opacity-0 pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isMenuOpen}
            >
                {/* Dynamic Glowing Accent Background Elements */}
                <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[30%] bg-teal-500/5 rounded-full blur-[60px] pointer-events-none"></div>

                {/* 1. Top Brand Row (Header) - Compact Padding */}
                <div className="px-5 py-3 flex items-center justify-between border-b border-slate-900/45 relative z-10">
                    <div className="flex items-center">
                        <img src="https://kjmagill.com/img/logos/cmwd_logo_w_text.png" alt="Cape May Web Design Logo" className="h-7 w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                    {/* Spacer matching hamburger trigger size */}
                    <div className="w-11 h-11"></div>
                </div>

                {/* 2. Optimized middle content area - tight spacing, no vertical scrolling required */}
                <nav aria-label="Mobile" className="flex-1 px-5 py-3 relative z-10 flex flex-col justify-between overflow-hidden">
                    <div className="flex flex-col space-y-3.5">
                        <div>
                            <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">Navigation</span>
                        </div>
                        
                        <ul className="w-full flex flex-col space-y-1.5">
                            {navLinks.map((link, index) => {
                                let tagline = 'Cape May elite services';
                                if (link.name === 'Services') tagline = 'Strategic premium digital systems';
                                if (link.name === 'Why Us') tagline = 'The CMWD high-end advantage';
                                if (link.name === 'Portfolio') tagline = 'Real South Jersey business results';
                                if (link.name === 'Testimonials') tagline = 'Stories from trusted local partners';
                                if (link.name === 'Blog') tagline = 'SEO, web tech & marketing insights';

                                return (
                                    <li 
                                        key={link.name}
                                        className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        style={{ transitionDelay: `${isMenuOpen ? 80 + index * 40 : 0}ms` }}
                                    >
                                        <a 
                                            href={link.href} 
                                            onClick={() => handleLinkClick(link.href)} 
                                            className="group flex items-center py-1.5 px-2.5 rounded-xl hover:bg-slate-900/40 transition-all duration-300"
                                        >
                                            <span className="font-mono text-[9px] text-cyan-400 bg-cyan-950/40 border border-cyan-800/20 px-1.5 py-0.5 rounded mr-3 tracking-wider font-semibold opacity-90 group-hover:bg-cyan-900/50 group-hover:border-cyan-500/30 transition-all duration-300">
                                                0{index + 1}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors duration-250 tracking-tight leading-none">
                                                    {link.name}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-normal leading-tight group-hover:text-slate-300 transition-colors duration-250 mt-0.5">
                                                    {tagline}
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Quick Contact area structured vertically to ensure all text remains fully readable */}
                    <div 
                        className={`border-t border-slate-900 mt-3 pt-3 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transitionDelay: `${isMenuOpen ? 120 + navLinks.length * 40 : 0}ms` }}
                    >
                        <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase block mb-2">Quick Connect</span>
                        
                        <div className="flex flex-col space-y-2">
                            {/* Phone Action */}
                            <a 
                                href="tel:6093006464" 
                                onClick={() => setIsMenuOpen(false)}
                                className="group flex items-center p-2 rounded-xl bg-slate-900/30 border border-slate-900 hover:bg-slate-900/60 hover:border-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                                <div className="p-1.5 rounded-lg bg-cyan-950/40 text-cyan-400 border border-cyan-850/20 group-hover:bg-cyan-900/50 group-hover:text-cyan-300 transition-all duration-300 flex-shrink-0">
                                    <PhoneIcon className="w-3.5 h-3.5" />
                                </div>
                                <div className="ml-3 flex flex-col min-w-0">
                                    <span className="text-slate-200 text-xs font-semibold tracking-wide">
                                        (609) 300-6464
                                    </span>
                                    <span className="text-[8px] text-slate-500 leading-none mt-0.5 uppercase tracking-wider font-mono">
                                        Cape May Office Support
                                    </span>
                                </div>
                            </a>

                            {/* Email Action */}
                            <a 
                                href="#contact" 
                                onClick={() => handleLinkClick('#contact')}
                                className="group flex items-center p-2 rounded-xl bg-slate-900/30 border border-slate-900 hover:bg-slate-900/60 hover:border-cyan-500/20 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                                <div className="p-1.5 rounded-lg bg-teal-950/40 text-teal-400 border border-teal-850/20 group-hover:bg-teal-900/50 group-hover:text-teal-300 transition-all duration-300 flex-shrink-0">
                                    <EnvelopeIcon className="w-3.5 h-3.5" />
                                </div>
                                <div className="ml-3 flex flex-col min-w-0">
                                    <span className="text-slate-200 text-xs font-semibold tracking-wide">
                                        Send Message
                                    </span>
                                    <span className="text-[8px] text-slate-500 leading-none mt-0.5 uppercase tracking-wider font-mono">
                                        Fast Local Response
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </nav>

                {/* 3. Immersive Bottom CTA Drawer Footer - Slimmer Metrics */}
                <div className="px-5 py-3.5 border-t border-slate-900 bg-slate-950 relative z-10">
                    <div 
                        className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{ transitionDelay: `${isMenuOpen ? 120 + (navLinks.length + 1) * 40 : 0}ms` }}
                    >
                        <a 
                            href={quoteHref} 
                            onClick={() => handleLinkClick(quoteHref)} 
                            className="w-full text-center bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-bold [text-shadow:0_1px_4px_rgba(0,0,0,0.3)] py-2.5 px-5 rounded-full transition-all duration-300 transform hover:scale-[1.01] inline-flex items-center justify-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                            <span className="text-[10px] uppercase tracking-wider font-extrabold">Get an Instant Quote</span>
                            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-[9px] text-slate-500 font-medium">
                        <span>© 2026 Cape May Web Design</span>
                        <span className="flex items-center text-teal-400">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full inline-block animate-pulse mr-1"></span>
                            Accepting Partners
                        </span>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => {
                    setIsMenuOpen(false);
                    toggleRef.current?.focus();
                }}
                aria-hidden="true"
            ></div>
        </>
    );
};

export default Header;