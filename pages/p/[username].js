import Head from 'next/head'
import styles from '../../styles/User.module.css'
import Search from '../../components/Search'
import Post from '../../components/Post'
import * as PostEx from '../../Users'
import * as users from '../../Users'
import Layout from '../../layouts/Layout'
import PostFeed from '../../components/PostFeed'
export default function User({profile, posts}) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`
  
  return (
    <Layout>
      <Head>
        <meta property="og:title" content={`${profile.displayName} (@${profile.username})`} />
        <meta property="og:description" content={profile.bio ? profile.bio : 'This user has no bio'} />
        <meta property="og:image" content={profile.avatar ? profile.avatar : '/logo_circle.png'} />
        <title>{`${profile.displayName} (@${profile.username})`} - Aperii</title>
      </Head>
      <div className={styles.user}>
        <div className={styles.banner}>
          <img className={styles.avatar} src={profile.avatar ? profile.avatar : '/av.png'}></img>
        </div>
        <p>Hello, {profile.username}</p>
      </div>
      <PostFeed posts={posts}></PostFeed>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  var res = await fetch('https://aperii.com/api/v1/profiles/' + context.params.username, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: context.req.cookies.token
    }
  })
  var profile = await res.json()

  if (profile.status) {
    profile = {
      displayName: 'User not found',
      username: '404'
    }
  }
  var userres;
  if (context.req.cookies.token) {
     userres = await fetch('https://aperii.com/api/v1/me', {
      method: 'GET',
      headers: {
        authorization: context.req.cookies.token
      }
    })
  }

  var user = userres ? await userres.json() : {
    displayName: 'User not found',
    username: '404'
  }

  return {
    props: {
      profile,
      posts: profile.posts,
      user: user.status ? {
        displayName: 'User not found',
        username: '404'
      } : user
    }
  }

}
