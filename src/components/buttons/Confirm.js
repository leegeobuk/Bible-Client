import React, {Component} from "react"
import classes from "./Confirm.module.css"

class Confirm extends Component {
  render() {
    return (
      <div className={classes.Confirm}>
        <button className={classes.confirm_btn} onClick={this.props.click}>
          확인
        </button>
      </div>
    );
  }
}

export default Confirm;
