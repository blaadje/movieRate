import { combineReducers } from 'redux'

import applicationReducer from 'core/reducers/applicationReducer'

export default combineReducers({ application: applicationReducer })
