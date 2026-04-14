import { RootLayout } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import '@payloadcms/next/css'

export const metadata = {
  title: 'Payload Admin',
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout config={config}>{children}</RootLayout>
)

export default Layout
