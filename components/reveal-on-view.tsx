"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { animate, inView } from "motion"

type RevealOnViewProps = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: React.ReactNode
  delay?: number
  style?: CSSProperties
  intensity?: "soft" | "hero"
  staggerChildren?: boolean
}

export default function RevealOnView({ as = "div", className, children, delay = 0, style, intensity = "soft", staggerChildren = false }: RevealOnViewProps) {
  const Tag = as as any
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const startTranslate = intensity === "hero" ? 28 : 18
    const startBlur = intensity === "hero" ? 16 : 10
    const startScale = intensity === "hero" ? 0.965 : 0.98

    if (staggerChildren) {
      element.style.opacity = "1"
      element.style.transform = "none"
      element.style.filter = "none"
    } else {
      element.style.opacity = "0"
      element.style.transform = `translateY(${startTranslate}px) scale(${startScale})`
      element.style.filter = `blur(${startBlur}px)`
    }

    const cleanup = inView(element, () => {
      const targets = staggerChildren ? (Array.from(element.children) as HTMLElement[]) : [element]

      if (staggerChildren) {
        targets.forEach((t) => {
          t.style.opacity = "0"
          t.style.transform = `translateY(${startTranslate}px) scale(${startScale})`
          t.style.filter = `blur(${startBlur}px)`
        })
      }

      targets.forEach((t, idx) => {
        animate(
          t,
          ({
            opacity: [0, 1],
            transform: [`translateY(${startTranslate}px) scale(${startScale})`, "translateY(0) scale(1)"],
            filter: [`blur(${startBlur}px)`, "blur(0px)"]
          } as unknown) as any,
          { duration: 0.95, delay: delay + idx * 0.12 }
        )
      })
    })

    return () => cleanup()
  }, [delay, intensity, staggerChildren])

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
