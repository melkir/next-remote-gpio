'use server'

import { zact } from 'zact/server'
import z from 'zod'

function gpio(path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers)
  headers.set('CF-Access-Client-Id', process.env.CF_ACCESS_CLIENT_ID!)
  headers.set('CF-Access-Client-Secret', process.env.CF_ACCESS_CLIENT_SECRET!)
  return fetch(`${process.env.VERCEL_URL}/gpio/${path}`, {
    ...init,
    headers,
  })
}

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

export const getCommand = zact(z.literal('led'))(async (command) => {
  const response = await gpio(command)
  return await response.text()
})

export const sendCommand = zact(ActionSchema)(async ({ command, led }) => {
  await gpio('command', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, led }),
    cache: 'no-store',
  })
})
