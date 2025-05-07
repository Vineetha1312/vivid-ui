import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { FiMove } from 'react-icons/fi';

const advantagesData = [
  {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    icon: '🚀',
    title: 'Frontend, Fast and Fearless',
    description: 'Launch your UI components faster and allow everyone hope & explore.',
    content: 'card1',
  },
  {
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-600',
    icon: '💡',
    title: 'AI Meets Visual Code Editor',
    description: 'Use AI prompts to create components. Combine reach snippets with your repository imported components.',
    content: 'card2',
  },
  {
    iconBg: 'bg-accent',
    iconColor: 'text-accent-foreground',
    icon: '📜',
    title: 'Rules That Rule',
    description: 'Why settle for less? Ensure you can define rules for code generation to meet your exact quality standards.',
    content: 'card3',
  },
];

/**
 * Advantages section using semantic theme colors/fonts.
 */
export const Advantages = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="ai-advantage" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
          className="text-center mb-4"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider transition-colors duration-300">
            The AI Advantage
          </span>
        </motion.div>

        <SectionTitle
          title="What makes you unstoppable"
          subtitle="With the perfect combo of AI and a visual editor, you won't just keep up—you'll lead. Your codebase stays strong, consistent, and ready to impress."
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {advantagesData.map((advantage, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              className="bg-card p-6 rounded-lg shadow-lg border border-border flex flex-col h-full transition-colors duration-300"
            >
              <div className={`w-10 h-10 ${advantage.iconBg} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}>
                <span className={`text-xl ${advantage.iconColor} transition-colors duration-300`}>{advantage.icon}</span>
              </div>

              <h3 className="text-lg font-semibold text-card-foreground mb-2 font-heading transition-colors duration-300">{advantage.title}</h3>

              <p className="text-sm text-muted-foreground mb-6 flex-grow transition-colors duration-300">{advantage.description}</p>

              <div className="mt-auto">
                {advantage.content === 'card1' && (
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-md border border-border text-xs text-muted-foreground transition-colors duration-300">
                      Make Additions for Feature X:<br />
                      1. Add App Storage Driver Sign Cert<br />
                      2. Link Camera v. 3.45<br />
                      ...
                    </div>
                    <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors duration-300">
                      Generate
                    </button>
                     <button className="w-full bg-secondary text-secondary-foreground border border-border py-2 px-4 rounded-md text-sm font-semibold hover:bg-secondary/80 transition-colors duration-300">
                      Add to Coding
                    </button>
                  </div>
                )}
                {advantage.content === 'card2' && (
                  <div className="bg-primary/10 p-6 rounded-md border border-primary/20 flex items-center justify-center relative aspect-video transition-colors duration-300">
                     <span className="text-5xl font-bold text-primary/50 transition-colors duration-300">45</span>
                     <div className="absolute bottom-4 right-4 bg-card p-1 rounded shadow border border-border cursor-grab transition-colors duration-300">
                      <FiMove className="h-5 w-5 text-muted-foreground transition-colors duration-300" />
                    </div>
                     </div>
                )}
                {advantage.content === 'card3' && (
                  <div className="space-y-2">
                    <button className="w-full bg-secondary text-secondary-foreground border border-border py-2 px-4 rounded-md text-sm font-medium text-left hover:bg-secondary/80 transition-colors duration-300">
                      Use our brand guidelines
                    </button>
                    <button className="w-full bg-secondary text-secondary-foreground border border-border py-2 px-4 rounded-md text-sm font-medium text-left hover:bg-secondary/80 transition-colors duration-300">
                      Add comments to the code
                    </button>
                     <button className="w-full bg-secondary text-secondary-foreground border border-border py-2 px-4 rounded-md text-sm font-medium text-left hover:bg-secondary/80 transition-colors duration-300">
                      Make it responsive
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};