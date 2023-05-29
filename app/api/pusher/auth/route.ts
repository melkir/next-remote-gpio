import { client } from '@/app/api/pusher'

export async function POST(req: Request) {
  const form = await req.formData()
  const socketId = form.get('socket_id') as string
  const channel = form.get('channel_name') as string
  // This authenticates every user. Don't do this in production!
  const authResponse = client.authorizeChannel(socketId, channel)

  return new Response(JSON.stringify(authResponse))
}
