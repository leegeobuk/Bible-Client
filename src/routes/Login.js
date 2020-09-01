import React, { Component } from "react";
import { API_URL, KAKAO_KEY, REDIRECT_LOGIN } from "../util/env";
import axios from "axios";
import LoginForm from "../components/auth/forms/LoginForm";
import DialogPane from "../components/modal/DialogPane";
import Backdrop from "../components/modal/Backdrop";
import classes from "./Login.module.css";

const kakaoBaseUrl = "https://kauth.kakao.com/oauth/authorize";
const kakaoAuthUrl = `${kakaoBaseUrl}?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_LOGIN}&response_type=code`;
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
    await axios.post(kakaoTokenUrl, req, {withCredentials: true}) 
      .then(res => {
        console.log("login: ");
        console.log(res.data);
        this.redirect(this.props.tokenize(res.data));
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
      grantType: grantType,
      redirectUri: REDIRECT_LOGIN,
      code: code
    };
    return req;
  }
  
  redirect = (token) => {
    this.props.setToken(token);
    this.props.history.push("/");
  }

  toggleDialog = (msg, isSigned = false) => {
    this.setState({dialogOn: !this.state.dialogOn, msg: msg, isSigned: isSigned});
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
        <DialogPane show={dialogOn} click={isSigned ? this.redirect : this.toggleDialog.bind(this, msg)} text={msg} />
        <LoginForm url={kakaoAuthUrl} />
      </div>
    );
  }
}

export default Login;
