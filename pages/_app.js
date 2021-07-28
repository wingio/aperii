import styles from '../styles/globals.css'
import Head from 'next/head'
import Search from '../components/Search'
import * as info from '../info.json'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register('/sw.js').then(r => {
        console.log("Registered with scope: " + r.scope)
      }, e => {console.log("Error registering")})
    }
  }, [])
  return (<div>
    <Component {...pageProps} />
  </div>)
}

export default MyApp
