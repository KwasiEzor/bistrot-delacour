'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, UtensilsCrossed, Phone, Clock, MapPin } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Réservation', href: '/reservation' },
    { name: 'Galerie', href: '/gallery' },
    { name: 'Avis', href: '/reviews' },
    { name: 'À Propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || isOpen
          ? 'bg-white shadow-xl py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={`p-2 rounded-lg transition-colors duration-300 ${
              isScrolled || isOpen ? 'bg-amber-600 text-white' : 'bg-white/20 text-white backdrop-blur-md'
            }`}>
              <UtensilsCrossed size={24} className="group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold tracking-tight transition-colors duration-300 ${
                isScrolled || isOpen ? 'text-stone-900' : 'text-white'
              }`}>
                Bistrot <span className="text-amber-500">De La Cour</span>
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                isScrolled || isOpen ? 'text-stone-500' : 'text-white/70'
              }`}>
                Restaurant Charleroi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                  isActive(link.href)
                    ? (isScrolled ? 'text-amber-600 bg-amber-50' : 'text-white bg-white/20')
                    : (isScrolled ? 'text-stone-600 hover:text-amber-600 hover:bg-stone-50' : 'text-white/90 hover:text-white hover:bg-white/10')
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      isScrolled ? 'bg-amber-600' : 'bg-white'
                    }`}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/reservation"
              className={`ml-4 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                isScrolled
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-white text-stone-900 hover:bg-amber-50'
              }`}
            >
              Réserver
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled || isOpen ? 'text-stone-900 hover:bg-stone-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menu principal"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-amber-50 text-amber-600'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <div className="w-2 h-2 rounded-full bg-amber-600" />
                  )}
                </Link>
              ))}
              
              <div className="pt-6 grid grid-cols-1 gap-4">
                <Link
                  href="/reservation"
                  className="bg-amber-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                >
                  Réserver une table
                </Link>
              </div>

              {/* Mobile Quick Contacts */}
              <div className="mt-8 pt-8 border-t border-stone-100 grid grid-cols-1 gap-6">
                <div className="flex items-center space-x-4 text-stone-500">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <Phone size={20} />
                  </div>
                  <span className="font-medium">071 59 64 48</span>
                </div>
                <div className="flex items-center space-x-4 text-stone-500">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <MapPin size={20} />
                  </div>
                  <span className="font-medium text-sm">Rue de Dampremy 22, 6000 Charleroi</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
