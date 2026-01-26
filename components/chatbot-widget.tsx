"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, Sparkles, ShieldCheck } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false) // État réel de présence
  const [isAnimating, setIsAnimating] = useState(false) // État pour gérer la transition
  const [input, setInput] = useState("")
  const [showNudge, setShowNudge] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! Je suis l’assistant de l’équipe Cliste. Je peux vous guider sur nos solutions web et notre portfolio. Comment puis-je vous aider ?",
    },
  ])
  
  const listRef = useRef<HTMLDivElement | null>(null)
  const [isTyping, setIsTyping] = useState(false) 
  const [streaming, setStreaming] = useState(false)

  // --- Gestion des Transitions ---
  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => setIsAnimating(true), 10) // Petit délai pour déclencher le CSS
    setShowNudge(false)
  }

  const handleClose = () => {
    setIsAnimating(false)
    // On attend la fin de l'animation (300ms) avant de démonter le composant
    setTimeout(() => setIsOpen(false), 300)
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, isOpen, isTyping])

  useEffect(() => {
    const seen = typeof window !== "undefined" && localStorage.getItem("chatbot_seen_nudge") === "1"
    if (!seen) {
      setShowNudge(true)
      const t = setTimeout(() => { setShowNudge(false); try { localStorage.setItem("chatbot_seen_nudge", "1") } catch {} }, 12000)
      return () => clearTimeout(t)
    }
  }, [])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const history = [...messages.filter(m => m.id !== "welcome"), userMsg].map(m => ({ role: m.role, content: m.content }))
      const respStream = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })
      if (!respStream.ok || !respStream.body) throw new Error("stream failed")
      const assistantId = crypto.randomUUID()
      const reader = respStream.body.getReader()
      const decoder = new TextDecoder()
      let firstChunkReceived = false

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        if (chunk) {
          if (!firstChunkReceived) {
            setIsTyping(false)
            setStreaming(true)
            setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: chunk }])
            firstChunkReceived = true
          } else {
            setMessages((prev) => prev.map(m => m.id === assistantId ? { ...m, content: m.content + chunk } : m))
          }
        }
      }
    } catch (e) {
      console.error(e)
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: "Désolé, un souci technique est survenu." }])
    } finally {
      setIsTyping(false)
      setStreaming(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[90] font-sans antialiased">
      {/* Bouton Flottant (Visible si fermé) */}
      {!isOpen && (
        <div className="relative animate-in fade-in duration-500">
           {showNudge && (
            <div className="absolute -top-[100px] right-0 w-[280px] animate-in slide-in-from-bottom-2 duration-500">
              <div className="relative rounded-2xl p-4 bg-white text-black shadow-2xl border border-black/5">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                  <div className="text-sm">
                    <div className="font-bold text-gray-900">Une question ?</div>
                    <div className="text-gray-500 leading-tight italic">On vous répond en direct.</div>
                  </div>
                </div>
                <div className="absolute -bottom-2 right-8 w-4 h-4 rotate-45 bg-white border-b border-r border-black/5" />
              </div>
            </div>
          )}
          <button
            onClick={handleOpen}
            className="group flex items-center gap-3 rounded-full pl-4 pr-6 py-4 bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
            </div>
            <span className="hidden sm:inline font-bold tracking-tight">Besoin d'aide ?</span>
          </button>
        </div>
      )}

      {/* Fenêtre de Chat */}
      {isOpen && (
        <div 
          className={`
            w-[94vw] sm:w-[440px] h-[70vh] sm:h-[640px] rounded-[2.5rem] overflow-hidden 
            border border-white/20 bg-black/85 backdrop-blur-3xl text-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] 
            flex flex-col origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"}
          `}
        >
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-20" />
                <div className="relative h-full w-full rounded-full bg-gradient-to-tr from-gray-800 to-black border border-white/20 flex items-center justify-center">
                   <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-tight text-white/90">Hani & Samy</span>
                  <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full border border-white/10 font-bold uppercase tracking-widest">Expert</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  <span className="text-[11px] text-white/40 font-medium italic">En ligne pour vous</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose} 
              className="p-2.5 rounded-full hover:bg-white/10 transition-colors group"
            >
              <X className="w-5 h-5 text-white/40 group-hover:text-white" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-none">
            <div className="flex justify-center my-4">
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-blue-500/50" />
                  Sécurisé par Cliste Intelligence
               </div>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-1 duration-500`}>
                <div className={`relative max-w-[85%] rounded-[1.4rem] px-5 py-3.5 text-sm leading-relaxed shadow-lg ${
                  m.role === "user" 
                    ? "bg-white text-black font-semibold rounded-br-none" 
                    : "bg-white/10 border border-white/10 text-white/90 rounded-bl-none backdrop-blur-md"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white/5 border border-white/10 rounded-full px-5 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gradient-to-t from-black to-transparent">
            <div className="relative flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-[1.8rem] p-1.5 focus-within:border-white/40 focus-within:bg-white/5 transition-all duration-500 shadow-inner">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                placeholder="Décrivez votre besoin..."
                className="flex-1 bg-transparent text-sm py-3 px-5 outline-none placeholder:text-white/20 disabled:opacity-50"
                disabled={isTyping || streaming}
              />
              <button
                onClick={sendMessage}
                className="p-3.5 rounded-full bg-white text-black hover:bg-blue-50 disabled:opacity-10 disabled:grayscale transition-all active:scale-90 flex items-center justify-center shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                disabled={!input.trim() || isTyping || streaming}
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/15 font-black">
               <div className="h-[1px] flex-1 bg-white/5" />
               <span className="shrink-0">Assistant Officiel Cliste</span>
               <div className="h-[1px] flex-1 bg-white/5" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}