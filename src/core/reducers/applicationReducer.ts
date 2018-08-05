import { API_CALL_ERROR } from "core/sagas/apiCallSaga/constants"

export default function applicationReducers (state = {}, action: any) {
  switch (action.type) {
    case API_CALL_ERROR:
      return {
        ...state, error: action.result
      }
    default:
      return state
  }
}
