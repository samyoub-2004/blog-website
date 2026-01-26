"use client"

import { useEffect, useMemo, useRef } from "react"
import { animate } from "motion"
import { cn } from "@/lib/utils"

type AnimatedHeadingProps = {
  className?: string
  lines: string[]
  startDelay?: number
  durationPerWord?: number
  staggerPerWord?: number
  lineDelay?: number
  fromBlurPx?: number
  fromTranslateYPx?: number
}

export default function AnimatedHeading({
  className,
  lines,
  startDelay = 0,
  durationPerWord = 0.9,
  staggerPerWord = 0.08,
  lineDelay = 0.3,
  fromBlurPx = 16,
  fromTranslateYPx = 14,
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  const tokensPerLine = useMemo(() => {
    return lines.map((line) => line.split(/(\s+)/))
  }, [lines])

  useEffect(() => {
    if (!headingRef.current) return
    const wordSpans = headingRef.current.querySelectorAll<HTMLSpanElement>("[data-word]")

    // Initialize state
    wordSpans.forEach((el) => {
      el.style.opacity = "0"
      el.style.filter = `blur(${fromBlurPx}px)`
      el.style.transform = `translateY(${fromTranslateYPx}px)`
    })

    // Group by line index
    const wordsByLine = new Map<number, HTMLSpanElement[]>()
    wordSpans.forEach((el) => {
      const lineIndexAttr = el.getAttribute("data-line-index")
      const lineIndex = lineIndexAttr ? Number(lineIndexAttr) : 0
      const arr = wordsByLine.get(lineIndex) ?? []
      arr.push(el)
      wordsByLine.set(lineIndex, arr)
    })

    // Animate words one-by-one to avoid type issues with stagger options
    ;[...wordsByLine.entries()]
      .sort((a, b) => a[0] - b[0])
      .forEach(([lineIndex, words]) => {
        const baseDelay = startDelay + lineIndex * lineDelay
        words.forEach((el, idx) => {
          animate(
            el,
            ({
              opacity: [0, 1],
              filter: [`blur(${fromBlurPx}px)`, "blur(0px)"],
              transform: [`translateY(${fromTranslateYPx}px)`, "translateY(0)"]
            } as unknown) as any,
            { duration: durationPerWord, delay: baseDelay + idx * staggerPerWord }
          )
        })
      })
  }, [startDelay, durationPerWord, staggerPerWord, lineDelay, fromBlurPx, fromTranslateYPx])

  return (
    <h1 ref={headingRef} className={cn(className)} aria-label={lines.join(" ")}> 
      <span aria-hidden>
        {tokensPerLine.map((tokens, lineIdx) => (
          <span key={`line-${lineIdx}`} className="block">
            {tokens.map((token, idx) => {
              const isSpace = /^\s+$/.test(token)
              if (isSpace) {
                return <span key={`s-${lineIdx}-${idx}`}>{"\u00A0"}</span>
              }
              return (
                <span
                  key={`w-${lineIdx}-${idx}`}
                  data-word
                  data-line-index={lineIdx}
                  className="inline-block will-change-transform"
                >
                  {token}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </h1>
  )
}
