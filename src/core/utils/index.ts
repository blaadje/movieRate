import debounce from 'lodash/debounce'
import { useCallback, useEffect, useRef } from 'react'

export type sizeOptions = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
interface PourcentageFromScaleProps {
  scale: number
  position: 'x' | 'y'
}

export const getSize = (size: sizeOptions = 'm'): string => {
  switch (size) {
    case 'xs':
      return '9px'
    case 's':
      return '13px'
    case 'm':
      return '15px'
    case 'l':
      return '20px'
    case 'xl':
      return '25px'
    case 'xxl':
      return '40px'
  }
}

export const calculatePourcentageFromScale = ({
  scale,
  position = 'x',
}: PourcentageFromScaleProps) => {
  const references = {
    x: 17,
    y: 9.6,
  }
  const decimal = Number(scale?.toString().split('.')[1])
  return decimal ? decimal * references[position] : 0
}

export const sleep = (time: number) =>
  new Promise(resolve => setTimeout(() => resolve(), time))

export const uuid = (): string => {
  let d = new Date().getTime()

  d += window.performance.now()

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export const memoize = (fn: (...args: any[]) => any): any => {
  let cache: any[] = []
  return (...args: any[]) => {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i] === args) {
        return cache[i]
      }
    }
    let result = fn(...args)
    cache.push(args)
    return result
  }
}

export const useDidUpdateEffect = (fn: () => void, inputs: any) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) fn()
    else didMountRef.current = true
  }, inputs)
}

export const useDebounce = (
  fnToDebounce: (...args: any) => void,
  durationInMs: number = 200,
  options?: object
) =>
  useCallback(debounce(fnToDebounce, durationInMs, options), [
    fnToDebounce,
    durationInMs,
  ])
