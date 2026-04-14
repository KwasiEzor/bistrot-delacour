import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap'

export const generateMetadata = ({ params, searchParams }: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: any) => RootPage({ params, searchParams, config, importMap }) // eslint-disable-line @typescript-eslint/no-explicit-any

export default Page
