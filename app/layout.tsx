import { PusherProvider } from '@/components/pusher-provider'
import { StatusProvider } from '@/components/status-context'
import { cx } from 'class-variance-authority'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Remote Controller',
  description: 'Control your shutters remotely',
}

const headers = new Headers()
headers.set('CF-Access-Client-Id', process.env.CF_ACCESS_CLIENT_ID!)
headers.set('CF-Access-Client-Secret', process.env.CF_ACCESS_CLIENT_SECRET!)

const config = {
  clientKey: process.env.PUSHER_KEY!,
  cluster: process.env.PUSHER_CLUSTER!,
  authEndpoint: `${process.env.VERCEL_URL}/api/pusher/auth`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx(inter.className, 'h-screen', 'dark')}>
        <PusherProvider {...config}>
          <StatusProvider>{children}</StatusProvider>
        </PusherProvider>
      </body>
    </html>
  )
}
