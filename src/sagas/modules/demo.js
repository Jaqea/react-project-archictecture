import { delay, takeEvery, put } from "redux-saga/effects";
import { demo } from "api/modules";

import demoTypes from "reduxModules/demo/constants";

function* demoGenerator(param) {
  console.log(param);
  const res = yield demo.getData();
  console.log(res);
  yield put({
    type: demoTypes.GETDATA,
    data: res.data,
  });
}

function* watchDemoSaga() {
  yield takeEvery(demoTypes.GETDATASAGA, demoGenerator);
}

export default watchDemoSaga;
