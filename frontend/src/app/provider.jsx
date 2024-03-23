'use client'
import { Provider } from 'jotai'

export function AppProvider({ children }) {
  return <Provider>{children}</Provider>
}
