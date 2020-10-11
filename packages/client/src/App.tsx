import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Content } from "carbon-components-react";

import { Header } from "./components";
import { Home, Login, NotFound, Register } from "./routes";
import "./App.scss";

const App = () => {
  return (
    <>
      <Header />
      <Content>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Content>
    </>
  );
};

export default App;
