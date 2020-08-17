import React, { Component } from "react";
import LabeledInput from "./LabeledInput";
import LoginButton from "../buttons/LoginButton";
import axios from "axios";
import SignupLink from "../SignupLink";
import DivisionBar from "../DivisionBar";
import classes from "./LoginForm.module.css";

const loginImage = "/images/login_kakao.png";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  }
  
  handleEmailChange = (event) => {
    this.setState(current => ({email: event.target.value, password: current.password}));
  }
  
  handlePasswordChange = (event) => {
    this.setState(current => ({email: current.email, password: event.target.value}));
  }
  
  handleSubmit = () => {
    // send post request to server
    // axios.post();
  }
  
  render() {
    return (
      <div className={classes.LoginForm}>
        <form className={classes.auth} onSubmit={this.handleSubmit}>
          <LabeledInput label="이메일" onChange={this.handleEmailChange} />
          <LabeledInput label="비밀번호" onChange={this.handlePasswordChange} />
          <LoginButton />
        </form>
        <SignupLink />
        <DivisionBar />
        <a className={classes.kakao_btn} href={this.props.url}>
         <img src={loginImage} alt={"카카오 로그인"} />
        </a>
      </div>
    );
  }
}

export default LoginForm;
