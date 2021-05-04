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
    <div style={{position: "fixed", right: "20px", bottom: "20px", color: "white", padding: "1em", background: "#1e262ea1", borderRadius: ".75em", fontSize:"small", lineHeight: "2em"}}>{`Version: ${info.version}`}<br></br>{`API: v${info.apiVersion}`}</div>
  </div>)
}

export default MyApp
