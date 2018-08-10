import { API_FETCH_ERROR, API_FETCH_SUCCESS } from "core/sagas/apiCallSaga/constants"

export default function applicationReducers (state: any = [], action: any) {
  switch (action.type) {
    case API_FETCH_SUCCESS:
      const newState = state.concat(action.result.map((item: any) => item))
      return newState
    case API_FETCH_ERROR:
      return {
        ...state, error: action.result
      }
    default:
      return state
  }
}
