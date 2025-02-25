'use client'

import {
  PusherProvider as NextPusherProvider,
  type PusherProviderProps,
} from '@harelpls/use-pusher'
import type { ReactNode } from 'react'

export function PusherProvider({
  children,
  ...config
}: PusherProviderProps & { children: ReactNode }) {
  return <NextPusherProvider {...config}>{children}</NextPusherProvider>
}
