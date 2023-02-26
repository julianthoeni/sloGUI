import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">
          SLO_GUI
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="home" >
                Home <span class="sr-only"></span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="slos">
                SLOs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="periods">
                Periods
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="rules">
                Rules
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about">
                About
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="help">
                Help
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <br></br>
      <br></br>
      <div class="col-auto my-1">
        <Main />
      </div>
    </div>
  );
}

export default App;
