interface Window {
  ee: {
    emit: (eventName: string, args: unknown) => void
    on: (eventName: string, func: (data: unknown) => void) => void
  }
}

declare module 'posts/Post'
declare module 'posts/Posts'
declare module 'shared/Layout'