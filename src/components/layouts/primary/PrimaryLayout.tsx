import Head from 'next/head'
import type { ReactNode } from 'react'
import Header from '../../navigation/header/Header'

interface IPrimarayLayout {
  children: ReactNode
}

const PrimaryLayout = ({ children }: IPrimarayLayout) => {
  return (
    <>
      <Head>
        <title>Amazon 2.0 - Raphaël PICARD</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-screen-2xl mx-auto">{children}</main>
      </div>
    </>
  )
}

export default PrimaryLayout
