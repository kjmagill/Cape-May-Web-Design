import React, { useState, useMemo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Search, 
    X, 
    Check, 
    HelpCircle, 
    ThumbsUp, 
    ThumbsDown, 
    ArrowRight, 
    Sparkles, 
    TrendingUp, 
    ShieldCheck, 
    Layers, 
    ChevronDown 
} from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
    category: 'design' | 'seo' | 'ownership';
}

const FAQ: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15, triggerOnce: true });
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [helpfulStates, setHelpfulStates] = useState<Record<string, 'yes' | 'no'>>({});

    const faqData: FaqItem[] = [
        {
            question: "How long does a typical web design project take?",
            answer: "Most standard custom websites take about 2 to 4 weeks from our initial discovery session to launch. More complex e-commerce platforms or custom applications with complex third-party system integrations or booking pipelines can take 6-8 weeks or more. We map out a clear launch timeline on day one so you always know what to expect.",
            category: 'design'
        },
        {
            question: "Do you use generic templates or write custom code?",
            answer: "We design and hand-code highly optimized, tailored solutions from the ground up. While templates are bloated with unnecessary scripts and look generic, custom-coded web architectures run lightning-fast, achieve perfect Google PageSpeed scores, have far superior security, and rank significantly higher on search engine crawlers.",
            category: 'design'
        },
        {
            question: "Is mobile responsiveness included? What about tablet views?",
            answer: "Absolutely. In South Jersey shore towns, over 75% of restaurant searches, contracting hires, and beach equipment bookings are done directly on mobile devices by visitors and residents on the move. Every layout we build features desktop-first design precision backed by a mobile-optimized fluid codebase, guaranteeing seamless usability across all devices.",
            category: 'design'
        },
        {
            question: "What does your web development process look like from start to finish?",
            answer: "We follow a highly disciplined four-step process: (1) Discovery: analyzing your local South Jersey competitors and mapping goals. (2) Custom Design: crafting high-fidelity prototypes of your new layouts. (3) Coding & Local SEO: developing the production-grade application and optimizing search signals. (4) Launch & Training: deploying to secure hosting networks and training your team to make updates easily.",
            category: 'design'
        },
        {
            question: "Do you build e-commerce shops, vacation rental systems, or restaurant menus?",
            answer: "Yes, frequently. Many of our Cape May clients are in the hospitality, tourism, or retail sectors. We integrate robust, commission-free e-commerce systems, direct-booking channels for shore rentals, live digital restaurant menus, and automated scheduling platforms that seamlessly sync with your existing back-of-house operations.",
            category: 'design'
        },
        {
            question: "What physical areas of South Jersey do you serve?",
            answer: "While we design for clients nationwide, our physical footprint is in South Jersey. We love meeting local business owners in person across Cape May, Wildwood, Stone Harbor, Avalon, Sea Isle City, Ocean City, and throughout Cape May and Atlantic Counties. We believe our deep familiarity with local shore culture and seasonality gives us a massive edge in marketing your local business.",
            category: 'design'
        },
        {
            question: "What is Local SEO and why is it crucial for my South Jersey business?",
            answer: "Local Search Engine Optimization (SEO) is the process of optimizing your online presence so that when locals or shore vacationers search for your services in Cape May County, your business ranks high on Google Maps and organic search results. Since tourism is highly competitive and seasonal down the shore, ranking first for local terms means capturing ready-to-buy customers exactly when they need you.",
            category: 'seo'
        },
        {
            question: "Can you help with local business branding, logo design, or professional copywriting?",
            answer: "Absolutely. A beautiful website is only effective if its branding is cohesive and its messaging is persuasive. We provide holistic visual identity design, logo optimization, and high-impact copywriting engineered for conversions. We craft your copy to speak directly to Cape May tourists and South Jersey locals while naturally weaving in target local SEO search terms.",
            category: 'seo'
        },
        {
            question: "How will we track our website's visitor traffic, lead conversions, and performance?",
            answer: "We integrate lightweight, privacy-friendly analytics dashboards (like Plausible or privacy-first Google Analytics 4) directly into your site. You will receive a secure portal to track visitors, referrers, and map searches in real time, without slowing down your site or annoying visitors with giant cookie banners. We help set up conversion goals so you can trace every lead directly back to its source.",
            category: 'seo'
        },
        {
            question: "Will I be able to update my own website content post-launch?",
            answer: "Yes, absolutely. We offer flexible options tailored to your workflow. For direct, lightweight control, we deploy your project to a secure, private GitHub repository and train you and your team to make simple text or image updates directly within GitHub's clean web interface, avoiding recurring maintenance fees. For more dynamic sites, we can integrate an intuitive headless content editor or custom management portal, letting you publish blog posts, modify seasonal business hours, or update pricing without touching a single line of code.",
            category: 'ownership'
        },
        {
            question: "Who actually owns the website once the project is finished?",
            answer: "You do—100%. Unlike typical agencies that lock you into proprietary platforms or hold your domain and files hostage, we believe in complete client ownership. Once your final payment is processed, you own every line of custom code, all graphics, copywriting, and media assets. We build on open web standards so you have absolute freedom.",
            category: 'ownership'
        },
        {
            question: "How do you handle website security, hosting, and backup systems?",
            answer: "We host our custom-coded applications on global Edge Delivery Networks (like Netlify or Vercel) which feature enterprise-grade DDoS protection, automatic SSL certificates, and 99.9% uptime. Because our sites are custom-coded static structures rather than fragile databases (like WordPress), they are virtually immune to hacking attempts and database injection. Automated weekly backups are baked into the pipeline.",
            category: 'ownership'
        }
    ];

    const categories = [
        { id: 'all', label: 'All Questions', icon: Layers },
        { id: 'design', label: 'Web Design & Dev', icon: Sparkles },
        { id: 'seo', label: 'Local SEO & Marketing', icon: TrendingUp },
        { id: 'ownership', label: 'Ownership & Technical', icon: ShieldCheck }
    ];

    // Filter FAQ data based on chosen category and search term
    const filteredFaq = useMemo(() => {
        return faqData.filter(item => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const handleToggle = (index: number) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index);
    };

    const handleFeedback = (question: string, feedback: 'yes' | 'no') => {
        setHelpfulStates(prev => ({
            ...prev,
            [question]: feedback
        }));
    };

    const faqSchema = useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        };
    }, []);

    return (
        <section 
            id="faq" 
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-800 border-y border-slate-700/30 overflow-hidden"
            aria-labelledby="faq-heading"
        >
            {/* FAQ JSON-LD Schema Markup */}
            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-6 max-w-4xl relative">
                {/* Visual Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0%,transparent_60%)] pointer-events-none" />

                {/* FAQ Header */}
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
                        Answers to common questions about our custom web design process, ownership policies, security, and local search strategies for Cape May businesses.
                    </p>
                </div>

                {/* Interactive Filtering Controls */}
                <div 
                    className={`transition-all duration-1000 ease-out delay-100 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Live Search Input */}
                    <div className="relative max-w-md mx-auto mb-10 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search FAQ (e.g. SEO, hosting, e-commerce...)"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setOpenIndex(null); // Close accordion on search to prevent indexing mismatches
                            }}
                            className="block w-full pl-11 pr-10 py-3 bg-slate-900/40 border border-slate-800 lg:hover:border-slate-700/80 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-slate-500 rounded-full text-sm sm:text-base transition-all backdrop-blur-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 lg:hover:text-white"
                                title="Clear search"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        setOpenIndex(null); // Close accordion on tab switch
                                    }}
                                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all cursor-pointer select-none"
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeCategory"
                                            className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                                    <span className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-400 lg:hover:text-slate-200'}`}>
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ Items Accordion list */}
                <div 
                    className={`space-y-4 transition-all duration-1000 ease-out delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredFaq.map((item, index) => {
                            const isOpen = openIndex === index;
                            const feedback = helpfulStates[item.question];
                            return (
                                <motion.div 
                                    layout="position"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                    key={item.question}
                                    className={`bg-slate-900/30 lg:hover:bg-slate-900/50 border rounded-2xl transition-all duration-300 overflow-hidden relative ${
                                        isOpen 
                                            ? 'border-cyan-500/35 bg-slate-900/70 shadow-[0_4px_30px_rgba(6,182,212,0.06)]' 
                                            : 'border-slate-800/60 lg:hover:border-slate-700/60'
                                    }`}
                                >
                                    {/* Left active cyan accent strip */}
                                    {isOpen && (
                                        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 to-blue-500 rounded-l-2xl" />
                                    )}

                                    <h3>
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            onClick={() => handleToggle(index)}
                                            className="w-full text-left px-6 py-5 flex items-start gap-4 font-bold text-base sm:text-lg text-white lg:hover:text-cyan-400 transition-colors duration-200 outline-none rounded-2xl cursor-pointer select-none"
                                        >
                                            {/* Number Indicator */}
                                            <span className="font-mono text-xs sm:text-sm text-cyan-400/50 mt-1 select-none w-6 text-right">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            {/* Question text */}
                                            <span className="flex-1 tracking-tight leading-snug">{item.question}</span>
                                            {/* Expand arrow */}
                                            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                                isOpen 
                                                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                                                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                                            }`}>
                                                <ChevronDown 
                                                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                                                />
                                            </span>
                                        </button>
                                    </h3>
                                    
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-6 pl-12 sm:pl-16 pr-6 text-slate-300/90 text-sm sm:text-base leading-relaxed border-t border-slate-800/10 pt-4">
                                                    <p>{item.answer}</p>
                                                    
                                                    {/* Custom Micro-Feedback Element */}
                                                    <div className="mt-6 pt-4 border-t border-slate-800/30 flex items-center justify-between flex-wrap gap-3">
                                                        <span className="text-xs text-slate-500 font-mono">Was this answer helpful?</span>
                                                        <div className="flex items-center gap-2">
                                                            {feedback ? (
                                                                <motion.div 
                                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium font-mono"
                                                                >
                                                                    <Check className="w-3.5 h-3.5" />
                                                                    <span>Thanks for the feedback!</span>
                                                                </motion.div>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleFeedback(item.question, 'yes')}
                                                                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-white hover:bg-slate-800/50 border border-slate-800/40 transition-all cursor-pointer"
                                                                    >
                                                                        <ThumbsUp className="w-3 h-3 text-cyan-500" />
                                                                        <span>Yes</span>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleFeedback(item.question, 'no')}
                                                                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-white hover:bg-slate-800/50 border border-slate-800/40 transition-all cursor-pointer"
                                                                    >
                                                                        <ThumbsDown className="w-3 h-3 text-rose-500" />
                                                                        <span>No</span>
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* No Search Matches Found */}
                    {filteredFaq.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16 px-6 border border-dashed border-slate-800/80 rounded-2xl bg-slate-900/10"
                        >
                            <HelpCircle className="w-10 h-10 text-cyan-500/50 mx-auto mb-3" />
                            <p className="text-white font-bold text-lg mb-1">No matches found</p>
                            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-4">
                                We couldn't find any questions matching "{searchQuery}". Try selecting another category or resetting the search filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="px-4 py-2 bg-slate-900/60 border border-slate-850 hover:border-cyan-500/30 text-cyan-400 hover:text-white text-xs font-mono font-bold rounded-full transition-all cursor-pointer"
                            >
                                Reset Search Filters
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Callout Section Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-16 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-850 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative blur elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

                    <h3 className="text-xl sm:text-2xl font-black text-white italic tracking-tight mb-3">
                        Still Have Questions?
                    </h3>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
                        Get in touch with us to discuss your project, ask any questions, or see how we can help your local South Jersey business succeed online.
                    </p>
                    <a 
                        href="#contact" 
                        className="group relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:via-sky-300 hover:to-blue-400 text-white font-extrabold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-[0_4px_12px_rgba(34,211,238,0.15)] hover:shadow-[0_4px_20px_rgba(34,211,238,0.45)] text-sm"
                    >
                        <span className="absolute inset-0 w-full h-full rounded-full bg-slate-950/15 group-hover:bg-slate-950/5 transition-colors duration-300 pointer-events-none" />
                        <span className="relative z-10">Get in Touch Directly</span>
                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
