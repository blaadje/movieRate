import { put, call, takeLatest, CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects'

import { Movie } from 'core/model'
import { Action } from 'redux'
import request from './request'
import { resourceError } from 'core/sagas/movieSaga/actions'
import { APPLICATION_CALL } from 'core/sagas/movieSaga/constants'

export default function * movieSaga (): Iterator<ForkEffect[]> {
  function* getMovies ({ url, body, options }: any): Iterator<CallEffect | PutEffect<Action>> {
    try {
      const result = yield call(request, url)
    }

    catch (error) {
      yield put(resourceError(error))
    }
  }

  yield [
    takeLatest(APPLICATION_CALL, getMovies)
  ]
}
