"use client"

interface BackgroundProps {
  variant?: "default" | "blue" | "purple"
  opacity?: number
}

export function Background({ variant = "default", opacity = 1 }: BackgroundProps) {
  const getColors = () => {
    switch (variant) {
      case "blue":
        return {
          orb1: "from-blue-500/20 via-blue-400/15 to-transparent",
          orb2: "from-blue-600/20 via-blue-500/15 to-transparent", 
          orb3: "from-blue-400/15 to-transparent",
          orb4: "from-blue-500/15 to-transparent"
        }
      case "purple":
        return {
          orb1: "from-purple-500/20 via-purple-400/15 to-transparent",
          orb2: "from-purple-600/20 via-purple-500/15 to-transparent",
          orb3: "from-purple-400/15 to-transparent", 
          orb4: "from-purple-500/15 to-transparent"
        }
      default:
        return {
          orb1: "from-blue-500/20 via-purple-500/20 to-transparent",
          orb2: "from-purple-600/20 via-blue-400/20 to-transparent",
          orb3: "from-cyan-400/15 to-transparent",
          orb4: "from-indigo-500/15 to-transparent"
        }
    }
  }

  const colors = getColors()

  return (
    <div 
      aria-hidden 
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity }}
    >
      <div className={`absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br ${colors.orb1} blur-3xl`} />
      <div className={`absolute bottom-[-15%] right-[-5%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tl ${colors.orb2} blur-3xl`} />
      <div className={`absolute top-[15%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-bl ${colors.orb3} blur-3xl`} />
      <div className={`absolute bottom-[20%] left-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-tr ${colors.orb4} blur-2xl`} />
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "100px 100px"
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
    </div>
  )
}