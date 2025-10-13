import React from 'react';

const TestimonialCard: React.FC<{ quote: string; name: string; company: string }> = ({ quote, name, company }) => (
    <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
        <p className="text-slate-300 italic mb-6">"{quote}"</p>
        <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white mr-4">
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
    const testimonialsData = [
        {
            quote: "Cape May Web Design transformed our online presence. The new site is not only beautiful but also incredibly fast. Our bookings have increased by 40%!",
            name: "Sarah Jenkins",
            company: "Owner, The Cove Inn",
        },
        {
            quote: "The team was professional, creative, and delivered beyond our expectations. They understood our vision perfectly and brought it to life.",
            name: "Mark Thompson",
            company: "Founder, Harbor Side Eatery",
        },
        {
            quote: "An absolute pleasure to work with. They handled everything from design to SEO, and the results speak for themselves. Highly recommended!",
            name: "Emily Carter",
            company: "Manager, Shoreline Gifts",
        },
    ];

    return (
        <section id="testimonials" className="py-20 bg-slate-900">
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