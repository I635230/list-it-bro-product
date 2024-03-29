import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/ui/header/header'
import Sidebar from '@/app/ui/sidebar/sidebar'
import styles from '@/app/styles.module.css'
import { AppProvider } from '@/app/provider'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'List It Bro',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          rel="stylesheet"
        ></link>
      </head>
      <body className={inter.className}>
        <Suspense>
          <AppProvider>
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <Header />
              </div>
              <div className={styles.main}>
                <div className={styles.sidebar}>
                  <Sidebar />
                </div>
                <div className={styles.content}>{children}</div>
              </div>
            </div>
          </AppProvider>
        </Suspense>
        <script
          src="https://kit.fontawesome.com/8de743f310.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  )
}
