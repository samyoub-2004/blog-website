import React from "react"

const IMAGES = [
  "/images/1 (1).webp",
  "/images/1 (2).webp",
  "/images/1 (3).webp",
  "/images/1 (4).webp",
  "/images/1 (5).webp",
  "/images/1 (6).webp",
]

const TILES = [
  "col-span-2 sm:col-span-3 lg:col-span-6 aspect-[16/10]",
  "col-span-1 sm:col-span-3 lg:col-span-4 aspect-[10/16]",
  "col-span-1 sm:col-span-2 lg:col-span-3 aspect-square",
  "col-span-1 sm:col-span-2 lg:col-span-3 aspect-[4/5]",
  "col-span-2 sm:col-span-3 lg:col-span-7 aspect-[21/9]",
  "col-span-1 sm:col-span-3 lg:col-span-3 aspect-[16/9]",
]

export function VisualMosaic() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.06),_transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Des interfaces qui parlent d’elles‑mêmes</h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">Un aperçu visuel de créations modernes, responsives et immersives.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-[3px] sm:gap-[4px] lg:gap-1.5">
          {TILES.map((tileClass, i) => {
            const src = IMAGES[i % IMAGES.length]
            return (
              <div
                key={i}
                className={[
                  "group relative overflow-hidden rounded-[10px] bg-white/5",
                  "shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
                  "transition-transform duration-500 ease-out will-change-transform",
                  tileClass,
                ].join(" ")}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:rotate-[0.2deg]">
                  <div
                    className="absolute inset-0 scale-[1.06] blur-[18px] opacity-60"
                    style={{
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${src})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    aria-hidden
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
