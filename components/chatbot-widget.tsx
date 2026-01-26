"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send, Sparkles, ShieldCheck, Lightbulb, Zap } from "lucide-react"

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
    <div className="fixed bottom-5 right-5 z-[90] font-sans antialiased text-slate-900">
      
      {/* Bouton Flottant (Compact & Blanc) */}
      {!isOpen && (
        <div className="relative animate-in fade-in scale-in duration-300">
          {showNudge && (
            <div className="absolute -top-[110px] right-0 w-[86vw] max-w-[300px] select-none">
              <div className="relative rounded-2xl px-4 py-3 bg-white border border-slate-200 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                <div className="text-[12px] font-semibold text-slate-900 mb-1">Besoin d'aide ?</div>
                <div className="text-[12px] text-slate-600 leading-snug">Utilisez notre assistance intelligente pour obtenir une réponse rapide.</div>
                <button
                  aria-label="Fermer"
                  onClick={() => { setShowNudge(false); try { localStorage.setItem("chatbot_seen_nudge", "1") } catch {} }}
                  className="absolute top-2 right-2 p-1 rounded-md hover:bg-slate-100"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <div className="absolute -bottom-2 right-6 w-3 h-3 rotate-45 bg-white border-b border-r border-slate-200" />
              </div>
            </div>
          )}
          <button
            onClick={handleOpen}
            className="flex items-center gap-2.5 rounded-2xl p-3 bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center transition-transform group-hover:rotate-12">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="pr-2 text-left">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">En ligne</div>
              <div className="text-sm font-bold text-slate-800">Chatter avec Cliste</div>
            </div>
          </button>
        </div>
      )}

      {/* Fenêtre de Chat (Plus petite : 380px x 600px) */}
      {isOpen && (
        <div 
          className={`
            w-[92vw] sm:w-[380px] h-[65vh] sm:h-[580px] rounded-[2rem] overflow-hidden 
            border border-slate-200 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] 
            flex flex-col origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
            ${isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-5"}
          `}
        >
          
          {/* Header (Plus compact) */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center shadow-inner">
                 <Zap className="w-4 h-4 text-blue-400 fill-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">Samy & Hani</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Support Cliste IA</span>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Chat Content */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-none bg-slate-50/30">
            
            {/* Guide Info */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="flex items-center gap-2 mb-1.5 text-blue-600">
                <Lightbulb className="w-3.5 h-3.5 font-bold" />
                <span className="text-[10px] font-black uppercase tracking-widest">Conseil Cliste</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Dites-moi quel type de site web vous imaginez, et je vous donnerai une estimation rapide !
              </p>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in duration-300`}>
                <div className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  m.role === "user" 
                    ? "bg-slate-900 text-white font-medium rounded-2xl rounded-tr-none" 
                    : "bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-tl-none"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-slate-300 animate-bounce" />
                  <span className="w-1 h-1 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area (Plus fine) */}
          <div className="px-5 py-4 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100/50 border border-slate-200 rounded-xl p-1 focus-within:bg-white focus-within:ring-2 ring-slate-100 transition-all duration-300">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                placeholder="Écrivez ici..."
                className="flex-1 bg-transparent text-sm py-2 px-3 outline-none placeholder:text-slate-400"
                disabled={isTyping || streaming}
              />
              <button
                onClick={sendMessage}
                className="p-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-20 transition-all active:scale-95"
                disabled={!input.trim() || isTyping || streaming}
              >
                <Send className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
            
            <div className="mt-3 text-center">
               <span className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">IA Assistant • Cliste v1.0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}