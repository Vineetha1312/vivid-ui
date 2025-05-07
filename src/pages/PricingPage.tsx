import React from 'react';
import { PricingSection } from '../components/pricing/PricingSection';
import { FloatingThemeToggle } from '../components/ui/FloatingThemeToggle';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">
          Pricing Demo
        </h1>
        <PricingSection />
      </div>
      <FloatingThemeToggle />
    </div>
  );
};

export default PricingPage;