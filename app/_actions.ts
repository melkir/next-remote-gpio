'use server'

import { gpio } from '@/lib/gpio'
import { z } from 'zod'
import { protectedAction } from '../server/trpc'

export const getCommand = protectedAction
  .input(z.literal('led'))
  .mutation(async ({ input: command }) => {
    const response = await gpio(command)
    return await response.text()
  })

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

export const sendCommand = protectedAction
  .input(ActionSchema)
  .mutation(async ({ input: { command, led } }) => {
    await gpio('command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command, led }),
      cache: 'no-store',
    })
  })
