import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../contexts';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const titleWords = t('hero.titleStart').split(' ');
  const roiItems = t('hero.roi') as string[];

  // Updated client list
  const trustedClients = [
    "KarmaClub", 
    "YOLO Padel", 
    "Swissbel Hotel", 
    "Plumber", 
    "Runchise", 
    "Angkas", 
    "Let's Grow", 
    "WorldHub", 
    "Kamon", 
    "Deka Insight", 
    "Ditajaya", 
    "Musicology", 
    "Skedul",
    "Pont",
    "Prodago", 
    "Metion"
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center pt-32 pb-12 px-0 relative overflow-hidden">
      <div className="container mx-auto relative z-10 px-6 md:px-12">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-sm font-medium mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Sparkles size={16} />
            </motion.div>
            <span>{t('hero.tag')}</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight mb-8 dark:text-white"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {titleWords.map((word: string, index: number) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.2em]"
                variants={{
                  hidden: { opacity: 0, y: 40, rotate: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotate: 0,
                    transition: { type: "spring", stiffness: 100, damping: 12 }
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              className="inline-block italic bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-purple-500 to-brand-600 bg-[length:200%_auto] animate-shimmer pr-4 pb-2"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
              }}
            >
              AI
            </motion.span>
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mt-8">
             <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-etalas-secondary dark:text-gray-400 leading-relaxed mb-8">
                {t('hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <Button variant="primary" href="#process">{t('hero.startBuilding')}</Button>
                <Button variant="outline" href="#pricing">{t('hero.viewPricing')}</Button>
              </div>

              {/* ROI Pillars */}
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                 {roiItems.map((item, i) => (
                   <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                      <CheckCircle2 size={16} className="text-brand-600" />
                      {item}
                   </div>
                 ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden lg:flex"
            >
              <a href="#process" className="p-4 rounded-full border border-brand-100 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm shadow-lg shadow-brand-500/10 text-brand-600 dark:text-white hover:scale-110 transition-transform duration-300" aria-label="Scroll to Process">
                 <ArrowRight size={32} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trusted Partners Marquee */}
      <motion.div 
          className="mt-20 border-y border-gray-100 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-900/20 backdrop-blur-sm py-12 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
      >
          <div className="container mx-auto px-6 mb-6">
             <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t('hero.trustedBy')}</p>
          </div>
          
          <div className="flex gap-32 relative overflow-hidden group w-full">
             <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-32 items-center will-change-transform">
                 {trustedClients.map((client, i) => (
                     <span key={`l1-${i}`} className="text-2xl md:text-4xl font-bold font-serif text-gray-300 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors duration-500 cursor-default select-none">{client}</span>
                 ))}
             </div>
             
             <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-32 items-center will-change-transform">
                 {trustedClients.map((client, i) => (
                     <span key={`l2-${i}`} className="text-2xl md:text-4xl font-bold font-serif text-gray-300 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors duration-500 cursor-default select-none">{client}</span>
                 ))}
             </div>
             
             {/* Fade edges */}
             <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
          </div>
      </motion.div>
      
      {/* Background Abstract Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-brand-100/40 via-purple-100/30 to-transparent dark:from-brand-900/20 dark:via-purple-900/10 rounded-full blur-3xl -z-10 animate-blob mix-blend-multiply dark:mix-blend-screen filter opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-b from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000 pointer-events-none" />
    </section>
  );
};