// 创建action
import demoTypes from "./constants";

const demoActions = {
  decrement: (number) => ({
    type: demoTypes.DECREMENT,
    number,
  }),
  increment: (number) => ({
    type: demoTypes.INCREMENT,
    number,
  }),
  getData: () => ({
    type: demoTypes.GETDATASAGA,
  }),
  isRequest: () => ({
    type: demoTypes.ISREQUEST,
  }),
};

export default demoActions;
