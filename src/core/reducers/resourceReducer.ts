import {
  RESOURCE_FETCH,
  RESOURCES_FETCH,
  RESOURCE_EDIT,
  RESOURCE_DELETE,
  RESOURCE_ERROR
} from "core/sagas/resourcesSaga/constants"

export default function applicationReducers(state = {}, action: any) {
  switch (action.type) {
    case RESOURCE_FETCH:
      return {
        ...state, resource: action.result, error: null
      }

    case RESOURCES_FETCH:
      return {
        ...state, resource: action.result, error: null
      }

    case RESOURCE_EDIT:
      return {
        ...state, resource: action.result, error: null
      }

    case RESOURCE_DELETE:
      return {
        ...state, resource: action.result, error: null
      }

    case RESOURCE_ERROR:
      return {
        ...state, resource: [], error: action.result
      }
    default:
      return state
  }
}
