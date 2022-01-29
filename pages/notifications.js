import Head from 'next/head'
import styles from '../styles/Demo.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Post'
import Layout from '../layouts/Layout'
import {useState, useEffect} from 'react'
import NotiFeed from '../components/NotiFeed'

import MakePostModal from '../components/MakePostModal'
import Changelog from '../components/Changelog'
import * as info from '../info.json'
import { Constants as consts, API_BASE_URL } from '../constants'
const c = new consts()

export default function Demo( { posts, user } ) {
  var expStore = {}
  if (typeof window !== "undefined") {
    var expStore = localStorage.getItem('experiments') ? JSON.parse(localStorage.getItem('experiments')) : {}
  }


  if (typeof window !== "undefined") {
    var token = localStorage.getItem('token')
    if (token) {
      fetch(`${API_BASE_URL}/auth/validate`, {
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

  return <Layout user={user} misc={expStore} page="notis" title="Notifications">
    <Head>
      <title>Notifications - Aperii</title>
      <meta property="og:title" content="Aperii" />
      <meta property="og:description" content="A free, more open social experience" />
      <meta property="og:image" content="/logo_circle.png"/>
    </Head>
    <NotiFeed notis={posts} user={user}/>
  </Layout>
}

export async function getServerSideProps(context) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var res;
  var userres;

  res = await fetch(`${API_BASE_URL}/users/@me/notifications`, {
    method: 'GET',
    headers: {
      authorization: context.req.cookies.token
    }
  })

  userres = await fetch(`${API_BASE_URL}/users/@me`, {
    method: 'GET',
    headers: {
      authorization: context.req.cookies.token
    }
  })


  var result = await res.json()
  var user = await userres.json()
  return user.error || result.error ? {
    redirect: {
      destination: '/',
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