import { put, call, takeLatest, CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects'

import { apiFetchError, apiFetchSuccess } from 'core/sagas/apiCallSaga/actions'
import { API_FETCH } from 'core/sagas/apiCallSaga/constants'

import { Action } from 'redux'
import request from 'core/sagas/apiCallSaga/request'
import { callbackify } from 'util';

interface apiFetchProps {
  url: string,
  options: object,
  body: object
}

export default function * applicationSaga (): Iterator<ForkEffect[]> {
  function* makeCall({ url, options }: apiFetchProps): Iterator<CallEffect | PutEffect<Action>> {
    const { callback }: any = options

    try {
      const result = yield call(request, url, options)
      callback(null, result)
      yield put(apiFetchSuccess(result, url))
    }

    catch (error) {
      yield put(apiFetchError(error))
      callback(error)
      console.error(error)
    }
  }

  yield [
    takeLatest(API_FETCH, makeCall)
  ]
}
