import { RESOURCE_ERROR } from "core/sagas/movieSaga/constants"

export default function applicationReducers (state = {}, action: any) {
  switch (action.type) {
    case RESOURCE_ERROR:
      return {
        ...state, error: action.result
      }
    default:
      return state
  }
}
