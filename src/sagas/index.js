import { all } from "redux-saga/effects";
import watchDemoSaga from "./modules/demo";

function* rootSaga() {
  yield all([watchDemoSaga()]);
}

export default rootSaga;
