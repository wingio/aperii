import Head from 'next/head'
import styles from '../../styles/User.module.css'
import Search from '../../components/Search'
import Post from '../../components/Post'
import * as PostEx from '../../Users'
import * as users from '../../Users'
import Layout from '../../layouts/Layout'
import PostFeed from '../../components/PostFeed'
import Badge from '../../icons/Badge'
import Calender from '../../icons/Calender'
import moment from 'moment'
import consts from '../../constants'
import Icon from '../../icons/Icon'
const c = new consts()

export default function User({profile, posts, user}) {
  var expStore = {}
  var expiramentsEnabled = false
  if (typeof window !== "undefined") {
    var exp = localStorage.getItem('enableExperiments')
    var expStore = localStorage.getItem('experiments') ? JSON.parse(localStorage.getItem('experiments')) : {}
    if(exp){
      exp == true || exp == "true" ? expiramentsEnabled = true : expiramentsEnabled = false
    }
  }

  return (
    <Layout user={user} misc={expStore} page={profile.username == user.username ? 'profile' : 'home'}>
      <Head>
        <meta property="og:title" content={`${profile.displayName} (@${profile.username})`} />
        <meta property="og:description" content={profile.bio ? profile.bio : 'This user has no bio'} />
        <meta property="og:image" content={profile.avatar ? profile.avatar : '/av.png'} />
        <title>{`${profile.displayName} (@${profile.username})`} - Aperii</title>
      </Head>
      <div className={styles.user}>
        <div className={styles.banner}>
          
        </div>
        <img className={styles.avatar} src={profile.avatar ? profile.avatar : '/av.png'}></img>
        <div className={styles.userinfo}>
          <p>{profile.displayName}{profile.verified ? <Badge width="1.2rem" className={styles.badge}></Badge> : ''}</p>
          <p className={styles.username}>@{profile.username}</p>
        </div>
        <div className={styles.miscInfo}>
          <p style={{color: "#888"}} className={styles.joinDate}>{profile.flags.early_supporter ? <Icon name="star" width=".9rem" fill="#e2ec56" /> : ''} <Calender width=".9rem" fill="#888" className={styles.joinDateIcon}></Calender>Joined {moment(profile.joinedTimestamp).format('MMMM YYYY')}</p>
        </div>
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

  user.flags = user.flags ? c.getFlagsFromBitfield(user.flags) : c.getFlagsFromBitfield(0)
  
  return {
    props: {
      profile,
      posts: profile.posts,
      user: user.status ? {
        displayName: 'User not found',
        username: '404',
        joinedTimestamp: Date.now()
      } : user
    }
  }

}
