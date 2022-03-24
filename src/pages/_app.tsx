import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import HeadComponent from '@/components/HeadComponent'
import FooterComponent from '@/components/FooterComponent'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  )
}

export default MyApp
