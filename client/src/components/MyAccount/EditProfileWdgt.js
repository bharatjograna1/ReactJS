/**
 * Auther : Salim Deraiya
 * Created : 12/10/2018
 * Edit User Profile Widget
 */

import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Label, Form, FormGroup, Input, Alert, Button } from "reactstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
import MatButton from "@material-ui/core/Button";

// redux action
import {
  getProfileByID,
  editProfile
} from "Actions/MyAccount";

// intl messages
import IntlMessages from "Util/IntlMessages";

const validateEditProfile = require('../../validation/MyAccount/edit_profile');

class EditProfileWdgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        FirstName: '',
        LastName: '',
        Email: '',
        MobileNo: '',
        Username: '',
        isEmailConfirmed: true,
      },
      get_info: 'hide',
      err_msg: '',
      err_alert: true,
      success_msg: '',
      success_alert: true,
      loading: false,
      errors: {}
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getProfileByID();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });

    if (nextProps.data.ReturnCode === 1) {
      var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
    } else if (nextProps.data.statusCode === 200) {
      let success_msg = this.state.get_info === 'hide' ? '' : nextProps.data.ReturnMsg;
      let userData = nextProps.data.UserData;
      this.setState({
        success_msg: success_msg,
        success_alert: true,
        //data: nextProps.data.userData
        data : {
          FirstName : userData.FirstName != 'null' ? userData.FirstName : '',
          LastName : userData.LastName != 'null' ? userData.LastName : '',
          Email : userData.Email != 'null' ? userData.Email : '',
          MobileNo : userData.MobileNo != 'null' ? userData.MobileNo : '',
          Username : userData.Username != 'null' ? userData.Username : ''
        }
      });
    }
  }

  onDismiss() {
    this.setState({ err_alert: false, success_alert: false });
  }

  onChange(event) {
    let newObj = Object.assign({}, this.state.data);
    newObj[event.target.name] = event.target.value;
    this.setState({ data: newObj });
  }

  onSubmit(event) {
    event.preventDefault();    
    
    let profileObj = {
      FirstName : this.state.data.FirstName,
      LastName : this.state.data.LastName
    }
    const { errors, isValid } = validateEditProfile(profileObj);
    //const { errors, isValid } = validateEditProfile(this.state.data);
    this.setState({ err_alert: false, success_alert: false, errors: errors, get_info : 'show' });

    if (isValid) {
      this.props.editProfile(profileObj);
      //this.props.editProfile(this.state.data);
    }
  }

  render() {
    const { FirstName, LastName, Email, MobileNo, Username } = this.state.data;
    const { err_alert, err_msg, success_msg, success_alert, loading, errors } = this.state;
    return (
      <div className="mx-auto w-50 mt-20 darksucessmsg">
        {/* <div className="row">
          <div className="col-md-6"><h1 className="ml-20 mt-20"><IntlMessages id="sidebar.editProfile" /></h1></div>
          <div className="col-md-6"><Link to="/app/my-account/change-password" className="mr-10 mt-20 text-warning text-right"><IntlMessages id="sidebar.changePass" /></Link></div>
        </div> */}
        {loading && <div className="mb-10"><LinearProgress color="secondary" /></div>}
        {success_msg && <div className="alert_area">
          <Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
        </div>}
        {err_msg && <div className="alert_area">
          <Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
        </div>}
        <Form>
          <FormGroup className="row">
            <Label for="FirstName" className="control-label col-md-4"><IntlMessages id="my_account.editProfile.firstName" /></Label>
            <div className="col-md-8">
              <IntlMessages id="myaccount.enterFirstName">
                  { (placeholder) =>
                      <Input type="text" name="FirstName" value={FirstName} id="FirstName" placeholder={placeholder} onChange={this.onChange} />
                  }
              </IntlMessages>
              {/* <Input type="text" name="FirstName" value={FirstName} id="FirstName" onChange={this.onChange} /> */}
              {errors.FirstName && <div className="text-danger text-left"><IntlMessages id={errors.FirstName} /></div>}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <Label for="LastName" className="control-label col-md-4"><IntlMessages id="my_account.editProfile.lastName" /></Label>
            <div className="col-md-8">
              <IntlMessages id="myaccount.enterLastName">
                  { (placeholder) =>
                      <Input type="text" name="LastName" value={LastName} id="LastName" placeholder={placeholder} onChange={this.onChange} />
                  }
              </IntlMessages>
              {/* <Input type="text" name="LastName" value={LastName} id="LastName" onChange={this.onChange} /> */}
              {errors.LastName && <div className="text-danger text-left"><IntlMessages id={errors.LastName} /></div>}
            </div>
          </FormGroup>
          <FormGroup className="row">
            <Label for="Username" className="control-label col-md-4"><IntlMessages id="my_account.editProfile.username" /></Label>
            <div className="col-md-8">
              <Label className="control-label">{Username}</Label>
              {/* <Input type="text" name="Username" value={Username} id="Username" onChange={this.onChange} />
              {errors.Username && <div className="text-danger text-left"><IntlMessages id={errors.Username} /></div>} */}
            </div>
          </FormGroup>
          {Email && <FormGroup className="row">
            <Label for="Email" className="control-label col-md-4"><IntlMessages id="my_account.editProfile.email" /></Label>
            <div className="col-md-8">
              <Label className="control-label">{Email}</Label>
              {/* <Input type="email" name="Email" value={Email} id="Email" onChange={this.onChange} />
              {errors.Email && <div className="text-danger text-left"><IntlMessages id={errors.Email} /></div>} */}
            </div>
            </FormGroup> }
          {MobileNo && <FormGroup className="row">
            <Label for="MobileNo" className="control-label col-md-4"><IntlMessages id="sidebar.mobileNumber" /></Label>
            <div className="col-md-8">
              <Label className="control-label">{MobileNo}</Label>
              {/* <Input type="text" name="MobileNo" value={MobileNo} id="MobileNo" onChange={this.onChange} />
              {errors.MobileNo && <div className="text-danger text-left"><IntlMessages id={errors.MobileNo} /></div>} */}
            </div>
            </FormGroup> }
            <FormGroup className="row text-left">
                <div className="col-md-6 offset-4 mb-15">
                  <MatButton disabled={loading}  variant="raised" className="btn-primary text-white"  onClick={this.onSubmit}>
                      <IntlMessages id="sidebar.btnUpdate" />
                  </MatButton>
                </div>
            </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ editProfileRdcer }) => {
  const { data, loading } = editProfileRdcer;
  return { data, loading };
};

export default connect(mapStateToProps, {
  getProfileByID,
  editProfile
})(EditProfileWdgt);