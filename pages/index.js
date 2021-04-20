import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
var prod = true
export default function Home() {
  if (typeof window !== "undefined") {
    var token = localStorage.getItem('token')
    if (token && prod) {
      fetch('https://98.24.125.170:443/auth/validate', {
        method: 'POST',
        headers: {
          authorization: token
        }
      }).then(async res => {
        var result = await res.json()
        if (!result.status) {
          window.location = '/home'
        }
      })

    }
  }
  return (
    <div>
      <Head>
        <meta property="og:title" content="Home" />
        <title>Home | aperii</title>
      </Head>
        <Navbar></Navbar>
        <div className="blob" />
        <div className="logo-br" />
    </div>
  )
}