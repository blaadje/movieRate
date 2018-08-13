import { CallEffect, ForkEffect, PutEffect, call, put, takeEvery, all } from 'redux-saga/effects'

import { resourceError, resourceSet } from 'core/sagas/resourcesSaga/actions'

import { Action } from 'redux'
import {
  RESOURCES_FETCH,
  RESOURCE_CREATE,
  RESOURCE_DELETE,
  RESOURCE_EDIT,
  RESOURCE_FETCH
} from 'core/sagas/resourcesSaga/constants'

interface resourceCreateProps {
  url: string,
  resource: any
}

export default function * ResourceSaga (): Iterator<any> {
  function * handleResourceCreate ({ url, resource }: resourceCreateProps): Iterator<CallEffect | PutEffect<Action>> {
    try {
      yield put(resourceSet(resource))
    } catch (error) {
      yield put(resourceError(error))
      console.error(error)
    }
  }

  yield all([
    // takeEvery(RESOURCE_FETCH, handleResourceFetch),
    // takeEvery(RESOURCES_FETCH, handleResourcesFetch),
    takeEvery(RESOURCE_CREATE, handleResourceCreate)
    // takeEvery(RESOURCE_EDIT, handleResourceEdit),
    // takeEvery(RESOURCE_DELETE, handleResourceDelete)
  ])
}
