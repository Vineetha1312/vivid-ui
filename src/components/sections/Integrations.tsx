import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { useNavigate } from 'react-router-dom';

// Placeholder data for integrations
const integrationsData = [
  { name: 'React', logoUrl: 'https://www.webcrumbs.ai/static/media/stackMountain.11a67ab058035f1201884edc6a87e2a2.svg' },
  { name: 'Angular', logoUrl: 'https://via.placeholder.com/100x50/fee2e2/dc2626?text=Angular' },
  { name: 'Tailwind', logoUrl: 'https://via.placeholder.com/100x50/cffafe/06b6d4?text=Tailwind' },
  { name: 'CSS', logoUrl: 'https://via.placeholder.com/100x50/dbeafe/3b82f6?text=CSS' },
  { name: 'HTML', logoUrl: 'https://via.placeholder.com/100x50/ffedd5/f97316?text=HTML' },
  { name: 'Vue', logoUrl: 'https://via.placeholder.com/100x50/dcfce7/16a34a?text=Vue' },
  { name: 'Next.js', logoUrl: 'https://via.placeholder.com/100x50/e5e7eb/1f2937?text=Next.js' },
  { name: 'Svelte', logoUrl: 'https://via.placeholder.com/100x50/ffedd5/ea580c?text=Svelte' },
  { name: 'Remix', logoUrl: 'https://via.placeholder.com/100x50/e0e7ff/4f46e5?text=Remix' },
  { name: 'Preset', logoUrl: 'https://via.placeholder.com/100x50/f3e8ff/7e22ce?text=Preset' },
  { name: 'Visual Studio Code', logoUrl: 'https://via.placeholder.com/100x50/dbeafe/2563eb?text=VS+Code' },
  { name: 'GitHub', logoUrl: 'https://via.placeholder.com/100x50/e5e7eb/111827?text=GitHub' },
  { name: 'Figma', logoUrl: 'https://via.placeholder.com/100x50/fee2e2/b91c1c?text=Figma' },
];

/**
 * Integrations section using semantic theme colors/fonts.
 */
export const Integrations = () => {
  const navigate = useNavigate();
  
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
  };

  return (
    // Section background handled by body
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <SectionTitle
          title="Work with your favorite tools"
          subtitle="Clean code, ready to integrate with the tools you love. No learning curve — just ship faster."
          className="mb-10 md:mb-12"
        />

        {/* Use primary button styles */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-primary/90 transition-colors duration-300 mb-12 md:mb-16"
          onClick={() => navigate('/ai')}
        >
          Talk to the AI Assistant
        </motion.button>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6 max-w-4xl">
          {integrationsData.map((integration, index) => (
            <motion.div
              key={integration.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={logoVariants}
              // Use semantic card styles
              className="bg-card p-3 rounded-lg shadow-md border border-border flex items-center justify-center transition-colors duration-300"
              style={{ minWidth: '120px' }}
            >
              <img
                src={integration.logoUrl}
                alt={`${integration.name} Logo`}
                className="h-8 md:h-10 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};