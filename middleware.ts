import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/gpio(.*)'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
