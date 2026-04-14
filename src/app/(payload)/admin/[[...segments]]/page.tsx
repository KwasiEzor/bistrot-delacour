import { RootPage, generateMetadata } from '@payloadcms/next/views'
import config from '@/payload.config'

export const metadata = generateMetadata({ config })

const Page = ({ params, searchParams }: any) => RootPage({ params, searchParams, config })

export default Page
