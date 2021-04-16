import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
var prod = false
export default function Home() {
  if (typeof window !== "undefined") {
  var token = localStorage.getItem('token')
  if (token && prod == true) {
    fetch('http://localhost:5000/auth/validate', {
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

  const [hasError, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [errorInput, setErrorInput] = useState('')

  async function signup(e){
    e.preventDefault()
    var data = {
      displayName: e.target.form[0].value,
      username: e.target.form[1].value,
      email: e.target.form[2].value,
      password: e.target.form[3].value
    }
    e.target.form[4].disabled = true
    var res = await fetch('http://localhost:5000/auth/signup', {
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
      }
      window.location = '/home'
    }
  }

  
  
  return (
    <div>
      <Head>
        <meta property="og:title" content="Home" />
        <title>Sign Up | aperii</title>
      </Head>
      <div className={`${styles.signup} forms`}>
        {prod ? <form className="login-form" onSubmit={signup}>
          <h1>Sign Up</h1>
          <label htmlFor="displayname">Display Name</label>
          <input type="text" name="displayname" id="displayname" placeholder=" " autoComplete="off" className={`form-control-material ${errorInput == 'displayname' ? 'input-error' : ''}`} required />
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder=" " autoComplete="off" className={`form-control-material ${errorInput == 'username' ? 'input-error' : ''}`} required />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder=" " autoComplete="off" className={`form-control-material ${errorInput == 'email' ? 'input-error' : ''}`} required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder=" " autoComplete="off" className={`form-control-material ${errorInput == 'password' ? 'input-error' : ''}`} required />
          <button type="submit" className="btn btn-primary btn-ghost" onClick={signup}>Sign Up</button>
          {hasError ? <p className="errorText">{errorMsg}</p> : ''}
        </form> : ''}
      </div>
    </div>
  )
}