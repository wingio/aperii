import Document, { Html, Head, Main, NextScript } from 'next/document'
import {useState} from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const [theme, setTheme] = useState('dark')
    if(typeof window != "undefined"){
      setTheme(localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark")
    }

    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <body className={theme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument