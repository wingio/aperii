import Head from 'next/head'
import styles from '../styles/Demo.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Post'
import Layout from '../layouts/Layout'
import {useState, useEffect} from 'react'
import PostFeed from '../components/PostFeed'

import MakePostModal from '../components/MakePostModal'
import Changelog from '../components/Changelog'
import * as info from '../info.json'

export default function Demo( { posts, user } ) {
  var expiramentsEnabled = false
  var showChangelog = true
  if (typeof window !== "undefined") {
    var exp = localStorage.getItem('enableExpirements')
    var vers = localStorage.getItem('currentVersion')
    if(exp){
      exp == true || exp == "true" ? expiramentsEnabled = true : expiramentsEnabled = false
    }
    if(vers){
      showChangelog = (vers != info.version)
    }
  }


  if (typeof window !== "undefined") {
    var token = localStorage.getItem('token')
    if (token) {
      fetch('https://aperii.com/api/v1/auth/validate', {
        method: 'POST',
        headers: {
          authorization: token
        }
      }).then(async res => {
        var result = await res.json()
        if (result.status) {
          window.location = '/'
        } else {
          document.cookie = "token=" + result.token
        }
      })
    } else {
      window.location = '/'
    }
  }

  return <Layout user={user}>
    <Head>
      <title>Home - Aperii</title>
      <meta property="og:title" content="Aperii" />
      <meta property="og:description" content="A free, more open social experience" />
      <meta property="og:image" content="/logo_circle.png"/>
    </Head>
    {expiramentsEnabled && showChangelog ? <Changelog/> : ''}
    <PostFeed posts={posts}></PostFeed>
  </Layout>
}

export async function getServerSideProps(context) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var res;
  var userres;

  res = await fetch('https://aperii.com/api/v1/posts/all', {
    method: 'GET',
    headers: {
      authorization: context.req.cookies.token
    }
  })

  userres = await fetch('https://aperii.com/api/v1/me', {
    method: 'GET',
    headers: {
      authorization: context.req.cookies.token
    }
  })


  var result = await res.json()
  var user = await userres.json()
  return user.status ? {
    redirect: {
      href: '/',
      permenant: false
    }
  } : {
    props: {
      posts: result.sort((a, b) => {
        return (a.createdTimestamp > b.createdTimestamp) ? -1 : (a.createdTimestamp > b.createdTimestamp) ? 1 : 0
      }),
      user
    }
  }
}