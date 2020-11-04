import React, { Component } from "react";
import LabeledInput from "./LabeledInput";
import AuthButton from "../buttons/AuthButton";
import SignupLink from "../SignupLink";
import DivisionBar from "../DivisionBar";
import { KAKAO_KEY, REDIRECT_LOGIN, API_URL } from "../../../util/env";
import axios from "axios";
import { withRouter } from "react-router-dom";
import cookies from "js-cookie";
import classes from "./LoginForm.module.css";

const loginImage = "/images/login_kakao.png";
const loginUrl = `${API_URL}/login?type=app`;
const kakaoBaseUrl = "https://kauth.kakao.com/oauth/authorize";
const kakaoAuthUrl = `${kakaoBaseUrl}?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_LOGIN}&response_type=code`;
const tokenUrl = `${API_URL}/login?type=kakao`;

class LoginForm extends Component {
  state = {
    email: "",
    pw: ""
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

  login = async (url, req) => {
    await axios.post(url, req, {withCredentials: true}) 
      .then(res => {
        console.log("login: ");
        console.log(res.data);
        cookies.set('login_type', res.data.type, {
          expires: 0.25,
          secure: true
        });
        this.redirect(this.props.tokenize(res.data));
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.toggleDialog("가입되지 않은 계정입니다");
        } else if (err.response.status === 500) {
          this.props.toggleDialog("서버에 에러가 있었습니다. 다시 시도해 주십시오.");
        }
      });
  }
  
  redirect = (token) => {
    this.props.setToken(token);
    this.props.history.push("/");
  }

  createTokenRequest = (code) => {
    const grantType = "authorization_code";
    const req = {
      grantType: grantType,
      redirectUri: REDIRECT_LOGIN,
      code: code
    };
    return req;
  }
  
  componentDidMount() {
    const code = this.props.kakaoCode;
    if (code) {
      const req = this.createTokenRequest(code);
      this.login(tokenUrl, req);
    }
  }
  
  render() {
    return (
      <div className={classes.LoginForm}>
        <div className={classes.auth}>
          <LabeledInput label="이메일" handle={this.handleChange} field={"email"} type={"text"} />
          <LabeledInput label="비밀번호" handle={this.handleChange} field={"pw"} type={"password"} />
          <AuthButton value="로그인" click={this.login.bind(this, loginUrl, this.state)} />
        </div>
        <SignupLink />
        <DivisionBar />
        <a className={classes.kakao_btn} href={kakaoAuthUrl}>
         <img src={loginImage} alt={"카카오 로그인"} />
        </a>
      </div>
    );
  }
}

export default withRouter(LoginForm);
