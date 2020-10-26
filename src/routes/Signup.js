import React, { Component } from "react";
import SignupForm from "../components/auth/forms/SignupForm";
import Backdrop from "../components/modal/Backdrop";
import DialogPane from "../components/modal/DialogPane";
import classes from "./Signup.module.css";



class Signup extends Component {
  state = {
    dialogOn: false,
    msg: "",
    isSigned: false
  }

  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }

  toggleDialog = (msg, isSigned = false) => {
    this.setState({dialogOn: !this.state.dialogOn, msg: msg, isSigned: isSigned});
  }

  redirect = () => {
    this.props.history.push("/login");
  }

  render() {
    const code = this.useQuery().get('code');
    const {dialogOn, msg, isSigned} = this.state;
    return (
      <div className={classes.Signup}>
        <Backdrop show={dialogOn} />
        <DialogPane show={dialogOn} click={isSigned ? this.redirect : this.toggleDialog.bind(this, msg)} text={msg} />
        <SignupForm kakaoCode={code} toggleDialog={this.toggleDialog} />
      </div>
    );
  }
}

export default Signup;
