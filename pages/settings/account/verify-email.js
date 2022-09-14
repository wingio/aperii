import { useRouter } from "next/router"
import Head from "next/head"
import { useState } from "react"
import { API_BASE_URL } from "../../../constants"
import Layout from "../../../layouts/Layout"
import useLang from "../../../providers/useLang"
import Loading from '../../../icons/Loading'

export default function VerifyEmailPage( { user } ) {
    var expStore = {}
    if (typeof window !== "undefined") {
      var expStore = localStorage.getItem('experiments') ? JSON.parse(localStorage.getItem('experiments')) : {}
    }
  
    var router = useRouter()
    
    if (typeof window !== "undefined") {
      if(expStore['settings_page_06_20_21'] != 1) router.push('/home')
      var token = localStorage.getItem('token')
      if (token) {

        verifyEmail(router)

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
                <title>Verify your Email - Aperii</title>
                <meta property="og:title" content="Aperii" />
                <meta property="og:description" content="A free, more open social experience" />
                <meta property="og:image" content="/logo_circle.png"/>
            </Head>
            
            <div style={{color: "var(--text-color)", borderBottom: "1px solid var(--border-grey)", fontSize: ".9em", padding: "2em", display: "flex", justifyContent: "center" }}>
                <Loading style={{color: "rgba(255, 255, 255, .7)"}} height="8px" />
            </div>
        </Layout>
    )
}

async function verifyEmail(router) {
    var token = localStorage.getItem('token')
    if (token && router.query.token) {
        fetch(`${API_BASE_URL}/users/@me/verify`, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                verifyToken: router.query.token
            })
        }).then(res => res.json()).then(verifyResult => {
            if(!verifyResult.error) router.push("/settings/account")
        }).catch(e => {})
    }
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

    console.log(user)
    console.log(context.req.cookies.token)
    
    return user.error ? {
      redirect: {
        destination: '/login?redirect=%2Fsettings%2Faccount%2Fverify-email',
        permenant: false
      }
    } : {
      props: {
        user
      }
    }
}

 