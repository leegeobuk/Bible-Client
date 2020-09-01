import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MainNav from "../nav/MainNav";
import { API_URL } from "../../util/env";
import axios from "axios";

const kakaoRefreshTokenUrl = `${API_URL}/refreshtoken?type=kakao`;

class AuthChecker extends Component {
  shouldRefreshToken = (token) => {
    const expiry = token.expiry.getTime();
    return Date.now() > expiry;
  }

  onSilentRefresh = async () => {
    await axios.post(kakaoRefreshTokenUrl, {grantType: "refresh_token"}, {withCredentials: true})
    .then(res => {
      console.log(res.data);
      this.props.setToken(this.props.tokenize(res.data));
    })
    .catch(err => {
      if (err.response.status === 401) {
        console.log(err.response.data);
      }
      else if (err.response.status === 500) {
        console.log(err.response.data);
      }
    });
  }
  
  componentDidMount() {
    console.log('initial silent refresh');
    this.onSilentRefresh();
  }

  componentDidUpdate() {
    const {token} = this.props;
    if (this.props.loggedIn && this.shouldRefreshToken(token)) {
      console.log('silent refresh on token expiry');
      this.onSilentRefresh(token);
    }
  }

  render() {
    return <MainNav loggedIn={this.props.loggedIn} />;
  }
}

export default withRouter(AuthChecker);
