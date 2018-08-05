import { put, call, takeLatest, CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects'

import { apiCallError, } from 'core/sagas/apiCallSaga/actions'
import { API_FETCH } from 'core/sagas/apiCallSaga/constants'

import { Action } from 'redux'
import request from 'core/sagas/apiCallSaga/request'

export default function * applicationSaga (): Iterator<ForkEffect[]> {
  function* makeCall ({ url, options, body }: any): Iterator<CallEffect | PutEffect<Action>> {
    try {
      const result = yield call(request, url, options)
      const { callback } = options
      callback(result)
    }

    catch (error) {
      yield put(apiCallError(error))
      console.error(error)
    }
  }

  yield [
    takeLatest(API_FETCH, makeCall)
  ]
}