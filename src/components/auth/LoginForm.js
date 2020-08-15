import React, { Component } from "react";
import classes from "./LoginForm.module.css";

class LoginForm extends Component {
  render() {
    return (
      <div className={classes.LoginForm}>
        <form>
          <label className={classes.email_label}>
            이메일
          </label>
          <input className={classes.email_input} type="text" placeholder="이메일" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
