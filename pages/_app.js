import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <div><Head>
  <meta property="og:site_name" content ="OpenTwitter" />
  <meta property="og:url" content="https://opentwitter.wingio.xyz/" />
</Head> <Component {...pageProps} /></div>
}

export default MyApp
