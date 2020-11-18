import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const userRole = props.user.get("role");
  const { role: routeRole, backUrl } = props;
  // 判断权限
  if (routeRole && routeRole.indexOf(userRole) > -1)
    return <Route path={props.path} component={props.component} />;
  alert("请先登录");
  return <Redirect to={backUrl} />;
}

const mapStateToProps = (state) => ({
  user: state.demoReducer.get("user"),
});

export default connect(mapStateToProps)(AuthRoute);
