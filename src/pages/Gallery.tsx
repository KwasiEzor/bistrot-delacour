import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { getGalleryImages } from '../api/services'
import { getStrapiImageUrl } from '../api/client'
import type { GalleryImage } from '../types/strapi'

const categoryMap: Record<string, string> = {
  interior: 'Ambiance',
  exterior: 'Extérieur',
  food: 'Cuisine',
  events: 'Événements',
  team: 'Équipe',
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [loading, setLoading] = useState(true)

  const categories = ['Tous', 'Ambiance', 'Cuisine', 'Extérieur', 'Événements', 'Équipe']

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await getGalleryImages()
        setImages(res.data)
      } catch (err) {
        console.error('Failed to load gallery:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  const filteredImages = activeCategory === 'Tous'
    ? images
    : images.filter((img) => categoryMap[img.category || ''] === activeCategory)

  const nextImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % filteredImages.length)
  }

  const prevImage = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Chargement de la galerie...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      <section className="relative py-32 bg-gradient-to-br from-stone-800 to-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/banner-gallery.jpg"
            alt="Présentation gastronomique au Bistrot De La Cour"
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
              Galerie
            </h1>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'ambiance chaleureuse et la cuisine raffinée du Bistrot De La Cour.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => {
                const imageUrl = getStrapiImageUrl(image.image, 'medium')
                if (!imageUrl) return null
                return (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => setSelectedImage(index)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/90 text-stone-900 px-4 py-2 rounded-full font-medium">
                          Voir en grand
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {categoryMap[image.category || ''] || 'Général'}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <p className="text-center py-12 text-stone-500">
              Aucune image dans cette catégorie pour le moment.
            </p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage !== null && filteredImages[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors duration-300"
                aria-label="Fermer"
              >
                <X size={32} />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="Image précédente"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="Image suivante"
              >
                <ChevronRight size={24} />
              </button>

              <img
                src={getStrapiImageUrl(filteredImages[selectedImage].image, 'large') || ''}
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white p-4 rounded-lg">
                <p className="text-sm opacity-75 mb-1">
                  {categoryMap[filteredImages[selectedImage].category || ''] || 'Général'}
                </p>
                <p className="font-medium">{filteredImages[selectedImage].title}</p>
                <p className="text-sm opacity-75 mt-2">
                  {selectedImage + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">
              Prêt à vivre cette expérience ?
            </h2>
            <p className="text-xl text-stone-600 mb-8">
              Réservez votre table et venez découvrir l'ambiance unique du Bistrot De La Cour.
            </p>
            <a
              href="/reservation"
              className="inline-block bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Réserver maintenant
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
