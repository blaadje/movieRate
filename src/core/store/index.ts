import { applyMiddleware, compose, createStore } from 'redux'
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'

import orm from '@core/store/orm'
import saga from '@core/store/orm/sagas'
import reducer from '@core/store/reducer'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(thunkMiddleware, sagaMiddleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.subscribe(() => (global.session = orm.session(store.getState().orm)))

sagaMiddleware.run(saga)

export default store
