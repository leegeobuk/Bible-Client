import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./SmallLoginButton.module.css";

class SmallLoginButton extends Component {
  render() {
    return (
      <Link to="/login">
        <button className={classes.login_btn} type="button">
          로그인
        </button>
      </Link>
    );
  }
}

export default SmallLoginButton;
