import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
 import {rootSaga} from '../saga'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

// redux sagas is a middleware that we apply to the store
export  const store = createStore(
  applyMiddleware(sagaMiddleware,logger)
)
// sagaMiddleware.run(rootSaga)


export default store
