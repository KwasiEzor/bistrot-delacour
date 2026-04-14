'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTestimonials } from '@/api/services'

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const { data: testimonialsData, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => getTestimonials(true),
  })

  const testimonials = testimonialsData?.docs || []

  const nextSlide = useCallback(() => {
    if (testimonials.length === 0) return
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }, [testimonials.length])

  const prevSlide = useCallback(() => {
    if (testimonials.length === 0) return
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }, [testimonials.length])

  const goToSlide = (index: number) => setCurrentIndex(index)

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, isAutoPlaying, testimonials.length])

  if (isLoading || testimonials.length === 0) {
    return (
      <div className="flex justify-center py-12" data-testid="loading-spinner">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const current = testimonials[currentIndex]

  return (
    <div className="relative max-w-6xl mx-auto">
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-stone-50 to-amber-50"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative h-96 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="text-center max-w-4xl"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <Quote className="text-amber-300 w-16 h-16" />
                  <div className="absolute inset-0 bg-amber-500 rounded-full opacity-10" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center space-x-1 mb-6"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`${
                      star <= current.rating
                        ? 'text-amber-500 fill-current'
                        : 'text-stone-300'
                    } transition-colors duration-300`}
                    size={20}
                  />
                ))}
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl md:text-2xl text-stone-700 font-medium leading-relaxed mb-8 italic"
              >
                "{current.quote}"
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center justify-center space-x-4"
              >
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {current.author.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-stone-900 text-lg">
                    {current.author}
                  </p>
                  <p className="text-stone-500 text-sm">
                    {new Date(current.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-stone-700 hover:text-amber-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous review"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-stone-700 hover:text-amber-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next review"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-amber-500 scale-125'
                : 'bg-stone-300 hover:bg-stone-400'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-6 bg-stone-200 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-amber-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="text-center mt-4">
        <p className="text-stone-500 text-sm">
          {currentIndex + 1} sur {testimonials.length}
        </p>
      </div>
    </div>
  )
}

export default TestimonialsCarousel
