import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  function signup(e){
    e.preventDefault()
    var data = {
      username: e.target.form[0].value,
      email: e.target.form[1].value,
      password: e.target.form[2].value
    }
    e.target.form[3].disabled = true
    console.log(data)
  }
  return (
    <div>
      <Head>
        <meta property="og:title" content="Home" />
        <title>Home | OpenTwitter</title>
      </Head>
      <div className={styles.signup}>
        <form onSubmit={signup}>
          <input id='username' type='text'></input>
          <input id='email' type='text'></input>
          <input id='password' type='password'>
          </input><button id='signup' onClick={signup}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}