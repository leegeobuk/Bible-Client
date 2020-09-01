import React, { Component } from "react";
import Confirm from "../buttons/Confirm";
import classes from "./DialogPane.module.css"

class DialogPane extends Component {
  render() {
    return (
      <div className={this.props.show ? classes.modal : classes.none}>
        {this.props.text}
        <Confirm click={this.props.click} />
      </div>
    );
  }
}

export default DialogPane;
