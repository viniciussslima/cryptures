import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Template from "./components/Templete";
import Eggs from "./pages/Eggs";
import Monsters from "./pages/Monsters";
import CryptureInfo from "./pages/CryptureInfo";
import RequestBattle from "./pages/RequestBattle";

const Router = () => {
  return (
    <BrowserRouter>
      <Template>
        <Switch>
          <Route exact path="/" component={Eggs} />
          <Route exact path="/cryptures" component={Monsters} />
          <Route exact path="/crypture/:id" component={CryptureInfo} />
          <Route exact path="/requestBattle" component={RequestBattle} />
        </Switch>
      </Template>
    </BrowserRouter>
  );
};

export default Router;
