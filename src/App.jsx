import React from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import { HomeRoute, LoginRoute, NotFoundRoute } from "@/routes";
import AuthRoute from "components/AuthRoute";
import BaseComponent from "components/BaseComponent";
import { Button } from "antd";

class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRequest: false,
    };
  }

  render() {
    return (
      <div>
        <nav>
          <Button type="primary">
            <Link to={HomeRoute.path}>首页</Link>
          </Button>
          <Button type="primary">
            <Link to={LoginRoute.path}>登录界面</Link>
          </Button>
          <Button type="primary">
            <Link to={NotFoundRoute.path}>404界面</Link>
          </Button>
        </nav>
        <Switch>
          <AuthRoute {...HomeRoute} />
          <Redirect exact to="/home" from="/" />
          <Route path={LoginRoute.path} component={LoginRoute.component} />
          <Route path={NotFoundRoute.path} component={NotFoundRoute.component} />
        </Switch>
      </div>
    );
  }
}

export default App;
