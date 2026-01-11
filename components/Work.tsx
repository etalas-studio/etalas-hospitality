import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "FinTech Revolution",
    category: "App Development",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "EcoStream Platform",
    category: "Web Design",
    image: "https://picsum.photos/800/800?random=2"
  },
  {
    id: 3,
    title: "Urban Mobility",
    category: "Strategy & Dev",
    image: "https://picsum.photos/800/1000?random=3"
  },
  {
    id: 4,
    title: "HealthConnect",
    category: "Product Design",
    image: "https://picsum.photos/800/600?random=4"
  },
  {
    id: 5,
    title: "Future Retail",
    category: "E-commerce",
    image: "https://picsum.photos/800/600?random=5"
  }
];

const SpotlightWorkCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
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
            className={`relative overflow-hidden ${className}`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-30 rounded-xl"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
            />
            {children}
        </motion.div>
    );
};

export const Work: React.FC = () => {
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight dark:text-white mb-4">
              Selected Work
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
               We build digital products that define categories. Here's a glimpse of our recent partnerships.
            </p>
          </motion.div>
          
          <div className="flex items-center gap-4">
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

        {/* Horizontal Scroll Container */}
        <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[35vw] snap-center">
                <SpotlightWorkCard className="group cursor-pointer h-full rounded-2xl">
                    <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video shadow-sm bg-gray-100 dark:bg-zinc-800">
                        <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                        
                        {/* Floating Arrow Button on Hover */}
                        <div className="absolute bottom-6 right-6 bg-white dark:bg-black text-black dark:text-white p-4 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl z-20">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                    
                    <div className="flex items-end justify-between px-2">
                        <div>
                            <span className="text-xs font-mono text-brand-600 dark:text-brand-400 mb-2 block">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-2xl font-bold dark:text-white mb-1 group-hover:text-brand-600 transition-colors">{project.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{project.category}</p>
                        </div>
                    </div>
                </SpotlightWorkCard>
            </div>
          ))}
          
          {/* "View All" Card at the end */}
           <div className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[35vw] snap-center flex items-center justify-center">
              <a href="#" className="group flex flex-col items-center justify-center gap-4 text-center p-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-800 w-full h-full hover:border-brand-500 transition-colors hover:bg-brand-50/50 dark:hover:bg-brand-900/10">
                 <div className="p-4 rounded-full bg-gray-100 dark:bg-zinc-800 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                     <ArrowRight size={24} />
                 </div>
                 <div>
                     <h3 className="text-xl font-bold dark:text-white">View All Projects</h3>
                     <p className="text-sm text-gray-500">Explore our full portfolio</p>
                 </div>
              </a>
           </div>
        </div>
      </div>
    </section>
  );
};