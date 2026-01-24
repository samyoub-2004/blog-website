"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const portfolioItems = [
  {
    id: 1,
    title: "Modern Ecommerce Store",
    description: "High-converting online store",
    image: "/portfolio/ecommerce-1.jpg",
  },
  {
    id: 2,
    title: "Luxury Boutique Website",
    description: "Premium shopping experience",
    image: "/portfolio/boutique-1.jpg",
  },
  {
    id: 3,
    title: "Portfolio & Agency Site",
    description: "Creative showcase",
    image: "/portfolio/portfolio-1.jpg",
  },
  {
    id: 4,
    title: "Business Website",
    description: "Professional corporate site",
    image: "/portfolio/business-1.jpg",
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Content-rich community",
    image: "/portfolio/blog-1.jpg",
  },
]

export function PortfolioCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative w-full h-full">
      {/* Main Carousel */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-slate-900">
        {portfolioItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              {/* Placeholder for portfolio image */}
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-slate-700 mb-4">{index + 1}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {portfolioItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Info Bar */}
      <div className="absolute top-6 right-6 z-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2">
        <p className="text-white font-medium text-sm">
          {currentIndex + 1} / {portfolioItems.length}
        </p>
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute bottom-6 right-6 z-10 bg-white/20 hover:bg-white/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-md transition-all duration-300"
        aria-label="Toggle autoplay"
      >
        {isAutoPlay ? "⏸" : "▶"}
      </button>
    </div>
  )
}
