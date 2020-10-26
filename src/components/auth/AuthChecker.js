import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MainNav from "../nav/MainNav";
import { API_URL } from "../../util/env";
import cookies from "js-cookie";
import axios from "axios";

const refreshTokenUrl = `${API_URL}/refreshtoken?type=`;

class AuthChecker extends Component {
  shouldRefreshToken = (token) => {
    const expiry = token.expiry.getTime();
    return Date.now() > expiry;
  }

  onSilentRefresh = async () => {
    const type = cookies.get('login_type');
    console.log(type);
    if (type) {
      await axios.post(refreshTokenUrl + type, {grantType: "refresh_token"}, {withCredentials: true})
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
    return <MainNav setToken={this.props.setToken} loggedIn={this.props.loggedIn} />;
  }
}

export default withRouter(AuthChecker);
