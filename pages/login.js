import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'

import lang from '../public/resc/lang.json'
const names = lang['en-US']

var prod = true
export default function Home() {
  if (typeof window !== "undefined") {
  var token = localStorage.getItem('token')
  if (token && prod == true) {
    fetch('https://aperii.com/api/v1/auth/validate', {
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

  const [hasError, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [errorInput, setErrorInput] = useState('')

  async function signup(e){
    e.preventDefault()
    console.log(e)
    var data = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    e.target[2].disabled = true
    var res = await fetch('https://aperii.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(data)
    })
    var result = await res.json()
    if(result.status){
      setError(true)
      setErrorMsg(result.error)
      var inputCause = result.error.toLowerCase().includes('password') ? 'password' : result.error.toLowerCase().includes('display name') ? 'displayname' : result.error.toLowerCase().includes('password') ? 'password' : result.error.toLowerCase().includes('username') ? 'username' : 'email'
      setErrorInput(inputCause)
      e.target.form[2].disabled = false
    } else {
      setError(false)
      setErrorMsg('')
      setErrorInput('')
      if (typeof window !== "undefined") {
        localStorage.setItem('token', result.token)
        if(result.username == "wing"){
          localStorage.setItem('enableExpirements', "true")
        }
        document.cookie = "token=" + result.token
      }
      window.location = '/home'
    }
    return false
  }

  
  
  return (
    <div className="form-container">
      <Head>
      <meta property="og:title" content="Log In" />
        <meta property="og:description" content="Log in to your Aperii account" />
        <meta property="og:image" content="/logo_circle.png" />
        <title>Log In - Aperii</title>
      </Head>
      <div className={`forms`}>
        {prod ? <form className="login-form" onSubmit={signup}>
          <h1>{names.login}</h1>
          <input type="text" name="username" id="username" placeholder={names.username} autoComplete="off" className={`form-control-material ${errorInput == 'username' ? 'input-error' : ''}`} required />
          <input type="password" name="password" id="password" placeholder={names.password} autoComplete="off" className={`form-control-material ${errorInput == 'password' ? 'input-error' : ''}`} required />
          <button type="submit" className="btn btn-primary btn-ghost">{names.login}</button>
          {hasError ? <p className="errorText">{errorMsg}</p> : ''}
        </form> : ''}
      </div>
    </div>
  )
}