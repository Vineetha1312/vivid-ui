import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { Advantages } from '../components/sections/Advantages';
import { ScaleShowcaseSection } from '../components/sections/ScaleShowcaseSection';
import { Features } from '../components/sections/Features';
import { Integrations } from '../components/sections/Integrations';
import { Testimonials } from '../components/sections/Testimonials';
import { Pricing } from '../components/sections/Pricing';
import { CallToAction } from '../components/sections/CallToAction';
import { Footer } from '../components/layout/Footer';
import { ScrollToTop } from '../components/ui/ScrollToTop';
import { ContactUsModal } from '../components/modals/ContactUsModal';

/**
 * Main HomePage component that structures the page layout
 * including all previously created sections.
 */
export const HomePage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Header onOpenContactModal={openContactModal} />
      <main className="flex-grow pt-16 sm:pt-20">
        <Hero onOpenContactModal={openContactModal} />
        <Advantages />
        <ScaleShowcaseSection />
        <Features />
        <Integrations />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
      <ContactUsModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
};