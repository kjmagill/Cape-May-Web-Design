import React, { useState, useEffect, useRef } from 'react';
import { CapeMayLogo, PhoneIcon, ArrowRightIcon } from './icons';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
            }
        };

        if (isMenuOpen) {
            document.documentElement.classList.add('overflow-hidden');
            document.addEventListener('keydown', handleKeyDown);
            // Focus the menu panel for accessibility
            setTimeout(() => menuRef.current?.focus(), 100);
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }

        return () => {
            document.documentElement.classList.remove('overflow-hidden');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);


    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Why Us', href: '#why-us' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Blog', href: '#blog' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

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
        <div className="flex flex-col leading-tight">
            <div className="font-oswald text-2xl lg:text-3xl font-bold text-white uppercase tracking-wider">
                Cape May
            </div>
            <div className="font-oswald text-xs lg:text-sm font-bold text-cyan-400 uppercase tracking-[0.22em]">
                Web Design
            </div>
        </div>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMenuOpen ? 'z-30' : 'z-50'} ${isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/20 to-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/" onClick={handleLogoClick} className="flex items-center space-x-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md">
                        <CapeMayLogo className="w-11 h-11" />
                        <LogoText />
                    </a>
                    <nav role="navigation" aria-label="Main" className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="relative text-slate-300 hover:text-white transition-colors duration-300 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="tel:6093006464" 
                            className="relative text-slate-300 hover:text-white transition-colors duration-300 py-1 flex items-center space-x-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            <span>(609) 300-6464</span>
                        </a>
                        <a href="/#contact" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-2.5 px-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900">
                           <span>Get a Quote</span>
                           <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </nav>
                </div>
            </header>

            <button 
                className="fixed top-5 right-6 lg:hidden text-white z-[60] focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md" 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                aria-label="Toggle navigation menu" 
                aria-expanded={isMenuOpen} 
                aria-controls="mobile-menu"
            >
                {/* Animated Hamburger/Close Icon */}
                <div className="w-8 h-8 flex flex-col justify-center items-center">
                    <span className={`block w-7 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-7 h-0.5 bg-white rounded-full my-1.5 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-7 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
            </button>

            {/* Mobile Menu Panel */}
            <div 
                id="mobile-menu"
                ref={menuRef}
                tabIndex={-1}
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-slate-900 z-50 transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isMenuOpen}
            >
                <nav aria-label="Mobile" className="pt-28 p-8 h-full flex flex-col overflow-y-auto">
                    <ul className="flex flex-col items-center text-center space-y-6">
                        {navLinks.map((link, index) => (
                            <li 
                                key={link.name}
                                className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${isMenuOpen ? 200 + index * 75 : 0}ms` }}
                            >
                                <a href={link.href} onClick={handleLinkClick} className="text-2xl text-slate-200 hover:text-cyan-400 transition-colors duration-300 py-2 block focus:outline-none focus-visible:text-cyan-400 focus-visible:underline rounded-sm">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                         <li 
                            className={`pt-4 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${isMenuOpen ? 200 + navLinks.length * 75 : 0}ms` }}
                        >
                            <a href="tel:6093006464" onClick={handleLinkClick} className="text-xl text-slate-200 hover:text-cyan-400 transition-colors duration-300 py-2 flex items-center space-x-3 focus:outline-none focus-visible:text-cyan-400 focus-visible:underline rounded-sm">
                                <PhoneIcon className="w-6 h-6" />
                                <span>(609) 300-6464</span>
                            </a>
                        </li>
                        <li
                            className={`transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${isMenuOpen ? 200 + (navLinks.length + 1) * 75 : 0}ms` }}
                        >
                            <a href="#contact" onClick={handleLinkClick} className="mt-6 group w-full text-center bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-slate-900">
                                <span>Get a Quote</span>
                                <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            ></div>
        </>
    );
};

export default Header;