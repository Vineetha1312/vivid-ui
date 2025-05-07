import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { SectionTitle } from '../ui/SectionTitle';

/**
 * Pricing section using semantic theme colors/fonts.
 */
export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  };

  // Pricing data with monthly and yearly options
  const pricingData = [
    {
      plan: 'Freelancer',
      description: 'The essentials to provide your best work for clients.',
      monthlyPrice: '$19',
      yearlyPrice: '$190',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '48-hour support response time'
      ],
      isPopular: false,
      ctaText: 'Buy plan',
    },
    {
      plan: 'Startup',
      description: 'A plan that scales with your rapidly growing business.',
      monthlyPrice: '$29',
      yearlyPrice: '$290',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations'
      ],
      isPopular: true,
      ctaText: 'Buy plan',
    },
    {
      plan: 'Enterprise',
      description: 'Dedicated support and infrastructure for your company.',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations'
      ],
      isPopular: false,
      ctaText: 'Contact sales',
    },
  ];

  return (
    // Use muted background for slight contrast
    <section id="pricing" className="py-16 md:py-24 bg-muted/50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <SectionTitle
          title="Pricing that grows with you"
          subtitle="Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales."
        />

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingData.map((tier, index) => (
            <motion.div
              key={tier.plan}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              // Use semantic card styles, highlight popular with primary border
              className={`bg-card p-8 rounded-lg shadow-lg flex flex-col border transition-colors duration-300 ${
                tier.isPopular ? 'border-2 border-primary relative' : 'border-border'
              }`}
            >
              {tier.isPopular && (
                // Use primary color for badge
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300">
                  Most Popular
                </span>
              )}

              {/* Plan name */}
              <h3 className="text-2xl font-semibold text-card-foreground font-heading transition-colors duration-300">{tier.plan}</h3>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mt-2 mb-4 transition-colors duration-300">{tier.description}</p>
              
              {/* Price */}
              <p className="text-4xl font-bold text-card-foreground transition-colors duration-300">
                {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                <span className="text-lg font-normal text-muted-foreground transition-colors duration-300">
                  {tier.plan !== 'Enterprise' && (isYearly ? '/year' : '/month')}
                </span>
              </p>

              {/* Features */}
              <ul className="my-6 space-y-2 text-muted-foreground flex-grow transition-colors duration-300">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    {/* Use primary or a success color for checkmark */}
                    <FiCheck className="w-4 h-4 text-primary mr-2 transition-colors duration-300" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                tier.isPopular
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}>
                {tier.ctaText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};