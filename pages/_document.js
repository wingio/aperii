import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    var theme = "dark"
    if(typeof document != "undefined"){
      theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
    }

    return (
      <Html style={{background: '#0b0e11'}} lang="en">
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