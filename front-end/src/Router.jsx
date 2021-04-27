import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Template from "./components/Templete";
import Eggs from "./pages/Eggs";
import Monsters from "./pages/Monsters";

const Router = () => {
  return (
    <BrowserRouter>
      <Template>
        <Switch>
          <Route exact path="/" component={Eggs} />
          <Route exact path="/monsters" component={Monsters} />
        </Switch>
      </Template>
    </BrowserRouter>
  );
};

export default Router;
