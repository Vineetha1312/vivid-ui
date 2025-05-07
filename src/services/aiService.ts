/**
 * Service for handling AI chat interactions with OpenRouter
 */

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = import.meta.env.VITE_OPENROUTER_URL || 'https://openrouter.ai/api/v1/chat/completions';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Validates if the OpenRouter API key is configured
 * @returns Object with validation result and error message if applicable
 */
export const validateApiKey = (): { isValid: boolean; message?: string } => {
  if (!API_KEY) {
    return { 
      isValid: false, 
      message: 'OpenRouter API key is missing. Please add it to your .env file as VITE_OPENROUTER_API_KEY.' 
    };
  }
  
  if (API_KEY === 'your_openrouter_api_key_here') {
    return { 
      isValid: false, 
      message: 'Please replace the placeholder API key with your actual OpenRouter API key in the .env file.' 
    };
  }
  
  return { isValid: true };
};

/**
 * Sends a chat request to the OpenRouter API
 * @param messages Array of message objects with role and content
 * @returns Promise with the AI response
 */
export const sendChatRequest = async (messages: Message[]): Promise<Message> => {
  // Validate API key before making the request
  const validation = validateApiKey();
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Frontend AI Chat'
      },
      body: JSON.stringify({
        messages,
        model: 'openai/gpt-3.5-turbo', // Default model, can be changed
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message;
  } catch (error) {
    console.error('Error in AI service:', error);
    throw error;
  }
};