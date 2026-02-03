"use client"

import Image from 'next/image';
import { motion } from "framer-motion"

export function ResponsiveDevices() {
  return (
    <section className="relative py-24 overflow-hidden bg-black">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            Des sites magnifiques, sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">tous les écrans</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
          >
            Desktop, tablette ou mobile — une expérience soignée et performante.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          
          {/* --- DESKTOP DEVICE --- */}
          <div className="relative rounded-[24px] border border-white/10 bg-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="h-7 bg-white/10 border-b border-white/10 flex items-center gap-1 px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="aspect-[16/10] relative">
              {/* Image Floue (Effet Glow) */}
              <Image 
                src="/leparkingvtcLaptop.png" 
                alt="" 
                fill 
                className="object-cover scale-[1.06] blur-[18px] opacity-60"
              />
              {/* Image Principale */}
              <Image 
                src="/leparkingvtcLaptop.png" 
                alt="Aperçu Desktop" 
                fill 
                className="object-cover object-left"
                priority
              />
            </div>
          </div>

          {/* --- MOBILE DEVICE --- */}
          <div className="absolute -bottom-6 -left-3 sm:-left-8 w-28 sm:w-36 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-20">
            <div className="h-4 bg-white/10 border-b border-white/10"></div>
            <div className="aspect-[9/19] relative">
              <Image 
                src="/leparkingvtcPhone.png" 
                alt="" 
                fill 
                className="object-cover scale-[1.06] blur-[18px] opacity-60"
              />
              <Image 
                src="/leparkingvtcPhone.png" 
                alt="Aperçu Mobile" 
                fill 
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* --- TABLET DEVICE --- */}
          <div className="absolute -right-6 -bottom-10 w-44 sm:w-56 rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10">
            <div className="h-5 bg-white/10 border-b border-white/10" />
            <div className="aspect-[1.75/3] relative">
              <Image 
                src="/leparkingvtcTablette.png" 
                alt="" 
                fill 
                className="object-cover scale-[1.06] blur-[18px] opacity-60"
              />
              <Image 
                src="/leparkingvtcTablette.png" 
                alt="Aperçu Tablette" 
                fill 
                className="object-cover object-top"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}