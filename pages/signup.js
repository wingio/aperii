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
    var data = {
      displayName: e.target[0].value,
      username: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value
    }
    e.target[4].disabled = true
    var res = await fetch('https://aperii.com/api/v1/auth/signup', {
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
      e.target.form[4].disabled = false
    } else {
      setError(false)
      setErrorMsg('')
      setErrorInput('')
      if (typeof window !== "undefined") {
        localStorage.setItem('token', result.token)
        document.cookie = "token=" + result.token
      }
      window.location = '/home'
    }
    return false
  }

  
  
  return (
    <div className="form-container">
      <Head>
        <meta property="og:title" content="Home" />
        <title>Sign Up | aperii</title>
      </Head>
      <div className={`forms`}>
        {prod ? <form className="login-form" onSubmit={signup}>
          <h1>{names.signup}</h1>
          
          <input type="text" name="displayname" id="displayname" placeholder={names.displayName} autoComplete="off" className={`form-control-material ${errorInput == 'displayname' ? 'input-error' : ''}`} required />
          
          <input type="text" name="username" id="username" placeholder={names.username} autoComplete="off" className={`form-control-material ${errorInput == 'username' ? 'input-error' : ''}`} required />
          
          <input type="text" name="email" id="email" placeholder={names.email} autoComplete="off" className={`form-control-material ${errorInput == 'email' ? 'input-error' : ''}`} required />
          
          <input type="password" name="password" id="password" placeholder={names.password} autoComplete="off" className={`form-control-material ${errorInput == 'password' ? 'input-error' : ''}`} required />
          <button type="submit" className="btn btn-primary btn-ghost" onClick={signup}>{names.signup}</button>
          {hasError ? <p className="errorText">{errorMsg}</p> : ''}
        </form> : ''}
      </div>
    </div>
  )
}