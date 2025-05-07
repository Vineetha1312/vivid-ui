import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AIPage } from './pages/AIPage';
import { FloatingThemeToggle } from './components/ui/FloatingThemeToggle';
import { PricingPage } from './pages/PricingPage';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      <FloatingThemeToggle />
      </Router>
    </ToastProvider>
  );
}

export default App;
