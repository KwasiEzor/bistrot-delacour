import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import '@payloadcms/next/css'
import { importMap } from './admin/importMap'

export const metadata = {
  title: 'Payload Admin',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const serverFunction = async (args: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    'use server'
    return handleServerFunctions({
      ...args,
      config,
      importMap,
    })
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

export default Layout
