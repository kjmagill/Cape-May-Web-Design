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
                            <a href="/" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                                <ArrowLeftIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span>Back to Home</span>
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