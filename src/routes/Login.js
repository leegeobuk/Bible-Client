import React, { Component } from "react";
import { API_URL, KAKAO_KEY, REDIRECT_LOGIN } from "../util/env";
import axios from "axios";
import LoginForm from "../components/auth/forms/LoginForm";
import AuthDialog from "../components/modal/AuthDialog";
import Backdrop from "../components/modal/Backdrop";
import classes from "./Login.module.css";

const kakaoBaseUrl = "https://kauth.kakao.com";
const kakaoAuthUrl = `${kakaoBaseUrl}/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_LOGIN}&response_type=code`;
const kakaoTokenUrl = `${API_URL}/login?type=kakao`;

class Login extends Component {
  state = {
    dialogOn: false,
    msg: "",
    isSigned: false
  }
  
  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }
  
  login = async (code) => {
    const req = this.createTokenRequest(code);
    await axios.post(kakaoTokenUrl, req)
      .then(res => {
        console.log(res.status);
        this.toggleDialog("로그인 되었습니다", true);
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.toggleDialog("가입되지 않은 계정입니다");
        } else if (err.response.status === 500) {
          this.toggleDialog("서버에 에러가 있었습니다. 다시 시도해 주십시오.");
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

  toggleDialog = (msg, isSigned = false) => {
    this.setState({dialogOn: !this.state.dialogOn, msg: msg, isSigned: isSigned});
  }

  redirect = () => {
    this.props.markLoggedIn();
    this.props.history.push("/");
  }

  componentDidMount() {
    const code = this.useQuery().get('code');
    if (code) {
      this.login(code);
    }
  }
  
  render() {
    const {dialogOn, msg, isSigned} = this.state;
    return (
      <div className={classes.Login}>
        <Backdrop show={dialogOn} />
        <AuthDialog show={dialogOn} click={isSigned ? this.redirect : this.toggleDialog.bind(this, msg)} text={msg} />
        <LoginForm url={kakaoAuthUrl} />
      </div>
    );
  }
}

export default Login;
