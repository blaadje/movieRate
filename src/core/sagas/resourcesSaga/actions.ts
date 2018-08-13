import {
  RESOURCES_FETCH,
  RESOURCE_CREATE,
  RESOURCE_DELETE,
  RESOURCE_EDIT,
  RESOURCE_ERROR,
  RESOURCE_FETCH,
  RESOURCE_SET,
  RESOURCE_VISIBILITY_FILTER
} from 'core/sagas/resourcesSaga/constants'

export const resourceFilter = (result: Object): any => {
  return { type: RESOURCE_VISIBILITY_FILTER, result }
}

export const resourceFetch = (result: Object): any => {
  return { type: RESOURCE_FETCH, result }
}

export const resourcesFetch = (result: Object): any => {
  return { type: RESOURCES_FETCH, result }
}

export const resourceCreate = (resource: any): any => {
  return { type: RESOURCE_CREATE, resource }
}

export const resourceSet = (resource: any): any => {
  return { type: RESOURCE_SET, resource }
}

export const resourceEdit = (result: Object): any => {
  return { type: RESOURCE_EDIT, result }
}

export const resourceDelete = (result: Object): any => {
  return { type: RESOURCE_DELETE, result }
}

export const resourceError = (result: Object): any => {
  return { type: RESOURCE_ERROR, result }
}
