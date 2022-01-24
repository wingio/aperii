import Head from 'next/head'
import Layout from '../../layouts/Layout'
import consts from '../../constants'
const c = new consts()
import {useRouter} from 'next/router'
import Link from 'next/link'
import Icon from '../../icons/Icon'

export default function Demo( { user } ) {
  var expStore = {}
  if (typeof window !== "undefined") {
    var expStore = localStorage.getItem('experiments') ? JSON.parse(localStorage.getItem('experiments')) : {}
  }

  var router = useRouter()

  if (typeof window !== "undefined") {
    if(expStore['settings_page_06_20_21'] != 1) router.push('/home')
    var token = localStorage.getItem('token')
    if (token) {
      fetch('https://api.aperii.com/v2/auth/validate', {
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

  return (
  <Layout user={user} misc={expStore} page="settings" title="Settings">
    <Head>
      <title>Settings - Aperii</title>
      <meta property="og:title" content="Aperii" />
      <meta property="og:description" content="A free, more open social experience" />
      <meta property="og:image" content="/logo_circle.png"/>
    </Head>
    <div>
      <Link href="/settings/account">
      <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: ".9em", padding: "1em" }} className="settingsoption link">
        <div style={{display: "flex", alignContent: "center"}}>
            <h4 className="mg0">Account</h4>
            <Icon name="arrow" height="20px" style={{marginLeft: "auto", color: "var(--text-color)"}}></Icon>
        </div>
      </div>
      </Link>
      <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: ".8em", padding: "1em" }}>
        <h4 className="mg0">Copyright</h4>
        <p className="mg0">© 2021 Aperii</p>
        <br />
        <p className="mg0">Twemoji - Copyright 2020 Twitter, Inc and other contributors<br />Code licensed under the MIT License: http://opensource.org/licenses/MIT<br />Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/</p>
      </div>
    </div>
  </Layout>
  )
}

export async function getServerSideProps(context) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var userres;

  userres = await fetch('https://api.aperii.com/v2/users/@me', {
    method: 'GET',
    headers: {
      authorization: context.req.cookies.token
    }
  })

  var user = await userres.json()
  user.flags = user.flags ? c.getFlagsFromBitfield(user.flags) : c.getFlagsFromBitfield(0)
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