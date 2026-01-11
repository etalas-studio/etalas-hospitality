import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundBlobs: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Optimization: Use requestAnimationFrame for smoother visual updates if needed, 
    // but React state updates are generally batched well enough for this simple effect.
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Only listen on client side
    if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base Noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
        
        {/* Purple Blob Top Right - Responsive Parallax */}
        <motion.div 
            className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[100px] dark:bg-purple-900/20 mix-blend-multiply dark:mix-blend-screen" 
            animate={{
                x: mousePosition.x * -0.02,
                y: mousePosition.y * -0.02,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
        
        {/* Black/Gray Blob Bottom Left - Responsive Parallax */}
        <motion.div 
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gray-900/5 rounded-full blur-[80px] dark:bg-gray-800/20"
            animate={{
                x: mousePosition.x * 0.02,
                y: mousePosition.y * 0.02,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
        
        {/* Center light accent */}
        <motion.div 
            className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px]"
            animate={{
                x: mousePosition.x * 0.01,
                y: mousePosition.y * 0.01,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
    </div>
  );
};