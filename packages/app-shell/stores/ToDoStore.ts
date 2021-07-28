import create from 'zustand'
import { ToDoState } from './types'

const createId = () => Math.random().toString().slice(-8)

const store = create<ToDoState>(set => ({
  otherItems: [],
  items: [],
  add: (name) => set((state) => ({
    items: [...state.items, { id: createId(), name, complete: false }]
  })),
  remove: id => set(state => ({
    items: state.items.filter(item => item.id !== id)
  })),
  toggleComplete: id => set(state => ({
    items: [...state.items].map(item => {
      if (item.id === id) item.complete = !item.complete
      return item
    })
  })),
  updateOtherItems: () => set(state => ({
    otherItems: [...state.otherItems, createId()]
  }))
}))

export default store