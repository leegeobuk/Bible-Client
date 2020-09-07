import React, { Component, Fragment } from "react";
import classes from "./LabeledInput.module.css";

class LabeledInput extends Component {
  render() {
    return (
      <Fragment>
        <label className={classes._label}>
          {this.props.label}
        </label>
        <input className={classes._input} type={this.props.type} placeholder={this.props.label} onChange={this.props.handle} />
      </Fragment>
    );
  }
}

export default LabeledInput;
