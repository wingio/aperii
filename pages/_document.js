import Document, { Html, Head, Main, NextScript } from 'next/document'
import {useState} from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: "dark"
    };
  }

  render() {
    if(typeof window != "undefined"){
      
    }

    this.componentDidMount = () => {
      console.log('hi')
      this.setState({theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"})
    }
    
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
        </Head>
        <body className={this.state.theme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument