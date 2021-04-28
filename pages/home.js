import Head from 'next/head'
import styles from '../styles/Demo.module.css'
import Search from '../components/Search'
import Post from '../components/Post'
import * as PostEx from '../Post'
import Layout from '../layouts/Layout'


export default function Demo() {
  return <Layout>
    <Head>
      <title>Home - Aperii</title>
      <meta property="og:title" content="Aperii" />
      <meta property="og:description" content="A free, more open social experience" />
      <meta property="og:image" content="/logo_circle.png"/>
    </Head>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
    <Post id={'gwdtfwtyf56wsdt76'}></Post>
  </Layout>
}
