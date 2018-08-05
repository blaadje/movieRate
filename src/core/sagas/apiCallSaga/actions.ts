import { API_FETCH, API_CALL_ERROR } from 'core/sagas/apiCallSaga/constants'

export const apiCall = (url: string, options = {}, body = {},): any => {
  return { type: API_FETCH, url, options, body }
}

export const apiCallError = (result: ErrorEvent): any => {
  return { type: API_CALL_ERROR, result }
}
