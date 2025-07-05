"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

const partners = [
  { name: "Amazon", logo: "amazon" },
  { name: "Pinterest", logo: "pinterest" },
  { name: "Nike", logo: "nike" },
  { name: "Kaiser Permanente", logo: "kaiser" },
  { name: "Sephora", logo: "sephora" },
  { name: "Google", logo: "google" },
  { name: "Microsoft", logo: "microsoft" },
  { name: "Apple", logo: "apple" },
]

export function PartnersSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Trusted by Top Companies</h2>
          <p className="text-muted-foreground">Our customers have been hired by leading organizations worldwide</p>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for infinite scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent"></div>

          {/* First slider - left to right */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex items-center space-x-16 py-6"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner.logo}-${index}`} className="flex-shrink-0">
                <div className="h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-2xl font-bold">{partner.name}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Second slider - right to left */}
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex items-center space-x-16 py-6"
          >
            {[...partners.reverse(), ...partners].map((partner, index) => (
              <div key={`${partner.logo}-rev-${index}`} className="flex-shrink-0">
                <div className="h-12 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-2xl font-bold">{partner.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
