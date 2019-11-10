import { RESOURCE_FETCHING, SET_DISCOVER_FILTER } from './constants'

interface ResourceFetchParams {
  resourceType: string
  relationShip: string
  options?: object
}

export const resourceFetch = ({
  resourceType,
  relationShip,
  options = {},
}: ResourceFetchParams): object => {
  return {
    type: RESOURCE_FETCHING,
    resourceType,
    relationShip,
    options,
    meta: {
      thunk: false,
    },
  }
}

export const resourceFilter = (filter: number): any => {
  return { type: SET_DISCOVER_FILTER, filter }
}
