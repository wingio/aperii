import Head from 'next/head'
import styles from '../styles/Demo.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Post'


export default function Demo() {
  return (
    <div>
      <Head>
        <meta property="og:title" content="Demo" />
        <title>Demo | aperii</title>
      </Head>
      <div className={`ui`}>
          <div className={`sticky left`}>
            <span className={`logo`}></span>
          </div>
          <div className={`feed`}>
            <Search></Search>
            <Post id={'gwdtfwtyf56wsdt76'}></Post>
          </div>
          <div className={`sticky right`}>
            <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'}></img>
          </div>
        </div>
      
    </div>
  )
}
