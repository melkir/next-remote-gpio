'use server'

import { gpio } from '@/lib/gpio'
import { action } from '@/lib/safe-action'

import z from 'zod'

const ActionSchema = z.union([
  z.object({
    command: z.enum(['up', 'stop', 'down', 'select']),
    led: z.undefined(),
  }),

  z.object({
    command: z.literal('select'),
    led: z.enum(['L1', 'L2', 'L3', 'L4', 'ALL']),
  }),
])

export type ActionType = z.infer<typeof ActionSchema>

export const getCommand = action(z.literal('led'), async (command) => {
  const response = await gpio(command)
  return await response.text()
})

export const sendCommand = action(ActionSchema, async ({ command, led }) => {
  await gpio('command', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, led }),
    cache: 'no-store',
  })
})
