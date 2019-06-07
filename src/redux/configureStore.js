import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import logger from 'redux-logger';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25
    })) ||
  compose;

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(logger))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
