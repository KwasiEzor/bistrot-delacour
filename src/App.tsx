import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CookieConsent, { useCookieConsent } from './components/CookieConsent'
import ErrorBoundary from './components/ErrorBoundary'

// Code-split all page components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Menu = lazy(() => import('./pages/Menu'))
const Reservation = lazy(() => import('./pages/Reservation'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))

function LoadingFallback() {
  return (
    <div className="pt-16 min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-600">Chargement...</p>
      </div>
    </div>
  )
}

function CookieConsentWrapper() {
  const { acceptAll, acceptNecessary, savePreferences, hasConsented } = useCookieConsent()

  if (hasConsented) return null

  return (
    <CookieConsent
      onAcceptAll={acceptAll}
      onAcceptNecessary={acceptNecessary}
      onSavePreferences={savePreferences}
    />
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-stone-50 text-stone-900">
          <Navigation />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Routes>
            </Suspense>
          </motion.main>
          <Footer />
          <AnimatePresence>
            <CookieConsentWrapper />
          </AnimatePresence>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
