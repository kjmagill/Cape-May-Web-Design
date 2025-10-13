import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ArrowLeftIcon } from './icons';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-slate-900 min-h-screen text-slate-300">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-2xl p-8 md:p-12 border border-slate-700">
                        <h1 className="text-4xl font-extrabold text-white mb-6">Privacy Policy</h1>
                        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
                        <p className="mb-4 leading-relaxed">
                            Welcome to Cape May Web Design. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
                        <p className="mb-4 leading-relaxed">
                            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4 leading-relaxed">
                            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Will Your Information Be Shared With Anyone?</h2>
                        <p className="mb-4 leading-relaxed">
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Contact Us</h2>
                        <p className="mb-4 leading-relaxed">
                            If you have questions or comments about this policy, you may contact us via the contact form on our website or by phone.
                        </p>
                        
                        <div className="text-center mt-12">
                             <a href="/" className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
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

export default PrivacyPolicy;