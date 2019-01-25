/**
 * Replay Complain Form Component
 */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form, FormGroup, Input, Button, Alert } from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
// intl messages
import IntlMessages from "Util/IntlMessages";
//Import addComplain...
import { getComplainById, replayComplain } from "Actions/MyAccount";
//change date formate from the helper.js
import { changeDateFormat } from "Helpers/helpers";


const validateComplainForm = require("../../../validation/MyAccount/complain_form");

class ComplainReplayFormWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			remark: '',
			complainStatus: 'Open',
			ComplainId: '',
			get_info: 'hide',
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading: false,
			list: [],
			errors: {},
			ListComplain: true,
		};
		this.onDismiss = this.onDismiss.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });

		if (Object.keys(nextProps.list).length > 0 && Object.keys(nextProps.list.ComplainViewmodel).length > 0) {
			this.setState({ list: nextProps.list.ComplainViewmodel });
		}

		if (nextProps.data.ReturnCode === 1) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
		} else if (nextProps.data.ReturnCode === 0) {
			let success_msg = this.state.get_info === 'hide' ? '' : nextProps.data.ReturnMsg;
			this.setState({
				success_msg: success_msg,
				success_alert: true,
				description: '',
				ListComplain: true,
			});
		}
	}

	componentWillMount() {
		let cId = this.props.ComplainNumber;
		this.setState({ ComplainId: this.props.ComplainNumber });
		if (cId !== "") {
			this.props.getComplainById(cId);
		} else {
			this.props.history("/complain");
		}
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		const { ComplainId, description, remark, complainStatus } = this.state;
		const { errors, isValid } = validateComplainForm(this.state);
		this.setState({ errors: errors });
		setTimeout(() => { this.setState({ err_alert: false, success_alert: false, errors: errors, get_info: 'show' }); }, 4000)
		if (isValid) {
			this.props.replayComplain({ ComplainId, description, remark, complainStatus });
			this.props.myCallbackComplainWdgt1(this.state.ListComplain);
		}
	}

	onCancel() {
		this.props.myCallbackComplainWdgt1(this.state.ListComplain);
	}

	render() {
		const { description, errors, err_alert, err_msg, success_msg, success_alert, loading, list } = this.state;
		return (
			<Fragment>
				{loading ?
					<div className="text-center py-40"><CircularProgress className="progress-primary" thickness={2} /></div>
					:
					<div>
						{success_msg && <div className="alert_area">
							<Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
						</div>}
						{err_msg && <div className="offset-md-3 col-md-6 alert_area">
							<Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
						</div>}

						<div className="card mx-auto w-100 p-15">

							{list.ComplainMasterDataViewModel &&
								list.ComplainMasterDataViewModel.map((list, index) => (
									<div key={index}>
										<h4 className="heading">#{list.ComplainId + " " + list.Subject}</h4>
										<h2 className="heading mb-10">#{list.ComplainId}</h2>
									</div>
								))}
							{list.CompainTrailViewModel &&
								list.CompainTrailViewModel.map((list, index) => (
									<div className="card p-10 mb-10" key={index}>
										<div className="media">
											<div className="media-left mr-25">
												{/* <img
														src={require("Assets/img/user-8.jpg")}
														className="img-fluid rounded-circle"
														alt="user profile"
														width="50"
														height="50"
													/> */}
											</div>
											<div className="media-body pt-10">
												<span className="mb-5 text-primary fs-14 d-block">
													{list.Username} {"  "}
													<span className="date">{changeDateFormat(list.CreatedDate, 'YYYY-MM-DD HH:mm:ss')}</span>
												</span>
												<p>{list.Description}</p>
											</div>
										</div>
									</div>
								))}
							<Form className="mt-25">
								<FormGroup>
									<Input
										type="textarea"
										name="description"
										className="form-control bg-secondary text-white"
										rows="5"
										value={description}
										onChange={this.onChange}
									/>
									{errors.description && (
										<span className="text-danger">
											<IntlMessages id={errors.description} />
										</span>
									)}
								</FormGroup>
								<FormGroup>
									<div className="row">
										<div className="offset-md-8 col-md-2">
											<Button
												variant="raised"
												color="primary"
												className="text-white btn-block"
												onClick={this.onSubmit}
											>
												<IntlMessages id="sidebar.btnReplay" />
											</Button>
										</div>
										<div className="col-md-2">
											<Button
												variant="raised"
												color="danger"
												className="text-white btn-block "
												onClick={this.onCancel}
											>
												<IntlMessages id="sidebar.btnCancel" />
											</Button>
										</div>
									</div>
								</FormGroup>
							</Form>
						</div>
					</div>
				}
			</Fragment>
		);
	}
}

const mapStateToProps = ({ complainRdcer }) => {
	const { data, list, loading } = complainRdcer;
	return { data, list, loading };
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			getComplainById,
			replayComplain
		}
	)(ComplainReplayFormWdgt)
);
