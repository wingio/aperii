import Head from 'next/head'
import Layout from '../../layouts/Layout'
import consts from '../../constants'
const c = new consts()
import {useRouter} from 'next/router'
import Link from 'next/link'

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

  return (
  <Layout user={user} misc={expStore} page="settings" title="Settings">
    <Head>
      <title>Settings - Aperii</title>
      <meta property="og:title" content="Aperii" />
      <meta property="og:description" content="A free, more open social experience" />
      <meta property="og:image" content="/logo_circle.png"/>
    </Head>
    <div>
      <Link href="/settings/account/info">
      <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: "1em", padding: "1em" }}>
        <h4 className="mg0">Account Information</h4>
      </div>
      </Link>
    </div>
  </Layout>
  )
}

export async function getServerSideProps(context) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var userres;

  userres = await fetch('https://aperii.com/api/v1/me', {
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