'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Leaf, Wheat, Fish } from 'lucide-react'
import { getMenuCategories, getSpecialMenuItems, getMenuItems } from '@/api/services'
import { getPayloadImageUrl } from '@/api/client'
import type { MenuCategory, MenuItem } from '@/types/payload'

const iconMap: Record<string, React.ElementType> = {
  Leaf,
  ChefHat,
  Wheat,
  Fish,
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [specialItems, setSpecialItems] = useState<MenuItem[]>([])
  const [menuItemsByCategory, setMenuItemsByCategory] = useState<Record<string, MenuItem[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [categoriesRes, specialsRes] = await Promise.all([
          getMenuCategories(),
          getSpecialMenuItems(),
        ])

        const cats = categoriesRes.docs
        setCategories(cats)
        setSpecialItems(specialsRes.docs)

        // Fetch items for each category
        const itemsMap: Record<string, MenuItem[]> = {}
        await Promise.all(
          cats.map(async (cat) => {
            const itemsRes = await getMenuItems(cat.slug)
            itemsMap[cat.slug] = itemsRes.docs
          })
        )
        setMenuItemsByCategory(itemsMap)

        if (cats.length > 0) {
          setActiveCategory(cats[0].slug)
        }
      } catch (err) {
        setError('Impossible de charger le menu. Veuillez réessayer.')
        console.error('Failed to load menu:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const currentItems = menuItemsByCategory[activeCategory] || []

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Chargement du menu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-xl max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/banner-menu.jpg"
            alt="Élégant service de table au Bistrot De La Cour"
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
              Notre Menu
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Une cuisine simple et excellente, préparée with des ingrédients frais
              et de saison. Chaque plat est une invitation au voyage culinaire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b border-stone-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon || 'ChefHat'] || ChefHat
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.slug
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-8"
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row flex-1 mb-4 lg:mb-0 lg:mr-6">
                  {item.image && (
                    <div className="w-full md:w-32 lg:w-40 h-32 md:h-24 lg:h-32 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-6 flex-shrink-0 shadow-lg">
                      <img
                        src={getPayloadImageUrl(item.image, 'medium') || '/images/placeholder.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-stone-600 mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    {item.allergens && (
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(item.allergens) ? item.allergens : []).map((allergen: string) => (
                          <span
                            key={allergen}
                            className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                          >
                            {allergen}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right lg:text-left">
                  <div className="text-2xl font-bold text-amber-600 whitespace-nowrap">
                    {item.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {currentItems.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              Aucun plat disponible dans cette catégorie pour le moment.
            </div>
          )}
        </div>
      </section>

      {/* Special Note */}
      {specialItems.length > 0 && (
        <section className="py-16 bg-stone-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ChefHat className="mx-auto mb-6 text-amber-500" size={48} />
              <h2 className="font-serif text-3xl font-bold mb-6">
                Plats du Jour & Suggestions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {specialItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="bg-stone-800 p-6 rounded-xl">
                    <h3 className="font-serif text-lg font-bold mb-3 text-amber-500">
                      {item.name}
                    </h3>
                    <p className="text-stone-300">{item.description}</p>
                    <p className="text-amber-400 font-bold mt-2">{item.price}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Menu
