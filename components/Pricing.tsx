import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../contexts';
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
            className={`relative p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 justify-between border transition-all duration-300 bg-[#111111] text-white overflow-hidden ${
                  item.highlight 
                    ? 'border-zinc-700 shadow-2xl shadow-brand-900/20' 
                    : 'border-zinc-800 hover:border-zinc-700'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
        >
             <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
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
      price: "Rp100.000.000",
      period: t('pricing.mvp.period'),
      features: t('pricing.features.mvp') as string[],
      buttonText: t('pricing.mvp.btn'),
      highlight: true
    },
    {
      title: t('pricing.sprints.title'),
      subtitle: t('pricing.sprints.subtitle'),
      description: t('pricing.sprints.desc'),
      price: "Rp50.000.000",
      period: t('pricing.sprints.period'),
      features: t('pricing.features.sprints') as string[],
      buttonText: t('pricing.sprints.btn'),
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 bg-black text-white relative transition-colors duration-300">
       {/* Subtle Background Mesh */}
       <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

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
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                  {t('pricing.heading')}
                </h2>
                <p className="text-xl text-gray-400 text-lg leading-relaxed mb-8">
                  {t('pricing.subheading')}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-green-400 font-medium bg-green-900/20 w-fit px-3 py-1.5 rounded-full border border-green-900/50">
                    <ShieldCheck size={16} />
                    <span>Money-back guarantee on first sprint</span>
                </div>
              </motion.div>
          </div>

          {/* Scrollable Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {pricingItems.map((item, index) => (
              <PricingCard key={index} item={item} t={t} whatsappLink={whatsappLink}>
                <div className="flex-1 relative z-20">
                  <div className="flex justify-between items-start mb-6">
                      <span className={`text-sm font-semibold px-4 py-2 rounded-full bg-white/10 text-white`}>
                          {item.title}
                      </span>
                      {item.highlight && (
                        <span className="text-xs font-bold bg-gradient-to-r from-brand-500 to-purple-500 text-white px-2 py-1 rounded shadow-lg shadow-brand-500/50">
                          POPULAR
                        </span>
                      )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">{item.subtitle}</h3>
                  <p className="mb-8 leading-relaxed text-gray-400">
                    {item.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl md:text-4xl font-bold text-white">{item.price}</span>
                    <span className="text-sm text-gray-500">{item.period}</span>
                  </div>
                  <p className="text-sm mb-8 text-gray-500">{t('pricing.pauseCancel')}</p>
                  
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-xl font-semibold flex flex-col items-center justify-center gap-1 transition-all duration-300 group bg-white text-black hover:bg-gray-200 md:hidden"
                  >
                    <span className="flex items-center gap-2">{item.buttonText} <ArrowRight size={16} /></span>
                  </a>
                  <div className="mt-3 text-center md:hidden">
                       <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
                          <Star size={10} className="fill-yellow-500 text-yellow-500" />
                          {t('pricing.trustSignal')}
                       </span>
                  </div>
                </div>

                <div className="flex-1 md:border-l md:border-zinc-800 md:pl-8 flex flex-col justify-between relative z-20">
                   <ul className="space-y-4 mb-10">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-1 p-0.5 rounded-full bg-brand-500 text-white flex-shrink-0">
                          <Check size={12} />
                        </div>
                        <Tooltip content={TOOLTIP_DATA[feature]}>
                          <span className={`text-sm cursor-help ${TOOLTIP_DATA[feature] ? 'border-b border-dotted border-gray-500/50' : ''} text-gray-300`}>{feature}</span>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>

                  <div>
                      <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 rounded-xl font-semibold hidden md:flex items-center justify-center gap-2 transition-all duration-300 group bg-white text-black hover:bg-gray-200"
                      >
                        {item.buttonText} 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                      <div className="mt-3 text-center hidden md:block">
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