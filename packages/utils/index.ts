declare global {
  interface Window {
    ee: {
      emit: (eventName: string, args: unknown) => void
      on: (eventName: string, func: (data: unknown) => void) => void
    }
  }
}

export { updatePage } from "./src/updatePage"