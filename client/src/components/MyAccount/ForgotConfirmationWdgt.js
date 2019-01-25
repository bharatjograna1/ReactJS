/**
 * Auther : Kevin Ladani
 * Created : 27/10/2018
 * Forgot ConfirmationWdgt
 */

import React, { Component } from "react";
import { connect } from "react-redux";
// jbs card box
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";
// intl messages
import IntlMessages from "Util/IntlMessages";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
// redux action
import { forgotConfirmation } from "Actions/MyAccount";
import qs from "query-string";
// app config
import AppConfig from 'Constants/AppConfig';

class ForgotConfirmationWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			error: '',
			loading: false
		};
	}

	componentWillMount() {
		const parsed = qs.parse(location.search);
		if (parsed.emailConfirmCode !== "") {
			var reqObj = {
				emailConfirmCode: parsed.emailConfirmCode
			};
			this.props.forgotConfirmation(reqObj);
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading });
		if (nextProps.data.ReturnCode === 1) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ error: true, message: errMsg });
		} else if (nextProps.data.statusCode === 200) {
			this.setState({ error: false, message: nextProps.data.ReturnMsg });
		}
	}

	render() {
		const { error, message, loading } = this.state;
		return (
			<div className="container mt-70">
				<div className="site-logo text-center mb-70">
					<Link to="/" className="logo-normal">
						<img src={AppConfig.appLogo} className="img-fluid" alt="site-logo" width="150" height="25" />
					</Link>
				</div>
				<div>
					{loading ? (
						<div className="text-center py-40">
							<CircularProgress className="progress-primary" thickness={2} />
						</div>
					) : (
							<div className="row">
								<div className="col-sm-12 col-md-5 mx-auto forgotconfirmradius">
									<JbsCollapsibleCard>
										<div className="forgotconfirmbox">
											{error ? (<span className="bg-danger"><i className="material-icons font-2x">close</i></span>) : (<span><i className="material-icons font-2x">done</i></span>)}
										</div>
										<div className="forgotconfirmdetails">
											<h1 className="font-weight-bold mb-20 text-center">
												{error ? (<IntlMessages id="my_account.forgotConfirm.emailNotConfirmText" />) : (<IntlMessages id="my_account.forgotConfirm.emailConfirmedText" />)}
											</h1>
											<p className="text-center">{message}</p>
											{/* <Button onClick={() => window.location.href = '/'} className="w-50 mx-auto rounded-0 border-0" color="primary"><IntlMessages id="sidebar.btnBackToLogin" /></Button> */}											
											<Link to="/signin" className="lnkToBtn btn-danger" variant="raised"><IntlMessages id="sidebar.btnBackToLogin" /></Link>
										</div>
									</JbsCollapsibleCard>
								</div>
							</div>
						)}
				</div>
			</div>
		);
	}
}
// map state to props
const mapStateToProps = ({ forgotConfirmation }) => {
	const { data, loading } = forgotConfirmation;
	return { data, loading };
};

export default connect(mapStateToProps, {
	forgotConfirmation
})(ForgotConfirmationWdgt);