import reducer from 'core/reducers'
import sagas from 'core/sagas'
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(thunkMiddleware, sagaMiddleware, logger),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

sagaMiddleware.run(sagas)

export default store
