

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSeo } from '../hooks/useSeo';
import { ArrowRightIcon } from './icons';

const PrivacyPolicy: React.FC = () => {
    useSeo({
        title: 'Privacy Policy | Cape May Web Design',
        description: 'Read the privacy policy for Cape May Web Design to understand how we collect, use, and protect your personal information.',
        canonicalUrl: 'https://www.capemaywebdesign.com/privacy'
    });

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const privacyPolicyUrl = "https://www.freeprivacypolicy.com/live/0ca54af8-fd0f-4c58-a1f2-19da2b034053";

    return (
        <div className="bg-slate-900 min-h-screen text-slate-300 flex flex-col">
            <Header />
            <main className="pt-24 md:pt-32 pb-16 md:pb-20 flex-grow">
                <div className="container mx-auto px-6">
                    <div 
                        className={`
                            max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-2xl p-8 md:p-12 border border-slate-700 
                            transition-all duration-700 ease-out
                            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                    >
                        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Privacy Policy</h1>
                        <p className="text-lg text-center leading-relaxed mb-8">
                            We are committed to protecting your privacy. Our comprehensive Privacy Policy is managed by a third-party service to ensure it remains current with all legal requirements.
                        </p>
                        <p className="text-lg text-center leading-relaxed mb-12">
                            Please click the button below to review our full policy. This will open in a new tab on our trusted policy provider's website.
                        </p>
                        <div className="text-center">
                             <a 
                                href={privacyPolicyUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold [text-shadow:0_1px_3px_rgb(0_0_0_/_0.25)] py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-800"
                            >
                                <span>View Our Privacy Policy</span>
                                <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;