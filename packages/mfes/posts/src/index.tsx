declare global {
  interface Window {
      ee: {
        emit: (eventName: string, args: unknown) => void
        on: (eventName: string, func: (data: unknown) => void) => void
      }
  }
}

// @ts-ignore
import bootstrap from "./bootstrap";
bootstrap(() => {});
