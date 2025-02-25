'use client'

import {
  StatusContext,
  StatusDispatchContext,
} from '@/components/status-context'
import { cn } from '@/lib/utils'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { use } from 'react'
import type { ActionEvent } from './action-button'

export default function Status() {
  const status = use(StatusContext)
  const dispatch = use(StatusDispatchContext)

  const client = useChannel('private-gpio')

  useEvent(client, 'pusher:subscription_succeeded', () => {
    dispatch({ type: 'success' })
  })

  useEvent(client, 'pusher:subscription_error', () => {
    dispatch({ type: 'failure' })
  })

  useEvent<ActionEvent>(client, 'client-action', (event) => {
    if (!event) {
      return
    }
    dispatch(event.type === 'start' ? { type: 'request' } : { type: 'idle' })
  })

  return (
    <div
      className={cn('absolute top-0 h-4 w-72 rounded-b-full bg-accent', {
        [status.classname]: status.count > 0 || status.isLoading === false,
      })}
    />
  )
}
