import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainNav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">
          Home
        </Link>
        &nbsp;&nbsp;
        <Link to="/about">
          About
        </Link>
      </nav>
    )
  }
}

export default MainNav;
