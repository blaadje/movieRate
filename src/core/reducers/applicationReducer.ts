import { API_FETCH_ERROR, API_FETCH_SUCCESS } from "core/sagas/apiCallSaga/constants"

export default function applicationReducers (state: any = [], action: any) {
  switch (action.type) {
    case API_FETCH_SUCCESS:
      return {
        ...state,
        [action.category]: action.result
      }
    case API_FETCH_ERROR:
      return {
        ...state, error: action.result
      }
    default:
      return state
  }
}
