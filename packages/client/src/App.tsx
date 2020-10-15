import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Content } from "carbon-components-react";

import { UIShell } from "./components";
import { Home, Login, NotFound, Register } from "./routes";
import { AuthApi } from "api";
import "./App.scss";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(AuthApi.isAuthenticated());

  return (
    <UIShell isSignedIn={isSignedIn}>
      <Content>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login">
              <Login setIsSignedIn={setIsSignedIn} />
            </Route>
            <Route path="/register">
              <Register setIsSignedIn={setIsSignedIn} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Content>
    </UIShell>
  );
};

export default App;
