import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiLock } from 'react-icons/fi';

interface VisibilityToggleProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

/**
 * Toggle component for switching between public and private visibility
 */
export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({ isPublic, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-64"
    >
      <div className="flex flex-col space-y-2">
        <div 
          className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
            isPublic ? 'bg-primary/10' : ''
          }`}
          onClick={() => onChange(true)}
        >
          <div className={`w-4 h-4 rounded-full border ${isPublic ? 'bg-primary border-primary' : 'border-gray-400'}`}>
            {isPublic && <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>}
          </div>
          <FiGlobe className="text-gray-700" />
          <span className="text-gray-800 text-sm">Public</span>
        </div>
        
        <p className="text-gray-500 text-xs ml-6">Anyone can view and remix</p>
        
        <div 
          className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
            !isPublic ? 'bg-primary/10' : ''
          }`}
          onClick={() => onChange(false)}
        >
          <div className={`w-4 h-4 rounded-full border ${!isPublic ? 'bg-primary border-primary' : 'border-gray-400'}`}>
            {!isPublic && <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>}
          </div>
          <FiLock className="text-gray-700" />
          <span className="text-gray-800 text-sm">Private</span>
          <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded">Pro</span>
        </div>
        <p className="text-gray-500 text-xs ml-6">Only you can access</p>
      </div>
    </motion.div>
  );
};