import React, { Component } from "react";
import classes from "./LoginFail.module.css"
import Confirm from "../buttons/Confirm";

class LoginFail extends Component {
  render() {
    return (
      <div className={this.props.show ? classes.modal : classes.none}>
        가입되지 않은 계정입니다
        <Confirm toggleDialog={this.props.toggleDialog} />
      </div>
    );
  }
}

export default LoginFail;
