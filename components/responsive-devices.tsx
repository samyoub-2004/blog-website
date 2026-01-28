import React from "react"

export function ResponsiveDevices() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
      <div className="container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Des sites magnifiques, sur tous les écrans</h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">Desktop, tablette ou mobile — une expérience soignée et performante.</p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="relative rounded-[24px] border border-white/10 bg-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="h-7 bg-white/10 border-b border-white/10 flex items-center gap-1 px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="aspect-[16/10]">
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 scale-[1.06] blur-[18px] opacity-60"
                  style={{
                    backgroundImage: "url(/images/1\u0020(4).webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url(/images/1\u0020(4).webp)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-label="Desktop preview"
                  role="img"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-3 sm:-left-8 w-28 sm:w-36 rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="h-4 bg-white/10 border-b border-white/10"></div>
            <div className="aspect-[3/5]">
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 scale-[1.06] blur-[18px] opacity-60"
                  style={{
                    backgroundImage: "url(/images/1\u0020(2).webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url(/images/1\u0020(2).webp)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-label="Mobile preview"
                  role="img"
                />
              </div>
            </div>
          </div>

          <div className="absolute -right-6 -bottom-10 w-44 sm:w-56 rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_25px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="h-5 bg-white/10 border-b border-white/10" />
            <div className="aspect-[4/5]">
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 scale-[1.06] blur-[18px] opacity-60"
                  style={{
                    backgroundImage: "url(/images/1\u0020(6).webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url(/images/1\u0020(6).webp)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-label="Tablet preview"
                  role="img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
