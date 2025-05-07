import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GithubIcon = () => (
  <FiGithub className="w-4 h-4 inline-block mr-1" />
);

interface HeroProps {
  onOpenContactModal: () => void;
}

/**
 * Hero section using semantic theme colors and fonts.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenContactModal }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 20, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const heroImageUrl = 'https://www.webcrumbs.ai/static/media/screenshot@2x.f55292a8e294ab1ad9c6.png';
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center overflow-hidden" // pt-16 to avoid overlap with fixed header
    >
<Link to="/github">
  <motion.div
    variants={itemVariants}
    className="inline-flex items-center bg-muted border border-border rounded-full px-3 py-1 text-xs font-medium text-muted-foreground mb-4 transition-colors duration-300 hover:shadow-md"
  >
    <GithubIcon /> <span className="ml-1">1,500+ Stars on Github</span>
  </motion.div>
</Link>
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-6xl font-bold text-foreground font-heading leading-tight mb-5 transition-colors duration-300"
      >
        Ship interfaces faster with <br /> Frontend AI
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-colors duration-300"
      >
        The tool developers need to deliver stunning interfaces that wow clients and stakeholders—fast.
      </motion.p>

      <motion.div variants={itemVariants} className="flex justify-center space-x-4 mb-12 md:mb-16">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px hsla(var(--primary-hsl), 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-primary/90 transition-all duration-300"
        >
          Get Started
        </motion.button>
        <motion.button
          onClick={onOpenContactModal} // Use the passed prop
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-sm font-semibold shadow-sm border border-border hover:bg-secondary/80 transition-colors duration-300"
        >
          Talk to Us
        </motion.button>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: '1200px' }}
        className="relative max-w-5xl mx-auto"
      >
        <motion.img
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          src={heroImageUrl}
          alt="Frontend AI Product Screenshot"
          className="w-full h-auto rounded-2xl shadow-2xl border-[12px] border-border transition-colors duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        />
      </motion.div>
    </motion.section>
  );
};
