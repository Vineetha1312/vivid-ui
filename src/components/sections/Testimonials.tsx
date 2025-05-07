import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';

// Placeholder data
const testimonialsData = [
  {
    quote: "This product changed the way we work. Highly recommended!",
    name: 'Alice B.',
    title: 'CEO, Company X',
    imageUrl: 'https://via.placeholder.com/80x80/f472b6/ffffff?text=A', // Pink placeholder
  },
  {
    quote: "Incredible support and fantastic features. A game-changer.",
    name: 'Bob C.',
    title: 'Marketing Manager, Org Y',
    imageUrl: 'https://via.placeholder.com/80x80/f472b6/ffffff?text=B', // Pink placeholder
  },
  {
    quote: "We saw immediate results after implementing this solution.",
    name: 'Charlie D.',
    title: 'Developer, Startup Z',
    imageUrl: 'https://via.placeholder.com/80x80/f472b6/ffffff?text=C', // Pink placeholder
  },
];

/**
 * Testimonials section using semantic theme colors/fonts.
 */
export const Testimonials = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    // Section background handled by body
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="What Our Customers Say"
          subtitle="Don't just take our word for it. Hear from satisfied users."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              // Use semantic card styles, accent border
              className="bg-card p-6 rounded-lg shadow-md border-l-4 border-accent transition-colors duration-300"
            >
              {/* Use card foreground (or muted) for quote */}
              <p className="text-card-foreground italic mb-4 transition-colors duration-300">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  // Add border for definition
                  className="w-12 h-12 rounded-full mr-4 object-cover border border-border transition-colors duration-300"
                />
                <div>
                  {/* Use card foreground for name */}
                  <p className="font-semibold text-card-foreground transition-colors duration-300">{testimonial.name}</p>
                  {/* Use muted foreground for title */}
                  <p className="text-sm text-muted-foreground transition-colors duration-300">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};