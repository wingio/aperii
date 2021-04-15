import styles from '../styles/globals.css'
import Head from 'next/head'
import Search from '../components/Search'

function MyApp({ Component, pageProps }) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`

  
  return (<div>
    <Head>
      <meta property="og:site_name" content="aperii" />
      <meta property="og:url" content="https://aperii.wingio.xyz/" />
    </Head>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
