import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCpu } from 'react-icons/fi';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
}

/**
 * Component for displaying chat messages
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary ml-2' : 'bg-secondary mr-2'
        }`}>
          {isUser ? <FiUser className="text-white" /> : <FiCpu className="text-white" />}
        </div>
        <div className={`p-3 rounded-lg ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};