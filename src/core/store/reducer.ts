import { combineReducers, DeepPartial } from 'redux'
import orm from 'core/store/orm/reducer'
import { SET_DISCOVER_FILTER, DISCOVER_MOVIES } from './constants'

interface actionI {
  type: string
  filter: string
}

const initialState: DeepPartial<object> = {
  subCategoryFilter: DISCOVER_MOVIES,
}

function filters(state: any = initialState, action: actionI) {
  switch (action.type) {
    case SET_DISCOVER_FILTER:
      return { ...state, subCategoryFilter: action.filter }
    default:
      return state
  }
}

export default combineReducers({ orm, filters })
