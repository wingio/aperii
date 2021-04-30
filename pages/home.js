import Head from 'next/head'
import styles from '../styles/Demo.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Post'
import Layout from '../layouts/Layout'
import {useState, useEffect} from 'react'
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

export default function Demo( { posts } ) {
  if (typeof window !== "undefined") {
    var token = localStorage.getItem('token')
    if (token) {
      fetch('https://localhost/auth/validate', {
        method: 'POST',
        headers: {
          authorization: token
        }
      }).then(async res => {
        var result = await res.json()
        if (result.status) {
          window.location = '/'
        }
      })
    } else {
      window.location = '/'
    }
  }
  
    

  useEffect(() => {
    
    return () => {
    }
  }, [posts])

  return <Layout>
    <Head>
      <title>Home - Aperii</title>
      <meta property="og:title" content="Aperii" />
      <meta property="og:description" content="A free, more open social experience" />
      <meta property="og:image" content="/logo_circle.png"/>
    </Head>
    {posts.map(p => <Post data={p} key={p.id}></Post>)}
  </Layout>
}

export async function getServerSideProps(context) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var res = await fetch('https://aperii.com/api/v1/posts/all', {
      method: 'GET',
      headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1NzUyNzg2NzI1MDcyNzkzODIzIiwiaWF0IjoxNjE4ODc5NDc4fQ.1NXFEaBvsBTsgNUwJjcbIxA6MGRrjhppOFhTx9azOtk'
      }
    })
  var result = await res.json()
  console.log(context.req.cookies)
  return {props: {posts: result}}
}