import React, { Component } from "react";
import LabeledInput from "./LabeledInput";
import AuthButton from "../buttons/AuthButton";
import DivisionBar from "../DivisionBar";
import { API_URL } from "../../../util/env";
import axios from "axios";
import classes from "./SignupForm.module.css";

const signupImage = "/images/signup_kakao.png";
const signupUrl = `${API_URL}/signup?type=app`;

class SignupForm extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: ""
  }

  handleEmailChange = (event) => {
    const val = event.target.value
    this.setState(current => ({
      email: val,
      password: current.password,
      confirmPassword: current.confirmPassword
    }));
  }
  
  handlePasswordChange = (event) => {
    const val = event.target.value
    this.setState(current => ({
      email: current.email,
      password: val,
      confirmPassword: current.confirmPassword
    }));
  }
  
  handleConfirmPasswordChange = (event) => {
    const val = event.target.value
    this.setState(current => ({
      email: current.email,
      password: current.password,
      confirmPassword: val
    }));
  }
  
  handleSubmit = async () => {
    console.log("signup clicked");
    await axios.post(signupUrl, this.state)
      .then(res => {
        this.props.toggle("회원가입을 축하합니다!", true);
        console.log(res.status);
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.toggle("이미 가입된 계정입니다");
        } else if (err.response.status === 500) {
          this.props.toggle("서버에 에러가 있었습니다. 다시 시도해 주십시오.");
        }
      });
  }

  render() {
    return (
      <div className={classes.SignupForm}>
        <div className={classes.auth} onSubmit={this.handleSubmit}>
          <LabeledInput label="이메일" handle={this.handleEmailChange} type={"text"} />
          <LabeledInput label="비밀번호" handle={this.handlePasswordChange} type={"password"} />
          <LabeledInput label="비밀번호 확인" handle={this.handleConfirmPasswordChange} type={"password"} />
          <AuthButton value="가입하기" hasMargin={true} submit={this.handleSubmit} />
        </div>
        <DivisionBar />
        <a className={classes.kakao_btn} href={this.props.url}>
         <img src={signupImage} alt={"카카오 회원가입"} />
        </a>
      </div>
    );
  }
}

export default SignupForm;
