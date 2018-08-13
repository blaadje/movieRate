import applicationSaga from "core/sagas/apiCallSaga"
import ResourceSaga from "core/sagas/resourcesSaga"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
  yield all([
    applicationSaga(),
    ResourceSaga()
  ])
}