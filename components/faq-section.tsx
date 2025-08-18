"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Replace static FAQ list with data fetched from the API
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string; status?: string; orderPosition?: number }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch("/api/faqs")
        if (!res.ok) return
        const data = await res.json()
        if (!mounted) return
        const items = Array.isArray(data.faqs) ? data.faqs : []
        // show only active items and sort by orderPosition (ascending)
        const visible = items
          .filter((f:any) => f.status === "active" || f.status === undefined)
          .sort((a:any, b:any) => (Number(a.orderPosition ?? 0) - Number(b.orderPosition ?? 0)))
        setFaqs(visible)
      } catch (err) {
        // ignore for now
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section id="faqs" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">Get answers to common questions about our services</p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading FAQs…</div>
          ) : faqs.length === 0 ? (
            <div className="text-center text-muted-foreground">No FAQs yet.</div>
          ) : (
            faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-card hover:bg-muted transition-colors duration-200 flex items-center justify-between"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-background border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
