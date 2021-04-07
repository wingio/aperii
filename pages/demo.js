import Head from 'next/head'
import styles from '../styles/Demo.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Post'


export default function Demo() {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`
  return (
    <div className={styles.ui}>
      <div className={classesL}>
        <span className={styles.logo}></span>
      </div>
      <div className={styles.feed}><Search></Search><Post id={'gwdtfwtyf56wsdt76'}></Post></div>
      <div className={classesR}><img className={styles.av} src={'https://avatars.githubusercontent.com/u/44992537?v=1'}></img></div>
    </div>
  )
}
