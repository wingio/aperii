import Head from 'next/head'
import styles from '../../../styles/User.module.css'
import Layout from '../../../layouts/Layout'
import PostFeed from '../../../components/PostFeed'
import Calender from '../../../icons/Calender'
import moment from 'moment'
import { Constants as consts, API_BASE_URL } from '../../../constants'
import Icon from '../../../icons/Icon'
import EditProfileModal from '../../../components/EditProfileModal'
import Button from '../../../components/Button'
import VerifiedBadge from '../../../components/VerifiedBadge'
import {useState} from 'react'
import PostBody from '../../../components/PostBody'
import useLang from '../../../providers/useLang'
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

  const lang = useLang()
  const [text, setText] = useState(lang)

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
    <Layout user={user} misc={expStore} page={profile.username == user.username ? 'profile' : 'home'} title={profile.displayName} showBadge={profile.flags.verified} showCount={true} postCount={posts.length}>
      
      <div className={styles.user}>
        <div className={styles.banner}>
          
        </div>
        {pOpened ? <EditProfileModal user={user} closeAction={closeProfile} showVanish={vanished}/> : ''}
        <img className={styles.avatar} src={profile.avatar ? profile.avatar : '/av.png'}></img>
        <div className={styles.userinfo}>
          <p>{profile.displayName}{profile.flags.verified ? <VerifiedBadge className={styles.badge} /> : ''}</p>
          <p className={styles.username}>@{profile.username}</p>
        </div>
        <div className={styles.bio}><PostBody text={profile.bio} useTwemoji={expStore["use_twemoji_06_26_21"] == 1}></PostBody></div>
        {profile.username == user.username ? <Button label={text.profile.edit} btnstyle="primary" onClick={openProfile} style={{marginLeft: "1em"}} /> : ''}
        <div className={styles.miscInfo}>
          {profile.flags.staff || profile.flags.admin ? <Icon name="logo" width=".9rem" color="#888" className={styles.joinDateIcon}/> : ''}
          <p style={{color: "#888"}} className={styles.joinDate}>{profile.flags.early_supporter ? <Icon name="star" width=".9rem" style={{color: "#e2ec56"}} fill="#e2ec56" className={styles.joinDateIcon}/> : ''} <Calender width=".9rem" fill="#888" className={styles.joinDateIcon}></Calender> {text.profile.joined} {moment(profile.joinedTimestamp).format('MMMM YYYY')} {profile.pronouns ? `• ${profile.pronouns}` : ''}</p>
        </div>
      </div>
      <PostFeed posts={posts} useTwemoji={expStore["use_twemoji_06_26_21"] == 1}></PostFeed>
    </Layout>
    </>
  )
}


export async function getServerSideProps(context) {
  var res = await fetch(`${API_BASE_URL}/profiles/${context.params.username}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: context.req.cookies.token
    }
  })
  var profile = await res.json()

  if (profile.error) {
    profile = {
      displayName: 'User not found',
      username: '404',
      joinedTimestamp: Date.now(),
      avatar: '/av.png',
      suspended: false,
      posts: [],
      bio: "This user does not exist",
      flags: {
        verified: false,
        admin: false,
        staff: false,
        early_supporter: false
      }
    }
  }
  var userres;
  if (context.req.cookies.token) {
     userres = await fetch(`${API_BASE_URL}/users/@me`, {
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

 
  profile.avatar = profile.suspended ? '/av.png' : profile.avatar
  var suspendedArr = []
  suspendedArr.push(c.getSuspendedPost(profile))
  profile.posts = profile.suspended ? suspendedArr : profile.posts
  
  
  return {
    props: {
      profile,
      posts: profile.posts ? profile.posts : [],
      user: user.status ? {
        displayName: 'User not found',
        username: '404',
        joinedTimestamp: Date.now()
      } : user
    }
  }

}
