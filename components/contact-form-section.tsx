"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      // Simulate form submission - in production, connect to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Form submitted:", formData)
      setSubmitMessage("Thank you! We'll be in touch soon.")

      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        message: "",
      })

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(""), 5000)
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance mb-6">
            Let's Build Your Next<br />
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Website</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            Tell us about your project and we'll get back to you within 24 hours with a custom proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/10 flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Email</p>
                    <a href="mailto:hello@example.com" className="text-white hover:text-white/80 transition-colors">
                      hello@example.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/10 flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Phone</p>
                    <a href="tel:+1234567890" className="text-white hover:text-white/80 transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/10 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">Address</p>
                    <p className="text-white">123 Web Street<br />Tech City, TC 12345</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/70 text-sm mb-3">Response Time</p>
                <p className="text-white font-medium">Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="website" className="block text-white font-medium mb-3">
                    Website / Business Type
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200"
                    placeholder="e.g., Ecommerce Store, Boutique, Portfolio"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-3">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-200 resize-none"
                    placeholder="Describe your project, goals, and any specific features you need..."
                  />
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg text-sm font-medium ${
                      submitMessage.includes("Thank")
                        ? "bg-green-500/20 border border-green-500/30 text-green-300"
                        : "bg-red-500/20 border border-red-500/30 text-red-300"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black rounded-lg px-6 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-white/60 text-sm text-center">
                  We respect your privacy. Your information is secure.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
