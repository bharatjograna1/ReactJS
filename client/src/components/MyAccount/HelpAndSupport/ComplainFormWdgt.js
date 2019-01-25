/**
 * Raise Complain Form Component
 */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormGroup, Input, Button, Alert } from "reactstrap";
// intl messages
import IntlMessages from "Util/IntlMessages";
//Import addComplain...
import { addComplain, getComplainType, complainList } from "Actions/MyAccount";
import CircularProgress from '@material-ui/core/CircularProgress';
const validateComplainForm = require("../../../validation/MyAccount/complain_form");

class ComplainFormWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			subject: '',
			description: '',
			attachment: '',
			get_info: 'hide',
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading: false,
			errors: {},
			list: [],
			getListValue: true,
		};
		this.onDismiss = this.onDismiss.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	componentWillMount() {
		this.setState({ err_alert: false, success_alert: false, get_info: 'show' });
		this.props.getComplainType({});
	}

	onSubmit(event) {
		event.preventDefault();
		const { errors, isValid } = validateComplainForm(this.state);
		this.setState({ errors: errors, getListValue: true });
		const { type, subject, description } = this.state;
		const typeid = type;
		setTimeout(() => { this.setState({ err_alert: false, success_alert: false, errors: errors, get_info: 'show' }); }, 4000)
		if (isValid) {
			this.props.addComplain({ typeid, subject, description });
		}

	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });
		if (nextProps.data.ReturnCode === 1) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
		} else if (nextProps.data.ReturnCode === 0) {
			let success_msg = this.state.get_info === 'hide' ? '' : nextProps.data.ReturnMsg;
			this.setState({ success_msg: success_msg, success_alert: true, type: '', subject: '', description: '', attachment: '' });
			if (this.state.getListValue) {
				this.props.complainList();
				this.setState({ getListValue: false });
			}
		}
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	render() {
		const { type, subject, description, errors, err_alert, err_msg, success_msg, success_alert, loading, } = this.state;
		const complainType = this.props.getComplainTypeData.TypeMasterList;
		return (
			<Fragment>
				{
					loading
						?
						<div className="text-center py-40"><CircularProgress className="progress-primary" thickness={2} /></div>
						:
						<div className="mx-auto w-100 p-50 ">
							{success_msg && <div className="col-md-12 p-0 alert_area">
								<Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
							</div>}
							{err_msg && <div className="mx-auto col-md-10 alert_area">
								<Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
							</div>}
							<form className="mx-auto">
								<FormGroup>
									<div className="row">
										<label className="col-md-2 col-form-label">
											<IntlMessages id="sidebar.type" />
										</label>
										<div className="col-md-10">
											<Input
												type="select"
												name="type"
												className="form-control"
												id="type"
												value={type}
												onChange={this.onChange}
											>
												<IntlMessages id="sidebar.openOrders.filterLabel.type.selectType">
													{ (selectType) =>
														<option value="">{selectType}</option>
													}
												</IntlMessages>
												{complainType &&
													complainType.map((list, index) => (
														<option key={index} value={list.id}>
															{list.Type}
														</option>
													))}
											</Input>
											{errors.type && (
												<span className="text-danger">
													<IntlMessages id={errors.type} />
												</span>
											)}
										</div>
									</div>
								</FormGroup>
								<FormGroup>
									<div className="row">
										<label className="col-md-2 col-form-label">
											<IntlMessages id="sidebar.subject" />
										</label>
										<div className="col-md-10">
											<Input
												type="text"
												name="subject"
												className="form-control"
												id="subject"
												value={subject}
												onChange={this.onChange}
											/>
											{errors.subject && (
												<span className="text-danger">
													<IntlMessages id={errors.subject} />
												</span>
											)}
										</div>
									</div>
								</FormGroup>
								<FormGroup>
									<div className="row">
										<label className="col-md-2 col-form-label">
											<IntlMessages id="sidebar.description" />
										</label>
										<div className="col-md-10">
											<Input
												type="textarea"
												name="description"
												className="form-control"
												id="description"
												value={description}
												onChange={this.onChange}
											/>
											{errors.description && (
												<span className="text-danger">
													<IntlMessages id={errors.description} />
												</span>
											)}
											<p className="small-text">
												<IntlMessages id="my_account.helpNote" />
											</p>
										</div>
									</div>
								</FormGroup>
								{/* <FormGroup>
									<div className="row">
										<label className="col-md-2 col-form-label">
											<IntlMessages id="sidebar.attachments" />
										</label>
										<div className="col-md-6">
											<Input
												type="file"
												name="attachment"
												className="form-control"
												id="attachment"
												onChange={this.onChange}
											/>
											{errors.attachment && (
												<span className="text-danger">
													<IntlMessages id={errors.attachment} />
												</span>
											)}
										</div>
									</div>
								</FormGroup> */}
								<FormGroup>
									<div className="row">
										<div className="offset-md-2 col-md-2">
											<Button
												variant="raised"
												color="success"
												className=" text-white btn-block"
												onClick={this.onSubmit}
											>
												<IntlMessages id="sidebar.btnSubmit" />
											</Button>
										</div>
									</div>
								</FormGroup>
							</form>
						</div>
				}
			</Fragment>
		);
	}
}

const mapStateToProps = ({ complainRdcer }) => {
	const { data, loading, getComplainTypeData, getList } = complainRdcer;
	return { data, loading, getComplainTypeData, getList };
};

export default connect(mapStateToProps, {
	addComplain,
	getComplainType,
	complainList
})(ComplainFormWdgt);