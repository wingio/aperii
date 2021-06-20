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
        </Head>
        <body className="dark">
          <Main />
          <NextScript />
          <script defer src="themer.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument