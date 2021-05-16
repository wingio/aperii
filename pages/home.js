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

var post = {
  id: 'gwdtfwtyf56wsdt76',
  content: '<b>Lorem ipsum</b> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  author: {
      id: 'gyegyuf76645aw56d76a45',
      username: 'wing',
      displayName: 'Wing',
      verified: true,
      avatar: 'https://avatars.githubusercontent.com/u/44992537?v=1'
  },
  likes: 100,
  reposts: 5,
  replies: []
}

export default function Demo( { posts, user } ) {
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
    {user.username == 'wing' ? <Changelog user={user}/> : ''}
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
    // props: {
    //   posts: [{
    //     body: 'Nice try, but you need to log in',
    //     id: 'nicetry',
    //     createdTimestamp: Date.now(),
    //     author: {
    //       username: 'aperii',
    //       displayName: 'Aperii',
    //       verified: true,
    //       avatar: '/logo_circle.png',
    //       id: 'aperii',
    //       joinedTimestamp: Date.now()
    //     }
    //   }],
    //   user
    // }
  } : {
    props: {
      posts: result.sort((a, b) => {
        return (a.createdTimestamp > b.createdTimestamp) ? -1 : (a.createdTimestamp > b.createdTimestamp) ? 1 : 0
      }),
      user
    }
  }
}