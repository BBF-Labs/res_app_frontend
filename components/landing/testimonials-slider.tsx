"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    name: "Gail Ann ONeill",
    role: "Marketing Manager",
    company: "Tech Solutions Inc",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "Resume Now enabled me to put together an updated resume very easily. The AI samples that were provided made it simple to choose the right wording.",
    rating: 5,
  },
  {
    name: "Tina",
    role: "Software Developer",
    company: "Innovation Labs",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "Clear directions. High quality AI systems and recommendations. A good range for resume styles and templates. Cost effective. Professional services including review and feedback for improvement.",
    rating: 5,
  },
  {
    name: "John Kay",
    role: "Project Manager",
    company: "Global Enterprises",
    image: "/placeholder.svg?height=60&width=60",
    content: "Easy way to create a resume. The AI takes the guesswork out of populating the resume and cover letter.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Data Analyst",
    company: "Analytics Pro",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "The platform is incredibly intuitive and the AI suggestions helped me highlight achievements I would have missed. Got multiple interviews within a week!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    company: "Design Studio",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "Beautiful templates and smart content suggestions. The resume scoring feature helped me optimize for each application. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Sales Manager",
    company: "Growth Corp",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "Professional results in minutes. The AI writing assistance is like having a career coach. Increased my response rate significantly.",
    rating: 5,
  },
]

export function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3))
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3),
    )
  }, [])

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay, nextSlide])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-rose-950/30">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-black mb-4">
            What People Are Saying About
            <br />
            Our Resume Maker
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs using our AI-powered resume
            platform.
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-2"
              onClick={() => {
                prevSlide()
                setAutoplay(false)
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-2"
              onClick={() => {
                nextSlide()
                setAutoplay(false)
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Testimonial Cards */}
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                  {getCurrentTestimonials().map((testimonial, index) => (
                    <Card
                      key={`${currentIndex}-${index}`}
                      className="bg-white shadow-lg border-0 overflow-hidden h-full"
                    >
                      {/* Purple header bar */}
                      <div className="h-4 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start space-x-4 mb-4">
                          <Avatar className="h-12 w-12 border-2 border-gray-100">
                            <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed text-sm">{testimonial.content}</p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                  setAutoplay(false)
                }}
              />
            ))}
          </div>
        </div>

        {/* Decorative accent lines */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="space-y-2">
            <div className="w-16 h-1 bg-green-400 transform -rotate-12"></div>
            <div className="w-12 h-1 bg-green-400 transform -rotate-12"></div>
            <div className="w-20 h-1 bg-green-400 transform -rotate-12"></div>
            <div className="w-8 h-1 bg-green-400 transform -rotate-12"></div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
