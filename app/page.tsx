import ActionButton from '@/components/action-button'
import LedsPanel from '@/components/leds-panel'
import Status from '@/components/status'
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ChevronDown, ChevronUp, CircleDot, Pause } from 'lucide-react'

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-evenly px-6 w-screen">
      <Status />
      <div className="fixed top-10 right-5">
        <UserButton
          afterSignOutUrl="/"
          appearance={{ baseTheme: dark }}
          userProfileProps={{ appearance: { baseTheme: dark } }}
        />
      </div>
      <ActionButton
        className="w-24 h-24 rounded-full p-0"
        variant="outline"
        action={{ command: 'up' }}
      >
        <ChevronUp className="h-8 w-8" />
      </ActionButton>
      <ActionButton
        className="w-28 h-28 rounded-full p-0"
        variant="outline"
        action={{ command: 'stop' }}
      >
        <Pause className="h-10 w-10" />
      </ActionButton>
      <ActionButton
        className="w-24 h-24 rounded-full p-0"
        variant="outline"
        action={{ command: 'down' }}
      >
        <ChevronDown className="h-8 w-8" />
      </ActionButton>
      <LedsPanel />
      <ActionButton
        className="w-24 h-24 rounded-full p-0"
        variant="outline"
        action={{ command: 'select' }}
        contextAction={{ command: 'select', led: 'ALL' }}
      >
        <CircleDot className="h-8 w-8" />
      </ActionButton>
    </main>
  )
}
