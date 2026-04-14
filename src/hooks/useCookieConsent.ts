import { useState } from 'react'

export const COOKIE_CONSENT_KEY = 'bistrot-cookie-consent'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (err) {
      console.error('Error parsing cookie consent:', err)
      return null
    }
  })

  const acceptAll = () => {
    const prefs: CookiePreferences = { necessary: true, analytics: true, marketing: true }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
    setConsent(prefs)
  }

  const acceptNecessary = () => {
    const prefs: CookiePreferences = { necessary: true, analytics: false, marketing: false }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
    setConsent(prefs)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
    setConsent(prefs)
  }

  return { consent, acceptAll, acceptNecessary, savePreferences, hasConsented: consent !== null }
}
