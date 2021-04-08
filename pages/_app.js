import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <div><Head>
  <meta property="og:title" content="OpenTwitter" />
  <meta property="og:description" content="Open source replacement for Twitter" />
  <meta property="og:url" content="https://opentwitter.wingio.xyz/" />
</Head> <Component {...pageProps} /></div>
}

export default MyApp
