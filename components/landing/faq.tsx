"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Is Res.U.Me really free to use?",
    answer:
      "Yes, Res.U.Me offers a free plan that includes basic resume creation, essential templates, and PDF exports. We also offer premium plans with advanced features like AI assistance, unlimited resumes, and priority support for users who need more functionality.",
  },
  {
    question: "How does the AI resume builder work?",
    answer:
      "Our AI resume builder analyzes your input and job descriptions to suggest optimized content, skills, and achievements. It helps you quantify accomplishments, use powerful action verbs, and ensure your resume passes through Applicant Tracking Systems (ATS) with a high match rate.",
  },
  {
    question: "Are the resumes created with Res.U.Me ATS-friendly?",
    answer:
      "All our templates are designed to be ATS-friendly. Our system ensures proper formatting, keyword optimization, and appropriate section headings that ATS systems can easily parse. Our premium plan includes an ATS simulator to test your resume before submission.",
  },
  {
    question: "Can I create multiple versions of my resume?",
    answer:
      "Yes, you can create multiple versions of your resume tailored to different job applications. Our free plan allows for one resume, while our premium plans offer unlimited resume creation to help you customize for each opportunity.",
  },
  {
    question: "What formats can I export my resume in?",
    answer:
      "You can export your resume as PDF, DOCX, and HTML. PDF is the most commonly used format for job applications, DOCX allows for further editing in Microsoft Word, and HTML is useful for online portfolios or websites.",
  },
  {
    question: "How do I get help if I'm stuck?",
    answer:
      "We offer multiple support channels including a comprehensive help center, video tutorials, email support, and live chat assistance for premium users. Our AI assistant can also provide real-time guidance as you build your resume.",
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our resume builder and services.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" value={openItems} className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border rounded-lg px-6 shadow-sm bg-white/70 backdrop-blur-sm"
                >
                  <AccordionTrigger
                    onClick={() => toggleItem(`item-${index}`)}
                    className="text-left font-bold py-4 hover:no-underline"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <div className="flex justify-center">
              <a href="/contact" className="text-primary font-medium hover:underline">
                Contact our support team
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-16 right-16 w-72 h-72 bg-emerald-200/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-200/15 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
