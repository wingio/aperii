import Head from 'next/head'
import styles from '../styles/User.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Users'
import { useRouter } from 'next/router'
import * as users from '../Users'

export default function User({data}) {
  const classesR = `${styles.sticky} ${styles.right}`
  const classesL = `${styles.sticky} ${styles.left}`
  const router = useRouter()
  const { username } = router.query
  var user = users.filter(u => u.username == username)[0]
  return (
    <div>
      <p>Hello, {username}</p>
    </div>
  )
}


export async function getServerSideProps() {
  var data = {
    hello: 'world'
  }

  // Pass data to the page via props
  return { props: { data } }
}
