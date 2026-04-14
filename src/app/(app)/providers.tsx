'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CookieConsent from '@/components/CookieConsent'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      })
  )

  useEffect(() => {
    const persister = createSyncStoragePersister({
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    })

    persistQueryClient({
      queryClient,
      persister,
    })
  }, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
      <CookieConsentWrapper />
    </QueryClientProvider>
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
