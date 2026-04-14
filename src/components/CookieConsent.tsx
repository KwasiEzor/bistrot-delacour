import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings, Check } from 'lucide-react'
import type { CookiePreferences } from '../hooks/useCookieConsent'

interface CookieConsentBannerProps {
  onAcceptAll: () => void
  onAcceptNecessary: () => void
  onSavePreferences: (prefs: CookiePreferences) => void
}

const CookieConsentBanner = ({ onAcceptAll, onAcceptNecessary, onSavePreferences }: CookieConsentBannerProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden">
          {/* Header */}
          <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cookie size={24} className="text-amber-400" />
              <h3 className="font-semibold text-lg">Paramètres des cookies</h3>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-stone-800 rounded-full transition-colors"
              aria-label="Paramètres"
            >
              <Settings size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-stone-700 mb-6">
              Nous utilisons des cookies pour améliorer votre expérience. Certains sont essentiels au 
              fonctionnement du site, tandis que d'autres nous aident à comprendre comment le site 
              est utilisé. Vous pouvez accepter ou refuser chaque catégorie.
            </p>

            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 mb-6"
              >
                {/* Necessary */}
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                  <div>
                    <p className="font-medium text-stone-900">Cookies nécessaires</p>
                    <p className="text-sm text-stone-600">Essentiels au fonctionnement du site</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check size={16} className="text-green-600" />
                    <span className="text-sm text-stone-500">Toujours activés</span>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                  <div>
                    <p className="font-medium text-stone-900">Cookies analytiques</p>
                    <p className="text-sm text-stone-600">Nous aident à comprendre l'utilisation du site</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                  <div>
                    <p className="font-medium text-stone-900">Cookies marketing</p>
                    <p className="text-sm text-stone-600">Utilisés pour le ciblage publicitaire</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={onAcceptNecessary}
                className="px-6 py-2 text-stone-700 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cookies nécessaires uniquement
              </button>
              {showSettings ? (
                <button
                  onClick={() => onSavePreferences(preferences)}
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Enregistrer mes choix
                </button>
              ) : (
                <button
                  onClick={onAcceptAll}
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Tout accepter
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieConsentBanner
