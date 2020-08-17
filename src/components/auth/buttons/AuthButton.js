import React from "react";
import classes from "./AuthButton.module.css";

const authButton = props => {
  const classList = [classes.auth_btn, props.hasMargin ? classes.margin_btn : ''];
  return <input className={classList.join(' ')} type="submit" value={props.value} />;
}

export default authButton;
