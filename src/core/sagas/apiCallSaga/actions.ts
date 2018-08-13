import { API_IS_FETCHING } from 'core/sagas/apiCallSaga/constants'

export const apiFetch = (url: string, options = {}): any => {
  return {
    type: API_IS_FETCHING,
    url,
    options,
    meta: {
      thunk: true
    }
  }
}
