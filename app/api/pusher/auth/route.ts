import { gpio } from '@/lib/gpio'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  
  // Convert FormData to URLSearchParams
  const urlEncodedData = new URLSearchParams()
  for (const [key, value] of form.entries()) {
    urlEncodedData.append(key, value.toString())
  }

  const res = await gpio('pusher/auth', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: urlEncodedData.toString()
  })

  const data = await res.json()
  return NextResponse.json(data)
}
