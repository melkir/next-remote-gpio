'use client'

import { getCommand } from '@/app/mutation'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { Circle } from 'lucide-react'
import { useState } from 'react'
import ActionButton, { ActionButtonProps } from './action-button'

export function LedButton(props: ActionButtonProps) {
  const [isActive, setIsActive] = useState(false)
  const cache = useChannel('cache-gpio')

  useEvent<string>(cache, 'led', (led) => {
    setIsActive(led === 'ALL' || led === props.action.led)
  })

  // TODO: We should handle the cache_miss event on the api webhook
  // It doesn't seems to work properly on their side through
  // https://pusher.com/docs/channels/server_api/webhooks#pusher-cache-miss
  useEvent(cache, 'pusher:cache_miss', async () => {
    const led = await getCommand('led')
    setIsActive(led === 'ALL' || led === props.action.led)
  })

  return (
    <ActionButton
      {...props}
      className="w-12 h-12 rounded-full p-0"
      variant="ghost"
    >
      <Circle
        fill={isActive ? 'currentColor' : undefined}
        className="h-6 w-6"
      />
    </ActionButton>
  )
}
