"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What services does Moxecutive Media offer?",
      answer:
        "We offer comprehensive media solutions including film & TV production, graphic design & branding, event management, media buying, training & mentorship, and professional photography.",
    },
    {
      question: "How long does a typical video production take?",
      answer:
        "Production timelines vary based on project complexity. Simple projects may take 2-4 weeks, while complex productions can take 6-12 weeks from concept to final delivery.",
    },
    {
      question: "Do you offer package deals for multiple services?",
      answer:
        "Yes, we offer customized packages that combine multiple services for better value. Contact us to discuss your specific needs and receive a tailored quote.",
    },
    {
      question: "What is your creative process?",
      answer:
        "Our process begins with understanding your vision and goals, followed by concept development, production planning, execution, and final delivery with revisions as needed.",
    },
    {
      question: "Do you work with clients outside Kenya?",
      answer:
        "Yes, we work with clients globally. While we're based in Kenya, we can coordinate remote projects and travel for on-location shoots when required.",
    },
  ]

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
          {faqs.map((faq, index) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
