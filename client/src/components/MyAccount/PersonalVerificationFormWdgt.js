/**
 * Auther : Salim Deraiya
 * Created : 06/12/2018
 * Personal Verification
 */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Input, Button, Alert } from "reactstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
// intl messages
import IntlMessages from "Util/IntlMessages";
//Import personalVerification...
import { personalVerification } from "Actions/MyAccount";
import {
	getDeviceInfo,
	getIPAddress,
	getHostName,
	getMode
} from "Helpers/helpers";
const validatePersonalVerifyForm = require("../../validation/MyAccount/personal_verification_form");

class PersonalVerificationFormWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				Surname: '',
				GivenName: '',
				ValidIdentityCard: '',
				Front: '',
				Back: '',
				Selfie: '',
				DeviceId: getDeviceInfo(),
				Mode: getMode(),
				IPAddress: '', //getIPAddress(),
				HostName: getHostName()
			},
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
		// console.log('Nextprops :',nextProps);
        this.setState({ loading : nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });
		
		if (nextProps.data.ReturnCode === 1) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
		} else if (nextProps.data.ReturnCode === 0) {
            this.setState({ success_msg:nextProps.data.ReturnMsg, success_alert: true });
        }
    }

    onDismiss() {
        this.setState({ err_alert: false, success_alert : false });
    }

    onChange(event) {
		let newObj = Object.assign({}, this.state.data);
		if(event.target.type === 'file') {
			newObj[event.target.name] =  event.target.files[0];
		} else {
			newObj[event.target.name] = event.target.value;
		}
		this.setState({ data : newObj });
	}

	onSubmit(event) {
		event.preventDefault();
		const { errors, isValid } = validatePersonalVerifyForm(this.state.data);
		this.setState({ err_alert: false, errors: errors });

		if (isValid) {
			let self = this;
			var reqObj = Object.assign({},this.state.data);
            getIPAddress().then(function (ipAddress) {
                reqObj.IPAddress = ipAddress;
                self.props.personalVerification(reqObj);
            });
		}
	}

	render() {
		const { Surname, GivenName, ValidIdentityCard } = this.state.data;
		const { err_alert, err_msg, success_msg, success_alert, loading, errors } = this.state;
		return (
			<Fragment>
				{loading && <div><LinearProgress color="secondary" /></div>}
                {success_msg && <div className="alert_area">
                    <Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
                </div>}
                {err_msg && <div className="alert_area">
                    <Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
                </div>}
				<div className="mb-0">
					<h2 className="heading pb-10 mb-20 border-bottom"><IntlMessages id="sidebar.personalIdentityVerification" /></h2>
					<Form>
						<FormGroup>
							<div className="row">
								<div className="offset-md-3 fs-12"><IntlMessages id="my_account.personalVerifyNote" /></div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<label className="col-md-3 col-form-label"><IntlMessages id="sidebar.surname" /></label>
								<div className="col-md-9 p-0">
									<Input type="text" name="Surname" className="w-50" id="Surname" value={Surname} onChange={this.onChange} />
									{errors.Surname && <span className="text-danger"><IntlMessages id={errors.Surname} /></span>}
								</div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<label className="col-md-3 col-form-label"><IntlMessages id="sidebar.givenName" /></label>
								<div className="col-md-9 p-0">
									<Input type="text" name="GivenName" className="w-50" id="GivenName" value={GivenName} onChange={this.onChange} />
									{errors.GivenName && <span className="text-danger"><IntlMessages id={errors.GivenName} /></span>}
								</div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<label className="col-md-3 col-form-label"><IntlMessages id="sidebar.validIdentityCard" /></label>
								<div className="col-md-9 p-0">
									{/* <Input type="text" name="ValidIdentityCard" className="w-50" id="ValidIdentityCard" value={ValidIdentityCard} onChange={this.onChange} /> */}
									<Input type="select" name="ValidIdentityCard" className="w-50" id="ValidIdentityCard" value={ValidIdentityCard} onChange={this.onChange}>
										<option value="">-- Select Identity Card --</option>
										<option value="Electricity Bill">Electricity Bill</option>
										<option value="Driving Licence">Driving Licence</option>
										<option value="Aadhar Card">Aadhar Card</option>
									</Input>
									{errors.ValidIdentityCard && <span className="text-danger"><IntlMessages id={errors.ValidIdentityCard} /></span>}
								</div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<label className="col-md-3 col-form-label"><IntlMessages id="sidebar.identityCardFrontSide" /></label>
								<Input type="file" name="Front" id="Front" className="col-md-4 p-0" id="Front" onChange={this.onChange} />
								{errors.Front && <span className="text-danger"><IntlMessages id={errors.Front} /></span>}
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<div className="offset-md-3 fs-12"><IntlMessages id="my_account.personalVerifyNote1" /></div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<label className="col-md-3 col-form-label"><IntlMessages id="sidebar.identityCardBackSide" /></label>
								<Input type="file" name="Back" id="Back" className="col-md-4 p-0" id="Back" onChange={this.onChange} />
								{errors.Back && <span className="text-danger"><IntlMessages id={errors.Back} /></span>}
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<div className="offset-md-3 fs-12"><IntlMessages id="my_account.personalVerifyNote2" /></div>
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<label className="col-md-3 col-form-label"><IntlMessages id="sidebar.selfieWithPhotoIDAndNote" /></label>
								<Input type="file" name="Selfie" id="Selfie" className="col-md-4 p-0" id="Selfie" onChange={this.onChange} />
								{errors.Selfie && <span className="text-danger"><IntlMessages id={errors.Selfie} /></span>}
							</div>
						</FormGroup>
						<FormGroup>
							<div className="row">
								<div className="offset-md-3">
									<p className="fs-12"><IntlMessages id="my_account.personalVerifyNote3" /></p>
									<p className="fs-12">
										<span className="mr-15">
											<i className="material-icons mr-10 text-success align-bottom ">check</i><IntlMessages id="my_account.faceClearlyVisible" />
										</span>
										<span className="mr-15">
											<i className="material-icons mr-10 text-success align-bottom">check</i><IntlMessages id="my_account.photoIDClearlyVisible" />
										</span>
										<span className="mr-15">
											<i className="material-icons mr-10 text-success align-bottom">check</i><IntlMessages id="my_account.noteWithTodayDate" />
										</span>
									</p>
									<p className="fs-12">
										<IntlMessages id="my_account.personalVerifyNote4" />
									</p>
								</div>
							</div>
						</FormGroup>
						<Button variant="raised" color="success" className="offset-md-3 text-white btn-block w-10" onClick={this.onSubmit}>
							<IntlMessages id="sidebar.btnSubmit" />
						</Button>
					</Form>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ prsnlVerifyFrmRdcer }) => {
	const { data, loading } = prsnlVerifyFrmRdcer;
	return { data, loading };
};

export default connect(mapStateToProps,{ 
	personalVerification
})(PersonalVerificationFormWdgt);