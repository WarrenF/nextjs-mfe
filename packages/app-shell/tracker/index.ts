import { nanoid } from 'nanoid'

import { eeReady } from '../eventEmitter'
import { store } from './store'

const { getState, setState } = store

export const attachTrackingState = () => {
  (window as any).trackingState = () => console.log(getState())
}

/*
  Emits event and GUID to MFEs
  MFEs respond instantly to register
  We keep a count of all MFEs that register
  Once all registered mfes respond, we fire the event
*/
export const pollTrack = (event: string) => {
  if (!eeReady()) return

  const guid = nanoid()
  const key = `${event}:${guid}`

  console.log('Poll Tracking:', event, guid)

  setState({ [key]: 0 })

  const state = (getState() as any)

  // Count how many MFEs register to this event
  window.ee.on(`${key}:register`, (guidFromEvent: string) => {
    state.inc(event, guidFromEvent)
  })

  // Receive data for all the MFEs that registered interest
  window.ee.on(`${key}:data`, (guidFromEvent: string, data: unknown) => {
    state.dec(event, guidFromEvent)
    state.assign(event, guidFromEvent, data)
    if ((getState() as any)[`${event}:${guidFromEvent}`] === 0) {
      trackFromState(event, guidFromEvent)
    }
  })

  window.ee.emit(`${event}:poll`, { guid })

  setTimeout(() => {
    window.ee.emit(`${key}:collect`, { guid })
  }, 1000)
  

  // Cleanup events after 10 seconds
  setTimeout(() => {
    console.log('Clean', key)
    window.ee.off(`${key}:register`)
    window.ee.off(`${key}:data`)
  }, 10000)
}

export const trackFromState = (event: string, guid: string) => {
  const trackingData = (getState() as any)[`${event}:${guid}:data`]
  console.log('Track event', trackingData)
}

const track = (trackingData: unknown) => {
  console.log('Track Event', trackingData)
}