import React, { useEffect, useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import ScrollToTopButton from './components/ScrollToTopButton';
import BlogListingPage from './components/BlogListingPage';
import BlogPostPage from './components/BlogPostPage';
import { useSeo, updateMetaTag, updatePropertyMetaTag } from './hooks/useSeo';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { blogPosts } from './components/blogPosts';

interface SeoMetadata {
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  ogImage: string;
  twitterImage: string;
  canonicalUrl: string;
}

// A helper function to read the embedded metadata from the DOM.
// This function can be used across the application to get the base metadata.
const getEmbeddedMetadata = (): SeoMetadata | null => {
  try {
    const element = document.getElementById('seo-metadata');
    if (element && element.textContent) {
      return JSON.parse(element.textContent);
    }
  } catch (error) {
    console.error("Could not parse embedded SEO metadata:", error);
  }
  return null;
};

const LandingPage: React.FC = () => {
  const metadata = useMemo(() => getEmbeddedMetadata(), []);

  useSeo({
    title: metadata?.pageTitle || 'Cape May Web Design | Custom Websites & Brand Identity',
    description: metadata?.pageDescription || 'Cape May Web Design builds strategic, performance-driven websites and powerful brand identities for local businesses in South Jersey.',
    keywords: metadata?.keywords || 'web design, branding, web development, Cape May',
    ogImage: metadata?.ogImage,
    twitterImage: metadata?.twitterImage,
    canonicalUrl: metadata?.canonicalUrl,
  });

  return (
    <div className="bg-slate-900 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};


const App: React.FC = () => {
  useSmoothScroll();
  
  useEffect(() => {
    // FIX FOR MOBILE VIEWPORT HEIGHT: This prevents the "bounce" on scroll
    // by setting a stable height value that doesn't change when the browser
    // UI (like the address bar) hides or shows.
    const handleResize = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial height

    const setFavicon = () => {
      const faviconUrl = 'https://kjmagill.com/img/logos/cmwd_logo.png';
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 32, 32);
          const dataUrl = canvas.toDataURL('image/png');
          
          const existingLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
          existingLinks.forEach(link => link.parentNode?.removeChild(link));

          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/png';
          link.href = dataUrl;
          document.head.appendChild(link);
        }
      };
      img.onerror = () => {
        console.error('Failed to load image for favicon generation.');
      };
      img.src = faviconUrl;
    };
    
    setFavicon();

    const setCanonicalUrl = () => {
      let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      
      const metadata = getEmbeddedMetadata();
      // Use the canonical from embedded metadata if it exists, otherwise default to the current URL.
      const url = metadata?.canonicalUrl || window.location.href;
      element.setAttribute('href', url);
    };

    setCanonicalUrl();

    // Set site-wide static meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updatePropertyMetaTag('og:type', 'website');
    updatePropertyMetaTag('og:site_name', 'Cape May Web Design');
    updateMetaTag('twitter:site_name', 'Cape May Web Design');

    // Cleanup resize listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const path = window.location.pathname.replace(/\/$/, "");

  if (path.startsWith('/blog/')) {
    const slug = path.substring(path.lastIndexOf('/') + 1);
    const post = blogPosts.find(p => p.slug === slug);
    
    useSeo({
        title: post ? `${post.title} | Cape May Web Design` : 'Post Not Found | Cape May Web Design',
        description: post ? post.excerpt : "Sorry, we couldn't find the blog post you were looking for.",
        ogImage: post ? post.imageUrl : undefined,
        twitterImage: post ? post.imageUrl : undefined,
        canonicalUrl: post ? `https://www.capemaywebdesign.com/blog/${post.slug}` : undefined
    });
    
    return <BlogPostPage slug={slug} />;
  }
  
  switch (path) {
    case '/terms':
      return <TermsOfService />;
    case '/blog':
      return <BlogListingPage />;
    default:
      return <LandingPage />;
  }
};

export default App;