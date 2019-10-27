import { combineReducers } from 'redux'

import orm from '@core/store/orm/reducer'

import { RESOURCE_ERROR } from './constants'

interface ErrorProps {
  message: string
  stack: string
  name: string
}

interface ActionProps {
  type: string
  payload: ErrorProps
}

function error(state = { foo: 'foo' }, { type, payload }: ActionProps) {
  switch (type) {
    case RESOURCE_ERROR:
      return {
        ...state,
        ...{
          ...payload,
          message: payload.message,
          name: payload.name,
          stack: payload.stack,
        },
      }
    default:
      return state
  }
}

export default combineReducers({ orm, error })
