import styles from '../styles/globals.css'
import Head from 'next/head'
import Search from '../components/Search'
import * as info from '../info.json'

function MyApp({ Component, pageProps }) {
  return (<div>
    <Head>
      <meta property="og:site_name" content="Aperii" />
      <meta property="og:url" content="https://aperii.wingio.xyz/" />
      <meta itemprop="image" content="public/logo.png" />
      <meta name="description" content="A free, more open social experience" />
    </Head>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
