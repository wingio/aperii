import Head from 'next/head'
import styles from '../styles/User.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Users'
import * as users from '../Users'

export default function User({user}) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`
  
  return (
    <div className={styles.user}>
      <Head>
        <meta property="og:title" content={`${user.displayName} (@${user.username})`} />
        <meta property="og:description" content={user.bio} />
        <meta property="og:image" content={user.avatar} />
        <title>{`${user.displayName} (@${user.username})`} | aperii</title>
      </Head>
      <div className={`ui`}>
          <div className={`sticky left`}>
            <span className={`logo`}></span>
          </div>
          <div className={`feed`}>
            <Search></Search>
            <div className={styles.banner}><img className={styles.avatar} src={user.avatar}></img></div>
      <p>Hello, {user.username}</p>
          </div>
          <div className={`sticky right`}>
            <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'}></img>
          </div>
        </div>
      
    </div>
  )
}


export async function getServerSideProps(context) {
  const { username } = context.params
  var user = users.filter(u => u.username == username)[0]

  // Pass data to the page via props
  return { props: { user } }
}
