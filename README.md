# Frontend App - Fast AI

This document provides an overview of the "Fast AI" React application, focusing on its theming system, AI chat functionality, and overall project structure. Built with React, TypeScript, Tailwind CSS, and Framer Motion.
## Features

*   **Multi-Theme System:** Supports multiple distinct themes (`light`, `light-alt`, `dark`, `dark-alt`, `dark-alt-2`) with user selection and persistence via `localStorage`.
*   **AI Chat Interface (`/ai`):** An interactive chat page allowing users to communicate with an AI assistant, including features like suggestions, file uploads, and message history.
*   **Component-Based Architecture:** Built using reusable React components for different sections (Hero, Features, Pricing, etc.) and UI elements.
*   **Responsive Design:** Adapts to various screen sizes using Tailwind CSS.
*   **Smooth Animations:** Utilizes Framer Motion for engaging UI animations and transitions.
*   **Semantic Styling:** Leverages CSS variables and semantic naming for maintainable and themeable styles.

## Project Structure Overview

The project follows a standard React application structure:

*   **`public/`**: Static assets.
*   **`src/`**: Source code.
    *   **`assets/`**: Static assets like images (if any).
    *   **`components/`**: Reusable UI components.
        *   **`ai/`**: Components specific to the AI chat interface (e.g., `ChatMessage.tsx`, `SuggestionChip.tsx`, `VisibilityToggle.tsx`).
        *   **`icons/`**: Icon components (e.g., `ThemeIcons.tsx`).
        *   **`layout/`**: Structural components like `Header.tsx` and `Footer.tsx`.
        *   **`pricing/`**: Components related to the pricing section (e.g., `PricingCard.tsx`, `PricingSection.tsx`).
        *   **`sections/`**: Major page sections (e.g., `Hero.tsx`, `Features.tsx`, `Advantages.tsx`, `HowItWorks.tsx`, `Integrations.tsx`, `Testimonials.tsx`, `Pricing.tsx`, `CallToAction.tsx`).
        *   **`ui/`**: General-purpose UI elements (e.g., `FloatingThemeToggle.tsx`, `LoadingSpinner.tsx`, `SectionTitle.tsx`, `Toast.tsx`).
    *   **`context/`**: React Context providers for global state management.
        *   **`ThemeContext.tsx`**: Manages the application theme (selection, persistence).
        *   **`ToastContext.tsx`**: Manages toast notifications.
    *   **`hooks/`**: Custom React hooks (if any).
    *   **`pages/`**: Top-level page components corresponding to routes.
        *   **`HomePage.tsx`**: The main landing page.
        *   **`AIPage.tsx`**: The AI chat interface page.
        *   **`PricingPage.tsx`**: A demo page for the pricing component.
    *   **`services/`**: Modules for interacting with external APIs or services.
        *   **`aiService.ts`**: Handles communication with the AI backend/API.
    *   **`styles/`**: Global styles or style-related files (though most styling is via Tailwind/CSS-in-JS).
    *   **`App.tsx`**: The root application component, likely handling routing.
    *   **`main.tsx`**: The application entry point, initializes React and providers.
    *   **`index.css`**: Global CSS, Tailwind directives, and CSS variable theme definitions.
*   **`index.html`**: The main HTML file.
*   **`package.json`**: Project metadata, dependencies, and scripts.
*   **`tailwind.config.js`**: Tailwind CSS configuration file.
*   **`postcss.config.js`**: PostCSS configuration (used by Tailwind).
*   **`tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`**: TypeScript configuration files.
*   **`vite.config.ts`**: Vite build tool configuration.
## How Theming Works

The theming system allows users to switch between different visual styles dynamically.
1.  **CSS Variables (`src/index.css`)**:
    *   Defines semantic CSS variables (e.g., `--background`, `--foreground`, `--primary`, `--font-sans`) under `@layer base`.
    *   The `:root` selector sets the default values (for the `light` theme).
    *   Theme-specific classes (e.g., `.theme-dark`, `.theme-light-alt`) override these variables with their respective color palettes and font families. HSL color values are used for easy manipulation.

2.  **Tailwind Configuration (`tailwind.config.js`)**:
    *   Tailwind's theme configuration is set up to use these CSS variables. Colors, fonts, and border-radius in the `theme.extend` section reference variables like `hsl(var(--primary))`.
    *   This ensures Tailwind utility classes automatically adapt to the currently active theme.

3.  **Theme Context (`src/context/ThemeContext.tsx`)**:
    *   A React context (`ThemeContext`) is created to manage the current theme state (`theme`) and provide a function (`setTheme`) to update it.
    *   The `ThemeProvider` component wraps the application (in `src/main.tsx`).
    *   It initializes the theme state from `localStorage` (defaulting to the first theme in `themeOrder` if none is stored or invalid).
    *   A `useEffect` hook within `ThemeProvider` applies the corresponding theme class (e.g., `theme-dark`) to the `<html>` element whenever the theme state changes. It also persists the selected theme to `localStorage`.
    *   The `useTheme` hook provides easy access to the `theme` and `setTheme` function for any component within the provider.

4.  **Theme Toggle UI (`src/components/ui/FloatingThemeToggle.tsx`)**:
    *   This component renders a floating button group in the bottom-right corner.
    *   It uses the `useTheme` hook to get the current theme and the `setTheme` function.
    *   It maps over the available themes defined in `themeOrder` (from `ThemeContext.tsx`).
    *   Each theme is represented by a button with an icon (defined in `src/components/icons/ThemeIcons.tsx`).
    *   Clicking a button calls `setTheme` with the corresponding theme name, triggering the context update and the `useEffect` in the provider to change the class on the `<html>` element and update `localStorage`.

## AI Chat Page (`/ai`) Implementation

The `/ai` route displays an interactive chat interface powered by the `AIPage` component (`src/pages/AIPage.tsx`).

1.  **Core Component (`src/pages/AIPage.tsx`)**:
    *   Manages the chat state using React hooks (`useState`), including:
        *   `messages`: An array storing the chat history (`Message[]`).
        *   `inputValue`: The text currently typed in the input field.
        *   `isLoading`: Boolean to indicate if waiting for an AI response.
        *   `uploadedFiles`: An array of `File` objects attached by the user.
        *   `isPublic`: Controls chat visibility (though functionality might be illustrative).
    *   Uses `useRef` for accessing DOM elements like the file input (`fileInputRef`), message container end (`messagesEndRef` for auto-scroll), and textarea (`textareaRef` for auto-resize).
    *   Integrates with `ToastContext` (`src/context/ToastContext.tsx`) via the `useToast` hook to display notifications (e.g., API key errors, send errors).

2.  **UI Components**:
    *   **`ChatMessage` (`src/components/ai/ChatMessage.tsx`)**: Renders individual messages, distinguishing between user messages (right-aligned, primary color) and AI messages (left-aligned, secondary color). Uses `framer-motion` for entry animation.
    *   **`SuggestionChip` (`src/components/ai/SuggestionChip.tsx`)**: Displays clickable prompt suggestions when the chat is empty. Clicking a chip populates the input field.
    *   **`VisibilityToggle` (`src/components/ai/VisibilityToggle.tsx`)**: A dropdown (likely illustrative) to toggle the chat's public/private status.
    *   **Input Area**: A composite section within `AIPage.tsx` handles text input (auto-resizing textarea), file attachment button (triggering `fileInputRef`), display of uploaded files (with removal option), and the send button.
    *   **`LoadingSpinner` (`src/components/ui/LoadingSpinner.tsx`)**: Shown while `isLoading` is true.

3.  **Functionality**:
    *   **Sending Messages**: The `handleSendMessage` function constructs the user message (including metadata about uploaded files), adds it to the `messages` state, clears the input and files, sets `isLoading` to true, and calls the `sendChatRequest` service.
    *   **Receiving Messages**: Upon successful response from `sendChatRequest`, the AI's message is added to the `messages` state, and `isLoading` is set to false. Errors are caught and displayed via toast notifications.
    *   **File Handling**: `handleFileUpload` adds files selected via the hidden input to the `uploadedFiles` state. `removeFile` removes them. File info (name, size) is sent with the message, but actual file content upload might require separate backend handling.
    *   **API Interaction (`src/services/aiService.ts`)**: Contains the `sendChatRequest` function, which likely makes an asynchronous call (e.g., `fetch` or `axios`) to the AI backend API endpoint. It also includes `validateApiKey` to check the environment variable.
    *   **Auto-Scroll**: A `useEffect` hook observes the `messages` array and uses `messagesEndRef.current.scrollIntoView()` to keep the latest message visible.
    *   **Textarea Auto-Resize**: A `useEffect` hook monitors `inputValue` and adjusts the textarea's height based on its `scrollHeight`.

4.  **Styling & Animation**:
    *   Uses Tailwind CSS extensively for layout and styling, leveraging the theme variables.
    *   `framer-motion` is used for subtle animations on message entry, suggestion chips, and potentially other elements like the visibility toggle dropdown.
## Getting Started

1.  Clone the repository:
