import { Action } from 'redux'
import {
  all,
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects'

import {
  allowedTypes,
  createResourceByType,
  RESOURCE_ERROR,
  RESOURCE_FETCHING,
} from '../constants'
import request from '../request'

interface OptionsProp {
  parameter?: string
  queries?: object
}

interface ApiFetchProps {
  type: string
  resourceType: allowedTypes
  relationShip?: allowedTypes
  id?: string
  options?: OptionsProp
  meta: object
}

const requestCallParams: object[] = []

const isCached = (params: ApiFetchProps): boolean =>
  requestCallParams.some(
    (el: object) => JSON.stringify(el) === JSON.stringify(params)
  )

export default function* applicationSaga(): Iterator<any> {
  function* makeCall(
    params: ApiFetchProps
  ): Iterator<CallEffect | PutEffect<Action>> {
    const { resourceType, relationShip, id, options = {}, meta } = params
    const { parameter, queries } = options

    if (isCached(params)) {
      return
    }

    try {
      const result = yield call(request, resourceType, {
        segment: { parameter, relationShip, id },
        queries,
      })

      yield put({
        type: createResourceByType(resourceType),
        relationShip,
        result,
        meta,
      })

      if (relationShip) {
        yield put({
          type: createResourceByType(relationShip),
          relationShip: resourceType,
          result,
        })
      }
      requestCallParams.push(params)
    } catch (error) {
      yield put({
        type: RESOURCE_ERROR,
        error: true,
        payload: error,
        meta,
      })
    }
  }

  yield all([takeLatest(RESOURCE_FETCHING, makeCall)])
}
