import { PusherProvider } from '@/components/pusher-provider'
import { StatusProvider } from '@/components/status-context'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'

import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'Remote Controller'
const APP_DEFAULT_TITLE = 'Remote Controller'
const APP_DESCRIPTION = 'Control your shutters remotely'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
}

const config = {
  clientKey: process.env.PUSHER_KEY!,
  cluster: process.env.PUSHER_CLUSTER!,
  authEndpoint: '/api/pusher/auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ClerkProvider afterSignOutUrl="/">
          <PusherProvider {...config}>
            <StatusProvider>{children}</StatusProvider>
          </PusherProvider>
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  )
}
