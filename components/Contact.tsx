import React, { useState } from 'react';
import { SpinnerIcon, ArrowRightIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Simulate a network request
        setTimeout(() => {
            setIsSubmitting(false);
            // Here you would typically handle success/error state
        }, 2000);
    };

    return (
        <section 
            id="contact" 
            ref={sectionRef}
            className={`py-20 bg-slate-800 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-white">Let's Build Something Together</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear about it. Feel free to fill out the form below or give us a call at <a href="tel:6093006464" className="text-cyan-400 hover:underline">(609) 300-6464</a>.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl shadow-2xl p-8 md:p-12 border border-slate-700">
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-slate-400 mb-2">Your Name</label>
                                <input type="text" id="name" name="name" required className="w-full bg-slate-800 border border-slate-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-slate-400 mb-2">Your Email</label>
                                <input type="email" id="email" name="email" required className="w-full bg-slate-800 border border-slate-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="message" className="block text-slate-400 mb-2">Message</label>
                            <textarea id="message" name="message" rows={5} required className="w-full bg-slate-800 border border-slate-600 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                        </div>
                        <div className="mt-8 text-center">
                            <button 
                                type="submit" 
                                className="group w-48 justify-center flex items-center bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 disabled:opacity-75 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                        Sending...
                                    </>
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <span>Send Message</span>
                                        <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;