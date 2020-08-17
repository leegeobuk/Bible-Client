import React, { Component } from "react";
import LabeledInput from "./LabeledInput";
import SignupLoginButton from "../buttons/AuthButton";
import DivisionBar from "../DivisionBar";
import classes from "./SignupForm.module.css";

const signupImage = "/images/signup_kakao.png";

class SignupForm extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: ""
  }

  handleEmailChange = (event) => {
    this.setState(current => ({
      email: event.target.value,
      password: current.password,
      confirmPassword: current.confirmPassword
    }));
  }
  
  handlePasswordChange = (event) => {
    this.setState(current => ({
      email: current.email,
      password: event.target.value,
      confirmPassword: current.confirmPassword
    }));
  }
  
  handleConfirmPasswordChange = (event) => {
    this.setState(current => ({
      email: current.email,
      password: current.password,
      confirmPassword: event.target.value
    }));
  }
  
  handleSubmit = () => {
    // send post request to server
    // axios.post();
  }

  render() {
    return (
      <div className={classes.SignupForm}>
        <form className={classes.auth} onSubmit={this.handleSubmit}>
          <LabeledInput label="이메일" onChange={this.handleEmailChange} />
          <LabeledInput label="비밀번호" onChange={this.handlePasswordChange} />
          <LabeledInput label="비밀번호 확인" onChange={this.handleConfirmPasswordChange} />
          <SignupLoginButton value="가입하기" hasMargin={true} />
        </form>
        <DivisionBar />
        <a className={classes.kakao_btn} href={this.props.url}>
         <img src={signupImage} alt={"카카오 회원가입"} />
        </a>
      </div>
    );
  }
}

export default SignupForm;
