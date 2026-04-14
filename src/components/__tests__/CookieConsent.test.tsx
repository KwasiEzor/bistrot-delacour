import { render, screen, fireEvent, renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CookieConsentBanner from '../CookieConsent'
import { useCookieConsent } from '../../hooks/useCookieConsent'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useCookieConsent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with null consent if nothing in localStorage', () => {
    const { result } = renderHook(() => useCookieConsent())
    expect(result.current.consent).toBeNull()
  })

  it('should initialize with stored consent from localStorage', () => {
    const prefs = { necessary: true, analytics: true, marketing: false }
    localStorage.setItem('bistrot-cookie-consent', JSON.stringify(prefs))
    
    const { result } = renderHook(() => useCookieConsent())
    
    // Note: in current implementation, this might need an effect cycle
    // but we'll see if our fix makes it immediate
    expect(result.current.consent).toEqual(prefs)
  })

  it('should update consent when acceptAll is called', () => {
    const { result } = renderHook(() => useCookieConsent())
    act(() => {
      result.current.acceptAll()
    })
    expect(result.current.consent).toEqual({
      necessary: true,
      analytics: true,
      marketing: true,
    })
  })
})

describe('CookieConsentBanner', () => {
  it('should render correctly', () => {
    const onAcceptAll = vi.fn()
    const onAcceptNecessary = vi.fn()
    const onSavePreferences = vi.fn()

    render(
      <CookieConsentBanner
        onAcceptAll={onAcceptAll}
        onAcceptNecessary={onAcceptNecessary}
        onSavePreferences={onSavePreferences}
      />
    )

    expect(screen.getByText('Paramètres des cookies')).toBeInTheDocument()
    expect(screen.getByText('Tout accepter')).toBeInTheDocument()
  })

  it('should call onAcceptAll when the button is clicked', () => {
    const onAcceptAll = vi.fn()
    render(
      <CookieConsentBanner
        onAcceptAll={onAcceptAll}
        onAcceptNecessary={vi.fn()}
        onSavePreferences={vi.fn()}
      />
    )

    fireEvent.click(screen.getByText('Tout accepter'))
    expect(onAcceptAll).toHaveBeenCalled()
  })
})
