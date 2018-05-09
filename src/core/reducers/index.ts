import { combineReducers } from 'redux'
import Movies from './movieReducers'

const rootReducer = combineReducers({ Movies })
export default rootReducer