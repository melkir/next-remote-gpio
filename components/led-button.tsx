'use client'

import { Circle } from 'lucide-react'
import ActionButton, { type ActionButtonProps } from './action-button'

export function LedButton({
  isActive,
  ...props
}: ActionButtonProps & { isActive?: boolean }) {
  return (
    <ActionButton
      {...props}
      className="h-12 w-12 rounded-full p-0"
      variant="ghost"
    >
      <Circle
        fill={isActive ? 'currentColor' : undefined}
        className="h-6 w-6"
      />
    </ActionButton>
  )
}
