import {
  APPLICATION_CALL,
  RESOURCE_SET,
  RESOURCE_ERROR
} from './constants'

import { Movie } from 'core/model'
import { Action } from 'redux'

export const appplicationCall = (url: string, body = {}, options = {}): any => {
  return { type: APPLICATION_CALL, url, body, options }
}

export const resourceSet = (result: Object): any => {
  return { type: RESOURCE_SET, result }
}

export const resourceError = (result: ErrorEvent): any => {
  return { type: RESOURCE_ERROR, result }
}
