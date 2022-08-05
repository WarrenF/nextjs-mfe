interface Window {
  ee: any | {
    emit: (eventName: string, args: unknown) => void
    on: (eventName: string, func: (data: unknown) => void) => void
    off: (eventName: string) => void
  }
}

declare module 'posts/Post'
declare module 'posts/Posts'
declare module 'shared/Layout'