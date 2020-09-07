import React, { Component } from "react";
import SignupForm from "../components/auth/forms/SignupForm";
import { API_URL, KAKAO_KEY, REDIRECT_SIGNUP } from "../util/env";
import Backdrop from "../components/modal/Backdrop";
import DialogPane from "../components/modal/DialogPane";
import axios from "axios";
import classes from "./Signup.module.css";

const authBaseUrl = "https://kauth.kakao.com";
const authUrl = `${authBaseUrl}/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_SIGNUP}&response_type=code`;
const tokenUrl = `${API_URL}/signup?type=kakao`;

class Signup extends Component {
  state = {
    dialogOn: false,
    msg: "",
    isSigned: false
  }

  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }

  signup = async (code) => {
    const req = this.createTokenRequest(code);
    await axios.post(tokenUrl, req)
      .then(res => {
        this.toggleDialog("회원가입을 축하합니다!", true);
        console.log(res.status);
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.toggleDialog("이미 가입된 계정입니다");
        } else if (err.response.status === 500) {
          this.toggleDialog("서버에 에러가 있었습니다. 다시 시도해 주십시오.");
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

  toggleDialog = (msg, isSigned = false) => {
    this.setState({dialogOn: !this.state.dialogOn, msg: msg, isSigned: isSigned});
  }

  redirect = () => {
    this.props.history.push("/login");
  }

  componentDidMount() {
    const code = this.useQuery().get('code');
    if (code) {
      this.signup(code);
    }
  }

  render() {
    const {dialogOn, msg, isSigned} = this.state;
    return (
      <div className={classes.Signup}>
        <Backdrop show={dialogOn} />
        <DialogPane show={dialogOn} click={isSigned ? this.redirect : this.toggleDialog.bind(this, msg)} text={msg} />
        <SignupForm url={authUrl} toggle={this.toggleDialog} />
      </div>
    );
  }
}

export default Signup;
