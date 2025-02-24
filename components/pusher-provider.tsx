'use client'

import {
  PusherProvider as NextPusherProvider,
  type PusherProviderProps,
} from '@harelpls/use-pusher'

export function PusherProvider({
  children,
  ...config
}: PusherProviderProps & { children: React.ReactNode }) {
  return <NextPusherProvider {...config}>{children}</NextPusherProvider>
}
