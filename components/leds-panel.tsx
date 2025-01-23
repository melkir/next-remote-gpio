'use client'

import { getCommand } from '@/app/_actions'
import { useChannel, useEvent } from '@harelpls/use-pusher'
import { useState } from 'react'
import { LedButton } from './led-button'

export default function LedsPanel() {
  const [activeLed, setActiveLed] = useState<string | null>(null)

  const cache = useChannel('cache-gpio')

  useEvent<string>(cache, 'led', (led) => {
    setActiveLed(led ?? null)
  })

  useEvent(cache, 'pusher:cache_miss', async () => {
    const led = await getCommand('led')
    setActiveLed(led)
  })

  const LEDS = ['L1', 'L2', 'L3', 'L4'] as const

  return (
    <div className="flex justify-between items-center w-80">
      {LEDS.map((led) => (
        <LedButton
          key={led}
          className="p-0 w-12 h-12 rounded-full"
          variant="ghost"
          isActive={activeLed === led || activeLed === 'ALL'}
          action={{ command: 'select', led }}
        />
      ))}
    </div>
  )
}
