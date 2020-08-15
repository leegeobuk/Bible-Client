import React, { Component } from "react";
import { API_URL, KAKAO_KEY, REDIRECT_LOGIN } from "../util/env";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import LoginFail from "../components/modal/LoginFail";
import classes from "./Auth.module.css";
import Backdrop from "../components/modal/Backdrop";

const authBaseUrl = "https://kauth.kakao.com";
const authUrl = `${authBaseUrl}/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_LOGIN}&response_type=code`;
const tokenUrl = `${API_URL}/login`;
const loginImage = "/images/login_kakao.png";

class Auth extends Component {
  state = {
    isLoginFailed: false
  }
  
  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }
  
  login = async (code) => {
    const req = this.createTokenRequest(code);
    await axios.post(tokenUrl, req)
      .catch(err => {
        if (err.response.status === 401) {
          console.log(err.response.status);
        }
      });
  }

  createTokenRequest = (code) => {
    const grantType = "authorization_code";
    const req = {
      grant_type: grantType,
      redirect_uri: REDIRECT_LOGIN,
      code: code
    };
    return req;
  }

  toggleLoginFailDialog = () => {
    this.setState({isLoginFailed: !this.state.isLoginFailed})
  }

  componentDidMount() {
    const code = this.useQuery().get('code');
    if (code) {
      this.login(code);
      this.toggleLoginFailDialog();
    }
  }
  
  render() {
    return (
      <div className={classes.Auth}>
        <Backdrop show={this.state.isLoginFailed} />
        <LoginFail show={this.state.isLoginFailed} toggleDialog={this.toggleLoginFailDialog} />
        <LoginForm />
        <a className={classes.kakao_btn} href={authUrl}>
         <img src={loginImage} alt={"카카오 로그인"} />
        </a>
        <Link className={classes.signup_btn} to={"/signup"}>
          회원가입
        </Link>
      </div>
    );
  }
}

export default Auth;
