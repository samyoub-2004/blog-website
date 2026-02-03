"use client"
import { useEffect, useRef, useState } from "react"

// --- 1. TES NOUVEAUX COMPOSANTS (CEUX QU'ON A CRÉÉ ENSEMBLE) ---

const TypoBox = () => {
  const [styleIndex, setStyleIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const styles = [
    { name: "Design System Specialist", class: "font-sans font-black tracking-tighter uppercase text-3xl sm:text-4xl" },
    { name: "Crafting Digital Experiences", class: "font-serif italic text-4xl sm:text-5xl" },
    { name: "Building Scalable Systems", class: "font-mono tracking-tight text-2xl sm:text-3xl" },
    { name: "Pixels with Purpose", class: "font-black text-5xl sm:text-6xl" }
  ]

  const nextStyle = () => {
    if (isChanging) return
    setIsChanging(true)
    
    // On attend un court instant pour changer le texte pendant qu'il est invisible
    setTimeout(() => {
      setStyleIndex((prev) => (prev + 1) % styles.length)
      setIsChanging(false)
    }, 200) 
  }

  return (
    <div 
      onClick={nextStyle}
      className="flex items-center justify-center h-full min-h-[160px] bg-slate-50/50 rounded-2xl border border-slate-100 px-6 overflow-hidden cursor-pointer active:scale-[0.98] transition-all group relative"
    >
      {/* Petit indicateur de changement au survol */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          {styles.map((_, i) => (
            <div key={i} className={`h-1 w-3 rounded-full ${i === styleIndex ? "bg-blue-500" : "bg-slate-200"}`} />
          ))}
        </div>
      </div>

      <div className={`text-center transition-all duration-300 ease-in-out ${
        isChanging 
          ? "opacity-0 -translate-y-4" // Le texte monte et disparaît
          : "opacity-100 translate-y-0" // Le texte revient à sa place
      }`}>
        <span className={`${styles[styleIndex].class} text-slate-900 leading-tight block select-none`}>
          {styles[styleIndex].name}
        </span>
      </div>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
        Cliquer pour changer le style
      </p>
    </div>
  )
}
const ColorBox = () => {
  const [index, setIndex] = useState(0);
  const palette = [
    { hex: "#6366f1", name: "Indigo" },
    { hex: "#10b981", name: "Emerald" },
    { hex: "#f43f5e", name: "Rose" },
    { hex: "#3b82f6", name: "Blue" },
    { hex: "#f59e0b", name: "Amber" }
  ];

  // On change manuellement ici
  const handleNextColor = () => {
    setIndex((prev) => (prev + 1) % palette.length);
  };

  const currentColor = palette[index].hex;

  return (
    <div 
      onClick={handleNextColor} // Déclencheur au clic
      className="flex flex-col h-full min-h-[200px] justify-center items-center rounded-3xl cursor-pointer transition-all duration-1000 p-8 border border-slate-100 relative overflow-hidden active:scale-95"
      style={{ backgroundColor: `${currentColor}10` }}
    >
      <div className="z-10 text-center space-y-6 w-full pointer-events-none">
        <h4 className="text-4xl sm:text-5xl font-black font-mono tracking-tighter" style={{ color: currentColor }}>
          {currentColor.toUpperCase()}
        </h4>
        <div className="flex justify-center gap-3">
          {palette.map((color, i) => (
            <div key={color.hex} className={`h-3 rounded-full transition-all duration-500 ${i === index ? "w-12" : "w-3"}`} style={{ backgroundColor: color.hex }} />
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Cliquer pour changer de thème</p>
      </div>
    </div>
  );
};
const ButtonBox = () => {
  const [status, setStatus] = useState("idle") // idle, loading, success

  // Cette fonction gère toute la séquence après le clic
  const handleClick = async () => {
    if (status !== "idle") return // Empêche de recliquer pendant l'animation

    setStatus("loading")
    
    // On attend 1.5s (simulation de chargement)
    await new Promise(r => setTimeout(r, 1500))
    setStatus("success")
    
    // On attend 2s puis on revient à l'état initial
    await new Promise(r => setTimeout(r, 2000))
    setStatus("idle")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] bg-slate-50/50 rounded-3xl border border-slate-100 p-8">
      <button 
        onClick={handleClick} // Déclencheur au clic
        className={`
          relative w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest cursor-pointer transition-all duration-500 active:scale-95
          ${status === "idle" ? "bg-slate-900 text-white hover:bg-slate-700 hover:-translate-y-1" : ""}
          ${status === "loading" ? "bg-blue-600 text-white scale-95 opacity-80 cursor-wait" : ""}
          ${status === "success" ? "bg-emerald-500 text-white scale-100 shadow-lg shadow-emerald-100" : ""}
        `}
      >
        {status === "idle" && "Confirm Order"}
        {status === "loading" && (
          <span className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        )}
        {status === "success" && "✓ Done"}
      </button>

      {/* Indicateurs visuels en bas */}
      <div className="mt-8 flex gap-4 overflow-hidden pointer-events-none">
         <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${status === "idle" ? "bg-slate-900 scale-150" : "bg-slate-200"}`} />
         <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${status === "loading" ? "bg-blue-600 scale-150" : "bg-slate-200"}`} />
         <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${status === "success" ? "bg-emerald-500 scale-150" : "bg-slate-200"}`} />
      </div>

      <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        Cliquer pour tester
      </p>
    </div>
  )
}
const ResponsiveBox = () => {
  const [device, setDevice] = useState("mobile");
  const devices = ["mobile", "tablet", "desktop"];
  
  const toggleDevice = () => {
    setDevice(prev => devices[(devices.indexOf(prev) + 1) % devices.length]);
  };

  return (
    <div 
      onClick={toggleDevice}
      // On remet bien bg-slate-900 ici pour que la grille blanche se voie
      className="flex flex-col items-center justify-center h-full min-h-[220px] bg-slate-900 rounded-[2rem] p-6 overflow-hidden relative cursor-pointer active:scale-95 transition-all group"
    >
      {/* Grille de fond : On baisse l'opacité à 0.05 pour que ce soit subtil */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Le Viewport Dynamique */}
        <div 
          className="bg-white rounded-xl shadow-2xl border-[4px] border-slate-800 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden"
          style={{ 
            width: device === "mobile" ? "80px" : device === "tablet" ? "160px" : "240px",
            height: "120px" 
          }}
        >
          {/* Header du site simulé */}
          <div className="h-3 bg-slate-100 w-full mb-2 flex items-center px-1 gap-1">
            <div className="w-1 h-1 rounded-full bg-red-400" />
            <div className="w-1 h-1 rounded-full bg-amber-400" />
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>

          <div className="p-2 space-y-2">
            <div className="h-2 bg-slate-200 rounded-full w-full" />
            <div className="h-2 bg-slate-200 rounded-full w-2/3" />
            
            <div className={`grid gap-1 transition-all duration-500 ${device === "mobile" ? "grid-cols-1" : "grid-cols-3"}`}>
              <div className="h-8 bg-blue-500/20 rounded-md border border-blue-500/30" />
              <div className={`h-8 bg-blue-500/20 rounded-md border border-blue-500/30 ${device === "mobile" ? "hidden" : "block"}`} />
              <div className={`h-8 bg-blue-500/20 rounded-md border border-blue-500/30 ${device === "mobile" ? "hidden" : "block"}`} />
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-6 font-mono text-[9px] flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 animate-pulse">●</span>
            <span className="text-slate-400 uppercase tracking-widest">Viewport:</span>
            <span className="text-white w-12">{device === 'mobile' ? '375px' : device === 'tablet' ? '768px' : '1440px'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
const ThemeBox = () => {
  const [isDark, setIsDark] = useState(true)

  // On change l'état manuellement ici
  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <div 
      onClick={toggleTheme} // Déclencheur au clic
      className={`flex flex-col items-center justify-center h-full min-h-[220px] transition-all duration-700 rounded-[2rem] p-8 overflow-hidden relative cursor-pointer active:scale-95 ${
        isDark ? "bg-slate-950" : "bg-slate-100"
      }`}
    >
      
      {/* Petit indicateur d'état en haut */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className={`text-[9px] font-mono font-bold tracking-[0.2em] transition-colors duration-700 ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}>
          THEME: {isDark ? "DARK_MODE" : "LIGHT_MODE"}
        </span>
      </div>

      <div className="relative z-10 w-full space-y-4 pointer-events-none">
        {/* L'icône animée */}
        <div className="flex justify-center">
          <div className={`p-4 rounded-2xl transition-all duration-700 ${
            isDark ? "bg-slate-900 text-yellow-400 rotate-0" : "bg-white text-blue-600 rotate-180 shadow-xl shadow-slate-200"
          }`}>
            {isDark ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </div>
        </div>

        {/* Skeleton UI qui change de couleur */}
        <div className="space-y-2 max-w-[140px] mx-auto">
          <div className={`h-2 rounded-full transition-colors duration-700 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
          <div className={`h-2 rounded-full w-2/3 mx-auto transition-colors duration-700 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
        </div>
      </div>

      {/* --- TA LUMIÈRE RÉALISTE CONSERVÉE --- */}
      <div className={`absolute inset-0 transition-opacity duration-1000 bg-blue-500/10 blur-3xl rounded-full pointer-events-none ${
        isDark ? "opacity-40" : "opacity-0"
      }`} />
    </div>
  )
}
// --- 2. TA NOUVELLE LISTE DE FEATURES ---

const features = [
  {
    title: "Typography",
    description: "Maîtrise des polices Google Fonts et des échelles visuelles pour une lecture parfaite.",
    demo: TypoBox,
    size: "large",
  },
  {
    title: "Theming System",
    description: "Des palettes de couleurs cohérentes qui s'adaptent à votre identité de marque.",
    demo: ColorBox,
    size: "medium",
  },
  { 
    title: "Theme Switching", 
    description: "Bascule intelligente entre mode clair et sombre avec transitions fluides.", 
    demo: ThemeBox, 
    size: "medium" 
  },
  {
    title: "UI Components",
    description: "Boutons, inputs et éléments d'interface fluides codés sur-mesure.",
    demo: ButtonBox,
    size: "medium",
  },
  {
    title: "Adaptive Design",
    description: "Interfaces fluides optimisées pour chaque taille d'écran.",
    demo: ResponsiveBox, // On ajoute le nouveau bloc ici
    size: "medium",
  },
]

// --- 3. TA SECTION (STYLE CONSERVÉ) ---

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeDemo, setActiveDemo] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-t-[3rem] rounded-b-[3rem] pt-16 pb-16 px-4 relative overflow-hidden">
        {/* Ton fond avec les points (conservé) */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`, backgroundSize: "24px 24px" }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6">
              Maîtrise <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">Technique</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Plus qu'un design, je construis des systèmes robustes, performants et entièrement personnalisés.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ${feature.size === "large" ? "md:col-span-2" : ""}`}
                onMouseEnter={() => setActiveDemo(index)}
                onMouseLeave={() => setActiveDemo(null)}
              >
                <div className="bg-white rounded-3xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                  <div className="mb-6">
                    <feature.demo/>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}