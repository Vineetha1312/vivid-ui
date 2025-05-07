import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <FiInfo className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      case 'info':
        return 'border-blue-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-lg shadow-lg border-l-4 ${getBgColor()} ${getBorderColor()} backdrop-blur-sm`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-foreground">{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 flex-shrink-0 text-muted-foreground hover:text-foreground"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 max-w-md">
      <AnimatePresence>
        {toasts.map((toast: Toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};