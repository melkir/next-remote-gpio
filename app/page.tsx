import ActionButton from '@/components/action-button'
import LedsPanel from '@/components/leds-panel'
import Status from '@/components/status'
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ChevronDown, ChevronUp, CircleDot, Pause } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex w-screen flex-col items-center justify-evenly px-6">
      <Status />
      <div className="fixed top-10 right-5">
        <UserButton
          appearance={{ baseTheme: dark }}
          userProfileProps={{ appearance: { baseTheme: dark } }}
        />
      </div>
      <ActionButton
        className="h-24 w-24 rounded-full p-0"
        variant="outline"
        action={{ command: 'up' }}
      >
        <ChevronUp className="h-8 w-8" />
      </ActionButton>
      <ActionButton
        className="h-28 w-28 rounded-full p-0"
        variant="outline"
        action={{ command: 'stop' }}
      >
        <Pause className="h-10 w-10" />
      </ActionButton>
      <ActionButton
        className="h-24 w-24 rounded-full p-0"
        variant="outline"
        action={{ command: 'down' }}
      >
        <ChevronDown className="h-8 w-8" />
      </ActionButton>
      <LedsPanel />
      <ActionButton
        className="h-24 w-24 rounded-full p-0"
        variant="outline"
        action={{ command: 'select' }}
        contextAction={{ command: 'select', led: 'ALL' }}
      >
        <CircleDot className="h-8 w-8" />
      </ActionButton>
    </main>
  )
}
