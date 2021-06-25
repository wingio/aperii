import Document, { Html, Head, Main, NextScript } from 'next/document'
import {useState} from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <meta property="og:site_name" content="Aperii" />
          <meta name="theme-color" content="#9d4d4d" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script defer src="/scripts/themer.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument