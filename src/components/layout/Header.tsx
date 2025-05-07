import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
interface HeaderProps {
  onOpenContactModal: () => void;
}

/**
 * Header component (Theme toggle removed).
 */
export const Header: React.FC<HeaderProps> = ({ onOpenContactModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'The AI Advantage', href: '#ai-advantage' },
    { name: 'Loved by Users', href: '#testimonials' },
    { name: 'Scale Up', href: '#scale-showcase' },
    { name: 'Pricing', href: '#pricing' },
  ];

  // Function to handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/')) {
      setMobileMenuOpen(false); // Close drawer on internal navigation
      return;
    }
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
                      setMobileMenuOpen(false);
};

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const drawerVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: '-100%', transition: { duration: 0.3 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border transition-colors duration-300">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="container mx-auto py-3 sm:py-4 px-4 sm:px-6 md:px-8"
        >
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl font-bold text-foreground cursor-pointer transition-colors duration-300">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Fast AI</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) =>
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                )
              )}
              <button
                onClick={onOpenContactModal}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                Talk to Us
              </button>
            </div>

            {/* Mobile Right Side: Menu Toggle and AI Button */}
            <div className="flex items-center space-x-3 md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors duration-300"
                onClick={() => {
                  navigate('/ai');
                  setMobileMenuOpen(false);
                }}
              >
                Start Generating
              </motion.button>
              <button
                onClick={toggleMobileMenu}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                <FiMenu className="h-6 w-6" />
              </button>
            </div>
            
            {/* Desktop AI Button (visible only on md and up, if Talk to Us is also shown) */}
             <div className="hidden md:flex items-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors duration-300 ml-4"
                    onClick={() => navigate('/ai')}
                >
                    Start Generating
                </motion.button>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-card shadow-xl z-40 p-6 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-lg font-bold text-foreground"></div>
                <button
                  onClick={toggleMobileMenu}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close mobile menu"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item) =>
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => handleNavClick(e as any, item.href)} // Cast as any to satisfy event type, or adjust handleNavClick
                      className="text-base text-muted-foreground hover:text-foreground py-2 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-base text-muted-foreground hover:text-foreground py-2 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  )
                )}
                <button
                  onClick={() => {
                    onOpenContactModal();
                    setMobileMenuOpen(false);
                  }}
                  className="text-base text-muted-foreground hover:text-foreground py-2 text-left transition-colors duration-300"
                >
                  Talk to Us
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};