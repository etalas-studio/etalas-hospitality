import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, RefreshCw, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../contexts';

const stepsIcons = [
  { icon: <Hammer className="w-6 h-6" />, color: "text-blue-600 dark:text-blue-400" },
  { icon: <RefreshCw className="w-6 h-6" />, color: "text-purple-600 dark:text-purple-400" },
  { icon: <TrendingUp className="w-6 h-6" />, color: "text-green-600 dark:text-green-400" },
  { icon: <Users className="w-6 h-6" />, color: "text-orange-600 dark:text-orange-400" }
];

export const Process: React.FC = () => {
  const { t } = useLanguage();
  const stepsData = t('process.steps') as any[];

  const steps = stepsData.map((step, index) => ({
    ...step,
    ...stepsIcons[index],
    number: `0${index + 1}`
  }));

  return (
    <section id="process" className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-zinc-900 relative transition-colors duration-300">
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
                {t('process.heading')}
              </h2>
              <p className="text-xl text-etalas-secondary dark:text-gray-400 text-lg leading-relaxed">
                {t('process.subheading')}
              </p>
            </motion.div>
          </div>

          {/* Scrollable Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-12 md:gap-20 relative">
            {/* Connecting Line */}
            <div className="absolute left-[39px] top-12 bottom-20 w-px bg-dashed border-l border-dashed border-gray-300 dark:border-zinc-800 hidden md:block" />

            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col group md:flex-row gap-8 md:gap-12 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {/* Number Block */}
                <div className="flex-shrink-0 bg-white dark:bg-zinc-900 py-2">
                   <span className="text-6xl md:text-8xl font-light text-gray-100 dark:text-zinc-800 group-hover:text-brand-100 dark:group-hover:text-brand-900/20 transition-colors font-mono block leading-none">
                      {step.number}
                    </span>
                </div>

                {/* Content Block */}
                <div className="pt-2 md:pt-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 ${step.color} mb-6`}>
                    {step.icon}
                  </div>
                  <h3 className="text-3xl font-bold dark:text-white mb-2">{step.title}</h3>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-4">{step.subtitle}</h4>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};