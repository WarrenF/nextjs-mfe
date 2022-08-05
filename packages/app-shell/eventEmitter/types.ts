export type EventSet = {
  navigate: (url: string) => void
}

export enum EmitterEvents {
  NAVIGATE = 'navigate',
  PAGE_VIEW = 'pageView',
}