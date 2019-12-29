import { uuid } from '@core/utils'

import { ApiFetchProps } from '.'

interface CallListProps {
  [id: string]: {
    page: number
    params: object
    id: string
  }
}

export const requestCallParams: object[] = []
export const callList: CallListProps = {}

export const compareObjects = (firstObject: object, secondObject: object) =>
  JSON.stringify(firstObject) === JSON.stringify(secondObject)

export const isCached = (params: ApiFetchProps): any =>
  requestCallParams.some((item: any) => compareObjects(item, params))

export const createCache = (params: ApiFetchProps) =>
  requestCallParams.push(params)

export const getPreviousCallId = (params: ApiFetchProps): string => {
  const [previousCallId]: any = Object.entries(callList).find(([key, value]) =>
    compareObjects(value.params, params)
  ) || [false]

  if (!previousCallId) {
    const id = uuid()
    const initialPage = 2

    callList[id] = {
      page: initialPage,
      params,
      id,
    }

    return id
  }

  callList[previousCallId].page = callList[previousCallId].page + 1

  return previousCallId
}
