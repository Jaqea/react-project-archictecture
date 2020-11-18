import React from "react";

import BaseComponent from "components/BaseComponent";
import Loading from "components/Loading";

class NotFound extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>这是404页面</h1>
      </div>
    );
  }
}

export default NotFound;
