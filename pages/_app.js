import styles from '../styles/globals.css'
import Head from 'next/head'
import Search from '../components/Search'
import * as info from '../info.json'

function MyApp({ Component, pageProps }) {
  return (<div>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
