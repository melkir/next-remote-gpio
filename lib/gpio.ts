export function gpio(path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers)
  headers.set('cf-access-client-id', process.env.CF_ACCESS_CLIENT_ID!)
  headers.set('cf-access-client-secret', process.env.CF_ACCESS_CLIENT_SECRET!)
  return fetch(`${process.env.REMOTE_GPIO_URL}/${path}`, {
    ...init,
    headers,
  })
}
