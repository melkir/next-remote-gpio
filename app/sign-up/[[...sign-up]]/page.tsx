import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <main className="flex justify-center items-center">
      <SignUp appearance={{ baseTheme: dark }} />
    </main>
  )
}
