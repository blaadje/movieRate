import {
  allowedTypes,
  RESOURCE_CREATE,
  RESOURCE_EDIT,
  RESOURCE_FETCHING,
  RESOURCE_FETCHING_MORE,
  RESOURCES_LOAD_FROM_DB,
  SET_FILTER,
} from './constants'

export interface ResourceFetchParams {
  createResource?: boolean
  relationShip?: string
  resourceId?: number
  relationShipId?: number
  resourceValues?: any
  ignoreCall?: boolean
  options?: object
}

export const resourceFetchAction = (
  resourceType: allowedTypes,
  {
    resourceId,
    resourceValues,
    relationShip,
    relationShipId,
    ignoreCall,
    createResource = true,
    options = {},
  }: ResourceFetchParams
): object => {
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
    meta: { thunk: false },
  }
}

export const resourceFetchMoreAction = (
  resourceType: allowedTypes,
  { relationShip, resourceValues, options = {} }: ResourceFetchParams
): object => {
  return {
    type: RESOURCE_FETCHING_MORE,
    resourceType,
    relationShip,
    resourceValues,
    options,
    meta: { thunk: false },
  }
}

export const resourcesLoadFromDatabase = () => {
  return {
    type: RESOURCES_LOAD_FROM_DB,
    meta: { thunk: false },
  }
}

export const resourceCreateAction = (
  resourceType: allowedTypes,
  resource: any
) => {
  return {
    type: RESOURCE_CREATE,
    resourceType,
    resource,
    meta: { thunk: false },
  }
}

export const resourceEditAction = (
  resourceType: allowedTypes,
  resource: object
) => {
  return {
    type: RESOURCE_EDIT,
    resourceType,
    resource,
    meta: { thunk: false },
  }
}

export const setFilterAction = (filter: any, filterId: number): any => {
  return { type: SET_FILTER, filter, filterId }
}
