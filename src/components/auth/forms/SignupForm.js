import React, { Component } from "react";
import LabeledInput from "./LabeledInput";
import AuthButton from "../buttons/AuthButton";
import DivisionBar from "../DivisionBar";
import { API_URL, KAKAO_KEY, REDIRECT_SIGNUP } from "../../../util/env";
import axios from "axios";
import bcrypt from "bcryptjs";
import classes from "./SignupForm.module.css";

const signupImage = "/images/signup_kakao.png";
const signupUrl = `${API_URL}/signup?type=app`;
const authBaseUrl = "https://kauth.kakao.com";
const authUrl = `${authBaseUrl}/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_SIGNUP}&response_type=code`;
const tokenUrl = `${API_URL}/signup?type=kakao`;

class SignupForm extends Component {
  state = {
    name: "",
    email: "",
    pw: "",
    confirmPw: ""
  }

  handleChange = (event, field) => {
    const val = event.target.value;
    const state = {
      name: this.state.name,
      email: this.state.email,
      pw: this.state.pw,
      confirmPw: this.state.confirmPw
    };
    state[field] = val;
    this.setState(state);
  }

  signup = async (url, req) => {
    await axios.post(url, req)
    .then(res => {
        console.log(req);
        this.props.toggleDialog("회원가입을 축하합니다!", true);
        console.log(res.status);
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.props.toggleDialog("아이디 비밀번호를 확인하세요");
        } else if (err.response.status === 401) {
          this.props.toggleDialog("이미 가입된 계정입니다");
        } else if (err.response.status === 500) {
          this.props.toggleDialog("다시 시도해 주십시오");
        }
      });
  }

  createTokenRequest = (code) => {
    const grantType = "authorization_code";
    const req = {
      grantType: grantType,
      redirectUri: REDIRECT_SIGNUP,
      code: code
    };
    return req;
  }

  signupApp = (url) => {
    if (this.validate(this.state)) {
      const {name, email} = this.state;
      const hash = this.encrypt(this.state.pw);
      const req = {
        name: name,
        email: email,
        pw: hash
      };
      this.signup(url, req);
    }
  }

  validate = (req) => {
    return req.email.includes("@") && (req.pw === req.confirmPw);
  }

  encrypt = (pw) => {
    try {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(pw, salt);
      return hash;
    } catch (error) {
      this.props.toggleDialog("다시 시도해 주십시오");
    }
  }

  componentDidMount() {
    const code = this.props.kakaoCode;
    if (code) {
      const req = this.createTokenRequest(code);
      this.signup(tokenUrl, req);
    }
  }
  
  render() {
    return (
      <div className={classes.SignupForm}>
        <div className={classes.auth}>
          <LabeledInput label="이름" handle={this.handleChange} field={"name"} type={"text"} />
          <LabeledInput label="이메일" handle={this.handleChange} field={"email"} type={"text"} />
          <LabeledInput label="비밀번호" handle={this.handleChange} field={"pw"} type={"password"} />
          <LabeledInput label="비밀번호 확인" handle={this.handleChange} field={"confirmPw"} type={"password"} />
          <AuthButton value="가입하기" hasMargin={true} click={this.signupApp.bind(this, signupUrl)} />
        </div>
        <DivisionBar />
        <a className={classes.kakao_btn} href={authUrl}>
         <img src={signupImage} alt={"카카오 회원가입"} />
        </a>
      </div>
    );
  }
}

export default SignupForm;
