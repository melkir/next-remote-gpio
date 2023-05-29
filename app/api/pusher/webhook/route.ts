import { client } from '@/app/api/pusher'
import { z } from 'zod'

const pusherSchema = z.object({
  time_ms: z.number(),
  events: z.array(
    z.object({
      channel: z.literal('cache-gpio'),
      name: z.literal('cache_miss'),
    })
  ),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = pusherSchema.parse(json)
    const webhook = client.webhook({ headers: req.headers, rawBody: json })

    if (!webhook.isValid()) {
      return new Response('Unauthorized', { status: 403 })
    }

    for (const event of body.events) {
      console.log('Webhook received:', event)
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
