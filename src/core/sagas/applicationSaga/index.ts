import { put, call, takeLatest, CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects'

import { resourceError } from 'core/sagas/applicationSaga/actions'
import { APPLICATION_CALL } from 'core/sagas/applicationSaga/constants'

import { Action } from 'redux'
import request from './request'

export default function * applicationSaga (): Iterator<ForkEffect[]> {
  function* makeCall ({ url, options, body }: any): Iterator<CallEffect | PutEffect<Action>> {
    try {
      const result = yield call(request, url, options)
      const { callback } = options
      callback(result)
    }

    catch (error) {
      yield put(resourceError(error))
      console.error(error)
    }
  }

  yield [
    takeLatest(APPLICATION_CALL, makeCall)
  ]
}
