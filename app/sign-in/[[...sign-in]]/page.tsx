import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <SignIn appearance={{ baseTheme: dark }} />
    </main>
  )
}
