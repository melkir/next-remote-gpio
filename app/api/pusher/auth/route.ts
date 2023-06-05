import { gpio } from '@/lib/gpio'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const res = await gpio('pusher/auth', { method: 'POST', body: form })

  const data = await res.json()
  return NextResponse.json(data)
}
