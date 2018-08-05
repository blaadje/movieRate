import { API_FETCH, API_FETCH_ERROR, API_FETCH_SUCCESS } from 'core/sagas/apiCallSaga/constants'
import { Movie } from 'core/model';

export const apiFetch = (url: string, options = {}, body = {},): any => {
  return { type: API_FETCH, url, options, body }
}

export const apiFetchSuccess = (result: Movie, url: string): any => {
  return { type: API_FETCH_SUCCESS, result, category: url }
}

export const apiFetchError = (result: ErrorEvent): any => {
  return { type: API_FETCH_ERROR, result }
}
