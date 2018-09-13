import { CallEffect, PutEffect, call, put, takeLatest, all, select } from 'redux-saga/effects'

import { API_IS_FETCHING, API_FETCH_ERROR, API_FETCH_SUCCESS } from 'core/sagas/apiCallSaga/constants'

import { Action } from 'redux'
import request from 'core/sagas/apiCallSaga/request'
import { categorySelector, subCategorySelector } from 'core/selectors'

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

      const categoryId = yield select(categorySelector, url) as any
      const subCategoryId = yield select(subCategorySelector, segment) as any

      const payload = result.map((movie: any) => ({
        ...movie,
        categoryId,
        subCategoryId
      }))

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
