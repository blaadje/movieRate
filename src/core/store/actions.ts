import { RESOURCE_FETCHING, SET_FILTER } from './constants'

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

export const setFilter = (filter: object, filterId: number): any => {
  return { type: SET_FILTER, filter, filterId }
}
