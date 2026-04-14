'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Clock, Users, ArrowRight, ChefHat } from 'lucide-react'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src="/images/restaurant-interior.jpg"
            alt="Bistrot De La Cour interior"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              L'Art de la
              <span className="block text-amber-400">Convivialité</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-stone-200 max-w-2xl mx-auto leading-relaxed">
              Découvrez une cuisine simple et excellente dans une ambiance chaleureuse
              au cœur de Charleroi. Une expérience culinaire authentique.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/reservation"
              className="bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center space-x-2"
            >
              <span>Réserver une table</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/menu"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-stone-900 transition-all duration-300 flex items-center space-x-2"
            >
              <ChefHat size={20} />
              <span>Découvrir le menu</span>
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 right-10 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-30"
        >
          <div className="flex items-center space-x-1">
            <Star className="text-amber-500 fill-current" size={16} />
            <span className="font-semibold text-stone-900">4.7</span>
            <span className="text-stone-600">(178 avis)</span>
          </div>
        </motion.div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-stone-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Clock className="text-amber-500 mb-2" size={24} />
              <p className="font-medium">Ouvert tous les jours</p>
              <p className="text-stone-400 text-sm">Midi & Soir</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="text-amber-500 mb-2" size={24} />
              <p className="font-medium">Réservation recommandée</p>
              <p className="text-stone-400 text-sm">Service rapide</p>
            </div>
            <div className="flex flex-col items-center">
              <ChefHat className="text-amber-500 mb-2" size={24} />
              <p className="font-medium">Cuisine authentique</p>
              <p className="text-stone-400 text-sm">Ingrédients frais</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-stone-900 mb-4">
              Notre Cuisine
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Des plats simples, préparés avec passion et des ingrédients de qualité.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Carpaccio de Saint-Jacques",
                description: "Fines tranches de Saint-Jacques, huile d'olive et citron confit",
                price: "24€",
                image: "/images/carpaccio.jpg"
              },
              {
                name: "Bœuf Bourguignon",
                description: "Traditionnel bœuf braisé au vin rouge avec champignons et oignons",
                price: "28€",
                image: "/images/boeuf-bourguignon.jpg"
              },
              {
                name: "Tarte Tatin",
                description: "Pomme caramélisée, pâte feuilletée croustillante, crème fraîche",
                price: "12€",
                image: "/images/tarte-tatin.jpg"
              }
            ].map((dish, index) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-stone-600 mb-4">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-600">{dish.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/menu"
              className="inline-flex items-center space-x-2 bg-stone-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-stone-800 transition-colors duration-300"
            >
              <span>Voir tout le menu</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-stone-900 mb-4">
              Ce que disent nos clients
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="text-amber-500 fill-current" size={20} />
              ))}
              <span className="ml-2 text-xl font-semibold text-stone-900">4.7/5</span>
              <span className="text-stone-600">(178 avis)</span>
            </div>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Découvrez les expériences authentiques de nos clients qui ont choisi
              le Bistrot De La Cour pour leurs moments gourmands.
            </p>
          </motion.div>

          <TestimonialsCarousel />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/reviews"
              className="inline-flex items-center space-x-2 bg-stone-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-stone-800 transition-all duration-300 hover:scale-105"
            >
              <span>Lire tous les avis</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
