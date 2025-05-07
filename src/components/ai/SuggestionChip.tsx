import React from 'react';
import { motion } from 'framer-motion';

interface SuggestionChipProps {
  text: string;
  fullPrompt?: string;
  onClick: (prompt: string) => void;
}

/**
 * Interactive suggestion chip component with enhanced styling
 */
export const SuggestionChip: React.FC<SuggestionChipProps> = ({ 
  text, 
  fullPrompt, 
  onClick 
}) => {
  const handleClick = () => {
    onClick(fullPrompt || text);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.0, y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="bg-white/20  text-white px-2 py-2 rounded-full text-xs font-medium 
                 hover:bg-white/30  duration-200 shadow-sm hover:shadow-md"
    >
      {text}
    </motion.button>
  );
};
