import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import orm from 'core/orm'
import Filter from 'core/models/Filter';

const reducer = createReducer(orm)

export default combineReducers({ Application: reducer })
