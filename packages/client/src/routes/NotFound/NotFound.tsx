import React from "react";
import { Button } from "carbon-components-react";

const NotFound = () => {
  return (
    <div>
      <div className="header">
        <h1 className="header__title">404</h1>
        <p>Oops! This wasn't supposed to happen.</p>
        <div className="header__intention">
          <Button href="/">Take me home</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
