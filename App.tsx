import React, { useEffect } from 'react';
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

const LandingPage: React.FC = () => (
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

  const path = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash for root check

  switch (path) {
    case '/privacy':
      return <PrivacyPolicy />;
    case '/terms':
      return <TermsOfService />;
    default:
      return <LandingPage />;
  }
};

export default App;