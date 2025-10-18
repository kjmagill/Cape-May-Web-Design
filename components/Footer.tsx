import React from 'react';
import { CapeMayLogo, PhoneIcon } from './icons';

const Footer: React.FC = () => {

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
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6 py-8 text-center text-slate-400">
                <div className="flex justify-center items-center mb-6">
                    <a href="/#home" className="flex items-center space-x-4">
                        <CapeMayLogo className="w-10 h-10" />
                        <LogoText />
                    </a>
                </div>
                <p className="mb-4">
                    Building beautiful and functional websites from the heart of Cape May.
                </p>
                <div className="mb-6">
                    <a href="tel:6093006464" className="text-lg hover:text-cyan-400 transition-colors flex items-center justify-center space-x-2">
                        <PhoneIcon className="w-5 h-5"/>
                        <span>(609) 300-6464</span>
                    </a>
                </div>
                 <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1">Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1">Instagram</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1">LinkedIn</a>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-y-2 sm:gap-x-4 mb-6 text-sm">
                    <a href="/blog" className="hover:text-cyan-400 transition-colors">Blog</a>
                    <span className="text-slate-600 hidden sm:block">|</span>
                    <a href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                    <span className="text-slate-600 hidden sm:block">|</span>
                    <a href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} Cape May Web Design. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;