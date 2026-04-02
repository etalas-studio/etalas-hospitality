import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { useLanguage, useTheme } from '../contexts';

interface HeaderProps {
  currentView: 'home' | 'blog';
  onNavigate: (view: 'home' | 'blog') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: 'Work', href: '#work', view: 'home' },
    { label: 'Services', href: '#services', view: 'home' },
    { label: t('nav.process'), href: '#process', view: 'home' },
    { label: 'Blog', href: '#blog', view: 'blog' },
    { label: t('nav.faq'), href: '#faq', view: 'home' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/62811297339?text=Hi%20etalas,%20I'd%20like%20to%20schedule%20a%20call%20to%20discuss%20my%20project.";

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault();
    
    if (item.view === 'blog') {
      onNavigate('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') {
        onNavigate('home');
        // Small delay to allow home component to mount before scrolling
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 shadow-sm' 
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('home'); window.scrollTo({top:0, behavior:'smooth'}); }}
            className="relative z-50 group" 
            aria-label="Etalas Home"
          >
            <img 
              src="/etalas-logo.png" 
              alt="Etalas" 
              className="h-8 dark:hidden"
            />
            <img 
              src="/etalas-white.png" 
              alt="Etalas" 
              className="h-8 hidden dark:block"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item as any)}
                className={`text-sm font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full ${
                  (currentView === 'blog' && item.view === 'blog') ? 'text-brand-600' : 'text-etalas-secondary dark:text-gray-400 hover:text-brand-600 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <div className="w-px h-6 bg-gray-300 dark:bg-zinc-700 mx-2" />

            {/* Switchers */}
            <div className="flex items-center gap-4">
               <button 
                onClick={toggleTheme} 
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
               >
                 {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
               </button>

               <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors uppercase w-12"
                aria-label={`Current language: ${language}. Click to switch.`}
               >
                  {language}
               </button>
            </div>

            <Button 
              variant="primary" 
              className="!py-2 !px-6 ml-2" 
              href={whatsappLink}
              target="_blank"
            >
              {t('nav.bookCall')}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 relative z-50">
             <button onClick={toggleTheme} className="text-etalas-text dark:text-white" aria-label="Toggle Theme">
                 {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>
             <button 
              className="p-2 text-etalas-text dark:text-white hover:text-brand-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-4xl font-light dark:text-white hover:text-brand-600 hover:italic transition-all cursor-pointer"
                  onClick={(e) => handleNavClick(e, item as any)}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 mt-4"
              >
                  <button onClick={toggleLanguage} className="text-xl font-bold uppercase dark:text-white" aria-label="Switch Language">
                      {language === 'en' ? 'English' : 'Indonesia'}
                  </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Button onClick={() => setIsMenuOpen(false)} href={whatsappLink} target="_blank">
                   {t('nav.bookCall')}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};