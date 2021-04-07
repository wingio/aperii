import Head from 'next/head'
import styles from '../styles/Demo.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Post'

export default function Demo() {
  return (<div className={styles.content}>
    <div className={styles.ui}>
      <div className={styles.left}>
        <span className={styles.logo}></span>
      </div>
      <div className={styles.feed}><Search></Search><Post></Post></div>
      <div className={styles.right}><img className={styles.av} src={PostEx.author.avatar}></img></div>
    </div>
    </div>
  )
}
