import { combineReducers } from "redux";

import demoReducer from "./demo/reducer";

const rootReducer = combineReducers({
  demoReducer,
});

export default rootReducer;
