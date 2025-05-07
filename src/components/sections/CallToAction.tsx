import { motion } from 'framer-motion';

/**
 * Call To Action (CTA) section using semantic theme colors.
 */
export const CallToAction = () => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    // Use primary background and its foreground text color
    <section className="py-16 md:py-24 bg-primary text-primary-foreground transition-colors duration-300">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={variants}
        className="container mx-auto px-6 text-center"
      >
        {/* Heading uses the section's text color (primary-foreground) */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Ready to Get Started?</h2>
        {/* Paragraph uses the section's text color with some opacity */}
        <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
          Join thousands of satisfied customers today. Start your free trial now!
        </p>
        {/* Button uses card styles (or secondary) to contrast with primary background */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          // Use card background and primary text color for contrast
          className="bg-card text-primary px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-card/90 transition-colors duration-300"
        >
          Start Free Trial
        </motion.button>
      </motion.div>
    </section>
  );
};