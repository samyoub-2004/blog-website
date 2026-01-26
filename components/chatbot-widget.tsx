"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, Sparkles, Lightbulb, Zap } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [input, setInput] = useState("")
  const [showNudge, setShowNudge] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis l’assistant Cliste. Comment puis-je vous aider aujourd'hui ?",
    },
  ])
  
  const listRef = useRef<HTMLDivElement | null>(null)
  const [isTyping, setIsTyping] = useState(false) 
  const [streaming, setStreaming] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => setIsAnimating(true), 10)
    setShowNudge(false)
  }

  const handleClose = () => {
    setIsAnimating(false)
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
      const t = setTimeout(() => { setShowNudge(false); try { localStorage.setItem("chatbot_seen_nudge", "1") } catch {} }, 10000)
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
    <div className="fixed bottom-5 right-5 z-[90] font-sans antialiased">
      
      {/* Bouton Flottant (Blanc & Compact - inchangé) */}
      {!isOpen && (
        <div className="relative animate-in fade-in scale-in duration-300">
          {showNudge && (
            <div className="absolute -top-[110px] right-0 w-[280px] select-none">
              <div className="relative rounded-2xl px-4 py-3 bg-white border border-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                <div className="text-[12px] font-bold text-slate-900 mb-0.5">Besoin d'aide ?</div>
                <div className="text-[11px] text-slate-500 leading-tight">Posez votre question à notre IA pour une réponse instantanée.</div>
                <button
                  onClick={() => { setShowNudge(false); try { localStorage.setItem("chatbot_seen_nudge", "1") } catch {} }}
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-slate-50"
                >
                  <X className="w-3 h-3 text-slate-400" />
                </button>
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-white border-b border-r border-slate-100" />
              </div>
            </div>
          )}
          <button
            onClick={handleOpen}
            className="flex items-center gap-2.5 rounded-full px-4 py-2.5 bg-white border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-slate-900" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
            </div>
            <span className="text-sm font-bold text-slate-900 pr-1">Chat</span>
          </button>
        </div>
      )}

      {/* Fenêtre de Chat (Fluid Deep Dark) */}
      {isOpen && (
        <div 
          className={`
            w-[92vw] sm:w-[380px] h-[65vh] sm:h-[580px] rounded-[2rem] overflow-hidden 
            border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]
            bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950 to-black
            text-white flex flex-col origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
            ${isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-5"}
          `}
        >
          
          {/* Header (Glass Effect) */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-10">
            <div className="flex items-center gap-3">
              {/* Icone avec un dégradé subtil style "onyx" */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-700 to-black flex items-center justify-center shadow-lg border border-white/5">
                 <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white/90 tracking-tight">Cliste Assistant</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
                </div>
                <span className="text-[10px] text-zinc-400 font-medium tracking-wide">Intelligence Artificielle</span>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 rounded-xl hover:bg-white/5 transition-colors group">
              <X className="w-4 h-4 text-zinc-400 group-hover:text-white" />
            </button>
          </div>

          {/* Chat Content */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scrollbar-none">
            
            {/* Guide Info Sombre & Fluide */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-700 shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-zinc-300" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Conseil</span>
              </div>
              <p className="text-[12px] leading-relaxed text-zinc-400/90 font-medium">
                Décrivez votre projet web ou posez une question sur nos services. Je suis là pour vous accompagner.
              </p>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in duration-300`}>
                <div className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                  m.role === "user" 
                    ? "bg-white text-black font-bold rounded-2xl rounded-tr-none" 
                    : "bg-zinc-800/40 text-zinc-200 border border-white/5 rounded-2xl rounded-tl-none backdrop-blur-sm"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800/40 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 backdrop-blur-sm">
                  <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce" />
                  <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area (Console Dark) */}
          <div className="px-5 py-5 bg-black/40 border-t border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/10 rounded-2xl p-1 focus-within:border-white/20 focus-within:bg-zinc-900 transition-all duration-300">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-transparent text-sm py-2.5 px-3 outline-none placeholder:text-zinc-500 text-white"
                disabled={isTyping || streaming}
              />
              <button
                onClick={sendMessage}
                className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-20 transition-all active:scale-95 flex items-center justify-center shadow-lg"
                disabled={!input.trim() || isTyping || streaming}
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2 opacity-30 hover:opacity-50 transition-opacity">
               <span className="text-[9px] text-white font-bold uppercase tracking-[0.3em]">Cliste Intelligence</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}