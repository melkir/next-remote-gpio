'use client'

import { Circle } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './action-button'

export function LedButton({
  isActive,
  ...props
}: ActionButtonProps & { isActive?: boolean }) {
  return (
    <ActionButton
      {...props}
      className="p-0 w-12 h-12 rounded-full"
      variant="ghost"
    >
      <Circle
        fill={isActive ? 'currentColor' : undefined}
        className="w-6 h-6"
      />
    </ActionButton>
  )
}
