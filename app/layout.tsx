import { PusherProvider } from '@/components/pusher-provider'
import { StatusProvider } from '@/components/status-context'
import { Analytics } from '@vercel/analytics/react'
import { cx } from 'class-variance-authority'

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Remote Controller',
  description: 'Control your shutters remotely',
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
    <html lang="en">
      <body className={cx(inter.className, 'dark')}>
        <PusherProvider {...config}>
          <StatusProvider>{children}</StatusProvider>
        </PusherProvider>
        <Analytics />
      </body>
    </html>
  )
}
