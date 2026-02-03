"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false) // Présence dans le DOM
  const [isAnimating, setIsAnimating] = useState(false) // Déclencheur CSS
  const [input, setInput] = useState("")
  const [showNudge, setShowNudge] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bienvenue chez Ixo Link. Je suis là pour vous guider : solutions web, portfolio ou démarrage de projet. Posez votre question, je vous répondrai instantanément.",
    },
  ])
  const listRef = useRef<HTMLDivElement | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [streaming, setStreaming] = useState(false)

  // Gestion fluide de l'ouverture
  const handleOpen = () => {
    setIsOpen(true)
    // Petit délai pour laisser le temps au DOM de monter le composant avant l'animation
    setTimeout(() => setIsAnimating(true), 10)
    setShowNudge(false)
  }

  // Gestion fluide de la fermeture
  const handleClose = () => {
    setIsAnimating(false) // On lance l'animation de sortie
    // On attend la fin de la transition (300ms) avant de retirer du DOM
    setTimeout(() => setIsOpen(false), 300)
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, isOpen, isTyping])

  useEffect(() => {
    const seen = typeof window !== "undefined" && localStorage.getItem("chatbot_seen_nudge") === "1"
    if (!seen) {
      setShowNudge(true)
      const t = setTimeout(() => {
        setShowNudge(false)
        try { localStorage.setItem("chatbot_seen_nudge", "1") } catch {}
      }, 12000)
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
      setStreaming(false)
    } catch (e) {
      console.error(e)
      setIsTyping(false)
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Désolé, un incident technique empêche l'envoi de la réponse. Merci de réessayer ou de nous contacter via /contact.",
      }])
    } finally {
      setIsTyping(false)
      setStreaming(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[90] font-sans antialiased">
      {/* Bouton Bulle flottante */}
      {!isOpen && (
        <div className="relative animate-in fade-in duration-500">
          {showNudge && (
            <div className="absolute -top-[120px] right-0 w-[86vw] max-w-[320px] select-none animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative rounded-2xl px-4 py-3 bg-white text-black shadow-2xl border border-black/10">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-black/90 flex items-center justify-center text-white">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="text-sm leading-snug">
                    <div className="font-semibold text-gray-900">Besoin d'aide ?</div>
                    <div className="text-gray-600">Si vous avez besoin d’aide, vous pouvez interroger notre chatbot.</div>
                  </div>
                  <button
                    onClick={() => { setShowNudge(false); try { localStorage.setItem("chatbot_seen_nudge", "1") } catch {} }}
                    className="ml-1 p-1 rounded hover:bg-black/5 transition-colors"
                  >
                    <X className="w-4 h-4 text-black/40" />
                  </button>
                </div>
                <div className="absolute -bottom-2 right-6 w-3 h-3 rotate-45 bg-white border-b border-r border-black/10" />
              </div>
            </div>
          )}
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 rounded-full px-5 py-3 bg-white text-black shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold">Chat</span>
          </button>
        </div>
      )}

      {/* Fenêtre de Chat avec Transition Fluide */}
      {isOpen && (
        <div 
          className={`
            w-[92vw] sm:w-[400px] h-[60vh] sm:h-[550px] rounded-3xl overflow-hidden 
            border border-white/15 bg-black/80 backdrop-blur-2xl text-white shadow-2xl 
            flex flex-col origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10"}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-40" />
              </div>
              <span className="text-sm font-bold tracking-tight">IXO ASSISTANT</span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-white text-black font-medium"
                    : "bg-white/10 border border-white/10 text-white/90"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-1.5 shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white/5 border-t border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-2xl px-3.5 py-1.5 focus-within:border-white/40 transition-all duration-200">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Posez votre question..."
                className="flex-1 bg-transparent text-sm py-2 outline-none placeholder:text-white/30 disabled:opacity-50"
                disabled={isTyping || streaming}
              />
              <button
                onClick={sendMessage}
                className="p-2 rounded-xl bg-white text-black hover:bg-gray-200 disabled:opacity-20 disabled:grayscale transition-all active:scale-90"
                disabled={!input.trim() || isTyping || streaming}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {/* Footer */}
            <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.1em] text-white/30 font-bold">
              <span>AGENT VIRTUEL</span>
              <span className="flex gap-1.5">
                <span className="text-white/50">IXO LINK</span>
                <span className="text-white/20">•</span>
                <span className="text-white/50">V1.0</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}