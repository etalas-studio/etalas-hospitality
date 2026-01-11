import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { LanguageProvider, ThemeProvider } from './contexts';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Lenis from 'lenis';

// Lazy load components below the fold for better initial load performance
const Process = lazy(() => import('./components/Process').then(module => ({ default: module.Process })));
const Features = lazy(() => import('./components/Features').then(module => ({ default: module.Features })));
const Pricing = lazy(() => import('./components/Pricing').then(module => ({ default: module.Pricing })));
const FAQ = lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const TechStack = lazy(() => import('./components/TechStack').then(module => ({ default: module.TechStack })));
const Work = lazy(() => import('./components/Work').then(module => ({ default: module.Work })));
const Blog = lazy(() => import('./components/Blog').then(module => ({ default: module.Blog })));
const Team = lazy(() => import('./components/Team').then(module => ({ default: module.Team })));

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'blog'>('home');

  // Preloader Failsafe
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); 
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  // Handle Floating CTA visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO: Dynamic Title Update
  useEffect(() => {
    if (currentView === 'blog') {
      document.title = 'Insights | etalas - AI Product Studio';
    } else {
      document.title = 'etalas | Digital Software House - Build Your MVP';
    }
  }, [currentView]);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        // Prevent default only if we are on home view, otherwise Header handles it
        if (currentView === 'home') {
            e.preventDefault();
            const element = document.querySelector(anchor.hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [currentView]);

  const whatsappLink = "https://wa.me/62811297339?text=Hi%20etalas,%20I'd%20like%20to%20discuss%20a%20project.";

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`bg-white dark:bg-zinc-950 min-h-screen text-etalas-text dark:text-gray-100 font-sans selection:bg-black selection:text-white transition-colors duration-300 relative ${loading ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Extracted Background Blobs for Performance Isolation */}
        <BackgroundBlobs />

        <div className="relative z-10">
            <Header currentView={currentView} onNavigate={setCurrentView} />
            <main>
              {currentView === 'home' ? (
                <>
                  <Hero />
                  
                  {/* Marquee Section */}
                  <div className="py-12 border-y border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden whitespace-nowrap">
                    <div className="inline-flex animate-marquee">
                       {[...Array(4)].map((_, i) => (
                         <div key={i} className="flex gap-16 mx-8 items-center text-4xl font-light text-gray-300 dark:text-zinc-700">
                            <span>STRATEGY</span>
                            <span className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/10"></span>
                            <span>DESIGN</span>
                            <span className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/10"></span>
                            <span>DEVELOPMENT</span>
                            <span className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/10"></span>
                            <span>LAUNCH</span>
                            <span className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/10"></span>
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  {/* Lazy Loaded Sections with Suspense Fallback */}
                  <Suspense fallback={<div className="min-h-[50vh]" />}>
                    <Work />
                    <Services />
                    <TechStack />
                    <Process />
                    <Features />
                    <Pricing />
                    <Team />
                    <FAQ />
                  </Suspense>
                </>
              ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Suspense fallback={<div className="h-screen" />}>
                        <Blog />
                    </Suspense>
                </motion.div>
              )}
            </main>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>

        {/* Floating CTA */}
        <AnimatePresence>
          {showFloatingCTA && (
            <motion.a
              href={whatsappLink}
              target="_blank"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 z-40 bg-black dark:bg-white text-white dark:text-black p-4 rounded-full shadow-2xl flex items-center gap-3 pr-6 group"
            >
              <div className="bg-brand-600 rounded-full p-2 text-white">
                <MessageCircle size={20} />
              </div>
              <span className="font-bold text-sm">Let's Talk</span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;