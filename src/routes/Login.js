import React, { Component } from "react";
import LoginForm from "../components/auth/forms/LoginForm";
import DialogPane from "../components/modal/DialogPane";
import Backdrop from "../components/modal/Backdrop";
import classes from "./Login.module.css";

class Login extends Component {
  state = {
    dialogOn: false,
    msg: ""
  }
  
  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }
  
  toggleDialog = (msg) => {
    this.setState({dialogOn: !this.state.dialogOn, msg: msg});
  }

  render() {
    const code = this.useQuery().get('code');
    const {dialogOn, msg} = this.state;
    return (
      <div className={classes.Login}>
        <Backdrop show={dialogOn} />
        <DialogPane show={dialogOn} click={this.toggleDialog.bind(this, msg)} text={msg} />
        <LoginForm kakaoCode={code} toggleDialog={this.toggleDialog} tokenize={this.props.tokenize} setToken={this.props.setToken} />
      </div>
    );
  }
}

export default Login;
