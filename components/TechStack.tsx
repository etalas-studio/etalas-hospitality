import React, { memo } from 'react';
import { useLanguage } from '../contexts';
import { Building2, Users, Cpu, Shield, Zap, Globe } from 'lucide-react';

const CREDIBILITY_ITEMS = [
  { name: 'AYANA Hotel Group', icon: <Building2 size={24} /> },
  { name: 'Swiss-Belhotel', icon: <Globe size={24} /> },
  { name: 'AI-Native Development', icon: <Cpu size={24} /> },
  { name: 'Enterprise Security', icon: <Shield size={24} /> },
  { name: '20+ Years Experience', icon: <Users size={24} /> },
  { name: 'Rapid Delivery', icon: <Zap size={24} /> },
  { name: 'Hospitality Specialists', icon: <Building2 size={24} /> },
  { name: 'Product-Thinking Approach', icon: <Cpu size={24} /> },
  { name: 'PMS & ERP Integration', icon: <Globe size={24} /> },
  { name: 'Enterprise-Grade Systems', icon: <Shield size={24} /> },
];

export const TechStack: React.FC = memo(() => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">
           {t('techStack.heading')}
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-gray-300 dark:text-zinc-700 uppercase tracking-tighter">
            <span className="flex items-center gap-2"><Building2 size={14}/> AYANA Hotel Group</span>
            <span className="flex items-center gap-2"><Globe size={14}/> Swiss-Belhotel</span>
            <span className="flex items-center gap-2"><Cpu size={14}/> 20+ Years Exp</span>
        </div>
      </div>
      
      <div className="relative flex overflow-hidden group">
        {/* First list */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-16 px-8 will-change-transform">
          {[...CREDIBILITY_ITEMS, ...CREDIBILITY_ITEMS].map((item, index) => (
            <div 
                key={`list1-${index}`} 
                className="flex items-center gap-3 text-2xl font-medium text-gray-400 dark:text-gray-500 transition-all duration-300 hover:text-black dark:hover:text-white cursor-default"
            >
              <span className="opacity-50">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Second identical list for seamless scrolling */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-16 px-8 will-change-transform">
          {[...CREDIBILITY_ITEMS, ...CREDIBILITY_ITEMS].map((item, index) => (
            <div 
                key={`list2-${index}`} 
                className="flex items-center gap-3 text-2xl font-medium text-gray-400 dark:text-gray-500 transition-all duration-300 hover:text-black dark:hover:text-white cursor-default"
            >
              <span className="opacity-50">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 mt-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600 mb-4">
           {t('techStack.integrations')}
        </p>
        <p className="text-sm text-gray-400 dark:text-zinc-500 max-w-2xl mx-auto font-medium">
           {t('techStack.integrationList')}
        </p>
      </div>
    </section>
  );
});
