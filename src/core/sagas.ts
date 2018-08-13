import applicationCallSaga from 'core/sagas/apiCallSaga'
import resourcesSaga from 'core/sagas/resourcesSaga'
import { all } from 'redux-saga/effects'

export default function * createSaga () {
  yield all([
    resourcesSaga(),
    applicationCallSaga()
  ])
}
