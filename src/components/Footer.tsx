import { Link } from 'react-router-dom'
import { Phone, MapPin, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Bistrot De La Cour
              </span>
            </div>
            <p className="text-stone-400 mb-6 max-w-md">
              Un bistrot chaleureux au cœur de Charleroi, où la cuisine simple et excellente
              rencontre l'accueil authentique. Une expérience culinaire conviviale depuis 2018.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-stone-400">Rue de Dampremy 22</p>
                  <p className="text-stone-400">6000 Charleroi</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-amber-500 flex-shrink-0" />
                <a href="tel:071596448" className="text-stone-400 hover:text-amber-500 transition-colors duration-300">
                  071 59 64 48
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4">Horaires</h3>
            <div className="space-y-2 text-stone-400">
              <div className="flex justify-between">
                <span>Lun–Jeu</span>
                <span>12:00–22:00</span>
              </div>
              <div className="flex justify-between">
                <span>Ven–Sam</span>
                <span>12:00–23:00</span>
              </div>
              <div className="flex justify-between">
                <span>Dim</span>
                <span>12:00–22:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-500 text-sm">
              © 2024 Bistrot De La Cour. Tous droits réservés.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mt-4 md:mt-0">
              <Link to="/about" className="text-stone-500 hover:text-amber-500 text-sm transition-colors duration-300">
                À propos
              </Link>
              <Link to="/contact" className="text-stone-500 hover:text-amber-500 text-sm transition-colors duration-300">
                Contact
              </Link>
              <Link to="/reservation" className="text-stone-500 hover:text-amber-500 text-sm transition-colors duration-300">
                Réservation
              </Link>
              <Link to="/privacy" className="text-stone-500 hover:text-amber-500 text-sm transition-colors duration-300">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer