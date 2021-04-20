import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Template from "./components/Templete";
import Home from "./pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Template>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Template>
    </BrowserRouter>
  );
};

export default Router;
