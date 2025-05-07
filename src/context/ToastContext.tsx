import React, { createContext, useState, useContext, useRef, useCallback } from 'react';

// Define the possible types of toasts that can be displayed
export type ToastType = 'success' | 'error' | 'info';

// Interface defining the structure of a toast notification
export interface Toast {
  id: string;      // Unique identifier for the toast
  message: string; // Content of the toast message
  type: ToastType; // Type of the toast (success/error/info)
}

// Interface defining the context props that will be available throughout the app
interface ToastContextProps {
  addToast: (message: string, type: ToastType) => void; // Function to add a new toast
  removeToast: (id: string) => void;                    // Function to remove a specific toast
  toasts: Toast[];                                      // Array of current active toasts
}

// Create a React context for toast functionality
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Toast Provider component that wraps the app and provides toast functionality
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to store all active toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Ref to keep track of recently shown toasts to prevent duplicates
  const recentToastsRef = useRef<Set<string>>(new Set());

  // Function to add a new toast
  const addToast = useCallback((message: string, type: ToastType) => {
    // Create a unique key for the toast based on message and type
    const toastKey = `${message}-${type}`;
    
    // Prevent duplicate toasts from appearing
    if (recentToastsRef.current.has(toastKey)) {
      return;
    }

    // Add toast key to recent toasts set
    recentToastsRef.current.add(toastKey);
    
    // Remove toast key from recent toasts after 5 seconds
    setTimeout(() => {
      recentToastsRef.current.delete(toastKey);
    }, 5000);

    // Create a new toast with unique ID
    const id = Date.now().toString();
    const newToast = { id, message, type };
    
    // Add the new toast to the state
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    // Automatically remove the toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  // Function to remove a specific toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    addToast,
    removeToast,
    toasts
  }), [addToast, removeToast, toasts]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast functionality in components
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  
  // Ensure the hook is used within a ToastProvider
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};