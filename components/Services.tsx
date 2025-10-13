import React from 'react';
import { CodeIcon, ShoppingCartIcon, ChartBarIcon } from './icons';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-2">
        <div className="mb-4 text-cyan-400">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

const Services: React.FC = () => {
    const servicesData = [
        {
            icon: <CodeIcon className="w-12 h-12" />,
            title: 'Custom Web Design',
            description: 'Stunning, responsive websites tailored to your brand. From simple portfolios to complex web applications, we bring your vision to life.',
        },
        {
            icon: <ShoppingCartIcon className="w-12 h-12" />,
            title: 'E-commerce Solutions',
            description: 'Robust and scalable online stores that provide a seamless shopping experience, driving sales and customer loyalty.',
        },
        {
            icon: <ChartBarIcon className="w-12 h-12" />,
            title: 'SEO & Marketing',
            description: 'Boost your online visibility and attract more customers with our data-driven SEO strategies and digital marketing campaigns.',
        },
    ];

    return (
        <section id="services" className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-white">Our Expertise</h2>
                    <p className="text-slate-400 mt-2 max-w-2xl mx-auto">We provide a complete suite of services to establish and grow your online presence.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;