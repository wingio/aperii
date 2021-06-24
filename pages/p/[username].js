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
import EditProfileModal from '../../components/EditProfileModal'
import Button from '../../components/Button'
import VerifiedBadge from '../../components/VerifiedBadge'
import {useState} from 'react'
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


  const [pOpened, setpOpened] = useState(false)
  const [vanished, setVanished] = useState(false)
  var closeProfile = () => {
    setVanished(true)
    setTimeout(() => {
      setpOpened(false)
    }, 25)
  }

  var openProfile = () => {
    setVanished(false)
    setpOpened(true)
  }

  posts = !user.suspended ? posts : [c.getSuspendedPost(user)]
  
  return (
    <>
    <Head>
        <title>{`${profile.displayName} (@${profile.username})`} - Aperii</title>
        <meta property="og:title" content={`${profile.displayName} (@${profile.username})`}  key="title"/>
        <meta property="og:url" content={"https://aperii.com/p/" + profile.username}  key="url"/>
        <meta property="og:description" content={profile.bio ? profile.bio : 'This user has no bio'} key="desc"/>
        <meta property="og:image" content={profile.avatar ? profile.avatar : '/av.png'} key="image"/>
      </Head>
    <Layout user={user} misc={expStore} page={profile.username == user.username ? 'profile' : 'home'} title={profile.displayName} showBadge={profile.verified} showCount={true} postCount={posts.length}>
      
      <div className={styles.user}>
        <div className={styles.banner}>
          
        </div>
        {pOpened ? <EditProfileModal user={user} closeAction={closeProfile} showVanish={vanished}/> : ''}
        <img className={styles.avatar} src={profile.avatar ? profile.avatar : '/av.png'}></img>
        <div className={styles.userinfo}>
          <p>{profile.displayName}{profile.verified ? <VerifiedBadge className={styles.badge} /> : ''}</p>
          <p className={styles.username}>@{profile.username}</p>
        </div>
        {profile.username == user.username ? <Button label="Edit Profile" btnstyle="primary" onClick={openProfile} style={{marginLeft: "1em"}} /> : ''}
        <div className={styles.miscInfo}>
          {profile.flags.staff || profile.flags.admin ? <Icon name="logo" width=".9rem" color="var(--border-grey)" className={styles.joinDateIcon}/> : ''}
          <p style={{color: "#888"}} className={styles.joinDate}>{profile.flags.early_supporter ? <Icon name="star" width=".9rem" style={{color: "#e2ec56"}} fill="#e2ec56" className={styles.joinDateIcon}/> : ''} <Calender width=".9rem" fill="#888" className={styles.joinDateIcon}></Calender> Joined {moment(profile.joinedTimestamp).format('MMMM YYYY')}</p>
        </div>
      </div>
      <PostFeed posts={posts}></PostFeed>
    </Layout>
    </>
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
      username: '404',
      joinedTimestamp: Date.now()
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
    username: '404',
  }

  profile.flags = profile.flags ? c.getFlagsFromBitfield(profile.flags) : c.getFlagsFromBitfield(0)
  profile.avatar = profile.suspended ? '/av.png' : profile.avatar
  return {
    props: {
      profile,
      posts: profile.posts ? profile.posts : profile.suspended ? [c.getSuspendedPost(profile)] : [],
      user: user.status ? {
        displayName: 'User not found',
        username: '404',
        joinedTimestamp: Date.now()
      } : user
    }
  }

}
