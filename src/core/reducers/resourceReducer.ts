import {
  RESOURCE_FETCH,
  RESOURCES_FETCH,
  RESOURCE_EDIT,
  RESOURCE_DELETE,
  RESOURCE_ERROR,
  RESOURCE_SET
} from "core/sagas/resourcesSaga/constants"

export default function resourceReducer (state: any = [], action: any) {
  switch (action.type) {
    case RESOURCE_FETCH:
      return {
        ...state, resources: action.resource
      }

    case RESOURCE_SET:
      return [
        ...state, 
        {
          movieId: action.resource.movieId,
          rate: action.resource.rate,
          description: action.resource.description
        }
    ]

    case RESOURCES_FETCH:
      return {
        ...state, resources: action.resource
      }

    case RESOURCE_EDIT:
      return {
        ...state, resources: action.resource
      }

    case RESOURCE_DELETE:
      return {
        ...state, resources: action.resource
      }

    case RESOURCE_ERROR:
      return {
        ...state, resources: [], error: action.resource
      }
    default:
      return state
  }
}
