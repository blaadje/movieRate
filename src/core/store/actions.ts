import {
  RESOURCE_FETCHING,
  RESOURCE_FETCHING_MORE,
  SET_FILTER,
} from './constants'

export interface ResourceFetchParams {
  resourceType: string
  relationShip: string
  options?: object
}

export const resourceFetchAction = ({
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

export const resourceFetchMoreAction = ({
  resourceType,
  relationShip,
  options = {},
}: ResourceFetchParams): object => {
  return {
    type: RESOURCE_FETCHING_MORE,
    resourceType,
    relationShip,
    options,
    meta: {
      thunk: false,
    },
  }
}

export const setFilterAction = (filter: any, filterId: number): any => {
  return { type: SET_FILTER, filter, filterId }
}
