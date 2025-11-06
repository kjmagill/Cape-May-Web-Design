import React from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  url: string; // URL to the external article
  tags: string[];
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'local-seo-what-it-is-and-why-you-need-it',
    title: 'Local SEO: What It Is, Why You Need It, And How To Get Started',
    excerpt: 'Master local SEO to dominate your local market. This guide covers what it is, why it\'s essential for your business, and the first steps to getting started.',
    author: 'crowdspring',
    date: 'July 15, 2024',
    imageUrl: 'https://i.postimg.cc/7hgQPvrr/local-SEO.webp',
    url: 'https://www.crowdspring.com/blog/local-seo/?utm_source=capemaywebdesign.com',
    tags: ['SEO', 'Local Business', 'Marketing'],
    readingTime: '6 min read',
  },
  {
    slug: 'how-to-improve-your-local-seo',
    title: 'How To Improve Your Local SEO',
    excerpt: 'Elevate your local search rankings with these actionable strategies. This deep dive covers everything from Google Business Profile optimization to building local citations.',
    author: 'Mordy Oberstein',
    date: 'June 19, 2024',
    imageUrl: 'https://i.postimg.cc/W4xZckd5/google-ranking.png',
    url: 'https://www.semrush.com/blog/how-to-improve-local-seo/?utm_source=capemaywebdesign.com',
    tags: ['SEO', 'Google', 'Strategy'],
    readingTime: '8 min read',
  },
  {
    slug: 'how-to-build-an-online-presence-for-small-business',
    title: 'How to Build An Online Presence For Small Businesses in 2024',
    excerpt: 'Discover the essential steps to building a powerful online presence. Learn how to leverage your website, social media, and more to attract and engage customers.',
    author: 'Ryan Shelley',
    date: 'February 23, 2024',
    imageUrl: 'https://i.postimg.cc/PxMtC7jy/online-presence.jpg',
    url: 'https://ciderhouse.media/small-business-online-presence/?utm_source=capemaywebdesign.com',
    tags: ['Marketing', 'Small Business', 'Branding'],
    readingTime: '7 min read',
  },
];
