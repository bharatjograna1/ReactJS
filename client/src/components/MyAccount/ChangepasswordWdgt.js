/**
 * Auther : Salim Deraiya
 * Created : 12/10/2018
 * Change Password Widget
 */

import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { Label, Form, FormGroup, Input, Alert, Button } from "reactstrap";
import LinearProgress from '@material-ui/core/LinearProgress';

// jbs card box
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';

// redux action
import { changePassword } from "Actions/MyAccount";

// intl messages
import IntlMessages from "Util/IntlMessages";
import MatButton from "@material-ui/core/Button";

const validateChangePassword = require('../../validation/MyAccount/change_password');

class ChangePasswordWdgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
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

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });

    if (nextProps.data.ReturnCode === 1) {
      var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
      this.setState({ err_alert: true, err_msg: errMsg });
    } else if (nextProps.data.statusCode === 200) {
      this.setState({ success_msg: nextProps.data.ReturnMsg, success_alert: true });
      this.cleanData();
    }
  }

  onDismiss() {
    this.setState({ err_alert: false, success_alert: false });
  }

  cleanData() {
    this.setState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = validateChangePassword(this.state);
    this.setState({ err_alert: false, errors: errors });

    if (isValid) {

      let changeObj = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword
      }

      this.props.changePassword(changeObj);
    }
  }

  render() {
    const { oldPassword, newPassword, confirmPassword, err_alert, err_msg, success_msg, success_alert, loading, errors } = this.state;
    return (
      <Fragment>
        <div className="mx-auto w-75 mt-20">
          {loading && <div><LinearProgress color="secondary" /></div>}
          {success_msg && <div className="alert_area">
            <Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
          </div>}
          {err_msg && <div className="alert_area">
            <Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
          </div>}
          <Form>
            <FormGroup className="row">
              <Label for="oldPassword" className="control-label col-md-4"><IntlMessages id="sidebar.oldPassword" /></Label>
              <div className="col-md-8">
                <IntlMessages id="myaccount.enterOldPass">
                  {(placeholder) =>
                    <Input type="password" name="oldPassword" value={oldPassword} placeholder={placeholder} id="oldPassword" onChange={this.onChange} />
                  }
                </IntlMessages>
                {/* <Input type="password" name="oldPassword" value={oldPassword} id="oldPassword" onChange={this.onChange} /> */}
                {errors.oldPassword && <div className="text-danger text-left"><IntlMessages id={errors.oldPassword} /></div>}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label for="newPassword" className="control-label col-md-4"><IntlMessages id="sidebar.newPassword" /></Label>
              <div className="col-md-8">
                <IntlMessages id="myaccount.enterNewPass">
                  {(placeholder) =>
                    <Input type="password" name="newPassword" value={newPassword} id="newPassword" placeholder={placeholder} onChange={this.onChange} />
                  }
                </IntlMessages>
                {/* <Input type="password" name="newPassword" value={newPassword} id="newPassword" onChange={this.onChange} /> */}
                {errors.newPassword && <div className="text-danger text-left"><IntlMessages id={errors.newPassword} /></div>}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label for="confirmPassword" className="control-label col-md-4"><IntlMessages id="sidebar.confirmPassword" /></Label>
              <div className="col-md-8">
                <IntlMessages id="myaccount.enterCofirmNewPass">
                  {(placeholder) =>
                    <Input type="password" name="confirmPassword" value={confirmPassword} id="confirmPassword" placeholder={placeholder} onChange={this.onChange} />
                  }
                </IntlMessages>
                {/* <Input type="password" name="confirmPassword" value={confirmPassword} id="confirmPassword" onChange={this.onChange} /> */}
                {errors.confirmPassword && <div className="text-danger text-left"><IntlMessages id={errors.confirmPassword} /></div>}
              </div>
            </FormGroup>
            <FormGroup className="row">
              <Label className="col-md-4" />
              <div className="col-md-4">
                <MatButton disabled={loading} variant="raised" className="btn-primary text-white" onClick={this.onSubmit}>
                  <IntlMessages id="sidebar.btnChangePassword" />
                </MatButton>
              </div>
            </FormGroup>
          </Form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ changepwd }) => {
  var response = {
    data: changepwd.data,
    loading: changepwd.loading
  };
  return response;
};

export default connect(mapStateToProps, {
  changePassword
})(ChangePasswordWdgt);