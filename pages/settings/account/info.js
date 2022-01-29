import Head from 'next/head'
import Layout from '../../../layouts/Layout'
import { Constants as consts, API_BASE_URL } from '../../../constants'
const c = new consts()
import {useRouter} from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import useLang from '../../../providers/useLang'
import { useState } from 'react'

export default function Demo( { user} ) {
  var expStore = {}
  if (typeof window !== "undefined") {
    var expStore = localStorage.getItem('experiments') ? JSON.parse(localStorage.getItem('experiments')) : {}
  }

  var router = useRouter()

  if (typeof window !== "undefined") {
    if(expStore['settings_page_06_20_21'] != 1) router.push('/home')
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

  const lang = useLang()
  const [text, setText] = useState(lang)

  return (
  <Layout user={user} misc={expStore} page="settings" title="Settings">
    <Head>
      <title>Settings - Aperii</title>
      <meta property="og:title" content="Aperii" />
      <meta property="og:description" content="A free, more open social experience" />
      <meta property="og:image" content="/logo_circle.png"/>
    </Head>
    <div>
      <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: ".9em", padding: "1em" }}>
        <h4 className="mg0">{text.username}</h4>
        <p className="mg0">@{user.username}</p>
      </div>
      <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: ".9em", padding: "1em" }}>
        <h4 className="mg0">{text.email}</h4>
        <p className="mg0">{user.email}</p>
      </div>
      <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: ".9em", padding: "1em" }}>
        <h4 className="mg0">{text.verified.text}</h4>
        <p className="mg0">{user.flags.verified ? "Yes" : "No"}</p>
      </div>
      <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: ".9em", padding: "1em" }}>
        <h4 className="mg0">{text.profile.joined}</h4>
        <p className="mg0">{moment(user.joinedTimestamp).format("dddd, MMMM Do YYYY, h:mma")}</p>
      </div>
    </div>
  </Layout>
  )
}

export async function getServerSideProps(context) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var userres;

  userres = await fetch(`${API_BASE_URL}/users/@me`, {
    method: 'GET',
    headers: {
      authorization: context.req.cookies.token
    }
  })

  var user = await userres.json()
  
  return user.error ? {
    redirect: {
      destination: '/',
      permenant: false
    }
  } : {
    props: {
      user
    }
  }
}