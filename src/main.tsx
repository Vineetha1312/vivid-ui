import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';
import { ThemeProvider } from './context/ThemeContext.tsx';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
} else {
  console.error("Failed to find the root element");
}
