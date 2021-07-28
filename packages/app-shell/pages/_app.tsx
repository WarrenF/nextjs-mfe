import React from "react"
import Head from "next/head"
import { useRouter } from 'next/router'
import { EventEmitter } from "inf-ee"

declare global {
  interface Window {
      ee: {
        emit: (eventName: string, args: unknown) => void
        on: (eventName: string, func: (data: unknown) => void) => void
      }
  }
}

// Required for react to be discovered correctly
// globalThis.React = React;

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    type EventSet = {
      navigate: (url: string) => void
    }
    window.ee = new EventEmitter<EventSet>()
    window.ee.on('navigate', url => router.push(url))
  }

  return (
    <>
      <Head>
        <title>Dunelm MFE Example</title>
        <meta name="description" content="Dunelm NextJS MFE Example" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <script src="http://localhost:3001/web/remoteEntry.js" defer />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
