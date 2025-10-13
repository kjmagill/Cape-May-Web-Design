import React from 'react';
import { LighthouseIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6 py-8 text-center text-slate-400">
                <div className="flex justify-center items-center mb-4">
                    <LighthouseIcon className="w-7 h-7 text-cyan-400" />
                    <span className="ml-2 text-lg font-bold text-white">Cape May Web Design</span>
                </div>
                <p className="mb-4">
                    Building beautiful and functional websites from the heart of Cape May.
                </p>
                 <div className="flex justify-center space-x-6 mb-6">
                    <a href="#" className="hover:text-cyan-400 transition-colors">Facebook</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
                </div>
                <p>&copy; {new Date().getFullYear()} Cape May Web Design. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;