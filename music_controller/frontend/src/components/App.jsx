import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <HomePage />
      </div>
    );
  }
}

const app = document.getElementById("app");
render(<App name="Timothy" />, app);
