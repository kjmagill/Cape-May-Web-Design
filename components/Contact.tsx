import React, { useState, useEffect, useCallback } from 'react';
import { SpinnerIcon, ArrowRightIcon, UserIcon, EnvelopeIcon, AnimatedCheckCircleIcon, MapPinIcon, PhoneIcon, ExclamationCircleIcon, ClipboardDocumentListIcon, ChevronDownIcon, ClipboardIcon, CheckIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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

const Contact: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.2, triggerOnce: true });

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

        // Re-validate only if the field has been touched (blurred) before.
        // This gives instant feedback as the user corrects an error.
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
        // Mark the field as touched so we know to validate it.
        setTouched(prev => ({ ...prev, [name as keyof TouchState]: true }));
        // Run validation for the whole form when a field is blurred.
        const validationErrors = validate(formData);
        setErrors(validationErrors);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Mark all fields as touched to show errors on all invalid fields upon submission.
        setTouched({ name: true, email: true, phone: true, service: true, message: true });

        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            // Focus the first field with an error for better UX and accessibility.
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
        'Custom App & Automation',
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
            ref={sectionRef}
            className="py-24 md:py-32 bg-slate-800"
            aria-labelledby="contact-heading"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div 
                    className={`text-center mb-20 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    <h2 id="contact-heading" className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Ready to Grow Your Business?</h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
                        Tell us about your project. We'll provide a free, no-obligation quote and a clear strategy to help you achieve your goals online.
                    </p>
                </div>
                <div 
                    className={`max-w-5xl mx-auto bg-slate-900 rounded-2xl shadow-2xl p-8 md:p-16 border border-slate-700/50 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                >
                    <div className="grid md:grid-cols-2 md:gap-x-12">
                        {/* Left Column: Contact Info */}
                        <div className="mb-12 md:mb-0">
                            <h3 className="text-2xl font-bold text-white mb-3">Contact Information</h3>
                            <p className="text-slate-400 mb-8">
                                We're here to help. Reach out to us anytime and we'll happily answer your questions.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0"><PhoneIcon className="w-5 h-5 text-cyan-400"/></div>
                                    <div>
                                        <span className="text-white font-semibold">Phone</span><br/>
                                        <a href="tel:6093006464" className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 rounded-sm">(609) 300-6464</a>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0"><EnvelopeIcon className="w-5 h-5 text-cyan-400"/></div>
                                    <div>
                                        <span className="text-white font-semibold">Email</span><br/>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <a href="mailto:capemaywebdesign@gmail.com" className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-900 rounded-sm">capemaywebdesign@gmail.com</a>
                                            <div className="relative flex items-center">
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
                                </li>
                                <li className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0"><MapPinIcon className="w-5 h-5 text-cyan-400"/></div>
                                    <div>
                                        <span className="text-white font-semibold">Service Area</span><br/>
                                        <span className="text-slate-300">Proudly serving Cape May, The Wildwoods, Ocean City, Sea Isle City, Avalon, Stone Harbor, and all of Cape May County.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Right Column: Form */}
                        <div id="contact-form">
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
                                            className="group w-full justify-center flex items-center bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-bold [text-shadow:0_1px_4px_rgba(0,0,0,0.4)] py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-slate-900"
                                            disabled={formStatus === 'submitting'}
                                        >
                                            {formStatus === 'submitting' ? (
                                                <>
                                                    <SpinnerIcon className="-ml-1 mr-3 h-5 w-5 text-white" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <span className="flex items-center space-x-2">
                                                    <span>Send Message</span>
                                                    <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;