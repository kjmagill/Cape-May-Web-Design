import React, { useState, useEffect } from 'react';
import { CapeMayLogo, PhoneIcon } from './icons';

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
        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="flex items-center space-x-3 z-[60]">
                        <CapeMayLogo className="w-10 h-10" />
                        <span className="text-xl font-bold text-white tracking-wider">Cape May Web Design</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300">
                                {link.name}
                            </a>
                        ))}
                        <a href="tel:6093006464" className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2">
                            <PhoneIcon className="w-5 h-5" />
                            <span>(609) 300-6464</span>
                        </a>
                        <a href="#contact" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
                            Get a Quote
                        </a>
                    </nav>
                    <button 
                        className="md:hidden text-white z-[60]" 
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
                </div>
            </header>

            {/* Mobile Menu Panel */}
            <div 
                id="mobile-menu" 
                className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
            >
                <nav className="pt-28 p-8 h-full flex flex-col">
                    <ul className="flex flex-col items-center text-center space-y-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} onClick={handleLinkClick} className="text-2xl text-slate-200 hover:text-cyan-400 transition-colors duration-300 py-2 block">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                         <li className="pt-4">
                            <a href="tel:6093006464" onClick={handleLinkClick} className="text-xl text-slate-200 hover:text-cyan-400 transition-colors duration-300 py-2 flex items-center space-x-3">
                                <PhoneIcon className="w-6 h-6" />
                                <span>(609) 300-6464</span>
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={handleLinkClick} className="mt-6 w-full text-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block">
                                Get a Quote
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {isMenuOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}></div>}
        </>
    );
};

export default Header;