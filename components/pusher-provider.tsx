'use client'

import {
  PusherProvider as NextPusherProvider,
  PusherProviderProps,
} from '@harelpls/use-pusher'
import * as React from 'react'

export function PusherProvider({
  children,
  ...config
}: PusherProviderProps & { children: React.ReactNode }) {
  return <NextPusherProvider {...config}>{children}</NextPusherProvider>
}
