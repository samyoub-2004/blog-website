import React from "react"

const LOGOS = [
  "/placeholder-logo.svg",
  "/placeholder-logo.png",
  "/images/cliste-logo.png",
  "/icon.svg",
  "/icon-dark-32x32.png",
  "/icon-light-32x32.png",
]

export function LogosMarquee() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS]
  return (
    <section className="relative py-10 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl overflow-hidden">
          <div className="relative">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            <div className="flex items-center gap-10 opacity-70
dark:opacity-80" style={{ width: "200%", animation: "marquee 30s linear infinite" }}>
              {row.map((src, i) => (
                <div key={i} className="shrink-0 h-8 sm:h-10 opacity-80 hover:opacity-100 transition-opacity">
                  <img src={src} alt="logo" className="h-full w-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
