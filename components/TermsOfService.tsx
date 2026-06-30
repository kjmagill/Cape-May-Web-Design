

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ArrowLeftIcon } from './icons';
import { useSeo } from '../hooks/useSeo';

const TermsOfService: React.FC = () => {
    useSeo({
        title: 'Terms of Service | Cape May Web Design',
        description: 'Review the terms of service for using the Cape May Web Design website and services.',
        canonicalUrl: 'https://www.capemaywebdesign.com/terms'
    });
    
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-300">
            <Header />
            <main className="pt-24 md:pt-32 pb-16 md:pb-20">
                <div className="container mx-auto px-6">
                    <div 
                        className={`max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-2xl p-8 md:p-12 border border-slate-700 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <h1 className="text-4xl font-extrabold text-white mb-6">Terms of Service</h1>
                        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Agreement to Terms</h2>
                        <p className="mb-4 leading-relaxed">
                            By using our Services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the Services.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Intellectual Property Rights</h2>
                        <p className="mb-4 leading-relaxed">
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Representations</h2>
                        <p className="mb-4 leading-relaxed">
                            By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Governing Law</h2>
                        <p className="mb-4 leading-relaxed">
                            These conditions are governed by and interpreted following the laws of the United States, and the use of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Contact Us</h2>
                        <p className="mb-4 leading-relaxed">
                            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us.
                        </p>

                        <div className="text-center mt-12">
                            <a 
                                href="/" 
                                className="group relative overflow-hidden inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:from-cyan-200 hover:via-sky-300 hover:to-blue-400 text-white text-shadow-cta font-extrabold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900 shadow-[0_1px_2px_rgba(34,211,238,0.15),_0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_4px_12px_rgba(59,130,246,0.15),_0_0_25px_rgba(34,211,238,0.45)]"
                            >
                                <span className="absolute inset-0 w-full h-full rounded-full bg-slate-950/15 group-hover:bg-slate-950/5 transition-colors duration-300 pointer-events-none" />
                                <ArrowLeftIcon className="relative z-10 w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-1" />
                                <span className="relative z-10">Back to Home</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;