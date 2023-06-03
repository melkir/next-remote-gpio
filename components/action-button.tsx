'use client'

import { ActionType, sendCommand } from '@/app/mutation'
import { useStatusDispatch } from '@/components/status-context'
import { cn } from '@/lib/utils'
import { useChannel, useClientTrigger, useEvent } from '@harelpls/use-pusher'
import { useState } from 'react'
import { useZact } from 'zact/client'
import { Button, ButtonProps } from './ui/button'

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface ActionButtonProps extends ButtonProps {
  action: ActionType
  contextAction?: ActionType
}

export type ActionEvent = ActionType & { type: 'start' | 'end' }

export default function ActionButton(props: ActionButtonProps) {
  const { action, contextAction, ...buttonProps } = props
  const [isHover, setIsHover] = useState(false)
  const { mutate } = useZact(sendCommand)
  const channel = useChannel('private-gpio')
  const trigger = useClientTrigger(channel)
  const dispatch = useStatusDispatch()

  const eventName = 'client-action'

  useEvent<ActionEvent>(channel, eventName, (event) => {
    if (!event) return
    if (event.command === action.command && event.led === action.led) {
      setIsHover(event.type === 'start')
    }
  })

  const sendAction = async (action: ActionType) => {
    trigger(eventName, { ...action, type: 'start' })
    dispatch({ type: 'request' })
    await mutate(action)
    trigger(eventName, { ...action, type: 'end' })
    dispatch({ type: 'idle' })
  }

  return (
    <Button
      {...buttonProps}
      className={cn(props.className, {
        'text-accent-foreground': isHover,
        'bg-accent': isHover,
      })}
      onClick={async () => {
        await sendAction(action)
      }}
      onContextMenu={
        contextAction
          ? async (event) => {
              event.preventDefault()
              await sendAction(contextAction)
            }
          : undefined
      }
    />
  )
}
