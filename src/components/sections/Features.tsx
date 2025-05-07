import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';

// Placeholder data for features
const featuresData = [
  {
    title: 'Feature One',
    description: 'Brief description of the first amazing feature.',
    imageUrl: 'https://via.placeholder.com/100x100/fb923c/ffffff?text=F1', // Placeholder
  },
  {
    title: 'Feature Two',
    description: 'Brief description of the second incredible feature.',
    imageUrl: 'https://via.placeholder.com/100x100/fb923c/ffffff?text=F2', // Placeholder
  },
  {
    title: 'Feature Three',
    description: 'Brief description of the third essential feature.',
    imageUrl: 'https://via.placeholder.com/100x100/fb923c/ffffff?text=F3', // Placeholder
  },
];

/**
 * Features section using semantic theme colors/fonts.
 */
export const Features = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    // Use muted background for slight contrast
    <section className="py-16 md:py-24 bg-muted/50 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Why Choose Us?"
          subtitle="Discover the features that make our product stand out from the rest."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              // Use semantic card styles
              className="text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg border border-border transition-all duration-300"
            >
              <img
                src={feature.imageUrl}
                alt={feature.title}
                // Use secondary background for image placeholder
                className="w-20 h-20 mx-auto mb-4 rounded-full object-cover bg-secondary border border-border transition-colors duration-300"
              />
              {/* Use card foreground and heading font */}
              <h3 className="text-xl font-semibold mb-2 text-card-foreground font-heading transition-colors duration-300">{feature.title}</h3>
              {/* Use muted foreground for description */}
              <p className="text-muted-foreground transition-colors duration-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};