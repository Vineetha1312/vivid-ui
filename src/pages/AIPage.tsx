import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiPaperclip, FiX, FiFileText, FiHeart, FiUser, FiCode, FiEye, FiClipboard, FiArrowLeft } from 'react-icons/fi';
import { SuggestionChip } from '../components/ai/SuggestionChip';
import { ChatMessage } from '../components/ai/ChatMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { sendChatRequest, Message, validateApiKey } from '../services/aiService';
import { useToast } from '../context/ToastContext';
import { ToastContainer } from '../components/ui/Toast';
import Editor from '@monaco-editor/react';

/**
 * AI Chat page with gradient background and chat functionality
 */
export const AIPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyValidated, setApiKeyValidated] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // --- State for Code/Preview View ---
  const [showCodeView, setShowCodeView] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('plaintext');
  const [showPreview, setShowPreview] = useState(false);
  const [promptForCodeView, setPromptForCodeView] = useState('');
  // --- End State for Code/Preview View ---

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addToast } = useToast();
  
  // Suggestions with short display text and full prompts
  const suggestions = [
    {
      text: "Create a landing page",
      fullPrompt: "Create a responsive landing page with a hero section, features section, and contact form using React and Tailwind CSS."
    },
    {
      text: "Build a login form",
      fullPrompt: "Design a modern login form with email/password fields, validation, and social login options using React Hook Form."
    },
    {
      text: "Design a pricing table",
      fullPrompt: "Create a responsive pricing table with 3 tiers (Basic, Pro, Enterprise) that highlights the recommended plan and includes a monthly/yearly toggle."
    },
    {
      text: "Make a responsive navbar",
      fullPrompt: "Build a responsive navigation bar that collapses into a hamburger menu on mobile devices, with smooth transitions and dropdown support."
    }
  ];

  // Check API key on component mount - only show toast if invalid
  useEffect(() => {
    const validation = validateApiKey();
    if (validation.isValid) {
      setApiKeyValidated(true);
    } else if (validation.message) {
      addToast(validation.message, 'error');
    }
  }, [addToast]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const baseHeight = 80; // From style="min-height: 80px;"
      textarea.style.height = `${baseHeight}px`; // Reset height to min-height
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200; // Keep existing max height logic
      // Set height, ensuring it's at least baseHeight
      textarea.style.height = `${Math.max(baseHeight, Math.min(scrollHeight, maxHeight))}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [inputValue]); // Re-run when inputValue changes

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove a file from the uploaded files
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Memoize the send message function to prevent unnecessary re-renders
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;
    
    // Only validate API key if not already validated
    if (!apiKeyValidated) {
      const validation = validateApiKey();
      if (!validation.isValid) {
        addToast(validation.message || 'API key is not configured correctly', 'error');
        return;
      }
      setApiKeyValidated(true);
    }
    
    // Create message content including file information if any
    let messageContent = inputValue.trim();
    if (uploadedFiles.length > 0) {
      const fileList = uploadedFiles.map(file => `- ${file.name} (${(file.size / 1024).toFixed(1)} KB)`).join('\n');
      messageContent += messageContent ? '\n\nAttached files:\n' + fileList : 'Attached files:\n' + fileList;
    }
    
    const userMessage: Message = { role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setUploadedFiles([]);
    setIsLoading(true);
    
    // Reset textarea height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = '80px';
      textareaRef.current.style.overflowY = 'hidden';
    }

    try {
      const allMessages = [...messages, userMessage];
      const response = await sendChatRequest(allMessages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      addToast(errorMessage, 'error');
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, messages, uploadedFiles, apiKeyValidated, addToast]);

  const handleSuggestionClick = useCallback((prompt: string) => {
    setInputValue(prompt);
    // Focus and trigger resize after setting value
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Allow Shift+Enter for newlines implicitly
  }, [handleSendMessage]);

  // Helper component for rendering the file list (remains unchanged)
  const UploadedFilesDisplay = () => (
    uploadedFiles.length > 0 ? (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {uploadedFiles.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700"
                          >
                            <FiFileText className="mr-1" />
                            <span className="truncate max-w-[150px]">{file.name}</span>
                            <button 
                              onClick={() => removeFile(index)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              <FiX size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
    ) : null
  );

  // Helper component for rendering the input row
  const ChatInputRow = ({ placeholder }: { placeholder: string }) => {
  return (
      <div className="focus-within:bg-card-hover group flex flex-col gap-2 rounded-xl p-2 duration-125 focus-within:chat-shadow w-full border border-muted-border bg-muted pb-3 text-base transition-all ease-in-out focus-within:border-foreground/20 hover:border-foreground/10 focus-within:hover:border-foreground/20">
        <div className="relative flex items-center">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex w-full rounded-md px-2 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none text-[16px] leading-snug placeholder-shown:text-ellipsis placeholder-shown:whitespace-nowrap md:text-base focus-visible:ring-0 focus-visible:ring-offset-0 max-h-[200px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground bg-transparent focus:bg-transparent flex-1"
            id="chatinput"
            autoFocus
            style={{ 
              minHeight: '80px', 
              height: '80px', 
              direction: 'ltr', 
              unicodeBidi: 'normal'
                          }}
                        />
                      </div>
        <div className="flex items-center justify-between pl-2 pr-1">
          <div className="flex items-center space-x-2">
            <input
            type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              className="hidden"
              id="file-upload"
              accept="image/*, .pdf, .txt, .md, .csv, .json, .xml, .html, .css, .js, .jsx, .ts, .tsx"
                      />
            <label htmlFor="file-upload">
            <button
              type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="p-2 rounded-full text-muted-foreground hover:bg-muted-foreground/10 disabled:opacity-50"
                aria-label="Attach file"
            >
                <FiPaperclip size={18} /> {/* Used here */}
              </button>
            </label>
      </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || (!inputValue.trim() && uploadedFiles.length === 0)}
            className="p-2 rounded-full bg-primary text-primary-foreground disabled:bg-muted disabled:text-muted-foreground hover:bg-primary/90 transition-colors"
            aria-label="Send message"
          >
            <FiSend size={18} /> {/* Used here */}
          </button>
                </div>
                     </div>
  );
};

  // Find the last user message for the loading view
  const lastUserMessage = messages.slice().reverse().find((m: Message) => m.role === 'user');

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/70 to-secondary/80 z-0" />
        <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
          {isLoading ? (
            // --- Loading State View ---
            <div className="flex flex-grow w-full">
              {/* Left Column */}
              <div className="w-1/2 flex flex-col pr-4">
                {/* Display Last User Prompt */}
                {lastUserMessage && (
                  <div className="mb-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm shadow">
                     <div className="flex items-start mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary mr-2">
                           <FiUser className="text-white" /> {/* Correctly imported and used */}
                        </div>
                        <p className="text-sm text-white/90 font-semibold">Your Request:</p>
                     </div>
                     <p className="text-sm text-white/80 whitespace-pre-wrap">
                       {lastUserMessage.content}
                     </p>
                  </div>
                )}
                {/* Spacer to push input down */}
                <div className="flex-grow"></div>
                {/* Chat Input Area */}
                <div className="mt-auto">
                    <UploadedFilesDisplay />
                  <ChatInputRow placeholder="AI is generating..." />
                  </div>
                </div>

              {/* Right Column */}
              <div className="w-1/2 flex flex-col items-center justify-center pl-4">
                 <div className="text-center text-white/80">
                    <FiHeart className="w-16 h-16 text-gray-400/50 mb-4 mx-auto animate-pulse" />
                    <p className="text-lg font-medium mb-2">Generating response...</p>
                    <LoadingSpinner size="md" color="border-white/50" />
                    <p className="text-xs mt-4">This might take a moment.</p>
              </div>
            </div>
              {/* Ref for potential scrolling needs in loading view */}
              <div ref={messagesEndRef} />
            </div>

          ) : messages.length === 0 ? (
            // --- Initial State View (No messages, not loading) ---
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="text-center mb-8 w-full max-w-2xl">
                <h1 className="text-4xl font-bold text-white mb-2">Build something with <span className="text-pink-300">Fast AI</span></h1>
                <p className="text-white/80 text-sm mb-8">Ask a question, describe an idea or tell me what to build</p>
                <div className="bg-transparent rounded-lg p-0 w-full mb-6">
                  <UploadedFilesDisplay />
                  <ChatInputRow placeholder="Ask Fast AI to create a web app that..." />
        </div>
                <div className="flex sm:flex-wrap justify-center gap-2 text-xs ">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionChip
                      key={index}
                      text={suggestion.text}
                      fullPrompt={suggestion.fullPrompt}
                      onClick={handleSuggestionClick}
                    />
                  ))}
      </div>
              </div>
            </div>
          ) : (
            // --- Chat View (Messages exist, not loading) ---
            <div className="w-full bg-white/5 backdrop-blur-md rounded-lg shadow-lg overflow-hidden flex flex-col flex-grow max-w-4xl mx-auto">
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 max-h-[70vh] min-h-[50vh] overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-gray-100/10 pr-2">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      content={message.content}
                      isUser={message.role === 'user'}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="flex flex-col border-t border-gray-200/20 pt-4 mt-auto">
                  <UploadedFilesDisplay />
                  <ChatInputRow placeholder="Type your message..." />
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AIPage;
