import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import '../styles/main.css'

export default function Nextra({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/feed.xml"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
