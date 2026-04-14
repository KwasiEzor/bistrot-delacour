'use client'

import { motion } from 'framer-motion'
import { Heart, Award, Users, ChefHat } from 'lucide-react'

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-stone-900 to-stone-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/banner-about.jpg"
            alt="Ambiance chaleureuse du Bistrot De La Cour"
            className="w-full h-full object-cover opacity-40"
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
              Notre Histoire
            </h1>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Depuis 2018, le Bistrot De La Cour est le rendez-vous privilégié des gourmands
              de Charleroi, où tradition et authenticité se rencontrent dans une ambiance chaleureuse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold text-stone-900 mb-6">
                Une Passion pour la Cuisine Simple
              </h2>
              <div className="space-y-6 text-stone-700 leading-relaxed">
                <p>
                  Tout a commencé en 2018 lorsque notre chef, passionné par les produits frais
                  et les recettes traditionnelles, a décidé d'ouvrir ce bistrot au cœur de Charleroi.
                  L'objectif était simple : proposer une cuisine accessible, savoureuse et authentique.
                </p>
                <p>
                  Le Bistrot De La Cour n'est pas seulement un restaurant, c'est un lieu de vie.
                  Ici, chaque plat raconte une histoire, chaque client devient un ami, et chaque
                  repas est une célébration de la convivialité.
                </p>
                <p>
                  Notre équipe, composée de passionnés de la gastronomie, travaille chaque jour
                  pour vous offrir le meilleur de la cuisine française revisitée avec une touche
                  personnelle et régionale.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/chef.jpg"
                  alt="Chef Jean-Michel préparant un plat signature"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Nos Valeurs
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Des principes qui guident chacune de nos actions depuis le premier jour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Authenticité",
                description: "Une cuisine sincère, sans artifices, faite avec le cœur."
              },
              {
                icon: Users,
                title: "Convivialité",
                description: "Un lieu où l'on se sent chez soi, entouré de sourires."
              },
              {
                icon: Award,
                title: "Qualité",
                description: "Des ingrédients frais, sélectionnés avec soin auprès de producteurs locaux."
              },
              {
                icon: ChefHat,
                title: "Tradition",
                description: "Respecter les classiques tout en les réinventant avec créativité."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-amber-600" size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-stone-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Notre Équipe
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Des passionnés qui travaillent chaque jour pour votre satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jean-Michel Dubois",
                role: "Chef & Propriétaire",
                description: "15 ans d'expérience dans la gastronomie française, passionné par les produits frais et les recettes traditionnelles.",
                image: "/images/chef.jpg"
              },
              {
                name: "Marie Claire",
                role: "Chef de Salle",
                description: "Experte en service et en vins, elle veille à ce que chaque moment passé chez nous soit mémorable.",
                image: "/images/couple-dining.jpg"
              },
              {
                name: "Pierre Laurent",
                role: "Sommelier",
                description: "Spécialiste des vins régionaux, il saura vous conseiller le meilleur accord pour vos plats.",
                image: "/images/gallery-3.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-stone-50 p-8 rounded-xl"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-amber-600 font-medium mb-4">{member.role}</p>
                <p className="text-stone-600 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
