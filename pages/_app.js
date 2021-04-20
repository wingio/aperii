import styles from '../styles/globals.css'
import Head from 'next/head'
import Search from '../components/Search'

function MyApp({ Component, pageProps }) {
  return (<div>
    <Head>
      <meta property="og:site_name" content="Aperii" />
      <meta property="og:url" content="https://aperii.wingio.xyz/" />
      <meta itemprop="image" content="public/logo.png" />
      <meta name="description" content="Aperii is an open-source social media designed to function like Twitter, but aims to fix many of it's problems." />
    </Head>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
