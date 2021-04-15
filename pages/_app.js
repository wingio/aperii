import styles from '../styles/globals.css'
import Head from 'next/head'
import Search from '../components/Search'

function MyApp({ Component, pageProps }) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`

  
  if(typeof window !== 'undefined'){
    if(window.location.pathname == "/"){
      return (
        <div>
          <Head>
            <meta property="og:site_name" content="aperii" />
            <meta property="og:url" content="https://aperii.wingio.xyz/" />
          </Head>
          <Component {...pageProps} />
        </div>
      )
    } else {
      return (
        <div className={`ui`}>
          <div className={`sticky left`}>
            <span className={`logo`}></span>
          </div>
          <div className={`feed`}>
            <Search></Search>
            <Component {...pageProps} />
          </div>
          <div className={`sticky right`}>
            <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'}></img>
          </div>
        </div>
      )
    }

  } else {
    return null
  }
}

export default MyApp
