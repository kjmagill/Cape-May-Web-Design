import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TestimonialCard: React.FC<{ quote: string; name: string; company: string }> = ({ quote, name, company }) => (
    <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-2 hover:border-cyan-500">
        <p className="text-slate-300 italic mb-6 flex-grow">"{quote}"</p>
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white mr-4 flex-shrink-0">
                {name.charAt(0)}
            </div>
            <div>
                <p className="font-bold text-white">{name}</p>
                <p className="text-slate-400 text-sm">{company}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

    const testimonialsData = [
        {
            quote: "Our online sales have skyrocketed since launching the new e-commerce site. The user experience is fantastic, and managing products is a breeze. They delivered exactly what we needed to grow.",
            name: "Jessica P.",
            company: "Local Boutique Owner",
        },
        {
            quote: "Working with them was a seamless experience. They listened to our needs and created a website that perfectly captures the atmosphere of our restaurant. We've seen a noticeable increase in online reservations.",
            name: "David R.",
            company: "Restaurant Owner",
        },
        {
            quote: "I was struggling to get leads online. After they rebuilt my site with a focus on SEO, I'm finally showing up on the first page of Google. The phone has been ringing non-stop!",
            name: "Michael B.",
            company: "Local Service Provider",
        },
    ];

    return (
        <section 
            id="testimonials" 
            ref={sectionRef}
            className={`py-20 bg-slate-900 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-white">What Our Clients Say</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">We're proud to have built strong relationships with businesses in our community.</p>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;