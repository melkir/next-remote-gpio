import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware()

export const config = {
  runtime: 'experimental-edge',
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
