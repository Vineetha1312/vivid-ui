import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string; // '/month' or '/year'
  features: PricingFeature[];
  yearlyDiscount?: string; // Optional discount text for yearly plans
  isPopular?: boolean;
  ctaText: string;
  onCtaClick?: () => void;
}

/**
 * PricingCard component displays pricing information for a subscription plan
 * Uses theme colors and responsive design
 */
export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  period,
  features,
  yearlyDiscount, // Destructure the new prop
  isPopular = false,
  ctaText,
  onCtaClick,
}) => {
  const isYearlyPlan = period === '/year'; // Determine if it's the yearly view

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className={`bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full ${ // Added flex flex-col h-full
        isPopular ? 'border-2 border-primary relative' : 'border border-border' // Added relative for potential badge positioning
      }`}
    >
      {/* Optional: Popular Badge */}
      {isPopular && (
         <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300 z-10">
           Most Popular
         </span>
       )}

      {/* Card Header */}
      <div className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{description}</p> {/* Added min-height */}
        <div className="flex items-baseline mb-1">
          <span className="text-3xl font-bold text-card-foreground">{price}</span>
          <span className="text-sm text-muted-foreground ml-1">{period}</span>
          {/* Conditionally render the yearly discount */}
          {isYearlyPlan && yearlyDiscount && price !== 'Custom' && (
            <span className="ml-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {yearlyDiscount}
            </span>
          )}
        </div>
      </div>

      {/* Features List */}
      <div className="px-6 pb-6 flex-grow"> {/* Added flex-grow */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <FiCheck className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-6 mt-auto"> {/* Added mt-auto */}
        <button
          onClick={onCtaClick}
          className={`w-full py-2.5 rounded-md font-medium text-sm transition-colors duration-300 ${
            isPopular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {ctaText}
        </button>
      </div>
    </motion.div>
  );
};