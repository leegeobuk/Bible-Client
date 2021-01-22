import React, { Component } from "react";
import { Link } from "react-router-dom";
import SmallLoginButton from "../auth/buttons/SmallLoginButton";
import LogoutButton from "../auth/buttons/LogoutButton";
import classes from "./MainNav.module.css";

class MainNav extends Component {
  render() {
    const {loggedIn} = this.props;
    return (
      <nav className={classes.main_nav}>
        <div className={classes.nav}>
          <Link className={classes.link} to="/">
            홈
          </Link>
        </div>
        {/* <div className={classes.login}>
          {loggedIn ? <LogoutButton setToken={this.props.setToken} /> : <SmallLoginButton />}
        </div> */}
      </nav>
    )
  }
}

export default MainNav;
