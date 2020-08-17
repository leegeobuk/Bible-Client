import React, { Component } from "react";
import Confirm from "../buttons/Confirm";
import classes from "./AuthDialog.module.css"

class AuthDialog extends Component {
  render() {
    return (
      <div className={this.props.show ? classes.modal : classes.none}>
        {this.props.text}
        <Confirm click={this.props.click} />
      </div>
    );
  }
}

export default AuthDialog;
