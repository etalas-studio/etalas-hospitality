import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Button } from './Button';
import { useLanguage, useTheme } from '../contexts';
import { Tooltip } from './Tooltip';

const TOOLTIP_DATA: Record<string, string> = {
  "AI developer team": "Access to a dedicated team of AI-specialized engineers.",
  "Unlimited revisions": "We refine the work until it meets your exact requirements.",
  "Product strategy & roadmap": "Strategic planning to ensure long-term product success.",
  "Integrations & API's": "Seamless connectivity with third-party services and data sources.",
  "Communication via Slack": "Direct, real-time access to your project team via Slack.",
  "Weekly progress updates": "Comprehensive reports on development milestones every week.",
  "Functional MVP built with Lovable": "Rapid prototyping and development using Lovable's AI capabilities.",
  "Database + API integrations": "Secure database architecture and robust API connectivity.",
  "User authentication & onboarding": "Secure login systems and smooth user entry flows.",
  "Product design components": "Consistent, high-quality UI/UX components for your product.",
  
  // Indonesian Fallbacks
  "Tim pengembang AI": "Akses ke tim insinyur khusus AI.",
  "Revisi tanpa batas": "Kami menyempurnakan pekerjaan hingga memenuhi kebutuhan Anda.",
  "Strategi produk & roadmap": "Perencanaan strategis untuk memastikan kesuksesan produk.",
  "Integrasi & API": "Konektivitas lancar dengan layanan pihak ketiga.",
  "Komunikasi via Slack": "Akses langsung real-time ke tim proyek Anda.",
  "Update progress mingguan": "Laporan komprehensif tentang pencapaian pengembangan.",
  "MVP fungsional dibangun dengan Lovable": "Pembuatan prototipe cepat menggunakan kemampuan AI Lovable.",
  "Database + Integrasi API": "Arsitektur database aman dan konektivitas API yang kuat.",
  "Otentikasi pengguna & onboarding": "Sistem login aman dan alur masuk pengguna yang lancar.",
  "Komponen desain produk": "Komponen UI/UX berkualitas tinggi dan konsisten."
};

const PricingCard = ({ item, t, whatsappLink, children }: any) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const { theme } = useTheme();

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

    // Adjust spotlight based on theme
    const spotlightColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            className={`relative p-6 sm:p-8 md:p-10 rounded-3xl flex flex-col md:flex-row gap-8 justify-between border transition-all duration-300 overflow-hidden group
                  ${item.highlight 
                    ? 'bg-white dark:bg-[#111111] border-brand-500/30 dark:border-zinc-700 shadow-2xl shadow-brand-900/5 dark:shadow-brand-900/20' 
                    : 'bg-white dark:bg-[#111111] border-gray-200 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-zinc-700'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
        >
             <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {children}
        </motion.div>
    );
};

export const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const whatsappLink = "https://wa.me/62811297339?text=Hi%20etalas,%20I'm%20interested%20in%20your%20services.";

  const pricingItems = [
    {
      title: t('pricing.mvp.title'),
      subtitle: t('pricing.mvp.subtitle'),
      description: t('pricing.mvp.desc'),
      price: "Rp 100jt",
      priceSecondary: "or $6k",
      period: t('pricing.mvp.period'),
      features: t('pricing.features.mvp') as string[],
      buttonText: t('pricing.mvp.btn'),
      highlight: true
    },
    {
      title: t('pricing.sprints.title'),
      subtitle: t('pricing.sprints.subtitle'),
      description: t('pricing.sprints.desc'),
      price: "Rp 50jt",
      priceSecondary: "or $3k",
      period: t('pricing.sprints.period'),
      features: t('pricing.features.sprints') as string[],
      buttonText: t('pricing.sprints.btn'),
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 bg-etalas-bg dark:bg-zinc-950 text-etalas-text dark:text-white relative transition-colors duration-300">
       {/* Subtle Background Mesh - Adapted for Light/Dark */}
       <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-5 dark:opacity-20 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Sticky Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 dark:text-white text-etalas-text">
                  {t('pricing.heading')}
                </h2>
                <p className="text-xl text-etalas-secondary dark:text-gray-400 text-lg leading-relaxed mb-8">
                  {t('pricing.subheading')}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/20 w-fit px-3 py-1.5 rounded-full border border-green-200 dark:border-green-900/50">
                    <ShieldCheck size={16} />
                    <span>Money-back guarantee on first sprint</span>
                </div>
              </motion.div>
          </div>

          {/* Scrollable Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {pricingItems.map((item, index) => (
              <PricingCard key={index} item={item} t={t} whatsappLink={whatsappLink}>
                <div className="flex-1 relative z-20 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                        <span className={`text-sm font-semibold px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-etalas-text dark:text-white`}>
                            {item.title}
                        </span>
                        {item.highlight && (
                            <span className="text-xs font-bold bg-gradient-to-r from-brand-500 to-purple-500 text-white px-2 py-1 rounded shadow-lg shadow-brand-500/30">
                            POPULAR
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 dark:text-white text-etalas-text">{item.subtitle}</h3>
                    <p className="mb-8 leading-relaxed text-gray-500 dark:text-gray-400">
                        {item.description}
                    </p>

                    <div className="flex flex-col gap-1 mb-6">
                        <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                            <span className="text-4xl md:text-5xl font-bold dark:text-white text-etalas-text tracking-tight">{item.price}</span>
                            <span className="text-lg text-gray-400 dark:text-gray-500 font-medium">{item.priceSecondary}</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{item.period}</span>
                    </div>
                  </div>

                  {/* Mobile-only CTA */}
                  <div className="md:hidden">
                    <p className="text-sm mb-4 text-gray-500">{t('pricing.pauseCancel')}</p>
                    <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 rounded-xl font-semibold flex flex-col items-center justify-center gap-1 transition-all duration-300 group bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                    >
                        <span className="flex items-center gap-2">{item.buttonText} <ArrowRight size={16} /></span>
                    </a>
                    <div className="mt-3 text-center">
                        <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            <Star size={10} className="fill-yellow-500 text-yellow-500" />
                            {t('pricing.trustSignal')}
                        </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 md:border-l md:border-gray-100 dark:md:border-zinc-800 md:pl-10 flex flex-col justify-between relative z-20">
                    <div className="hidden md:block">
                        <p className="text-sm mb-6 text-gray-500">{t('pricing.pauseCancel')}</p>
                    </div>
                   <ul className="space-y-4 mb-10">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-1 p-0.5 rounded-full bg-brand-500 text-white flex-shrink-0">
                          <Check size={12} />
                        </div>
                        <Tooltip content={TOOLTIP_DATA[feature]}>
                          <span className={`text-sm cursor-help ${TOOLTIP_DATA[feature] ? 'border-b border-dotted border-gray-300 dark:border-gray-600' : ''} text-gray-600 dark:text-gray-300`}>{feature}</span>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>

                  <div className="hidden md:block">
                      <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 group bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        {item.buttonText} 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                      <div className="mt-3 text-center">
                           <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
                              <div className="flex">
                                {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-yellow-500 text-yellow-500" />)}
                              </div>
                              {t('pricing.trustSignal')}
                           </span>
                      </div>
                  </div>
                </div>
              </PricingCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};