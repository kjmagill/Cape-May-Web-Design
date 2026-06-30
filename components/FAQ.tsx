import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FaqItem {
    question: string;
    answer: string;
}

const FaqItemRow: React.FC<{ 
    item: FaqItem; 
    index: number; 
    isOpen: boolean; 
    onToggle: () => void; 
}> = ({ item, index, isOpen, onToggle }) => {
    return (
        <div 
            id={`faq-item-container-${index}`}
            className={`bg-slate-900/40 hover:bg-slate-900/55 border rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen ? 'border-cyan-500/30 bg-slate-900/70 shadow-lg shadow-cyan-500/5' : 'border-slate-800/60'
            }`}
        >
            <h3>
                <button
                    type="button"
                    id={`faq-button-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={onToggle}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-lg sm:text-xl text-white hover:text-cyan-400 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-2xl cursor-pointer"
                >
                    <span className="tracking-tight">{item.question}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900/50 flex items-center justify-center border border-slate-700/50 group-hover:border-cyan-500/30 transition-colors">
                        <ChevronDownIcon 
                            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                                isOpen ? 'rotate-180 text-cyan-400' : ''
                            }`} 
                        />
                    </span>
                </button>
            </h3>
            <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="pb-6 px-6 text-slate-400 text-base sm:text-lg leading-relaxed border-t border-slate-800/20 pt-4">
                        {item.answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15, triggerOnce: true });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData: FaqItem[] = [
        {
            question: "How long does a typical web design project take?",
            answer: "Most standard custom websites take about 2 to 4 weeks from our initial discovery session to launch. More complex e-commerce platforms or custom applications with complex third-party system integrations or booking pipelines can take 6-8 weeks or more. We map out a clear launch timeline on day one so you always know what to expect."
        },
        {
            question: "What is Local SEO and why is it crucial for my South Jersey business?",
            answer: "Local Search Engine Optimization (SEO) is the process of optimizing your online presence so that when locals or shore vacationers search for your services in Cape May County, your business ranks high on Google Maps and organic search results. Since tourism is highly competitive and seasonal down the shore, ranking first for local terms means capturing ready-to-buy customers exactly when they need you."
        },
        {
            question: "Do you use generic templates or write custom code?",
            answer: "We design and hand-code highly optimized, tailored solutions from the ground up. While templates are bloated with unnecessary scripts and look generic, custom-coded web architectures run lighting-fast, achieve perfect Google PageSpeed scores, have far superior security, and rank significantly higher on search engine crawlers."
        },
        {
            question: "Is mobile responsiveness included? What about tablet views?",
            answer: "Absolutely. In South Jersey shore towns, over 75% of restaurant searches, contracting hires, and beach equipment bookings are done directly on mobile devices by visitors and residents on the move. Every layout we build features desktop-first design precision backed by a mobile-optimized fluid codebase, guaranteeing seamless usability across all devices."
        },
        {
            question: "What does your web development process look like from start to finish?",
            answer: "We follow a highly disciplined four-step process: (1) Discovery: analyzing your local South Jersey competitors and mapping goals. (2) Custom Design: crafting high-fidelity prototypes of your new layouts. (3) Coding & Local SEO: developing the production-grade application and optimizing search signals. (4) Launch & Training: deploying to secure hosting networks and training your team to make updates easily."
        },
        {
            question: "Will I be able to update my own website content post-launch?",
            answer: "Yes, absolutely. We offer flexible options tailored to your workflow. For direct, lightweight control, we deploy your project to a secure, private GitHub repository and train you and your team to make simple text or image updates directly within GitHub's clean web interface, avoiding recurring maintenance fees. For more dynamic sites, we can integrate an intuitive headless content editor or custom management portal, letting you publish blog posts, modify seasonal business hours, or update pricing without touching a single line of code."
        }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index);
    };

    return (
        <section 
            id="faq" 
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-800 border-y border-slate-700/30"
            aria-labelledby="faq-heading"
        >
            <div className="container mx-auto px-6 max-w-4xl">
                <div 
                    className={`text-center mb-16 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    <div className="flex items-center justify-center gap-3.5 mb-4">
                        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500"></span>
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 uppercase inline-block">
                            Common Questions
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="faq-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
                        Answers to common questions about our custom web design process, timeline, and local search strategies for Cape May businesses.
                    </p>
                </div>

                <div 
                    className={`space-y-4 transition-all duration-1000 ease-out delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {faqData.map((item, index) => (
                        <FaqItemRow 
                            key={index}
                            item={item}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
