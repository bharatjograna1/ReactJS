/**
 * Auther : Kevin Ladani
 * Created : 09/10/2018
 * Updated : 24/10/2018 (Salim Deraiya)
 * Add IP Whitelist Component
 */
import React, { Component, Fragment } from "react";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MatButton from "@material-ui/core/Button";
// redux action
import { AddIPToWhitelist } from "Actions/MyAccount";
//intl messages
import IntlMessages from "Util/IntlMessages";
//Get IP,Hostname,deviceInfo and mode from the helper.js
import { 
    getDeviceInfo,
    getIPAddress,
    getHostName,
    getMode
} from "Helpers/helpers";

//Validation
const validateAddIPWhiteList = require("../../validation/MyAccount/add_ipwhitelist");

class AddIPWhitelist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				SelectedIPAddress: '',
				IpAliasName : '',
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
			redirect : false,
			firsttime : true,
			errors: {}
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.add_loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });

		if (nextProps.data.ReturnCode === 1) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
		} else if (nextProps.data.statusCode === 200) {
			let newObj = Object.assign({}, this.state.data);
			newObj.SelectedIPAddress = '';
			newObj.IpAliasName = '';
			this.setState({ 
				success_msg: this.state.firsttime ? '' : nextProps.data.ReturnMsg, 
				success_alert: this.state.firsttime ? false : true,
				data : newObj
			});			
			//window.location.reload();
			if(this.state.redirect) {
				this.setState({ redirect : false, success_msg: '', success_alert: false });
				setTimeout(() => this.props.history.push('/app/my-account/my-account-dashboard'),3000);
			}
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
		
		const { errors, isValid } = validateAddIPWhiteList(this.state.data);
		this.setState({ err_alert: false, success_alert: false, errors: errors, redirect : true, firsttime : false });

		if (isValid) {
			let self = this;
            var reqObj = Object.assign({},this.state.data);
            getIPAddress().then(function (ipAddress) {
                reqObj.IPAddress = ipAddress;
                self.props.AddIPToWhitelist(reqObj);
            });
		}
	}

	render() {
		const { SelectedIPAddress, IpAliasName } = this.state.data;
		const { err_alert, err_msg, success_msg, success_alert, loading, errors } = this.state;
		return (
			<Fragment>				
				<div className="p-30">
					{loading && <div className="text-center py-40"><CircularProgress className="progress-primary" /></div>}
					{success_msg && <div className="alert_area">
						<Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
					</div>}
					{err_msg && <div className="alert_area">
						<Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
					</div>}
					<Form>
						<FormGroup className="has-wrapper row">
							<Label for="IpAliasName" className="control-label text-right col-md-4"><IntlMessages id="my_account.IPWhitelis.addColumn.aliasName" /></Label>
							<div className="col-md-8">
								<IntlMessages id="myaccount.enterIPAliasName">
									{ (placeholder) =>
										<Input type="text" name="IpAliasName" value={IpAliasName} id="IpAliasName" placeholder={placeholder} onChange={this.onChange} />
									}
								</IntlMessages>
								{/* <Input type="text" name="IpAliasName" value={IpAliasName} id="IpAliasName" onChange={this.onChange} /> */}
								{errors.IpAliasName && <span className="text-danger text-left"><IntlMessages id={errors.IpAliasName} /></span>}
							</div>
						</FormGroup>
						<FormGroup className="has-wrapper row">
							<Label for="SelectedIPAddress" className="control-label text-right col-md-4"><IntlMessages id="my_account.IPWhitelis.addColumn.ip" /></Label>
							<div className="col-md-8">
								<IntlMessages id="myaccount.enterIPAddress">
									{ (placeholder) =>
										<Input type="text" name="SelectedIPAddress" value={SelectedIPAddress} id="SelectedIPAddress" placeholder={placeholder} onChange={this.onChange} />
									}
								</IntlMessages>
								{/* <Input type="text" name="SelectedIPAddress" value={SelectedIPAddress} id="SelectedIPAddress" onChange={this.onChange} /> */}
								{errors.SelectedIPAddress && <span className="text-danger text-left"><IntlMessages id={errors.SelectedIPAddress} /></span>}
							</div>
						</FormGroup>
						<div className="has-wrapper row">
							<div className="offset-md-4 col-md-8">
								<div className="row">
									<div className="col-md-6">
										<MatButton disabled={loading}  variant="raised" className="btn-primary text-white"  onClick={this.onSubmit}>
										<IntlMessages id="my_account.ipWhitelist.addIPWhitelist" />
                 						</MatButton>
									</div>
									{/* <div className="col-md-6">
										<Link to="/app/my-account/ip-whitelist" className="btn-secondary text-white text-center text-bold rounded-0 border-0 btn">
											<IntlMessages id="my_account.ipWhitelist.cancel" />
										</Link>
									</div> */}
								</div>
							</div>
						</div>
					</Form>
				</div>
			</Fragment>
		);
	}
}

// map state to props
const mapStateToProps = ({ ipWhitelist }) => {
	var response = {
		data: ipWhitelist.addData,
		add_loading: ipWhitelist.add_loading
	};
	return response;
};

export default connect(mapStateToProps, {
	AddIPToWhitelist
})(AddIPWhitelist);