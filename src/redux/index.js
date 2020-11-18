import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "sagas/";
import rootReducer from "./modules";

let finalCreateStore;
const saga = createSagaMiddleware();

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  finalCreateStore = compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore);
} else finalCreateStore = applyMiddleware(saga)(createStore);

function configureStore(initState) {
  const store = finalCreateStore(rootReducer, initState);
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./modules", () => store.replaceReducer(require("./modules")));
  }
  saga.run(rootSaga);
  return store;
}

export default configureStore;
