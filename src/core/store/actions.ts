import { SET_DISCOVER_FILTER, RESOURCE_FETCHING } from './constants'

interface resourceFetchParams {
  resourceType: string
  relationShip: string
  options?: object
}

export const resourceFetch = ({
  resourceType,
  relationShip,
  options = {},
}: resourceFetchParams): object => {
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
