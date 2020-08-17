import React, { Component } from "react";
import Confirm from "../buttons/Confirm";
import classes from "./AuthFail.module.css"

class AuthFail extends Component {
  render() {
    return (
      <div className={this.props.show ? classes.modal : classes.none}>
        {this.props.text}
        <Confirm toggle={this.props.toggle} />
      </div>
    );
  }
}

export default AuthFail;
