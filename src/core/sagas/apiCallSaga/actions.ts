import { API_FETCH } from 'core/sagas/apiCallSaga/constants'

export const apiFetch = (url: string, options = {}): any => {
  return {
    type: API_FETCH, 
    url, 
    options, 
    meta: {
      thunk: true
    }
  }
}