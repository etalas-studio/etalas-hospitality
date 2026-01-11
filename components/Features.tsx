import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts';
import { Unlock } from 'lucide-react';

// Reusable Spotlight Card Wrapper
const SpotlightCard = ({ children, className = "", delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            className={`${className} relative overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5, delay }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />
            {children}
        </motion.div>
    );
};


export const Features: React.FC = () => {
  const { t } = useLanguage();
  const negatives = t('features.negatives') as string[];

  return (
    <section id="benefits" className="py-24 md:py-32 px-6 md:px-12 bg-etalas-bg dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
           {/* Sticky Left Column */}
           <div className="lg:col-span-4 lg:sticky lg:top-32">
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 dark:text-white">
                  {t('features.heading')}
                </h2>
                <p className="text-xl text-etalas-secondary dark:text-gray-400 text-lg leading-relaxed">
                  {t('features.subheading')}
                </p>
              </motion.div>
           </div>

           {/* Scrollable Right Column */}
           <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Design Card - Extra Compact */}
              <SpotlightCard 
                className="p-5 rounded-2xl bg-[#EBE9E4] dark:bg-[#1a1a1c] flex flex-col justify-between group border border-transparent dark:border-zinc-800"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded-full mb-3 font-serif italic text-lg">Aa</div>
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{t('features.design.title')}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg">
                    {t('features.design.desc')}
                  </p>
                </div>
                <div className="mt-4 opacity-10 dark:opacity-5 text-[32px] leading-none font-serif italic absolute bottom-0 right-4 text-brand-900 dark:text-white pointer-events-none select-none">
                  Design
                </div>
              </SpotlightCard>

              {/* Operate Card - Extra Compact */}
              <SpotlightCard 
                className="p-5 rounded-2xl bg-[#121212] dark:bg-black text-white flex flex-col justify-between group border border-transparent dark:border-zinc-800"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-purple-500" />
                
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur rounded-full mb-3 border border-white/20 flex items-center justify-center">
                      <Unlock size={14} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{t('features.operate.title')}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-lg mb-4">
                    {t('features.operate.desc')}
                  </p>
                </div>

                {/* Visual: Kanban Board - Extra Compact */}
                <div className="w-full h-20 relative p-2 bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                    <div className="grid grid-cols-3 gap-2 h-full relative z-10">
                        {/* Todo */}
                        <div className="flex flex-col gap-1.5">
                            <div className="h-1 w-6 bg-white/20 rounded-full mb-0.5"></div>
                            <div className="h-full w-full bg-white/10 rounded border border-white/5 p-1.5">
                                <div className="h-0.5 w-2/3 bg-white/20 rounded-full mb-1"></div>
                                <div className="h-0.5 w-1/3 bg-white/10 rounded-full"></div>
                            </div>
                        </div>
                        {/* In Progress */}
                        <div className="flex flex-col gap-1.5">
                            <div className="h-1 w-6 bg-brand-500/50 rounded-full mb-0.5"></div>
                            <motion.div
                                className="h-full w-full bg-gradient-to-br from-brand-600 to-brand-800 rounded border border-brand-500/30 p-1.5 shadow-xl relative z-10"
                                initial={{ y: 0 }}
                                animate={{ y: [0, -2, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="h-0.5 w-3/4 bg-white/80 rounded-full mb-1"></div>
                                <div className="h-0.5 w-1/2 bg-white/30 rounded-full mb-1"></div>
                                <div className="h-0.5 w-full bg-white/30 rounded-full mt-1.5"></div>
                            </motion.div>
                        </div>
                        {/* Done */}
                        <div className="flex flex-col gap-1.5 opacity-40">
                            <div className="h-1 w-6 bg-green-500/50 rounded-full mb-0.5"></div>
                            <div className="h-full w-full bg-white/5 rounded border border-white/5 p-1.5">
                                  <div className="h-0.5 w-1/2 bg-white/20 rounded-full mb-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
              </SpotlightCard>

              {/* Negative List - Compact */}
              <motion.div 
                className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xs font-medium mb-4 uppercase tracking-widest text-gray-500 dark:text-gray-400">{t('features.sayNo')}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {negatives.map((item, i) => (
                    <div key={item} className="group relative">
                      <div className="text-base md:text-xl font-light text-gray-400 dark:text-zinc-600 transition-colors group-hover:text-gray-600 dark:group-hover:text-zinc-400 cursor-default">
                        {item}
                      </div>
                      <motion.div 
                        className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 dark:bg-red-500/80 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};