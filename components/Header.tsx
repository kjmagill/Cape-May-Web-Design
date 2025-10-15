import React, { useState, useEffect } from 'react';
import { CapeMayLogo, PhoneIcon, ArrowRightIcon } from './icons';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Why Us', href: '#why-us' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Blog', href: '/blog' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMenuOpen ? 'z-30' : 'z-50'} ${isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/20 to-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/#home" className="flex items-center space-x-3">
                        <CapeMayLogo className="w-10 h-10" />
                        <div className="flex flex-col leading-none">
                            <span className="font-oswald text-xl font-bold text-white tracking-wider uppercase">Cape May</span>
                            <span className="font-oswald text-xs font-bold text-white uppercase [letter-spacing:0.25em] -mt-0.5">Web Design</span>
                        </div>
                    </a>
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="relative text-slate-300 hover:text-white transition-colors duration-300 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-left"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="tel:6093006464" 
                            className="relative text-slate-300 hover:text-white transition-colors duration-300 py-1 flex items-center space-x-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-left"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            <span>(609) 300-6464</span>
                        </a>
                        <a href="/#contact" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                           <span>Get a Quote</span>
                           <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </nav>
                </div>
            </header>

            <button 
                className="fixed top-5 right-6 lg:hidden text-white z-[60]" 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                aria-label="Toggle navigation menu" 
                aria-expanded={isMenuOpen} 
                aria-controls="mobile-menu"
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu Panel */}
            <div 
                id="mobile-menu" 
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
            >
                <nav className="pt-28 p-8 h-full flex flex-col">
                    <ul className="flex flex-col items-center text-center space-y-6">
                        {navLinks.map((link, index) => (
                            <li 
                                key={link.name}
                                className={`transition-all duration-200 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                style={{ transitionDelay: `${isMenuOpen ? 150 + index * 50 : 0}ms` }}
                            >
                                <a href={link.href} onClick={handleLinkClick} className="text-2xl text-slate-200 hover:text-cyan-400 transition-colors duration-300 py-2 block">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                         <li 
                            className={`pt-4 transition-all duration-200 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                            style={{ transitionDelay: `${isMenuOpen ? 150 + navLinks.length * 50 : 0}ms` }}
                        >
                            <a href="tel:6093006464" onClick={handleLinkClick} className="text-xl text-slate-200 hover:text-cyan-400 transition-colors duration-300 py-2 flex items-center space-x-3">
                                <PhoneIcon className="w-6 h-6" />
                                <span>(609) 300-6464</span>
                            </a>
                        </li>
                        <li
                            className={`transition-all duration-200 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                            style={{ transitionDelay: `${isMenuOpen ? 150 + (navLinks.length + 1) * 50 : 0}ms` }}
                        >
                            <a href="#contact" onClick={handleLinkClick} className="mt-6 group w-full text-center bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2">
                                <span>Get a Quote</span>
                                <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {isMenuOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}></div>}
        </>
    );
};

export default Header;