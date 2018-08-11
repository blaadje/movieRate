import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from 'core/sagas'
import reducer from 'core/reducers'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'
import logger from 'redux-logger'

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