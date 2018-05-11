import { put, call, takeLatest, CallEffect, ForkEffect, PutEffect, CpsCallback } from 'redux-saga/effects'

import { Movie } from 'core/model'
import { Action } from 'redux'
import request from './request'

export default function* movieSaga (): Iterator<ForkEffect[]> {
  function* getMovies({ query }: any): Iterator<CallEffect | PutEffect<Action>> {
    try {
      const result = yield call(request, query)
      yield put({ type: 'MOVIES_SET', result })
    }

    catch (error) {
      console.error(error)
    }
  }

  yield [
    takeLatest('MOVIES_FETCH', getMovies)
  ]
}