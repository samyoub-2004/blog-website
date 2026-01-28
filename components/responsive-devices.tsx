import Image from 'next/image';

export function ResponsiveDevices() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
      
      <div className="container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Des sites magnifiques, sur tous les écrans
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">
            Desktop, tablette ou mobile — une expérience soignée et performante.
          </p>
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
                src="/images/desktop.webp" 
                alt="" 
                fill 
                className="object-cover scale-[1.06] blur-[18px] opacity-60"
              />
              {/* Image Principale */}
              <Image 
                src="/leparkingvtcLaptop.png" 
                alt="Aperçu Desktop" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* --- MOBILE DEVICE --- */}
          <div className="absolute -bottom-6 -left-3 sm:-left-8 w-28 sm:w-36 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-20">
            <div className="h-4 bg-white/10 border-b border-white/10"></div>
            <div className="aspect-[3/5] relative">
              <Image 
                src="/images/mobile.webp" 
                alt="" 
                fill 
                className="object-cover scale-[1.06] blur-[18px] opacity-60"
              />
              <Image 
                src="/leparkingvtcPhone.png" 
                alt="Aperçu Mobile" 
                fill 
                className="object-contain"
              />
            </div>
          </div>

          {/* --- TABLET DEVICE --- */}
          <div className="absolute -right-6 -bottom-10 w-44 sm:w-56 rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden z-10">
            <div className="h-5 bg-white/10 border-b border-white/10" />
            <div className="aspect-[4/5] relative">
              <Image 
                src="/images/tablet.webp" 
                alt="" 
                fill 
                className="object-cover scale-[1.06] blur-[18px] opacity-60"
              />
              <Image 
                src="/leparkingvtcTablette.png" 
                alt="Aperçu Tablette" 
                fill 
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}