import React, { useEffect } from "react"
import Head from "next/head"
import { useRouter } from 'next/router'

import { attachEventEmitter, eeReady } from '../eventEmitter'
import { EmitterEvents } from '../eventEmitter/types'
import { attachTrackingState, pollTrack } from '../tracker'

const { NAVIGATE, PAGE_VIEW } = EmitterEvents

const Layout = (await import('shared/Layout')).default

type Props = {
  Component: React.FC<any>,
  pageProps: {
    page: {
      title: string
    }
  } | undefined
}

function MyApp({ Component, pageProps }: Props) {
  const router = useRouter()

  useEffect(() => {
    attachEventEmitter()
    attachTrackingState()

    if (!eeReady()) return

    window.ee.on(NAVIGATE, (url: string) => {
      console.log('Navigate detected')
      router.push(url)
      pollTrack(PAGE_VIEW)
    })

    // Register interest in sending information for pageView event
    window.ee.on(`${PAGE_VIEW}:poll`, ({ guid }: { guid: string }) => {
      const key = `${PAGE_VIEW}:${guid}`
      window.ee.emit(`${key}:register`, guid)
      window.ee.once(`${key}:collect`, () => {
        window.ee.emit(
          `${key}:data`,
          guid,
          {
            page: {
              url: window.location.pathname
            }
          }
        )
      })
    })
  }, [])
  
  const { title = 'Dunelm MFE Example' } = pageProps.page || {}

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <script src="http://localhost:3001/web/remoteEntry.js" defer />
        <script src="http://localhost:3002/web/remoteEntry.js" defer />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
