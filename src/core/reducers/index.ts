import { combineReducers } from 'redux'

import applicationReducer from 'core/reducers/applicationReducer'
import resourceReducer from 'core/reducers/resourceReducer'

export default combineReducers({ application: applicationReducer, resourceReducer })
