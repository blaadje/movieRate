import { isEqual } from 'lodash'

export function uuid (): string {
  let d = new Date().getTime()

  if (typeof window.performance !== 'undefined' && typeof window.performance.now === 'function') {
    d += window.performance.now()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)

    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export const memoize = (fn: (...args: any[]) => any) => {
  let cache: any[] = []
  return (...args: any[]) => {
    for (let i = 0; i < cache.length; i++) {
      if (isEqual(cache[i], args)) {
        return
      }
    }
    let result = fn(...args)
    cache.push(args)
    return result
  }
}
