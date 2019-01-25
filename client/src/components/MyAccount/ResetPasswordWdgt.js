/**
 * Form Elemets
 */
/**
 * Reset Password
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { Form, FormGroup, Label, Input, Card, CardText } from "reactstrap";
import Radio from '@material-ui/core/Radio';

// redux action
import { resetPassword } from "Actions/MyAccount";

// intl messages
import IntlMessages from "Util/IntlMessages";

const validateResetPassword = require('../../validation/MyAccount/reset_password');

class ResetPasswordWdgt extends Component {
  constructor(props) {
    super();

    this.state = {
      newpassword: "",
      confirmpassword: "",
      selectedValue: "true",
      errors: ""
    };
    this.onResetpwd = this.onResetpwd.bind(this);
  }

  /**
   * Reset Password
   */
  onResetpwd() {
    const { newpassword, confirmpassword } = this.state;
    const { errors, isValid } = validateResetPassword(this.state);
    this.setState({ errors: errors });

    if (isValid) {
      this.props.resetPassword({ newpassword, confirmpassword });
    }
  }

  render() {

    const { newpassword, confirmpassword, selectedValue, errors } = this.state;
    return (
      <div>
        <Form className="innerborder">
          <FormGroup className="has-wrapper">
            <Input
              type="text"
              value={newpassword}
              name="newpassword"
              id="newpassword"
              className="has-input input-lg"
              placeholder="Enter New Password"
              onChange={e => this.setState({ newpassword: e.target.value })}
            />
            <span className="has-icon">
              <i className="ti-lock" />
            </span>
            {errors.newpassword && <span className="text-danger"><IntlMessages id={errors.newpassword} /></span>}
          </FormGroup>

          <FormGroup className="has-wrapper">
            <Input
              type="Password"
              value={confirmpassword}
              name="confirm-pwd"
              id="confirm-pwd"
              className="has-input input-lg"
              placeholder="Confirm Password"
              onChange={e => this.setState({ confirmpassword: e.target.value })}
            />
            <span className="has-icon">
              <i className="ti-lock" />
            </span>
            {errors.confirmpassword && <span className="text-danger"><IntlMessages id={errors.confirmpassword} /></span>}

          </FormGroup>

          <FormGroup className="mb-15">
            <Button
              className="btn-warning text-white text-bold btn-block w-100"
              variant="raised"
              size="large"
              onClick={this.onResetpwd}
            >Submit
            </Button>
          </FormGroup>

        </Form>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = ({ resetpwd }) => {
  const { data, loading } = resetpwd;
  return { data, loading };
};

export default connect(mapStateToProps, {
  resetPassword
})(ResetPasswordWdgt);