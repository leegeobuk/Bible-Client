import React, { Component } from "react";
import SignupForm from "../components/auth/forms/SignupForm";
import { API_URL, KAKAO_KEY, REDIRECT_SIGNUP } from "../util/env";
import Backdrop from "../components/modal/Backdrop";
import AuthFail from "../components/modal/AuthFail";
import classes from "./Signup.module.css";
import axios from "axios";

const authBaseUrl = "https://kauth.kakao.com";
const authUrl = `${authBaseUrl}/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_SIGNUP}&response_type=code`;
const tokenUrl = `${API_URL}/signup`;

class Signup extends Component {
  state = {
    isSignupFailed: false
  }

  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }

  signup = async (code) => {
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
      redirect_uri: REDIRECT_SIGNUP,
      code: code
    };
    return req;
  }

  toggleDialog = () => {
    this.setState({isSignupFailed: !this.state.isSignupFailed})
  }

  componentDidMount() {
    const code = this.useQuery().get('code');
    if (code) {
      this.signup(code);
    }
  }

  render() {
    const {isSignupFailed} = this.state;
    return (
      <div className={classes.Signup}>
        <Backdrop show={isSignupFailed} />
        <AuthFail show={isSignupFailed} toggle={this.toggleDialog} text="이미 가입된 계정입니다" />
        <SignupForm url={authUrl} />
      </div>
    );
  }
}

export default Signup;
