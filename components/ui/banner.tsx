'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Important from '@/components/ui/important';

export default function Banner() {
  return (
    <motion.div
      className="relative min-h-[200px] rounded-lg shadow-md mb-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundImage: "url('/icons/FilterProducts/banner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 p-4 flex items-center justify-between h-full">
        <div className="space-y-2">
          
          <motion.h2
            className="text-3xl  font-bold w-3/4 text-[#111827]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            
          >
            Grocery store with different treasures
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We have prepared special discounts on your grocery products...
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button className="mt-2 bg-[#634C9F] text-white px-4 py-2 rounded hover:bg-[#5a448e] transition-colors">
              Shop Now
            </button>
          </motion.div>
        </div>
        
      </div>
    </motion.div>
  );
}