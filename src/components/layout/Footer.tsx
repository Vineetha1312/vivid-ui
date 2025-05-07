import { motion } from 'framer-motion';

/**
 * Footer component using semantic theme colors.
 */
export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      // Use muted background and foreground
      className="bg-muted text-muted-foreground py-8 px-6 mt-auto transition-colors duration-300"
    >
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Webcrumbs. All rights reserved.</p>
        <div className="mt-4">
          {/* Links use base 'a' styles (primary color) */}
          <a href="#" className="mx-2">Privacy Policy</a>
          <a href="#" className="mx-2">Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  );
};