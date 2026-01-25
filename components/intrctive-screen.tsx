"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function InteractiveExpertise() {
  const [theme, setTheme] = useState("dark")
  const [accentColor, setAccentColor] = useState("#3b82f6")
  const [isMobile, setIsMobile] = useState(false)
  const [fontStyle, setFontStyle] = useState("modern")

  const colors = ["#3b82f6", "#10b981", "#f43f5e", "#8b5cf6"]
  
  const fonts = {
    modern: "font-sans tracking-tight",
    luxury: "font-serif italic tracking-wide",
    kitsch: "font-[cursive] tracking-widest uppercase"
  }

  return (
    <section className="py-24 px-4 bg-white rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Design <span className="text-slate-400 italic font-light">System</span>
            </h2>
            <p className="text-slate-500 font-light text-lg">
              Testez la robustesse de l'interface en changeant de format et de style en direct.
            </p>
          </div>
          
          {/* DASHBOARD DE CONTRÔLE RÉVISÉ */}
          <div className="flex flex-wrap gap-3 bg-slate-100 p-2 rounded-[2rem] border border-slate-200">
            {/* Couleurs */}
            <div className="flex gap-2 px-3 border-r border-slate-300">
              {colors.map(c => (
                <button 
                  key={c} 
                  onClick={() => setAccentColor(c)}
                  className="w-6 h-6 rounded-full transition-transform hover:scale-125"
                  style={{ backgroundColor: c, border: accentColor === c ? '2px solid white' : 'none', outline: accentColor === c ? `2px solid ${c}` : 'none' }}
                />
              ))}
            </div>

            {/* Switch Mobile */}
            <button 
              onClick={() => setIsMobile(!isMobile)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all shadow-sm ${isMobile ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}
            >
              {isMobile ? "📱 MOBILE" : "💻 DESKTOP"}
            </button>

            {/* Switch Police */}
            <select 
              onChange={(e) => setFontStyle(e.target.value)}
              className="bg-white border-none rounded-full px-4 py-1.5 text-[10px] font-bold shadow-sm outline-none cursor-pointer"
            >
              <option value="modern">MODERNE</option>
              <option value="luxury">LUXE</option>
              <option value="kitsch">KITSCH ✨</option>
            </select>

            {/* Switch Thème */}
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* ZONE D'APERÇU RÉACTIVE */}
        <div className="flex justify-center items-center py-10 bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100">
          <motion.div 
            layout
            animate={{ width: isMobile ? 375 : "100%", height: isMobile ? 650 : "auto" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`relative border border-slate-200 shadow-2xl overflow-hidden transition-all duration-700 ${theme === "dark" ? "bg-slate-950" : "bg-white"} ${isMobile ? "rounded-[3rem] border-8 border-slate-800" : "rounded-[2.5rem] w-full"}`}
          >
            {/* Fond animé */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] blur-[120px] opacity-20"
                style={{ backgroundColor: accentColor }}
              />
            </div>

            <div className={`relative z-10 p-8 md:p-16 ${isMobile ? "text-center" : ""}`}>
              {/* Header */}
              <nav className={`flex justify-between items-center mb-16 ${isMobile ? "flex-col gap-6" : ""}`}>
                <div className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  PROTO<span style={{ color: accentColor }}>TYPE</span>
                </div>
                {!isMobile && (
                  <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span>Produit</span><span>Services</span><span>Tarifs</span>
                  </div>
                )}
                <button className="px-6 py-2 rounded-full text-xs font-bold text-white shadow-lg shadow-black/20" style={{ backgroundColor: accentColor }}>
                  Démarrer
                </button>
              </nav>

              {/* Hero Section */}
              <div className={`grid ${isMobile ? "grid-cols-1" : "lg:grid-cols-2"} gap-12 items-center`}>
                <div>
                  <motion.h3 
                    layout
                    className={`leading-[1.1] mb-8 transition-all duration-500 ${fonts[fontStyle as keyof typeof fonts]} ${isMobile ? "text-4xl" : "text-6xl md:text-7xl"} ${theme === "dark" ? "text-white" : "text-slate-900"} ${fontStyle === "kitsch" ? "text-pink-500" : ""}`}
                  >
                    Expérience <br />
                    <span style={{ color: fontStyle === "kitsch" ? "#ec4899" : accentColor }}>Digitale</span>.
                  </motion.h3>
                  
                  <p className={`text-lg mb-10 max-w-md ${theme === "dark" ? "text-slate-400" : "text-slate-600"} ${isMobile ? "mx-auto" : ""}`}>
                    Un système interactif performant, optimisé pour l'engagement utilisateur.
                  </p>
                  
                  {/* Cartes */}
                  <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
                    {[1, 2].map((i) => (
                      <div 
                        key={i}
                        className={`p-6 rounded-3xl border transition-all duration-500 ${theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"}`}
                      >
                        <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div className={`font-bold mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Card 0{i}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Optimisé</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code (Caché en mobile pour la clarté) */}
                {!isMobile && (
                  <div className="bg-slate-900/90 rounded-3xl border border-white/10 p-6 font-mono text-xs shadow-2xl">
                    <div className="flex gap-1.5 mb-6"><div className="w-2.5 h-2.5 rounded-full bg-red-500/40"/><div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"/><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"/></div>
                    <div className="space-y-2">
                       <div className="text-blue-400">const <span className="text-purple-400">Project</span> = () =&gt; {'{'}</div>
                       <div className="pl-4 text-slate-500">return (</div>
                       <div className="pl-8 text-emerald-400">&lt;UI <span className="text-yellow-200">font=</span>{`"${fontStyle}"`} /&gt;</div>
                       <div className="pl-8 text-emerald-400">&lt;Layout <span className="text-yellow-200">isMobile=</span>{`{${isMobile}}`} /&gt;</div>
                       <div className="pl-4 text-slate-500">);</div>
                       <div className="text-blue-400">{'}'}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}