import { currentUser } from '@clerk/nextjs/server'
import { TRPCError, initTRPC } from '@trpc/server'
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir'

interface Meta {
  span: string
}

export const t = initTRPC.meta<Meta>().create()

const serverActionProcedure = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }) => (meta as Meta).span,
    })
  )
  .use(async ({ next }) => {
    // Inject user into context
    const user = await currentUser()
    return next({ ctx: { user } })
  })

export const protectedAction = serverActionProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({ ctx: { ...ctx, user: ctx.user } })
})
