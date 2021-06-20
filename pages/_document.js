import Document, { Html, Head, Main, NextScript } from 'next/document'
import {useState} from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    var theme;
    if(typeof window != "undefined"){
      theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
    }

    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <body className={theme ? theme : "dark"}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument