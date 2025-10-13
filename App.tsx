import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const LandingPage: React.FC = () => (
  <div className="bg-slate-900 min-h-screen">
    <Header />
    <main>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
);


const App: React.FC = () => {
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