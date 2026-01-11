import React, { memo } from 'react';
import { useLanguage } from '../contexts';
import { Code2, Database, Globe, Smartphone, Cloud, Cpu, Lock, Zap } from 'lucide-react';

const TECH_ITEMS = [
  { name: 'React', icon: <Code2 size={24} /> },
  { name: 'TypeScript', icon: <Code2 size={24} /> },
  { name: 'Next.js', icon: <Globe size={24} /> },
  { name: 'Tailwind CSS', icon: <Zap size={24} /> },
  { name: 'Supabase', icon: <Database size={24} /> },
  { name: 'OpenAI', icon: <Cpu size={24} /> },
  { name: 'React Native', icon: <Smartphone size={24} /> },
  { name: 'Vercel', icon: <Cloud size={24} /> },
  { name: 'Stripe', icon: <Lock size={24} /> },
  { name: 'Node.js', icon: <Code2 size={24} /> }
];

export const TechStack: React.FC = memo(() => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
           {t('techStack.heading')}
        </p>
      </div>
      
      <div className="relative flex overflow-hidden group">
        {/* First list */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-16 px-8 will-change-transform">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, index) => (
            <div 
                key={`list1-${index}`} 
                className="flex items-center gap-3 text-2xl font-medium text-gray-400 dark:text-gray-500 grayscale transition-all duration-300 hover:grayscale-0 hover:text-black dark:hover:text-white cursor-default"
            >
              <span className="opacity-50">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Second identical list for seamless scrolling */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap gap-16 px-8 will-change-transform">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, index) => (
            <div 
                key={`list2-${index}`} 
                className="flex items-center gap-3 text-2xl font-medium text-gray-400 dark:text-gray-500 grayscale transition-all duration-300 hover:grayscale-0 hover:text-black dark:hover:text-white cursor-default"
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
    </section>
  );
});

TechStack.displayName = 'TechStack';