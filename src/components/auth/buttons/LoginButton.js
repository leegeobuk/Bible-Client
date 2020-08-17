import React from "react";
import classes from "./LoginButton.module.css";

const loginButton = props => {
  return <input className={classes.login_button} type="submit" value="로그인" />;
}

export default loginButton;
