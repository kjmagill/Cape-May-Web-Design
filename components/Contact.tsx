import React, { useState, useEffect, useCallback } from 'react';
import { SpinnerIcon, ArrowRightIcon, UserIcon, EnvelopeIcon, AnimatedCheckCircleIcon, MapPinIcon, PhoneIcon } from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

type FormState = {
    name: string;
    email: string;
    message: string;
};

type TouchState = {
    name: boolean;
    email: boolean;
    message: boolean;
}

type ErrorState = Partial<FormState>;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1, triggerOnce: true });

    const initialFormState: FormState = { name: '', email: '', message: '' };
    const initialTouchState: TouchState = { name: false, email: false, message: false };

    const [formData, setFormData] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<ErrorState>({});
    const [touched, setTouched] = useState<TouchState>(initialTouchState);
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [isFormValid, setIsFormValid] = useState(false);

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
        if (!data.message.trim()) {
            newErrors.message = 'Message is required.';
        } else if (data.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters.';
        }
        return newErrors;
    }, []);
    
    useEffect(() => {
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        setIsFormValid(Object.keys(validationErrors).length === 0);
    }, [formData, validate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name as keyof TouchState]: true }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTouched({ name: true, email: true, message: true });

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setFormStatus('submitting');

        setTimeout(() => {
            setFormStatus('success');
            setFormData(initialFormState);
            setTouched(initialTouchState);
            setTimeout(() => setFormStatus('idle'), 5000); 
        }, 2000);
    };

    const renderInput = (
        id: keyof FormState, 
        label: string, 
        type: string, 
        IconComponent: React.FC<{ className?: string }> | null, 
        isTextArea = false
    ) => {
        const hasError = touched[id] && errors[id];
        const InputComponent = isTextArea ? 'textarea' : 'input';
        const hasIcon = IconComponent !== null;

        return (
            <div className="relative">
                {hasIcon && (
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 text-slate-500 peer-focus:text-cyan-400 ${hasError ? '!text-red-400' : ''}`}>
                        <IconComponent className="w-5 h-5" />
                    </div>
                )}
                <InputComponent
                    id={id}
                    name={id}
                    type={type}
                    value={formData[id]}
                    onChange={handleChange}
                    aria-invalid={!!hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    aria-required="true"
                    placeholder=" " // Required for floating label
                    rows={isTextArea ? 5 : undefined}
                    className={`
                        peer block w-full bg-slate-800 border rounded-md py-3 pr-4 text-white placeholder-transparent
                        transition-colors duration-300
                        focus:outline-none focus:ring-1
                        ${hasIcon ? 'pl-12' : 'pl-4'}
                        ${hasError 
                            ? 'border-red-500/70 focus:ring-red-500/50' 
                            : 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500/50'
                        }
                    `}
                />
                <label
                    htmlFor={id}
                    className={`
                        absolute -top-2.5 px-1 bg-slate-900 text-sm
                        transition-all duration-300
                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                        peer-focus:-top-2.5 peer-focus:text-sm
                        pointer-events-none
                        ${hasIcon ? 'left-11' : 'left-3'}
                        ${hasError 
                            ? 'text-red-400' 
                            : 'text-slate-400 peer-focus:text-cyan-400'
                        }
                    `}
                >
                    {label}
                </label>
                {hasError && (
                    <p id={`${id}-error`} className="mt-2 text-sm text-red-400">
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
            className="py-20 bg-slate-800"
        >
            <div className="container mx-auto px-6">
                <div 
                    className={`text-center mb-12 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-4xl font-extrabold text-white">Ready to Grow Your Business?</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                        Tell us about your project. We'll provide a free, no-obligation quote and a clear strategy to help you achieve your goals online.
                    </p>
                </div>
                <div 
                    className={`max-w-4xl mx-auto bg-slate-900 rounded-xl shadow-2xl p-8 md:p-12 border border-slate-700 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                                        <a href="tel:6093006464" className="text-slate-300 hover:text-cyan-400 transition-colors">(609) 300-6464</a>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <div className="mt-1 flex-shrink-0"><EnvelopeIcon className="w-5 h-5 text-cyan-400"/></div>
                                    <div>
                                        <span className="text-white font-semibold">Email</span><br/>
                                        <a href="mailto:capemaywebdev@gmail.com" className="text-slate-300 hover:text-cyan-400 transition-colors">capemaywebdev@gmail.com</a>
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
                        <div>
                             {formStatus === 'success' ? (
                                <div className="text-center h-full flex flex-col justify-center items-center py-10 transition-all duration-300 ease-in-out">
                                    <AnimatedCheckCircleIcon className="w-20 h-20 mx-auto" />
                                    <h3 className="text-2xl font-bold text-white mt-4">Thank you!</h3>
                                    <p className="text-slate-300 mt-2">Your message has been sent successfully. We'll be in touch soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="flex flex-col space-y-6">
                                        {renderInput('name', 'Your Name', 'text', UserIcon)}
                                        {renderInput('email', 'Your Email', 'email', EnvelopeIcon)}
                                        {renderInput('message', 'Your Message', 'text', null, true)}
                                    </div>
                                    <div className="mt-6">
                                        <button 
                                            type="submit" 
                                            className="group w-full justify-center flex items-center bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                                            disabled={formStatus === 'submitting' || !isFormValid}
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