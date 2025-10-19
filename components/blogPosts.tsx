import React from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  url: string; // URL to the external article
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-local-seo-and-why-it-matters',
    title: 'What Is Local SEO & Why It Matters',
    excerpt: 'Unlock the power of local SEO to connect with nearby customers. Learn why optimizing for local search is crucial for driving foot traffic and growing your business.',
    author: 'Anna Crowe',
    date: 'May 30, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?q=80&w=800&h=600&auto=format&fit=crop',
    url: 'https://www.searchenginejournal.com/what-is-local-seo-why-local-search-is-important/293205/',
  },
  {
    slug: 'why-every-small-business-needs-ecommerce',
    title: 'Why Every Small Business Needs An E-Commerce Website',
    excerpt: 'Explore the transformative impact of e-commerce on small businesses. An online store is no longer a luxury—it\'s an essential tool for reaching new markets and driving sales.',
    author: 'Slava Vaniukov',
    date: 'October 23, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&h=600&auto=format&fit=crop',
    url: 'https://www.forbes.com/sites/forbesagencycouncil/2023/10/23/why-every-small-business-needs-an-e-commerce-website/',
  },
  {
    slug: 'how-to-get-more-conversions',
    title: 'How to Get More Conversions from Your Small Business Website',
    excerpt: 'Your website is your digital storefront. Learn key strategies to optimize your site for conversions, turning more visitors into paying customers.',
    author: 'Ben Labay',
    date: 'August 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=600&auto=format&fit=crop',
    url: 'https://cxl.com/blog/small-business-website/',
  },
];