import { motion } from 'framer-motion';
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Reusable component for consistent section titles. Uses semantic theme colors/fonts.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={`text-center mb-12 md:mb-16 ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground font-heading transition-colors duration-300">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto transition-colors duration-300">{subtitle}</p>}
    </motion.div>
  );
};