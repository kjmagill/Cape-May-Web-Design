import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ScrollToTopButton from './components/ScrollToTopButton';
import BlogListingPage from './components/BlogListingPage';
import BlogPostPage from './components/BlogPostPage';
import { useSeo } from './hooks/useSeo';

interface SeoMetadata {
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  ogImage: string;
  twitterImage: string;
  canonicalUrl: string;
}

const LandingPage: React.FC = () => {
  const [metadata, setMetadata] = useState<SeoMetadata | null>(null);

  useEffect(() => {
    fetch('./metadata.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        return response.json();
      })
      .then(data => setMetadata(data))
      .catch(error => console.error("Error loading metadata:", error));
  }, []);

  useSeo({
    title: metadata?.pageTitle || 'Cape May Web Design | Custom Websites for Local Businesses',
    description: metadata?.pageDescription || 'Cape May Web Design builds strategic, performance-driven websites for local businesses in South Jersey.',
    keywords: metadata?.keywords || 'web design, web development, Cape May',
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
  useEffect(() => {
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
          
          // Remove any existing favicons to avoid conflicts
          const existingLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
          existingLinks.forEach(link => link.parentNode?.removeChild(link));

          // Add our new dynamically generated favicon
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
  }, []);

  const path = window.location.pathname.replace(/\/$/, "");

  if (path.startsWith('/blog/')) {
    const slug = path.substring(path.lastIndexOf('/') + 1);
    return <BlogPostPage slug={slug} />;
  }
  
  switch (path) {
    case '/privacy':
      return <PrivacyPolicy />;
    case '/terms':
      return <TermsOfService />;
    case '/blog':
      return <BlogListingPage />;
    default:
      return <LandingPage />;
  }
};

export default App;
