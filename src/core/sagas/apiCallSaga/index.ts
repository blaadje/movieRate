import { CallEffect, PutEffect, call, put, takeLatest, all } from 'redux-saga/effects'

import { API_IS_FETCHING, API_FETCH_ERROR, API_FETCH_SUCCESS } from 'core/sagas/apiCallSaga/constants'

import { Action } from 'redux'
import request from 'core/sagas/apiCallSaga/request'
import { SHOW_MOVIES, SHOW_TV } from 'core/sagas/resourcesSaga/constants'

interface ApiFetchProps {
  url: string,
  options: object,
  meta: object
}

export default function * applicationSaga (): Iterator<any> {
  function* makeCall ({ url, options, meta }: ApiFetchProps): Iterator<CallEffect | PutEffect<Action>> {
    const { segment }: any = options

    try {
      const result = yield call(request, url, options)

      const payload = result.map((movie: any) => {
        return {
          ...movie,
          category: url,
          type: segment === 'movie' ? SHOW_MOVIES : SHOW_TV
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

  yield all([
    takeLatest(API_IS_FETCHING, makeCall)
  ])
}
