'use client'

import { Circle } from 'lucide-react'
import ActionButton, { ActionButtonProps } from './action-button'

export function LedButton(props: ActionButtonProps & { isActive?: boolean }) {
  return (
    <ActionButton
      {...props}
      className="w-12 h-12 rounded-full p-0"
      variant="ghost"
    >
      <Circle
        fill={props.isActive ? 'currentColor' : undefined}
        className="h-6 w-6"
      />
    </ActionButton>
  )
}
