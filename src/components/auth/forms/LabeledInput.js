import React, { Component, Fragment } from "react";
import classes from "./LabeledInput.module.css";

class LabeledInput extends Component {
  render() {
    const {type, label, handle, field} = this.props;
    return (
      <Fragment>
        <label className={classes._label}>
          {this.props.label}
        </label>
        <input className={classes._input} type={type} placeholder={label} onChange={e => handle(e, field)} />
      </Fragment>
    );
  }
}

export default LabeledInput;
