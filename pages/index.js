import Head from 'next/head'
import styles from '../styles/Home.module.css'
var prod = false
export default function Home() {
  async function signup(e){
    e.preventDefault()
    var data = {
      displayName: e.target.form[0].value,
      username: e.target.form[1].value,
      email: e.target.form[2].value,
      password: e.target.form[3].value
    }
    e.target.form[4].disabled = true
    var res = await fetch('http://127.0.0.1:5000/auth/signup', {
      method: 'POST',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(await res.json())
  }
  return (
    <div>
      <Head>
        <meta property="og:title" content="Home" />
        <title>Home | aperii</title>
      </Head>
      <div className={`${styles.signup} forms`}>
        {prod ? <form className="login-form" onSubmit={signup}>
          <h1>Sign Up</h1>
          <label htmlFor="displayname">Display Name</label>
          <input type="text" name="displayname" id="displayname" placeholder=" " autoComplete="off" className="form-control-material" required />
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder=" " autoComplete="off" className="form-control-material" required />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder=" " autoComplete="off" className="form-control-material" required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder=" " autoComplete="off" className="form-control-material" required />
          <button type="submit" className="btn btn-primary btn-ghost" onClick={signup}>Sign Up</button>
        </form> : ''}
      </div>
    </div>
  )
}