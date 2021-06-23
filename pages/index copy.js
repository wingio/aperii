import Head from 'next/head'
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter()
  router.push("https://discord.gg/Mryxr7zVtc")
  return (
    <div>
      <Head>
        <meta property="og:title" content="Discord" />
        <meta property="og:description" content="Join the official Aperii discord server!" />
        <meta property="og:image" content="/logo_circle.png"/>
        <meta property="og:url" content="https://discord.gg/Mryxr7zVtc" />
        <title>Redirecting...</title>
      </Head>
    </div>
  )
}