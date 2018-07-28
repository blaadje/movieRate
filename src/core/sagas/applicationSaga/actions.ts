import {
  APPLICATION_CALL,
  RESOURCE_SET,
  RESOURCE_ERROR
} from 'core/sagas/applicationSaga/constants'

import { Movie } from 'core/model'
import { Action } from 'redux'

export const appplicationCall = (url: string, options = {}, body = {},): any => {
  return { type: APPLICATION_CALL, url, options, body }
}

export const resourceSet = (result: Object): any => {
  return { type: RESOURCE_SET, result }
}

export const resourceError = (result: ErrorEvent): any => {
  return { type: RESOURCE_ERROR, result }
}
