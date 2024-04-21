import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/api/pusher/auth'])

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return // if it's a public route, do nothing
  auth().protect() // for any other route, require auth
})

export const config = {
  runtime: 'experimental-edge',
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
