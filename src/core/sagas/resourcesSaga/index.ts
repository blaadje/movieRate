import { put, call, takeEvery, CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects'

import { resourceError, resourceSet } from 'core/sagas/resourcesSaga/actions'

import { Action } from 'redux'
import { 
  RESOURCE_FETCH, 
  RESOURCES_FETCH, 
  RESOURCE_CREATE, 
  RESOURCE_EDIT, 
  RESOURCE_DELETE
} from 'core/sagas/resourcesSaga/constants'

interface resourceCreateProps {
  url: string,
  resource: any
}

export default function * ResourceSaga (): Iterator<ForkEffect[]> {
  function* handleResourceCreate({ url, resource }: resourceCreateProps): Iterator<CallEffect | PutEffect<Action>> {
    try {
      yield put(resourceSet(resource))
    }

    catch (error) {
      yield put(resourceError(error))
      console.error(error)
    }
  }

  yield [
    // takeEvery(RESOURCE_FETCH, handleResourceFetch),
    // takeEvery(RESOURCES_FETCH, handleResourcesFetch),
    takeEvery(RESOURCE_CREATE, handleResourceCreate),
    // takeEvery(RESOURCE_EDIT, handleResourceEdit),
    // takeEvery(RESOURCE_DELETE, handleResourceDelete)
  ]
}
