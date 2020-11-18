import React from "react";
import { Alert, Spin } from "antd";

import BaseComponent from "components/BaseComponent";
import "./index.less";

class Loading extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={"loading"}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }
}

export default Loading;
