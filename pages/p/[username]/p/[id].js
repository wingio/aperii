import Head from 'next/head'
import Layout from '../../../../layouts/Layout'
import consts from '../../../../constants'
import {useState} from 'react'
import useLang from '../../../../providers/useLang'
import Post from '../../../../components/Post'
import {useRouter} from 'next/router'
const c = new consts()

export default function User({post, user}) {
  var expStore = {}
  var expiramentsEnabled = false
  if (typeof window !== "undefined") {
    var exp = localStorage.getItem('enableExperiments')
    var expStore = localStorage.getItem('experiments') ? JSON.parse(localStorage.getItem('experiments')) : {}
    if(exp){
      exp == true || exp == "true" ? expiramentsEnabled = true : expiramentsEnabled = false
    }
  }

  const lang = useLang()
  const [text, setText] = useState(lang)

  const router = useRouter()
  const {username} = router.query
  if(post.error){
    router.push('/home')
  }

  if(post.author.username != username){
    router.replace('/p/[username]/p/[id]', `/p/${post.author.username}/p/${post.id}`)
  }

  var profile = post.author
  
  return (
    <>
    <Head>
        <title>{`${profile.displayName} (@${profile.username})`} - Aperii</title>
        <meta property="og:title" content={`Post by ${profile.displayName} (@${profile.username})`}  key="title"/>
        <meta property="og:url" content={"https://aperii.com/p/" + profile.username + '/p/' + post.id}  key="url"/>
        <meta property="og:description" content={post.body} key="desc"/>
        <meta property="og:image" content={profile.avatar ? profile.avatar : '/av.png'} key="image"/>
      </Head>
    <Layout user={user} misc={expStore} page="home" title="Post">
      <Post data={post}></Post>
    </Layout>
    </>
  )
}


export async function getServerSideProps(context) {
  var res = await fetch('https://aperii.com/api/v1/posts/' + context.params.id, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: context.req.cookies.token
    }
  })
  var post = await res.json()

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

  
  user.flags = user.flags ? c.getFlagsFromBitfield(user.flags) : c.getFlagsFromBitfield(0)
  return {
    props: {
      post: post,
      user: user.status ? {
        displayName: 'User not found',
        username: '404',
        joinedTimestamp: Date.now()
      } : user
    }
  }

}