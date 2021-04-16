import Head from 'next/head'
import styles from '../styles/User.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Users'
import * as users from '../Users'
import Layout from '../components/Layout'

export default function User({user}) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`
  
  return (
    <Layout>
      <Head>
        <meta property="og:title" content={`${user.displayName} (@${user.username})`} />
        <meta property="og:description" content={user.bio} />
        <meta property="og:image" content={user.avatar} />
        <title>{`${user.displayName} (@${user.username})`} | aperii</title>
      </Head>
      <div className={styles.user}>
      <div className={styles.banner}><img className={styles.avatar} src={user.avatar}></img></div>
      <p>Hello, {user.username}</p>
      </div>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  const { username } = context.params
  var user = users.filter(u => u.username == username)[0]

  // Pass data to the page via props
  return { props: { user } }
}
