import Head from 'next/head'
import styles from '../styles/User.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Users'
import { useRouter } from 'next/router'
import * as users from '../Users'

export default function User({data}) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`
  const router = useRouter()
  const { username } = router.query
  var user = users.filter(u => u.username == username)[0]
  return (
    <div className={styles.ui}>
      <Head>
        <meta property="og:title" content={`@${user.username}`} />
        <meta property="og:description" content={user.bio} />
        <meta property="og:image" content={user.avatar} />
      </Head>
      <div className={classesL}>
        <span className={styles.logo}></span>
      </div>
      <div className={styles.feed}><Search></Search><p>Hello, {username}</p></div>
      <div className={classesR}><img className={styles.av} src={'https://avatars.githubusercontent.com/u/44992537?v=1'}></img></div>
    </div>
  )
}


export async function getServerSideProps() {
  var data = {
    hello: 'world'
  }

  // Pass data to the page via props
  return { props: { data } }
}
