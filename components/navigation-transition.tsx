"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"

export function NavigationTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetPath, setTargetPath] = useState<string | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const previousPathname = useRef(pathname)

  const startTransitionTo = (to: string) => {
    if (to === pathname) return
    if (isTransitioning) return

    setTargetPath(to)

    // Toujours navigation instantanée
    router.push(to)
    return
  }

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(Boolean(mql.matches))
    update()
    mql.addEventListener?.("change", update)
    return () => mql.removeEventListener?.("change", update)
  }, [])

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a") as HTMLAnchorElement | null

      if (!link || !link.href) return

      // Respect default browser behaviors
      if (e.button !== 0) return // only left click
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (link.target && link.target !== "_self") return
      if (link.hasAttribute("download")) return

      const isInternal = link.href.startsWith(window.location.origin)
      if (!isInternal) return

      const url = new URL(link.href)

      if (url.hash) return
      if (url.pathname === pathname) return
      if (isTransitioning) return

      e.preventDefault()
      startTransitionTo(url.pathname)
    }

    // Use capture to run BEFORE Next.js <Link> onClick, which calls preventDefault.
    document.addEventListener("click", handleLinkClick, true)
    return () => document.removeEventListener("click", handleLinkClick, true)
  }, [pathname, router, isTransitioning, reduceMotion])

  useEffect(() => {
    const handleProgrammaticNavigate = (e: Event) => {
      const ce = e as CustomEvent<{ to?: string }>
      const to = ce.detail?.to
      if (!to) return
      startTransitionTo(to)
    }

    window.addEventListener("cc:navigate", handleProgrammaticNavigate as EventListener)
    return () => window.removeEventListener("cc:navigate", handleProgrammaticNavigate as EventListener)
  }, [pathname, router, isTransitioning, reduceMotion])

  useEffect(() => {
    const handlePopState = () => {
      if (reduceMotion) return
      if (isTransitioning) return
      const to = window.location.pathname
      if (to === pathname) return
      setTargetPath(to)
      setIsTransitioning(true)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [pathname, isTransitioning, reduceMotion])

  useEffect(() => {
    // Check if pathname actually changed
    if (pathname !== previousPathname.current) {
      const closeDelay = reduceMotion ? 0 : 150
      window.setTimeout(() => {
        setIsTransitioning(false)
        setTargetPath(null)
      }, closeDelay)

      previousPathname.current = pathname
    }
  }, [pathname, reduceMotion])

  return (
    <div className="hidden">
      {/* Transitions désactivées */}
    </div>
  )
}
