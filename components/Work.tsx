import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { useLanguage } from '../contexts';

export const Work: React.FC = () => {
  const { t } = useLanguage();
  const useCases = t('useCases.items') as any[];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = direction === 'left' ? -400 : 400;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 size={12} />
              <span>Operational Depth</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight dark:text-white mb-4">
              {t('useCases.heading')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t('useCases.subheading')}
            </p>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-4">
            <button 
                onClick={() => scroll('left')}
                className="p-3 rounded-full border border-gray-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-gray-900 dark:text-white"
                aria-label="Scroll Left"
            >
                <ArrowLeft size={20} />
            </button>
            <button 
                onClick={() => scroll('right')}
                className="p-3 rounded-full border border-gray-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-gray-900 dark:text-white"
                aria-label="Scroll Right"
            >
                <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Use Cases Grid / Scroll */}
        <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {useCases.map((item, index) => (
            <div key={index} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center">
              <motion.div
                className="group p-8 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-brand-500/30 transition-all duration-500 h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 text-[10px] font-bold uppercase tracking-widest">
                    {item.label}
                  </span>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-widest">Impact</div>
                    <div className="text-lg font-bold text-brand-600 italic leading-none">{item.result}</div>
                  </div>
                </div>

                <div className="mb-8 flex-grow">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">The Challenge</div>
                  <p className="text-lg text-etalas-text dark:text-white font-medium leading-snug">
                    "{item.problem}"
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-zinc-800">
                  <div className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.2em] mb-3">Our Solution</div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">{item.solution}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 group/link">
                    Explore This Use Case
                    <ArrowRightIcon size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Credibility Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-100 dark:border-zinc-800"
        >
          {[
            { value: "20+", label: "Years combined experience" },
            { value: "30+", label: "Enterprise systems delivered" },
            { value: "2", label: "Major hospitality groups served" },
            { value: "100%", label: "Hospitality focus" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
