import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MainNav from "../nav/MainNav";
import { API_URL } from "../../util/env";
import axios from "axios";
import Cookies from "universal-cookie";

const kakaoRefreshTokenUrl = `${API_URL}/refreshtoken?type=kakao`;

class AuthChecker extends Component {
  isTokenValid = (token) => {
    return token && Date.now() <= token.expiry.getTime();
  }

  shouldRefreshToken = (token) => {
    if (!token) {
      return false;
    }
    const expiry = token.expiry.getTime();
    return Date.now() > expiry;
  }

  listen = (token) => {
    this.props.history.listen(() => {
      if (this.shouldRefreshToken(token)) {
        axios.post(kakaoRefreshTokenUrl, {grantType: "refresh_token"}, {withCredentials: true})
          .then(res => {
            console.log(res.data);
            this.props.setToken(this.tokenize(res.data));
          })
          .catch(err => {
            console.log(err.response);
            // error handling
          });
      }
    });
  }

  tokenize = (data) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + data.expiresIn);
    return {
      accessToken: data.accessToken,
      expiry: date
    };
  }

  componentDidUpdate() {
    
    // if (refreshToken) {
      
    // }
    this.listen(this.props.token);

  }

  render() {
    const cookies = new Cookies();
    const refreshToken = cookies.get('refresh_token');
    console.log(refreshToken);
    return <MainNav loggedIn={this.props.loggedIn} />;
  }
}

export default withRouter(AuthChecker);
