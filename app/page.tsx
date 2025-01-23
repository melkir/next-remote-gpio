import ActionButton from '@/components/action-button'
import LedsPanel from '@/components/leds-panel'
import Status from '@/components/status'
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ChevronDown, ChevronUp, CircleDot, Pause } from 'lucide-react'

export default async function Home() {
  return (
    <main className="flex flex-col justify-evenly items-center px-6 w-screen">
      <Status />
      <div className="fixed right-5 top-10">
        <UserButton
          appearance={{ baseTheme: dark }}
          userProfileProps={{ appearance: { baseTheme: dark } }}
        />
      </div>
      <ActionButton
        className="p-0 w-24 h-24 rounded-full"
        variant="outline"
        action={{ command: 'up' }}
      >
        <ChevronUp className="w-8 h-8" />
      </ActionButton>
      <ActionButton
        className="p-0 w-28 h-28 rounded-full"
        variant="outline"
        action={{ command: 'stop' }}
      >
        <Pause className="w-10 h-10" />
      </ActionButton>
      <ActionButton
        className="p-0 w-24 h-24 rounded-full"
        variant="outline"
        action={{ command: 'down' }}
      >
        <ChevronDown className="w-8 h-8" />
      </ActionButton>
      <LedsPanel />
      <ActionButton
        className="p-0 w-24 h-24 rounded-full"
        variant="outline"
        action={{ command: 'select' }}
        contextAction={{ command: 'select', led: 'ALL' }}
      >
        <CircleDot className="w-8 h-8" />
      </ActionButton>
    </main>
  )
}
