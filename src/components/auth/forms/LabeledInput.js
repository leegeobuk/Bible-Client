import React, { Component, Fragment } from "react";
import classes from "./LabeledInput.module.css";

class LabeledInput extends Component {
  render() {
    return (
      <Fragment>
        <label className={classes._label}>
          {this.props.label}
        </label>
        <input className={classes._input} type="text" placeholder={this.props.label} />
      </Fragment>
    );
  }
}

export default LabeledInput;
