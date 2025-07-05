"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

interface CounterProps {
  end: number
  suffix?: string
  duration?: number
  delay?: number
}

function Counter({ end, suffix = "", duration = 2, delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    const startAnimation = () => {
      animationFrame = requestAnimationFrame(step)
    }

    const timeoutId = setTimeout(startAnimation, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, delay, isInView])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Purple banner like in the reference image */}
      <div className="relative mb-16">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl mx-4 sm:mx-8 lg:mx-16 py-8 px-6 text-center relative overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-black text-white"
          >
            <Counter end={2044} delay={0.5} /> Resumes Are Being Created On
            <br />
            Res.U.Me
          </motion.h2>

          {/* Decorative elements */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-20">
            <div className="w-16 h-1 bg-white transform -rotate-12 mb-2"></div>
            <div className="w-12 h-1 bg-white transform -rotate-12"></div>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20">
            <div className="w-16 h-1 bg-white transform rotate-12 mb-2"></div>
            <div className="w-12 h-1 bg-white transform rotate-12"></div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
          >
            {/* Left side - Stats */}
            <div className="w-full md:w-1/2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
              >
                <Counter end={43} delay={0.5} />
                <Counter end={0} suffix="," delay={0.5} />
                <Counter end={0} suffix="," delay={0.5} />
                <Counter end={0} suffix="," delay={0.5} />
                <Counter end={0} suffix="," delay={0.5} />
                <Counter end={0} suffix="," delay={0.5} />
                <Counter end={0} suffix="+" delay={0.5} />
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-3xl font-black mb-6"
              >
                resumes made with <span className="text-blue-600 dark:text-blue-400">Res.U.Me</span>
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-6"
              >
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                    <Counter end={98} suffix="%" delay={0.8} />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                    <Counter end={2} suffix="x" delay={1} />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Faster Hiring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                    <Counter end={4.9} suffix="/5" delay={1.2} duration={1.5} />
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">User Rating</div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Resume Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-black">KATHLEEN JONES</h3>
                        <p className="text-sm text-muted-foreground font-medium">Senior Marketing Manager</p>
                      </div>
                      <div className="text-5xl text-gray-200 dark:text-gray-700 font-serif">"</div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        CONTACT
                      </div>
                      <div className="h-1 w-full bg-gray-100 dark:bg-gray-700"></div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Email: kathleen@example.com</div>
                        <div>Phone: (555) 123-4567</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        PROFESSIONAL SUMMARY
                      </div>
                      <div className="h-1 w-full bg-gray-100 dark:bg-gray-700"></div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-4/5"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold text-sm uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        EXPERIENCE
                      </div>
                      <div className="h-1 w-full bg-gray-100 dark:bg-gray-700"></div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 text-5xl text-blue-500 font-serif">"</div>
                <div className="absolute -bottom-2 right-8 text-blue-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="absolute -top-2 right-12 text-blue-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
