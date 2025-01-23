import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <main className="flex justify-center items-center">
      <SignIn appearance={{ baseTheme: dark }} />
    </main>
  )
}
