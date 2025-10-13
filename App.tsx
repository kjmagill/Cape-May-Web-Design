import React from 'react';
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
  const path = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash for root check

  // Match dynamic blog post URLs first
  const blogPostMatch = path.match(/^\/blog\/(.+)/);
  if (blogPostMatch) {
    const slug = blogPostMatch[1];
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