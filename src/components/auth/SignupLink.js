import React from "react";
import { Link } from "react-router-dom";
import classes from "./SignupLink.module.css";

const SignupLink = () => {
  return (
    <div className={classes.SignupLink}>
      아직 계정이 없다면
      <Link className={classes.signup_btn} to={"/signup"}>
        회원가입
      </Link>
    </div>
  );
}

export default SignupLink;
