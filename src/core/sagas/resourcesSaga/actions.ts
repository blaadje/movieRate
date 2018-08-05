import {
  RESOURCE_ERROR,
  RESOURCE_CREATE,
  RESOURCE_EDIT,
  RESOURCE_DELETE,
  RESOURCE_FETCH,
  RESOURCES_FETCH,
  RESOURCE_SET
} from 'core/sagas/resourcesSaga/constants'

import { Rate } from 'core/model'

export const resourceFetch = (result: Object): any => {
  return { type: RESOURCE_FETCH, result }
}

export const resourcesFetch = (result: Object): any => {
  return { type: RESOURCES_FETCH, result }
}

export const resourceCreate = (resource: Rate): any => {
  return { type: RESOURCE_CREATE, resource }
}

export const resourceSet = (resource: Rate): any => {
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

