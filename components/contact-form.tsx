"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate form submission
    try {
      // In a real implementation, you would send the form data to your backend
      // which would then forward it to syllamugabo2@gmail.com
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form submitted:", {
        ...formData,
        recipient: "syllamugabo2@gmail.com",
      })

      setFormState("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState("error")
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-emerald-500/20 rounded-full p-3 mb-4">
          <CheckCircle className="h-12 w-12 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-medium mb-2">Message Sent!</h3>
        <p className="text-gray-400 text-center mb-6">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="md:col-span-2 space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="md:col-span-2 space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md font-medium flex items-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-70"
        >
          {formState === "submitting" ? (
            <>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
