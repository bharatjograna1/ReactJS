/**
 * Auther : Kevin Ladani
 * Created : 12/10/2018
 * Updated : 23/10/2018 (Salim Deraiya)
 * Disable Google Auth Widget
 */

import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input, Col, Button, Alert } from "reactstrap";
import { connect } from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';
// redux action
import { disableGoogleauth, getProfileByID } from "Actions/MyAccount";

// intl messages
import IntlMessages from "Util/IntlMessages";

const validateGoogleAuth = require("../../validation/MyAccount/google_auth");

class DisableGoogleAuthWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Code: '',
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading: false,
			errors: {}
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSendGoogleDisable = this.onSendGoogleDisable.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });

		if (nextProps.data.ReturnCode === 1) {
			this.setState({ err_alert: true, err_msg: nextProps.data.ReturnMsg, Code: '' });
		} else if (nextProps.data.statusCode === 200) {
			// if success then update global state with updated user details
			this.props.getProfileByID();
			this.setState({
				success_msg: nextProps.data.ReturnMsg,
				success_alert: true,
				Code: ''
			});

			setTimeout(() => {
				this.props.history.push('/app/my-account/my-account-dashboard');
			}, 3000);
		}
		// get user info response validator 
		if (Object.keys(nextProps.profileData).length > 0 && nextProps.profileData.ReturnCode === 0) {
			// to store user details in global state - added by Nishant 
			this.props.location.state = { ...this.props.location.state, userData: nextProps.profileData.UserData };
			//console.log('user details updated');
		}
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	onChange(event) {
		this.setState({ Code: event.target.value });
	}

	/**
	 * On Submit SendSms
	 */
	onSendGoogleDisable(event) {
		event.preventDefault();

		const { errors, isValid } = validateGoogleAuth(this.state.Code);
		this.setState({ errors: errors });

		if (isValid) {
			const reqObj = {
				Code: this.state.Code
			}
			this.props.disableGoogleauth(reqObj);
		}
	}

	render() {
		const { Code, err_alert, err_msg, success_msg, success_alert, loading, errors } = this.state;
		return (
			<Fragment>
				<Form>
					<div className="mt-20 downloadappbox w-50 mx-auto">
						{loading && <div><LinearProgress color="secondary" /></div>}
						{success_msg && <div className="alert_area">
							<Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
						</div>}
						{err_msg && <div className="alert_area">
							<Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
						</div>}
						{/* <FormGroup className="has-wrapper text-right" row>
							<Label for="loginpassword" className="control-label" sm={3}><IntlMessages id="sidebar.disablegoogleloginpassword" /></Label>
							<Col sm={6}>
								<Input type="password" name="loginpassword" value={loginpassword} id="loginpassword" placeholder="Enter Login Password" onChange={this.onChange} />
								{errors.loginpassword && <span className="text-danger text-left"><IntlMessages id={errors.loginpassword} /></span>}
							</Col>
						</FormGroup> */}
						<FormGroup className="has-wrapper text-right" row>
							<Label for="Code" className="control-label" sm={5}><IntlMessages id="sidebar.disablegoogleauthcode" /></Label>
							<Col sm={6}>
								<IntlMessages id="myaccount.enterGoogleAuthCode">
									{(placeholder) =>
										<Input type="text" name="Code" maxLength="6" value={Code} id="Code" placeholder={placeholder} onChange={this.onChange} />
									}
								</IntlMessages>
								{/* <Input type="text" name="Code" maxLength="6" value={Code} id="Code" placeholder="Enter Google Authentication Code" onChange={this.onChange} /> */}
								{errors.Code && <span className="text-danger text-left"><IntlMessages id={errors.Code} /></span>}
							</Col>
						</FormGroup>
						<FormGroup className="has-wrapper" row>
							<Col sm={5} />
							<Col sm={2}>
								<Button disabled={loading} className="mr-5 rounded-0 border-0" color="primary" onClick={this.onSendGoogleDisable}><IntlMessages id="sidebar.btnDisable" /></Button>
							</Col>
						</FormGroup>
					</div>
				</Form>
			</Fragment>
		);
	}
}

// map state to props
const mapStateToProps = ({ disablegoogleauth, editProfileRdcer }) => {
	var response = {
		data: disablegoogleauth.data,
		loading: disablegoogleauth.loading,
		profileData: editProfileRdcer.data
	};
	return response;
};

export default connect(mapStateToProps, {
	disableGoogleauth,
	getProfileByID
})(DisableGoogleAuthWdgt);