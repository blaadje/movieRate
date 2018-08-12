import applicationCallSaga from 'core/sagas/apiCallSaga'
import resourcesSaga from 'core/sagas/resourcesSaga'

export default function * createSaga () {
  yield [
    resourcesSaga(),
    applicationCallSaga()
  ]
}
