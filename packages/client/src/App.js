import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    async function fetchData() {
      console.log("START");
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: "john.smith@email.com",
          password: "my-secret-password-123",
        }),
      });

      const json = await response.json();
      console.log(json);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
