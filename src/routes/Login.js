import React, { Component } from "react";
import { API_URL, KAKAO_KEY, REDIRECT_LOGIN } from "../util/env";
import axios from "axios";
import LoginForm from "../components/auth/forms/LoginForm";
import AuthFail from "../components/modal/AuthFail";
import Backdrop from "../components/modal/Backdrop";
import classes from "./Login.module.css";

const authBaseUrl = "https://kauth.kakao.com";
const authUrl = `${authBaseUrl}/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_LOGIN}&response_type=code`;
const tokenUrl = `${API_URL}/login`;

class Login extends Component {
  state = {
    isLoginFailed: false
  }
  
  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }
  
  login = async (code) => {
    const req = this.createTokenRequest(code);
    await axios.post(tokenUrl, req)
      .then(res => {
        console.log(res.status);
        // redirect to home
      })
      .catch(err => {
        if (err.response.status === 401) {
          console.log(err.response.status);
          this.toggleDialog();
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

  toggleDialog = () => {
    this.setState({isLoginFailed: !this.state.isLoginFailed})
  }

  componentDidMount() {
    const code = this.useQuery().get('code');
    if (code) {
      this.login(code);
    }
  }
  
  render() {
    const {isLoginFailed} = this.state;
    return (
      <div className={classes.Login}>
        <Backdrop show={isLoginFailed} />
        <AuthFail show={isLoginFailed} toggle={this.toggleDialog} text="가입되지 않은 계정입니다" />
        <LoginForm url={authUrl} />
      </div>
    );
  }
}

export default Login;
