import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { SpinnerIcon, ArrowRightIcon, UserIcon, EnvelopeIcon, AnimatedCheckCircleIcon, MapPinIcon, PhoneIcon, ClipboardDocumentListIcon, ChevronDownIcon, ClipboardIcon, CheckIcon } from './icons';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwUfQ1gDlEQSBKLRohNoVfV3zlRVR8m6aECn-WRQyQFKAc20MhLsXiwHzCbMYDP0SK/exec';

type FormState = {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
};

type TouchState = {
    name: boolean;
    email: boolean;
    phone: boolean;
    service: boolean;
    message: boolean;
}

type ErrorState = Partial<FormState>;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// Framer Motion Variants for scroll animation triggers
const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] // Custom easeOutExpose
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.12,
            delayChildren: 0.15
        }
    }
};

const leftColumnVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 15,
            duration: 0.8
        }
    }
};

const rightColumnVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 15,
            duration: 0.8
        }
    }
};

const contactItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const Contact: React.FC = () => {
    const initialFormState: FormState = { name: '', email: '', phone: '', service: '', message: '' };
    const initialTouchState: TouchState = { name: false, email: false, phone: false, service: false, message: false };

    const [formData, setFormData] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<ErrorState>({});
    const [touched, setTouched] = useState<TouchState>(initialTouchState);
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [copied, setCopied] = useState(false);

    const handleCopy = async (event?: React.MouseEvent<HTMLButtonElement>) => {
        const button = event?.currentTarget;
        if (button) {
            button.blur();
        }
        try {
            await navigator.clipboard.writeText('capemaywebdesign@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    const validate = useCallback((data: FormState): ErrorState => {
        const newErrors: ErrorState = {};
        if (!data.name.trim()) {
            newErrors.name = 'Name is required.';
        } else if (data.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters.';
        }
        if (!data.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (data.phone.trim() && !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(data.phone)) {
            newErrors.phone = 'Please enter a valid phone number.';
        }
        if (!data.service) {
            newErrors.service = 'Please select a service.';
        }
        if (!data.message.trim()) {
            newErrors.message = 'Message is required.';
        } else if (data.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters.';
        }
        return newErrors;
    }, []);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (touched[name as keyof TouchState]) {
            const validationErrors = validate(newFormData);
            setErrors(validationErrors);
        }

        if (formStatus === 'success' || formStatus === 'error') {
            setFormStatus('idle');
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name } = event.target;
        setTouched(prev => ({ ...prev, [name as keyof TouchState]: true }));
        const validationErrors = validate(formData);
        setErrors(validationErrors);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTouched({ name: true, email: true, phone: true, service: true, message: true });

        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            const firstErrorKey = Object.keys(validationErrors)[0] as keyof FormState;
            const errorElement = document.getElementById(firstErrorKey);
            if (errorElement) {
                errorElement.focus();
            }
            return;
        }
        
        setFormStatus('submitting');

        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.result !== 'success') {
                 throw new Error(`Script error: ${result.message || 'Unknown error'}`);
            }

            setFormStatus('success');
            setFormData(initialFormState);
            setTouched(initialTouchState);
        } catch (error) {
            console.error("Form submission error:", error);
            setFormStatus('error');
        }
    };

    const serviceOptions = [
        'Custom Website Design',
        'E-commerce Store',
        'Targeted SEO & Marketing',
        'AI Workflows & Automations',
        'Agentic Digital Employees',
        'Other Inquiry'
    ];

    const renderField = (
        id: keyof FormState, 
        label: string, 
        IconComponent: React.FC<{ className?: string }>,
        options?: { type?: string; isTextArea?: boolean; isSelect?: boolean; }
    ) => {
        const { type = 'text', isTextArea = false, isSelect = false } = options || {};
        const hasError = touched[id] && errors[id];
        const errorId = `${id}-error`;

        const commonLabelClasses = `
            absolute -top-2.5 px-1 bg-slate-900 text-sm left-11
            transition-all duration-300 pointer-events-none
            peer-placeholder-shown:top-3.5 
            peer-placeholder-shown:text-base 
            peer-placeholder-shown:left-12
            peer-placeholder-shown:px-0
            peer-placeholder-shown:bg-transparent
        `;

        const statefulLabelClasses = hasError 
            ? 'text-red-400' 
            : 'text-slate-400 peer-focus-visible:text-cyan-400';
        
        const commonInputClasses = `
            peer block w-full bg-slate-800 border rounded-md py-3 text-white placeholder-transparent pl-12
            transition-colors duration-300 focus:outline-none appearance-none
        `;

        const statefulInputClasses = hasError 
            ? 'border-red-500/70 focus-visible:ring-1 focus-visible:ring-red-500/50' 
            : 'border-slate-600 focus-visible:border-cyan-500 focus-visible:ring-1 focus-visible:ring-cyan-500/50';

        return (
            <div>
                <div className={`relative ${hasError ? 'animate-shake' : ''}`}>
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 text-slate-500 peer-focus-visible:text-cyan-400 ${hasError ? '!text-red-400' : ''}`}>
                        <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {isSelect ? (
                        <>
                            <select
                                id={id}
                                name={id}
                                value={formData[id]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={!!hasError}
                                aria-describedby={hasError ? errorId : undefined}
                                aria-required="true"
                                className={`${commonInputClasses} ${statefulInputClasses} pr-10`}
                            >
                                <option value="" disabled></option>
                                {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none peer-focus-within:text-cyan-400"/>
                        </>
                    ) : (
                        React.createElement(isTextArea ? 'textarea' : 'input', {
                            id: id,
                            name: id,
                            type: type,
                            value: formData[id],
                            onChange: handleChange,
                            onBlur: handleBlur,
                            'aria-invalid': !!hasError,
                            'aria-describedby': hasError ? errorId : undefined,
                            'aria-required': 'true',
                            placeholder: ' ',
                            rows: isTextArea ? 5 : undefined,
                            className: `${commonInputClasses} ${statefulInputClasses} pr-4`
                        })
                    )}

                    <label
                        htmlFor={id}
                        className={`
                            ${commonLabelClasses} ${statefulLabelClasses}
                            ${ isSelect && formData[id] && '-top-2.5 !text-sm' }
                        `}
                    >
                        {label}
                    </label>
                </div>
                {hasError && (
                    <p 
                        id={errorId}
                        role="alert" 
                        className="text-red-400 text-sm mt-1.5 ml-1"
                    >
                        {errors[id]}
                    </p>
                )}
            </div>
        );
    };

    return (
        <section 
            id="contact" 
            className="py-24 md:py-32 bg-slate-800"
            aria-labelledby="contact-heading"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div 
                    className="text-center mb-20"
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center justify-center gap-3.5 mb-4">
                        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-500"></span>
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 uppercase inline-block font-outfit">
                            Connect Today
                        </span>
                        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-500"></span>
                    </div>
                    <h2 id="contact-heading" className="text-4xl sm:text-5xl font-black text-white italic tracking-tight">Ready to Grow Your Business?</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
                        Tell us about your project. We'll provide a free, no-obligation quote and a clear strategy to help you achieve your goals online.
                    </p>
                </motion.div>

                <motion.div 
                    className="max-w-5xl mx-auto bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-16 border border-slate-700/50"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="grid md:grid-cols-2 md:gap-x-12">
                        {/* Left Column: Contact Info */}
                        <motion.div className="mb-12 md:mb-0" variants={leftColumnVariants}>
                            <h3 className="text-2xl font-bold text-white mb-3">Contact Information</h3>
                            <p className="text-slate-400 mb-8">
                                We're here to help. Reach out to us anytime and we'll happily answer your questions.
                            </p>
                            <ul className="space-y-6">
                                <motion.li className="flex items-start space-x-4" variants={contactItemVariants}>
                                    <div className="mt-1 flex-shrink-0"><PhoneIcon className="w-5 h-5 text-cyan-400"/></div>
                                    <div>
                                        <span className="text-white font-semibold">Phone</span><br/>
                                        <a href="tel:6093006464" className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 rounded-sm">(609) 300-6464</a>
                                    </div>
                                </motion.li>
                                <motion.li className="flex items-start space-x-4" variants={contactItemVariants}>
                                    <div className="mt-1 flex-shrink-0"><EnvelopeIcon className="w-5 h-5 text-cyan-400"/></div>
                                    <div className="min-w-0 flex-1">
                                        <span className="text-white font-semibold">Email</span><br/>
                                        <div className="flex items-center gap-1.5 mt-1 w-full overflow-hidden">
                                            <a 
                                                href="mailto:capemaywebdesign@gmail.com" 
                                                className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 rounded-sm text-xs min-[340px]:text-sm sm:text-base truncate block"
                                                title="capemaywebdesign@gmail.com"
                                            >
                                                capemaywebdesign@gmail.com
                                            </a>
                                            <div className="relative flex items-center flex-shrink-0">
                                                <button
                                                    onClick={handleCopy}
                                                    type="button"
                                                    className="p-1.5 text-slate-400 hover:text-cyan-400 focus:text-cyan-400 hover:bg-slate-800/80 focus:bg-slate-800/80 rounded transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                                                    title="Copy email address"
                                                    aria-label="Copy email address"
                                                >
                                                    {copied ? (
                                                         <CheckIcon className="w-4 h-4 text-emerald-400" />
                                                      ) : (
                                                         <ClipboardIcon className="w-4 h-4" />
                                                      )}
                                                </button>
                                                {copied && (
                                                    <span role="tooltip" className="absolute left-1/2 -translate-x-1/2 -top-10 bg-slate-950 text-white text-xs px-2.5 py-1 rounded shadow-xl whitespace-nowrap transition-all duration-200 z-10 border border-slate-800">
                                                        Copied!
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.li>
                                <motion.li className="flex items-start space-x-4" variants={contactItemVariants}>
                                    <div className="mt-1 flex-shrink-0"><MapPinIcon className="w-5 h-5 text-cyan-400"/></div>
                                    <div>
                                        <span className="text-white font-semibold">Service Area</span><br/>
                                        <span className="text-slate-300">Proudly serving Cape May, The Wildwoods, Ocean City, Sea Isle City, Avalon, Stone Harbor, and all of Cape May County.</span>
                                    </div>
                                </motion.li>
                            </ul>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div id="contact-form" variants={rightColumnVariants}>
                             {formStatus === 'success' ? (
                                <div role="status" aria-live="polite" className="text-center h-full flex flex-col justify-center items-center py-10 transition-all duration-300 ease-in-out">
                                    <AnimatedCheckCircleIcon className="w-20 h-20 mx-auto" />
                                    <h3 className="text-2xl font-bold text-white mt-4">Thank you!</h3>
                                    <p className="text-slate-300 mt-2 mb-8">Your message has been sent successfully. We'll be in touch soon.</p>
                                    <button 
                                        onClick={() => setFormStatus('idle')}
                                        className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md px-4 py-2 border border-cyan-500/30 hover:bg-cyan-500/10"
                                    >
                                        <span>Send Another Message</span>
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="flex flex-col space-y-6">
                                        {renderField('name', 'Your Name', UserIcon, { type: 'text' })}
                                        {renderField('email', 'Your Email', EnvelopeIcon, { type: 'email' })}
                                        {renderField('phone', 'Phone (Optional)', PhoneIcon, { type: 'tel' })}
                                        {renderField('service', 'Service of Interest', ClipboardDocumentListIcon, { isSelect: true })}
                                        {renderField('message', 'Tell us about your project...', EnvelopeIcon, { isTextArea: true })}
                                    </div>
                                    <div className="mt-6">
                                        <button 
                                            type="submit" 
                                            className="group relative overflow-hidden w-full justify-center flex items-center bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 hover:from-cyan-200 hover:via-sky-300 hover:to-blue-400 text-white text-shadow-cta font-extrabold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-[0_1px_2px_rgba(34,211,238,0.15),_0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.2),_0_0_30px_rgba(34,211,238,0.55)] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900"
                                            disabled={formStatus === 'submitting'}
                                        >
                                            <span className="absolute inset-0 w-full h-full rounded-full bg-slate-950/15 group-hover:bg-slate-950/5 transition-colors duration-300 pointer-events-none" />
                                            {formStatus === 'submitting' ? (
                                                <span className="relative z-10 flex items-center justify-center">
                                                    <SpinnerIcon className="-ml-1 mr-3 h-5 w-5 text-white animate-spin" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="relative z-10 flex items-center space-x-2">
                                                    <span>Send Message</span>
                                                    <ArrowRightIcon className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                                                </span>
                                            )}
                                        </button>
                                        <div role="status" aria-live="polite">
                                            {formStatus === 'error' && (
                                                <p className="mt-4 text-center text-red-400">
                                                    Something went wrong. Please try again later.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;