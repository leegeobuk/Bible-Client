import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginButton from "../auth/LoginButton";
import classes from "./MainNav.module.css";

class MainNav extends Component {
  render() {
    return (
      <nav className={classes.main_nav}>
        <div className={classes.nav}>
          <Link className={classes.link} to="/">
            Home
          </Link>
          <Link className={classes.link} to="/about">
            About
          </Link>
        </div>
        <div className={classes.login}>
          <LoginButton />
        </div>
      </nav>
    )
  }
}

export default MainNav;
