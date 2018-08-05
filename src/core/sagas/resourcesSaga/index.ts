import { put, call, takeEvery, CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects'

import { resourceError } from 'core/sagas/resourcesSaga/actions'

import { Action } from 'redux'
import { 
  RESOURCE_FETCH, 
  RESOURCES_FETCH, 
  RESOURCE_CREATE, 
  RESOURCE_EDIT, 
  RESOURCE_DELETE
} from 'core/sagas/resourcesSaga/constants'

export default function * ResourceSaga (): Iterator<ForkEffect[]> {
  function* handleResourceFetch ({ url, options, body }: any): Iterator<CallEffect | PutEffect<Action>> {
    try {
      // const result = yield call(request, url, options)
      // const { callback } = options
      // callback(result)
    }

    catch (error) {
      yield put(resourceError(error))
      console.error(error)
    }
  }

  yield [
    takeEvery(RESOURCE_FETCH, handleResourceFetch),
    // takeEvery(RESOURCES_FETCH, handleResourcesFetch),
    // takeEvery(RESOURCE_CREATE, handleResourceCreate),
    // takeEvery(RESOURCE_EDIT, handleResourceEdit),
    // takeEvery(RESOURCE_DELETE, handleResourceDelete)
  ]
}
