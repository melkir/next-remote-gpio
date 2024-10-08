import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log(JSON.stringify(req.headers))
  const data = await req.json()
  console.log(data)
  return NextResponse.json(data)
}
