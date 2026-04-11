import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { getReviews } from '../api/services'
import type { Review } from '../types/strapi'

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews(50)
        setReviews(res.data)
      } catch (err) {
        console.error('Failed to load reviews:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Chargement des avis...</p>
        </div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <p className="text-stone-600">Aucun avis pour le moment.</p>
      </div>
    )
  }

  const averageRating = reviews.reduce((acc, r) => acc + r.attributes.rating, 0) / reviews.length
  const ratingDistribution = [1, 2, 3, 4, 5].map(
    (rating) => reviews.filter((r) => r.attributes.rating === rating).length
  )

  return (
    <div className="pt-16">
      <section className="relative py-32 bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/banner-reviews.jpg"
            alt="Clients satisfaits au Bistrot De La Cour"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-6">
              Avis Clients
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez ce que nos clients pensent de leur expérience au Bistrot De La Cour.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  <div className="text-6xl font-bold text-amber-600">
                    {averageRating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`${
                            star <= Math.round(averageRating)
                              ? 'text-amber-500 fill-current'
                              : 'text-stone-300'
                          }`}
                          size={24}
                        />
                      ))}
                    </div>
                    <p className="text-stone-600">Basé sur {reviews.length} avis</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-stone-600 w-8">{rating}★</span>
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{
                          width: `${(ratingDistribution[rating - 1] / reviews.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-stone-600 w-8">{ratingDistribution[rating - 1]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold">
                      {review.attributes.author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-stone-900">{review.attributes.author}</h3>
                      <span className="text-sm text-stone-500">
                        {new Date(review.attributes.date || review.attributes.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`${
                            star <= review.attributes.rating
                              ? 'text-amber-500 fill-current'
                              : 'text-stone-300'
                          }`}
                          size={16}
                        />
                      ))}
                      {review.attributes.isVerified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Vérifié
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 text-amber-200" size={24} />
                      <p className="text-stone-700 italic leading-relaxed pl-6">
                        "{review.attributes.content}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold mb-6">
              Partagez votre expérience
            </h2>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Votre avis nous aide à nous améliorer et guide les autres gourmands.
            </p>
            <a
              href="/reservation"
              className="inline-block bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-stone-100 transition-colors duration-300"
            >
              Réserver une table
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Reviews
