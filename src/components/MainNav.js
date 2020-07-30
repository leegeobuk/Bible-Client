import React from "react";
import { Link } from "react-router-dom";

class MainNav extends React.Component {
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
