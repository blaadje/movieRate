import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import reducer from './reducers/index'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),

)

sagaMiddleware.run(sagas)

export default store