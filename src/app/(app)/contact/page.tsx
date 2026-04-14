'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Link from 'next/link'

import { contactSchema, type ContactFormData } from '@/lib/schemas'
import { createContactMessage } from '@/api/services'

// Fix for default marker icon in Leaflet + Vite/React
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: (markerIcon as any).src || markerIcon,
  iconRetinaUrl: (markerIcon2x as any).src || markerIcon2x,
  shadowUrl: (markerShadow as any).src || markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const position: [number, number] = [50.41091, 4.44222]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      acceptPrivacy: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null)
    try {
      await createContactMessage({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      })
      setIsSubmitted(true)
      reset()
    } catch (err) {
      setSubmitError("Erreur lors de l'envoi du message. Veuillez réessayer.")
      console.error('Contact form failed:', err)
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-stone-800 to-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/banner-contact.jpg"
            alt="Façade accueillante du Bistrot De La Cour"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Vous avez une question, une demande spéciale ou simplement envie de discuter ?
              N'hésitez pas à nous contacter. Nous sommes là pour vous !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">
                Informations de contact
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">Adresse</h3>
                    <p className="text-stone-600">
                      Rue de Dampremy 22<br />
                      6000 Charleroi<br />
                      Belgique
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">Téléphone</h3>
                    <a
                      href="tel:071596448"
                      className="text-stone-600 hover:text-amber-600 transition-colors duration-300"
                    >
                      071 59 64 48
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">Horaires d'ouverture</h3>
                    <div className="text-stone-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Lundi - Jeudi</span>
                        <span>12:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vendredi - Samedi</span>
                        <span>12:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimanche</span>
                        <span>12:00 - 22:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">Email</h3>
                    <a
                      href="mailto:contact@bistrot-delacour.be"
                      className="text-stone-600 hover:text-amber-600 transition-colors duration-300"
                    >
                      contact@bistrot-delacour.be
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">
                Envoyez-nous un message
              </h2>

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {submitError}
                </div>
              )}

              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-stone-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
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
                      <label htmlFor="contact-email" className="block text-sm font-medium text-stone-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        {...register('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      {...register('subject')}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="reservation">Réservation</option>
                      <option value="question">Question générale</option>
                      <option value="allergies">Allergies / Régime alimentaire</option>
                      <option value="groupe">Réservation groupe</option>
                      <option value="autre">Autre</option>
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      {...register('message')}
                      rows={6}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Votre message..."
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Privacy Policy Consent (GDPR) */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="acceptPrivacy"
                      {...register('acceptPrivacy')}
                      className="mt-1 w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                    />
                    <label htmlFor="acceptPrivacy" className="text-sm text-stone-600">
                      J'accepte que mes données soient traitées conformément à la{' '}
                      <Link href="/privacy" className="text-amber-600 hover:underline">
                        politique de confidentialité
                      </Link>
                      . *
                    </label>
                  </div>
                  {errors.acceptPrivacy && (
                    <p className="text-sm text-red-600" role="alert">
                      {errors.acceptPrivacy.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Envoyer le message</span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center bg-green-50 p-8 rounded-xl"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                    Message envoyé !
                  </h3>
                  <p className="text-stone-600 mb-6">
                    Merci pour votre message. Nous vous répondrons dans les plus brefs délais,
                    généralement sous 24 heures.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-stone-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-stone-800 transition-colors duration-300"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[500px] w-full relative z-0 rounded-2xl overflow-hidden shadow-lg border border-stone-200">
            <MapContainer
              center={position}
              zoom={16}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <div className="text-center">
                    <h4 className="font-bold text-stone-900">Bistrot De La Cour</h4>
                    <p className="text-sm text-stone-600">Rue de Dampremy 22, 6000 Charleroi</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-stone-600">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Puis-je réserver une table pour un groupe ?",
                answer: "Oui, nous acceptons les réservations pour les groupes jusqu'à 12 personnes. Pour les groupes plus importants, contactez-nous directement."
              },
              {
                question: "Avez-vous un parking ?",
                answer: "Oui, un parking public gratuit est disponible à proximité du restaurant. Nous pouvons aussi vous indiquer les parkings payants les plus proches."
              },
              {
                question: "Acceptez-vous les cartes de crédit ?",
                answer: "Oui, nous acceptons les cartes Visa, Mastercard et American Express. Le paiement en espèces est également possible."
              },
              {
                question: "Pouvez-vous adapter les plats pour les allergies ?",
                answer: "Absolument ! Notre équipe est formée pour gérer les allergies alimentaires. Merci de nous prévenir à l'avance lors de votre réservation."
              },
              {
                question: "Proposez-vous des menus pour enfants ?",
                answer: "Oui, nous avons un menu enfant adapté with des portions raisonnables et des plats simples que les enfants aiment."
              },
              {
                question: "Y a-t-il une tenue vestimentaire exigée ?",
                answer: "Non, nous privilégions une ambiance conviviale. Venez comme vous êtes ! Cependant, nous apprécions une tenue correcte."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="font-semibold text-stone-900 mb-3">{faq.question}</h3>
                <p className="text-stone-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
