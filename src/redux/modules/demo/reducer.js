// 管理状态函数reducer
import { fromJS } from "immutable";

import demoTypes from "./constants";

const defaultState = fromJS({
  number: 1,
  user: {
    id: 1,
    name: `用户${Math.floor(Math.random() * 100)}`,
    role: "user",
  },
});

export default function demoReducer(state = defaultState, action) {
  switch (action.type) {
    case demoTypes.DECREMENT:
      return state.set("number", state.get("number") - 1);
    case demoTypes.INCREMENT:
      return state.set("number", state.get("number") + 1);
    case demoTypes.GETDATA:
      return state.set("data", action.data);
    case demoTypes.ISREQUEST:
      return state.set("isRequest", !state.get("isRequest"));
    default:
      return state;
  }
}
