import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts';
import { Linkedin } from 'lucide-react';

const TEAM_IMAGES = [
  '1472099645785-5658abf4ff4e', // Pandu (0)
  '1500648767791-00dcc994a43e', // Andre (1)
  '1507003211169-0a1dd7228f2d', // Ari (2)
  '1573496359142-b8d87734a5a2', // Dina (3)
  '1463453091185-61582044d556', // Hanif (4)
  '1519085360753-af0119f7cbe7', // Rifqy (5)
  '1506794778202-cad84cf45f1d', // Rois (6)
  '1544005313-94ddf0286df2',    // Delia (7)
  '1539571696357-5a69c17a67c6', // Thufail (8)
  '1531427186611-ecfd6d936c79', // Hilmi (9)
  '1537432376769-00f5c2f4c8d2', // Bagas (10)
  '1599566150163-29194dcaad36', // Prima (11)
  '1535713875002-d1d0cf377fde'  // Aziz (12)
];

export const Team: React.FC = () => {
  const { t } = useLanguage();
  const members = t('team.members') as any[];
  
  // Split members into Co-Founders (first 3) and Team (rest)
  const coFounders = members.slice(0, 3);
  const teamMembers = members.slice(3);

  return (
    <section id="team" className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-zinc-950 transition-colors duration-300">
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
                  {t('team.heading')}
                </h2>
                <p className="text-xl text-etalas-secondary dark:text-gray-400 text-lg leading-relaxed mb-12">
                  {t('team.subheading')}
                </p>
                
                <div className="hidden lg:block">
                    <div className="h-px w-20 bg-brand-600 mb-6"></div>
                    <p className="text-sm text-gray-500 max-w-xs">
                        From unicorns to early-stage startups, our team has built it all.
                    </p>
                </div>
              </motion.div>
           </div>

           {/* Scrollable Right Column */}
           <div className="lg:col-span-8">
              
              {/* Co-Founders Section - Larger */}
              <div className="mb-20">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-8">Founding Team</h3>
                  {/* Grid for co-founders - 3 columns on tablet/desktop to fit in one line */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-12">
                      {coFounders.map((member, index) => {
                          const imageId = TEAM_IMAGES[index];
                          return (
                            <motion.div 
                              key={`founder-${index}`}
                              className="group flex flex-col h-full"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 mb-6 relative shadow-md">
                                    <img 
                                    src={`https://images.unsplash.com/photo-${imageId}?q=80&w=600&h=750&auto=format&fit=crop`}
                                    alt={`${member.name} - ${member.role} at Etalas`}
                                    width="600"
                                    height="750"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                    />
                                    {member.linkedin && (
                                    <a 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        aria-label={`${member.name} LinkedIn Profile`}
                                        className="absolute bottom-4 right-4 p-3 bg-white dark:bg-black rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 dark:text-white"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                    )}
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold dark:text-white mb-1">{member.name}</h3>
                                <p className="text-sm text-brand-600 font-medium mb-4">{member.role}</p>
                                
                                {member.experience && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.experience.map((exp: string, i: number) => (
                                    <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 rounded">
                                        {exp}
                                    </span>
                                    ))}
                                </div>
                                )}

                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {member.bio}
                                </p>
                            </motion.div>
                          );
                      })}
                  </div>
              </div>

              {/* Rest of Team - Smaller/Compact */}
              <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8 border-t border-gray-100 dark:border-zinc-800 pt-8">The Builders</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                      {teamMembers.map((member, index) => {
                          // Offset index by 3 because first 3 are founders
                          const realIndex = index + 3;
                          const imageId = TEAM_IMAGES[realIndex % TEAM_IMAGES.length];
                          
                          return (
                            <motion.div 
                              key={`member-${index}`}
                              className="group flex flex-col h-full"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800 mb-4 relative">
                                    <img 
                                    src={`https://images.unsplash.com/photo-${imageId}?q=80&w=300&h=300&auto=format&fit=crop`}
                                    alt={`${member.name} - ${member.role}`}
                                    width="300"
                                    height="300"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                <h3 className="text-sm font-bold dark:text-white leading-tight mb-1">{member.name}</h3>
                                <p className="text-[10px] text-brand-600 font-medium mb-2 line-clamp-1">{member.role}</p>
                                
                                {member.experience && (
                                  <div className="flex flex-wrap gap-1 mb-2">
                                      {member.experience.map((exp: string, i: number) => (
                                      <span key={i} className="px-1.5 py-0.5 bg-gray-50 dark:bg-zinc-800/50 text-[9px] uppercase font-bold text-gray-400 dark:text-gray-500 rounded border border-gray-100 dark:border-zinc-800">
                                          {exp}
                                      </span>
                                      ))}
                                  </div>
                                )}
                                
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-3">
                                    {member.bio}
                                </p>
                            </motion.div>
                          );
                      })}
                  </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};