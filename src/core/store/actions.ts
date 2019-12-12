import {
  RESOURCE_FETCHING,
  RESOURCE_FETCHING_MORE,
  SET_FILTER,
} from './constants'

export interface ResourceFetchParams {
  resourceType: string
  relationShip: string
  resourceValues?: any
  ignoreCall?: boolean
  options?: object
}

export const resourceFetchAction = ({
  resourceType,
  relationShip,
  resourceValues,
  ignoreCall,
  options = {},
}: ResourceFetchParams): object => {
  return {
    type: RESOURCE_FETCHING,
    resourceType,
    resourceValues,
    relationShip,
    ignoreCall,
    options,
    meta: {
      thunk: false,
    },
  }
}

export const resourceFetchMoreAction = ({
  resourceType,
  relationShip,
  resourceValues,
  options = {},
}: ResourceFetchParams): object => {
  return {
    type: RESOURCE_FETCHING_MORE,
    resourceType,
    relationShip,
    resourceValues,
    options,
    meta: {
      thunk: false,
    },
  }
}

export const setFilterAction = (filter: any, filterId: number): any => {
  return { type: SET_FILTER, filter, filterId }
}
