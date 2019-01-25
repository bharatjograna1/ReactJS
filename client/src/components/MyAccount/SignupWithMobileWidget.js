/**
 * Form Elemets
 * Sign Up With Email
 */
import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { Form, FormGroup, Label, Input, Card, CardText } from "reactstrap";
import { connect } from "react-redux";

// redux action
import { signupUserMobile } from "Actions";
import Radio from '@material-ui/core/Radio';
// intl messages
import IntlMessages from "Util/IntlMessages";

//Country Phone Component...
import PhoneInput, { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'

const validatesignupMobile = require('../../validation/MyAccount/mobile_signup');

class SignupWithMobileWidget extends Component {
  constructor(props) {
    super();		
    this.state = {
      mobile: "",
      password: "",
      confirmpassword: "",
      referalid: "",
      selectedValue:'true',
      err_msg : "",
      err_alert : true,
      btn_disabled : false,
      errors: ""
    };
    this.onUserSignUp = this.onUserSignUp.bind(this);
  } 

  onDismiss() {
    this.setState({ err_alert: false });
  }
  
  /* componentWillReceiveProps(nextProps) {
    if(nextProps.err_msg != '') {
      this.setState({ err_alert: true, btn_disabled : false, err_msg : nextProps.err_msg });
    }

    if(nextProps.data.statusCode === 200) {
      this.setState({ err_msg : '', err_alert: false  });
      this.props.history.push('/app/my-account/login');
    }
  } */  

  /**
   * On User Signup
   */
  onUserSignUp() {
    const { errors, isValid } = validatesignupMobile(this.state);
    //this.setState({ err_alert: false, errors: errors, btn_disabled : true });

    if(isValid) {
      this.props.signupUserMobile(this.state);
    }
  }

  render() {
    const { err_alert, err_msg, btn_disabled, mobile, password, confirmpassword, referalid, selectedValue, errors} = this.state;
    return (
      <Fragment>
        {err_msg && <div className="alert_area">
          <Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
        </div>}
        <Form className="innerborder">
          <FormGroup className="has-wrapper">
            <Input type="text" value={mobile} name="user-mobile" id="user-mobile" className="has-input input-lg" placeholder="Enter Mobile Number" onChange={e => this.setState({ mobile: e.target.value })} />
            {/* <PhoneInput placeholder="Enter phone number" value={ mobile } onChange={e => this.setState({ mobile: e.target.value })} error={ mobile ? (isValidPhoneNumber(mobile) ? undefined : 'Invalid phone number') : 'Phone number required' } /> */}
            <span className="has-icon"><i className=" ti-mobile" /></span>
            {errors.mobile && <span className="text-danger text-left"><IntlMessages id={errors.mobile} /></span>}
          </FormGroup>
          <FormGroup className="has-wrapper">
            <Input type="Password" value={password} name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={e => this.setState({ password: e.target.value })}/>
            <span className="has-icon"><i className="ti-lock" /></span>
            {errors.password && <span className="text-danger text-left"><IntlMessages id={errors.password} /></span>}
          </FormGroup>
          <FormGroup className="has-wrapper">
            <Input type="Password" value={confirmpassword} name="confirm-pwd" id="confirm-pwd" className="has-input input-lg" placeholder="Confirm Password" onChange={e => this.setState({ confirmpassword: e.target.value })} />
            <span className="has-icon"><i className="ti-lock" /></span>
            {errors.confirmpassword && <span className="text-danger text-left"><IntlMessages id={errors.confirmpassword} /></span>}
          </FormGroup>
          <FormGroup className="has-wrapper">
            <span className="has-icon"><i className="ti-bookmark-alt" /></span>
            <Input type="text" value={referalid} name="referal-id" id="referal-id" className="has-input input-lg" placeholder="Referal ID (Optional)" onChange={e => this.setState({ referalid: e.target.value })} />
            {errors.referalid && <span className="text-danger text-left"><IntlMessages id={errors.referalid} /></span>}
          </FormGroup>
          <FormGroup className="text-center">
            <Label>
              <Radio value={selectedValue} name="radio-button-demo" aria-label="C" props={{root: this.props.root,checked: this.props.checked,}} onChange={e => this.setState({ selectedValue: e.target.value })} />  I Agree to
            </Label>
            <Link to="/terms-condition">Terms of Service</Link>
          </FormGroup>
          <FormGroup className=" mb-20">
            <Card body inverse style={{ borderColor: "gray" }}>
              <CardText />
            </Card>
          </FormGroup>
          <FormGroup className="mb-15">
            <Button disabled={btn_disabled} className="btn-warning text-white text-bold btn-block w-100" variant="raised" size="large" onClick={this.onUserSignUp}>Register</Button>
          </FormGroup>
          <FormGroup >
            <div className="mb-10 float-right ">Already Registread <Link to="/app/my-account/login">Login</Link></div>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

// map state to props
const mapStateToProps = ({ usermobileauth }) => {
  var response = { 
    data: usermobileauth.user,
    loading: usermobileauth.loading,
    err_msg : usermobileauth.error
  };
  return response;
};

export default withRouter(connect(mapStateToProps,{
  signupUserMobile
})(SignupWithMobileWidget));
