import React, { useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import ScrollToTopButton from './components/ScrollToTopButton';
import BlogListingPage from './components/BlogListingPage';
import BlogPostPage from './components/BlogPostPage';
import { useSeo, updateMetaTag, updatePropertyMetaTag } from './hooks/useSeo';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useWebVitals } from './hooks/useWebVitals';
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
  if (typeof document === 'undefined') return null;
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
    title: metadata?.pageTitle || 'Cape May Web Design | Custom Websites & App Development NJ',
    description: metadata?.pageDescription || 'Cape May Web Design builds high-performance websites and custom apps for businesses in Cape May County, Wildwood, Ocean City, and South Jersey.',
    keywords: metadata?.keywords || 'Cape May web design, Wildwood NJ web development, Ocean City NJ website design, local SEO Cape May, South Jersey app development',
    ogImage: metadata?.ogImage,
    twitterImage: metadata?.twitterImage,
    canonicalUrl: metadata?.canonicalUrl || 'https://www.capemaywebdesign.com/',
  });

  return (
    <div className="bg-slate-900 min-h-screen">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-cyan-500 focus:text-white focus:font-bold focus:rounded-full focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <TechStack />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};


const App: React.FC<{ pathname?: string }> = ({ pathname }) => {
  useSmoothScroll();
  useWebVitals();
  
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
      try {
        const faviconUrl = '/img/logos/cmwd_logo.png';
        const existingLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
        existingLinks.forEach(link => link.parentNode?.removeChild(link));

        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = faviconUrl;
        document.head.appendChild(link);
      } catch (error) {
        console.error("Failed to set favicon:", error);
      }
    };
    
    setFavicon();

    // Set site-wide static meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updatePropertyMetaTag('og:type', 'website');
    updatePropertyMetaTag('og:site_name', 'Cape May Web Design');
    updateMetaTag('twitter:site_name', 'Cape May Web Design');

    // Cleanup resize listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const path = (pathname ?? window.location.pathname).replace(/\/$/, "");

  if (path.startsWith('/blog/')) {
    const slug = path.substring(path.lastIndexOf('/') + 1);
    return blogPosts.some(post => post.slug === slug) ? <BlogPostPage slug={slug} /> : <NotFound />;
  }
  
  switch (path) {
    case '/terms':
    case '/terms/index.html':
    case '/terms.html':
      return <TermsOfService />;
    case '/privacy':
    case '/privacy/index.html':
    case '/privacy.html':
      return <PrivacyPolicy />;
    case '/blog':
    case '/blog/index.html':
    case '/blog.html':
      return <BlogListingPage />;
    case "":
    case "/index.html":
      return <LandingPage />;
    default:
      return <NotFound />;
  }
};

function NotFound() {
  useSeo({ title: 'Page Not Found | Cape May Web Design', description: 'This page could not be found. Explore Cape May Web Design services or contact us about your project.' });
  return <><Header /><main className="min-h-screen bg-slate-900 px-6 pt-40 pb-20 text-center text-white"><h1 className="text-4xl font-bold">Page not found</h1><p className="mt-6 mb-8">The page may have moved, or the address may be incorrect.</p><a href="/" className="text-cyan-300 underline">Explore our services</a><span> · </span><a href="/#contact" className="text-cyan-300 underline">Contact us</a></main><Footer /></>;
}

export default App;