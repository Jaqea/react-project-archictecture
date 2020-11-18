import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "antd";

import "./index.less";
import demoActions from "reduxModules/demo/actions";
import BaseComponent from "components/BaseComponent";

class Home extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>这是首页</h1>
        <h1>{this.props.number}</h1>
        <h1>demoData：{this.props.body}</h1>
        <Button onClick={this.props.increment}>增加1</Button>
        <Button onClick={this.props.decrement}>减少1</Button>
        <Button onClick={this.props.getData}>点击获取数据</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  number: state.demoReducer.get("number"),
  body: state.demoReducer.get("data") ? state.demoReducer.getIn(["data", "body"]) : "",
});
const mapDispatchToProps = (dispatch) => bindActionCreators(demoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
