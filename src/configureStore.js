import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;

const middleware = [sagaMiddleware];

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default function configureStore() {
  const store = createStore(appReducer, composeEnhancers(applyMiddleware(...middleware)));

  sagaMiddleware.run(rootSaga);
  return store;
}
