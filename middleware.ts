import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/gpio(.*)'],
})

export const config = {
  runtime: 'experimental-edge',
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
