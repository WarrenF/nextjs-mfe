import create from 'zustand/vanilla'

type NewData = {
  [key: string]: unknown
}

export const store = create(set => ({
  inc: (event: string, guid: string) => set(state => (
    { [`${event}:${guid}`]: state[`${event}:${guid}`] + 1 }
  )),
  dec: (event: string, guid: string) => set(state => (
    { [`${event}:${guid}`]: state[`${event}:${guid}`] - 1 }
  )),
  assign: (event: string, guid: string, newData: NewData) => set(state => (
    { [`${event}:${guid}:data`]: { ...state[`${event}:${guid}:data`], ...newData } }
  ))
}))