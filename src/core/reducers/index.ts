import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import orm from 'core/orm' 

const reducer = createReducer(orm)

export default combineReducers({ Application: reducer })
