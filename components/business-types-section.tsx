"use client"

import { useEffect, useRef, useState } from "react"
import {
  ShoppingCart,
  Store,
  Briefcase,
  FileText,
  ImageIcon,
  Users,
  BarChart3,
  Utensils,
  MapPin,
  Smartphone,
} from "lucide-react"

const businessTypes = [
  {
    icon: ShoppingCart,
    title: "Ecommerce",
    description: "Full online stores with products, cart, and secure payments",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Store,
    title: "Boutique",
    description: "Premium retail experiences with elegant design",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: ImageIcon,
    title: "Portfolio",
    description: "Showcase your work and attract creative clients",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Briefcase,
    title: "Corporate",
    description: "Professional business sites with full branding",
    color: "from-slate-500 to-blue-500",
  },
  {
    icon: FileText,
    title: "Blog",
    description: "Content platforms with SEO optimization",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Community",
    description: "Social platforms and membership sites",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Utensils,
    title: "Restaurant",
    description: "Online ordering, menus, and reservations",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "SaaS",
    description: "Software applications and cloud services",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: MapPin,
    title: "Local Business",
    description: "Service providers with location-based features",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Android & iOS apps for all your needs",
    color: "from-violet-500 to-purple-500",
  },
]

export function BusinessTypesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            className={`inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="w-2 h-2 bg-slate-900 rounded-full"></span>
            The Types of Websites We Build
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Whatever Your Business, We've Built It
          </h2>

          <p
            className={`text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            From ecommerce to enterprise applications, we specialize in creating custom solutions tailored to your industry.
          </p>
        </div>

        {/* Grid of Business Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {businessTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <div
                key={index}
                className={`group relative transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${300 + index * 50}ms`,
                }}
              >
                <div className="relative h-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${type.color}`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className={`mb-3 sm:mb-4 inline-flex p-2.5 sm:p-3 rounded-lg bg-gradient-to-br ${type.color} text-white w-fit transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                      {type.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 flex-grow leading-relaxed">
                      {type.description}
                    </p>

                    {/* Accent line */}
                    <div className={`mt-4 h-1 w-0 bg-gradient-to-r ${type.color} group-hover:w-full transition-all duration-300`}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-12 sm:mt-16 lg:mt-20 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-slate-600 text-base sm:text-lg mb-6">
            Don't see your business type? No problem! We build custom websites for any industry.
          </p>
          <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 hover:scale-105">
            Contact Us for Custom Solutions
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}
