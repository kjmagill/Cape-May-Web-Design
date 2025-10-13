import React from 'react';

interface IconProps {
    className?: string;
}

export const CodeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.103-.816l1.72-4.816c.075-.208.122-.427.122-.656 0-1.036-.84-1.875-1.875-1.875H5.197M7.5 14.25h11.218M15 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-6 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

export const LighthouseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75V21m-2.25-8.25a.75.75 0 0 1-.75-.75V3.75c0-.414.336-.75.75-.75h4.5c.414 0 .75.336.75.75v6.75a.75.75 0 0 1-.75.75h-4.5Zm-1.5 0H6.75a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h3.75m0 0H15m-3.75 0H6.75m6 0v.75c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75v-.75m0 0H15m0 0h.75a.75.75 0 0 0 .75-.75v-.75c0-.414-.336-.75-.75-.75h-.75m-3 0h-1.5m-3 0H6.75m-3 0H3.75c-.414 0-.75.336-.75.75v.75c0 .414.336.75.75.75h.75m12-3.75h.75c.414 0 .75.336.75.75v.75c0 .414-.336.75-.75.75h-.75m-3.75-3h-1.5m3.75 0h.75m-6 0h-1.5m-3.75-3.75H3m15 0h.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3.75 4.5 2.25m15 1.5L19.5 2.25" />
    </svg>
);
