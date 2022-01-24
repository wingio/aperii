import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import HomeFooter from '../components/HomeFooter'
var prod = true
export default function Home() {
  if (typeof window !== "undefined") {
    var token = localStorage.getItem('token')
    if (token && prod) {
      fetch('https://api.aperii.com/v2/auth/validate', {
        method: 'POST',
        headers: {
          authorization: token
        }
      }).then(async res => {
        var result = await res.json()
        if (!result.status) {
          document.cookie = "token=" + result.token
          window.location = '/home'
        }
      })

    }
  }
  return (
    <div>
      <Head>
        <meta property="og:title" content="Aperii" />
        <meta property="og:description" content="A free, more open social experience" />
        <meta property="og:image" content="/logo_circle.png"/>
        <title>Aperii</title>
      </Head>
        <Navbar></Navbar>
        <div className="blob" />
        <div className="logo-br" />
        <HomeFooter />
    </div>
  )
}