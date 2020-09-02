import React, { Component } from "react";
import { KAKAO_KEY, REDIRECT_HOME, API_URL } from "../../../util/env";
import axios from "axios";
import classes from "./LogoutButton.module.css";

const kakaoBaseUrl = "https://kauth.kakao.com/oauth/logout";
const kakaoLogoutUrl = `${kakaoBaseUrl}?client_id=${KAKAO_KEY}&logout_redirect_uri=${REDIRECT_HOME}`;
const kakaoLogoutApiUrl = `${API_URL}/logout?type=kakao`;

class LogoutButton extends Component {
  logout = async () => {
    await axios.get(kakaoLogoutApiUrl, {withCredentials: true}) 
      .then(() => {
        this.props.setToken(null);
        window.location.href = kakaoLogoutUrl;
      })
      .catch(err => {
        console.log(err.response);
      });
  }
  
  render() {
    return (
      <button className={classes.logout_btn} type="button" onClick={this.logout}>
        로그아웃
      </button>
    );
  }
}

export default LogoutButton;
