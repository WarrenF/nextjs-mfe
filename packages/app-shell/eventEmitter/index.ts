import { EventEmitter } from "inf-ee"

import { EventSet } from './types'

export const attachEventEmitter = (): void => {
  if (typeof window === 'undefined') return null
  if (typeof window.ee === 'undefined') window.ee = new EventEmitter<EventSet>()
}

export const eeReady = () => typeof window !== 'undefined' && typeof window.ee !== 'undefined'