import { CallEffect, ForkEffect, PutEffect, call, put, takeLatest } from 'redux-saga/effects'

import { API_FETCH, API_FETCH_ERROR, API_FETCH_SUCCESS } from 'core/sagas/apiCallSaga/constants'

import { Action } from 'redux'
import request from 'core/sagas/apiCallSaga/request'

interface apiFetchProps {
  url: string,
  options: object,
  body: object,
  meta: object
}

export default function * applicationSaga (): Iterator<ForkEffect[]> {
  function * makeCall ({ url, options, meta }: apiFetchProps): Iterator<CallEffect | PutEffect<Action>> {
    const { segment }: any = options

    try {
      const result = yield call(request, url, options)

      const payload = result.map((movie: any) => {
        return {
          ...movie,
          category: url,
          type: segment
        }
      })

      yield put({
        type: API_FETCH_SUCCESS,
        payload,
        meta
      })
    } catch (error) {
      yield put({
        type: API_FETCH_ERROR,
        url,
        error: true,
        payload: error,
        meta
      })
    }
  }

  yield [
    takeLatest(API_FETCH, makeCall)
  ]
}
