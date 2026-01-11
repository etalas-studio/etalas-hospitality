import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './Button';
import { Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const whatsappLink = "https://wa.me/62811297339?text=Hi%20etalas,%20I'd%20like%20to%20schedule%20a%20call.";
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <>
      <section className="py-24 px-6 md:px-12 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight dark:text-white">{t('footer.ready')}</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                {t('footer.bookText')}
            </p>
            <Button variant="primary" className="!text-lg !px-10 !py-5" href={whatsappLink} target="_blank">{t('nav.bookCall')}</Button>
        </div>
      </section>

      <footer ref={containerRef} className="bg-[#121212] dark:bg-black text-[#FDFBF7] pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] relative overflow-hidden">
        {/* Subtle color glow at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-brand-900/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
            <div>
               <a href="#" className="text-3xl font-bold tracking-tight mb-8 block group text-white" aria-label="Back to top">
                etalas<span className="text-gray-600 group-hover:text-brand-500 transition-colors">.</span>
              </a>
              <p className="max-w-xs text-gray-400">
                  {t('footer.tagline')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-16 text-lg">
              <div>
                <h4 className="text-gray-500 text-sm mb-6 uppercase tracking-wider font-bold">{t('footer.company')}</h4>
                <div className="flex flex-col gap-4">
                    <a href="#process" className="hover:text-brand-400 text-gray-300 transition-colors flex items-center gap-1 group">
                      {t('nav.process')} <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </a>
                    <a href="#pricing" className="hover:text-brand-400 text-gray-300 transition-colors flex items-center gap-1 group">
                      {t('nav.pricing')} <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </a>
                    <a href="#faq" className="hover:text-brand-400 text-gray-300 transition-colors flex items-center gap-1 group">
                      {t('nav.faq')} <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </a>
                </div>
              </div>
              <div>
                <h4 className="text-gray-500 text-sm mb-6 uppercase tracking-wider font-bold">{t('footer.contact')}</h4>
                <a href="mailto:hello@etalas.com" className="block hover:text-brand-400 text-gray-300 transition-colors mb-2">hello@etalas.com</a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block hover:text-brand-400 text-gray-300 transition-colors">+62 811-297-339</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} etalas. {t('footer.rights')}
                </div>
                <div className="text-gray-300 text-lg font-medium tracking-tight">
                    {t('footer.legal')}
                </div>
            </div>
            
            <div className="flex gap-4">
              <motion.a 
                href="https://linkedin.com/company/etalas" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 border border-gray-800 rounded-full hover:bg-white hover:text-black hover:border-white text-white"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="Twitter"
                className="p-3 border border-gray-800 rounded-full hover:bg-white hover:text-black hover:border-white text-white"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/etalas.id/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 border border-gray-800 rounded-full hover:bg-white hover:text-black hover:border-white text-white"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>
          
          <div className="mt-24">
             <div className="w-full overflow-hidden">
               <motion.div 
                 style={{ x }}
                 className="text-[12rem] md:text-[18rem] font-bold leading-none text-white/5 opacity-50 select-none whitespace-nowrap hover:text-brand-900/20 transition-colors duration-1000 cursor-default"
               >
                 etalas
               </motion.div>
             </div>
          </div>
        </div>
      </footer>
    </>
  );
};