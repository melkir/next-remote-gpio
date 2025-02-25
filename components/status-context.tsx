'use client'

import { type Dispatch, type ReactNode, createContext, useReducer } from 'react'
import styles from './status.module.css'

type Action =
  | { type: 'request' }
  | { type: 'success' }
  | { type: 'failure' }
  | { type: 'idle' }

type State = { count: number; isLoading: boolean; classname: string }

function statusReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'request':
      return {
        isLoading: true,
        classname: styles.loading,
        count: state.count + 1,
      }
    case 'success':
      return {
        isLoading: false,
        classname: 'bg-green-700',
        count: state.count,
      }
    case 'failure':
      return {
        isLoading: false,
        classname: 'bg-destructive',
        count: state.count,
      }
    case 'idle': {
      if (state.count === 0) {
        return {
          isLoading: false,
          classname: 'bg-accent',
          count: 0,
        }
      }
      return {
        isLoading: true,
        classname: styles.loading,
        count: state.count - 1,
      }
    }
    default:
      return state
  }
}

export const StatusContext = createContext(null as unknown as State)

export const StatusDispatchContext = createContext(
  null as unknown as Dispatch<Action>
)

export function StatusProvider({ children }: { children: ReactNode }) {
  const [status, dispatch] = useReducer(statusReducer, {
    isLoading: false,
    classname: 'bg-accent',
    count: 0,
  })

  return (
    <StatusContext.Provider value={status}>
      <StatusDispatchContext.Provider value={dispatch}>
        {children}
      </StatusDispatchContext.Provider>
    </StatusContext.Provider>
  )
}
