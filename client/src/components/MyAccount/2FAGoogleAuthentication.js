/**
 * Auther : Salim Deraiya
 * Created : 23/10/2018
 * 2FA Google Authentication Component
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

/* import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider"; */

// intl messages
import IntlMessages from "Util/IntlMessages";
import {
	getDeviceInfo,
	getIPAddress,
	getHostName,
	getMode
} from "Helpers/helpers";
//Import 2fa Google Authentication...
import { twoFAGoogleAuthentication, gerenateToken } from "Actions/MyAccount";
import Slide from '@material-ui/core/Slide';
import AppConfig from 'Constants/AppConfig';
const validate2FAGoogleAuth = require("../../validation/MyAccount/2fa_authentication");

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class TwoFaGoogleAuthentication extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			Code: '',
			deviceModel: false,
			deviceMsg: '',
			TwoFAKey: '',
			username: '',
			password: '',
			appkey: '',
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading: false,
			errors: {}
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.dialogClose = this.dialogClose.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	dialogClose() {
		this.setState({ deviceModel: false, Code: '', err_msg: '', err_alert: false, success_msg: '', success_alert: false });
	};

	componentWillMount() {
		this.setState({
			username: this.props.loginData.username,
			password: this.props.loginData.password,
			appkey: this.props.loginData.appkey,
			TwoFAKey: this.props.loginData.TwoFAKey
		});
	}

	componentWillReceiveProps(nextProps) {
		// console.log('2FA :',nextProps);
		this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false, deviceModel: false });
		if (nextProps.redirect) {
			// added for withdraw approval screen
			if (localStorage.getItem('RefNo') !== null && localStorage.getItem('Bit') !== null) {
				window.location.href = AppConfig.WithdrawRedirect;
			} else {
				window.location.href = AppConfig.afterLoginRedirect;
			}
		} else if (nextProps.data.ReturnCode === 1) {
			this.setState({ err_alert: true, err_msg: nextProps.data.ReturnMsg });
		} else if (nextProps.data.ErrorCode === 4137) {
			this.setState({ deviceModel: true, deviceMsg: <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} values={{ siteName: AppConfig.brandName }} /> });
		} else if (nextProps.data.ReturnCode === 0) {
			this.setState({ loading: true });
			var reqObj = {
				username: this.state.username,
				password: this.state.password,
				appkey: this.state.appkey
			}
			this.props.gerenateToken(reqObj);
			//this.setState({ success_msg:nextProps.data.ReturnMsg, success_alert: true });
			//window.location.href = '/app/dashboard/trading';
		}
	}

	handleClickOpen() {
		this.setState({ open: true });
	}

	handleClose() {
		this.setState({ open: false });
	}

	onChange(event) {
		this.setState({ Code: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();

		const { errors, isValid } = validate2FAGoogleAuth(this.state);
		this.setState({ errors: errors, deviceModel: false });

		if (isValid) {
			var reqObj = {
				Code: this.state.Code,
				TwoFAKey: this.state.TwoFAKey,
				deviceId: getDeviceInfo(),
				mode: getMode(),
				// ipAddress: getIPAddress(),
				hostName: getHostName(),
			}

			let self = this;
			getIPAddress().then(function (ipAddress) {
				reqObj.ipAddress = ipAddress;
				self.props.twoFAGoogleAuthentication(reqObj);
			});
		}
	}

	render() {
		const { deviceModel, deviceMsg, open, Code, err_alert, err_msg, success_msg, success_alert, loading, errors } = this.state;
		return (
			<Fragment>
				{loading && <div><LinearProgress color="secondary" /></div>}
				{success_msg && <div className="alert_area">
					<Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
				</div>}
				{err_msg && <div className="alert_area">
					<Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
				</div>}
				<Form>
					<FormGroup>
						<Label for="Code"><IntlMessages id="my_account.googleAuthCode" /></Label>
						<Input type="text" name="Code" id="Code" maxLength="6" value={Code} onChange={this.onChange} />
						{errors.Code && <span className="text-danger"><IntlMessages id={errors.Code} /></span>}
					</FormGroup>
					<div className="clearfix mb-10">
						<Button disabled={loading} type="submit" className="btn-info text-white" variant="raised" size="large" onClick={this.onSubmit}><IntlMessages id="sidebar.btnSubmit" /></Button>
						{/* <a className="text-warning float-right mt-10" onClick={this.handleClickOpen}><IntlMessages id="my_account.lost_your_google_authenticator" /></a> */}
					</div>
				</Form>
				<Dialog
					open={deviceModel}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.dialogClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">{deviceMsg}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant="raised" onClick={this.dialogClose} className="btn-danger text-white mr-10"><IntlMessages id="sidebar.btnClose" /></Button>
					</DialogActions>
				</Dialog>
				{/* <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title" className="text-center">
						<span className="border-bottom border-warning pb-10"><IntlMessages id="my_account.resetGoogleAuth" /></span>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<IntlMessages id="my_account.resetGoogleAuthTxt1" />
							<Divider className="mt-5 mb-5" />
							<div className="row mt-5 mb-5">
								<div className="col-md-11"><IntlMessages id="my_account.resetGoogleAuthTxt2" /></div>
								<div className="col-md-1"><Input type="radio" name="type1" /></div>
							</div>
							<div className="row mt-5 mb-5">
								<div className="col-md-11"><IntlMessages id="my_account.resetGoogleAuthTxt3" /></div>
								<div className="col-md-1"><Input type="radio" name="type2" /></div>
							</div>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant="raised" onClick={this.handleClose} color="primary" className="text-white float-right">
							<IntlMessages id="sidebar.btnConfirmYourResetRequest" />
						</Button>
					</DialogActions>
				</Dialog> */}
			</Fragment>
		);
	}
}

//Map state to props
const mapStateToProps = ({ twoFAAuth, authTokenRdcer }) => {
	const response = {
		data: twoFAAuth.data,
		loading: twoFAAuth.loading,
		redirect: authTokenRdcer.redirect
	}
	return response;
};

export default connect(mapStateToProps, {
	twoFAGoogleAuthentication,
	gerenateToken
})(TwoFaGoogleAuthentication);