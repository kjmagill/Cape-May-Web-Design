

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSeo } from '../hooks/useSeo';
import { ArrowLeftIcon } from './icons';

const PrivacyPolicy: React.FC = () => {
    useSeo({
        title: 'Privacy Policy | Cape May Web Design',
        description: 'Read our Privacy Policy to understand how Cape May Web Design collects, uses, and safeguards your personal information.',
        canonicalUrl: 'https://www.capemaywebdesign.com/privacy'
    });

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
                        <h1 className="text-4xl font-extrabold text-white mb-2">Privacy Policy</h1>
                        <p className="text-sm text-slate-400 mb-8 font-mono">Last updated: June 24, 2026</p>
                        
                        <div className="space-y-6 text-slate-300 leading-relaxed">
                            <p>
                                At Cape May Web Design, we are dedicated to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and protect the information of visitors to our website, prospective clients, and current business partners.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
                            <p>
                                We collect information to provide better services, build higher-performing web applications, and optimize your overall experience. This falls into two general categories:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong className="text-white">Information You Provide Voluntarily:</strong> When you contact us, fill out our estimate request forms, or correspond with us, you may provide personal details such as your name, business name, phone number (<a href="tel:6093006464" className="text-cyan-400 hover:underline">(609) 300-6464</a>), email address (<a href="mailto:capemaywebdesign@gmail.com" className="text-cyan-400 hover:underline">capemaywebdesign@gmail.com</a>), and project specifications.
                                </li>
                                <li>
                                    <strong className="text-white">Information Collected Automatically:</strong> We automatically collect standard diagnostic, browser, and navigation data when you access our site. This includes IP addresses, device types, operating systems, referring URLs, and specific pages viewed.
                                </li>
                            </ul>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
                            <p>
                                We utilize the collected data to fuel our design and development operations and improve our digital solutions. Specifically, we use your information to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Respond to project inquiries, formulate custom design/development quotes, and establish scope-of-work agreements.</li>
                                <li>Deliver custom website designs, e-commerce stores, web applications, and local SEO services.</li>
                                <li>Manage billing, invoicing, payments, and legal correspondence.</li>
                                <li>Send service-related notifications, security updates, or promotional web design strategies (which you can opt-out of at any time).</li>
                                <li>Analyze aggregated user demographics to optimize our website, user flows, and service offerings.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Sharing and Third Parties</h2>
                            <p>
                                <strong className="text-white">We do not sell, rent, or lease your personal information to third parties.</strong>
                            </p>
                            <p>
                                We may share minimal, necessary subsets of data with trusted third-party service providers (such as hosting providers, secure analytics software, or billing processors) strictly to facilitate our business operations. All such service providers are contractually bound to maintain strict confidentiality and utilize state-of-the-art security standards.
                            </p>
                            <p>
                                We may also disclose your information if required to do so by law, or in the good faith belief that such action is necessary to comply with legal obligations or protect the rights and safety of Cape May Web Design.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies and Analytical Trackers</h2>
                            <p>
                                We use cookies and similar browser-tracking technologies to personalize your experience, track usage patterns, and secure our system. Cookies are small data files stored on your local hard drive. You can choose to accept or decline cookies through your individual browser settings; however, disabling cookies may prevent you from fully interacting with certain interactive portions of our website.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Information Security</h2>
                            <p>
                                Cape May Web Design implements robust administrative, logical, and physical security measures to shield your data from unauthorized access, loss, or disclosure. We utilize Secure Sockets Layer (SSL) encryption protocols, firewalls, and secure modern cloud environments. While we make every effort to guard your personal data, no internet-based transmission can be guaranteed as 100% secure.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. External Portfolio Links</h2>
                            <p>
                                Our website contains portfolios and testimonials linking to active websites we have built for our local business partners. Once you follow an outbound link to an external website, this privacy policy no longer applies. We encourage you to review the individual privacy policies of any third-party websites you visit.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Your Rights & Data Erasure</h2>
                            <p>
                                You retain full ownership and rights over your personal data. At any time, you may request to access, update, correct, or permanently delete any of your personal information stored in our databases.
                            </p>
                            <p>
                                To exercise these rights, please email us directly at <a href="mailto:capemaywebdesign@gmail.com" className="text-cyan-400 hover:underline">capemaywebdesign@gmail.com</a>. We will process and respond to your request within a reasonable, standard timeframe in compliance with legal mandates.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes to This Privacy Policy</h2>
                            <p>
                                We reserves the right to update this Privacy Policy periodically to reflect legal modifications, business adjustments, or industry advancements. Any changes will be posted directly to this page with an updated "Last updated" date. We advise you to review this policy occasionally to stay informed.
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
                            <p>
                                If you have any inquiries regarding this Privacy Policy or how your personal information is managed, please reach out to us at:
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50 font-medium space-y-2">
                                <p className="text-white font-bold">Cape May Web Design</p>
                                <p>Serving Cape May, Wildwood, Ocean City, and all of South Jersey</p>
                                <p>Phone: <a href="tel:6093006464" className="text-cyan-400 hover:underline">(609) 300-6464</a></p>
                                <p>Email: <a href="mailto:capemaywebdesign@gmail.com" className="text-cyan-400 hover:underline font-semibold">capemaywebdesign@gmail.com</a></p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <a 
                                href="/" 
                                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:from-cyan-200 hover:via-sky-300 hover:to-blue-400 text-white text-shadow-cta font-extrabold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900 shadow-[0_1px_2px_rgba(34,211,238,0.15),_0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_4px_12px_rgba(59,130,246,0.15),_0_0_25px_rgba(34,211,238,0.45)]"
                            >
                                <ArrowLeftIcon className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-1" />
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