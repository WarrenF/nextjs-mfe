export type ToDoState = {
  otherItems: any
  items: ToDoItem[]
  add: (name: string) => void
  remove: (id: string) => void
  toggleComplete: (id: string) => void
  updateOtherItems: () => void
}

export type ToDoItem = {
  id: string
  name: string
  complete: boolean
}