import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <SignUp appearance={{ baseTheme: dark }} />
    </main>
  )
}
