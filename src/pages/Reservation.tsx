import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reservationSchema, type ReservationFormData } from '../lib/schemas'
import { createReservation } from '../api/services'

const Reservation = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: '',
      time: '',
      guests: 2,
      name: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
  })

  const availableTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
  ]

  const onSubmit = async (data: ReservationFormData) => {
    setIsChecking(true)
    setSubmitError(null)

    try {
      await createReservation({
        date: data.date,
        time: data.time,
        guests: data.guests,
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests,
      })
      setIsSubmitted(true)
      reset()
    } catch (err) {
      setSubmitError('Erreur lors de la réservation. Veuillez réessayer.')
      console.error('Reservation failed:', err)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-amber-600 to-amber-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/banner-reservation.jpg"
            alt="Réservation élégante au Bistrot De La Cour"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Réserver une Table
            </h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Réservez votre table en ligne et profitez d'une expérience culinaire
              exceptionnelle dans notre bistrot chaleureux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-stone-50 p-8 rounded-2xl shadow-lg">
                <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8 text-center">
                  Choisissez votre créneau
                </h2>

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  {/* Date & Time Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-stone-700 mb-2">
                        <Calendar className="inline mr-2" size={16} />
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        {...register('date')}
                        min={new Date().toISOString().split('T')[0]}
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? 'date-error' : undefined}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      />
                      {errors.date && (
                        <p id="date-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-stone-700 mb-2">
                        <Clock className="inline mr-2" size={16} />
                        Heure
                      </label>
                      <select
                        id="time"
                        {...register('time')}
                        aria-invalid={!!errors.time}
                        aria-describedby={errors.time ? 'time-error' : undefined}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Sélectionnez une heure</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {errors.time && (
                        <p id="time-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.time.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-stone-700 mb-2">
                      <Users className="inline mr-2" size={16} />
                      Nombre de personnes
                    </label>
                    <select
                      id="guests"
                      {...register('guests', { valueAsNumber: true })}
                      aria-invalid={!!errors.guests}
                      aria-describedby={errors.guests ? 'guests-error' : undefined}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} personne{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    {errors.guests && (
                      <p id="guests-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.guests.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-stone-700 mb-2">
                      Demandes spéciales (optionnel)
                    </label>
                    <textarea
                      id="specialRequests"
                      {...register('specialRequests')}
                      rows={3}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Allergies, occasions spéciales, préférences..."
                    />
                    {errors.specialRequests && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.specialRequests.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      disabled={isChecking}
                      className="bg-amber-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isChecking ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </div>
                      ) : (
                        'Confirmer la réservation'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Confirmation */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-green-50 p-12 rounded-2xl"
            >
              <CheckCircle className="mx-auto mb-6 text-green-600" size={64} />
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
                Réservation Confirmée !
              </h2>
              <p className="text-stone-600 mb-8">
                Un email de confirmation vous a été envoyé. Nous vous attendons avec impatience !
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-stone-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-stone-800 transition-colors duration-300"
              >
                Nouvelle réservation
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center bg-white p-8 rounded-xl shadow-lg"
            >
              <AlertCircle className="mx-auto mb-4 text-amber-500" size={48} />
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                Politique d'annulation
              </h3>
              <p className="text-stone-600">
                Annulation gratuite jusqu'à 24h avant. Au-delà, nous facturons 50% du montant de la réservation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white p-8 rounded-xl shadow-lg"
            >
              <Users className="mx-auto mb-4 text-amber-500" size={48} />
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                Groupes
              </h3>
              <p className="text-stone-600">
                Pour les groupes de plus de 8 personnes, contactez-nous directement au 071 59 64 48.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white p-8 rounded-xl shadow-lg"
            >
              <Clock className="mx-auto mb-4 text-amber-500" size={48} />
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                Service continu
              </h3>
              <p className="text-stone-600">
                Service continu de 12h à 22h en semaine, jusqu'à 23h le week-end. Dernière commande 30 min avant fermeture.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reservation
