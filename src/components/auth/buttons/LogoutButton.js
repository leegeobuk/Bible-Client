import React, { Component } from "react";
import classes from "./LogoutButton.module.css";

class LogoutButton extends Component {
  render() {
    return (
      <button className={classes.logout_btn} type="button">
        로그아웃
      </button>
    );
  }
}

export default LogoutButton;
