import {
  RESOURCE_FETCHING,
  RESOURCE_FETCHING_MORE,
  SET_FILTER,
} from './constants'

export interface ResourceFetchParams {
  createResource?: boolean
  resourceType: string
  relationShip?: string
  resourceId?: number
  relationShipId?: number
  resourceValues?: any
  ignoreCall?: boolean
  options?: object
}

export const resourceFetchAction = ({
  resourceType,
  resourceId,
  resourceValues,
  relationShip,
  relationShipId,
  ignoreCall,
  createResource = true,
  options = {},
}: ResourceFetchParams): object => {
  return {
    type: RESOURCE_FETCHING,
    resourceType,
    createResource,
    resourceId: resourceId && String(resourceId),
    resourceValues,
    relationShip,
    relationShipId: relationShipId && String(relationShipId),
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
