import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { PricingCard } from './PricingCard';

/**
 * PricingSection component displays a responsive pricing grid with toggle for billing period
 * Uses theme colors and responsive design
 */
export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Pricing data with monthly and yearly options
  const pricingData = [
    {
      title: 'Freelancer',
      description: 'The essentials to provide your best work for clients.',
      monthlyPrice: '$19',
      yearlyPrice: '$190',
      features: [
        { text: '5 products' },
        { text: 'Up to 1,000 subscribers' },
        { text: 'Basic analytics' },
        { text: '48-hour support response time' },
      ],
      isPopular: false,
      ctaText: 'Buy plan',
    },
    {
      title: 'Startup',
      description: 'A plan that scales with your rapidly growing business.',
      monthlyPrice: '$29',
      yearlyPrice: '$290',
      features: [
        { text: '25 products' },
        { text: 'Up to 10,000 subscribers' },
        { text: 'Advanced analytics' },
        { text: '24-hour support response time' },
        { text: 'Marketing automations' },
      ],
      isPopular: true,
      ctaText: 'Buy plan',
    },
    {
      title: 'Enterprise',
      description: 'Dedicated support and infrastructure for your company.',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      features: [
        { text: 'Unlimited products' },
        { text: 'Unlimited subscribers' },
        { text: 'Advanced analytics' },
        { text: '1-hour, dedicated support response time' },
        { text: 'Marketing automations' },
      ],
      isPopular: false,
      ctaText: 'Contact sales',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
            Pricing that grows with you
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose an affordable plan that's packed with the best features for
            engaging your audience, creating customer loyalty, and driving sales.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`text-sm mr-2 ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button 
            onClick={() => setIsYearly(!isYearly)} 
            className="relative inline-flex items-center justify-center"
            aria-label={isYearly ? "Switch to monthly billing" : "Switch to yearly billing"}
          >
            {isYearly ? (
              <FiToggleRight className="w-10 h-6 text-primary" />
            ) : (
              <FiToggleLeft className="w-10 h-6 text-muted-foreground" />
            )}
          </button>
          <span className={`text-sm ml-2 ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
            Yearly
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              description={plan.description}
              price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              period={isYearly ? '/year' : '/month'}
              features={plan.features}
              isPopular={plan.isPopular}
              ctaText={plan.ctaText}
              onCtaClick={() => console.log(`${plan.title} plan selected`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

