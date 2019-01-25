/**
 * Auther : Kevin Ladani
 * Created : 05/09/2018
 * Updated : 22/10/2018 (Salim Deraiya)
 * Scan QR Widget
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
//Text Convert to image
//import TextToImage from 'reactjs-text-to-image';
//Redux Action Methods
import { getGoogleAuthInfo } from 'Actions/MyAccount';
//App Config Data
import AppConfig from 'Constants/AppConfig';
//Generate textToImage
import { textToImage } from 'Helpers/helpers';
// intl messages
import IntlMessages from "Util/IntlMessages";

class ScanQrWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				Code: '',
				SharedKey: '',
				AuthenticatorUri: ''
			},
			simgUrl : '',
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading: false
		};
		sessionStorage.removeItem("simgUrl");
	}

	componentWillMount() {
		//document.getElementById('glg_btn_next').disabled = true;
		//document.getElementById('glg_btn_back').disabled = true;
		this.props.getGoogleAuthInfo();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });
		
		if (nextProps.data.ReturnCode === 1) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
		} else if (nextProps.data.statusCode === 200) {
			const googleAuthData = nextProps.data.EnableAuthenticatorViewModel;
			this.setState({
				success_msg: nextProps.data.ReturnMsg,
				success_alert: true,
				data: googleAuthData
			});
			const simgUrl = textToImage(googleAuthData.SharedKey);
			this.setState({ simgUrl : simgUrl });
			sessionStorage.setItem("simgUrl", simgUrl);
			//document.getElementById('glg_btn_next').disabled = false;
			//document.getElementById('glg_btn_back').disabled = false;
		}
	}

	render() {
		const { SharedKey, AuthenticatorUri } = this.state.data;
		const { loading, simgUrl } = this.state;
		return (
			<div className="border border-dark">			
				<div className="downloadappbox offset-md-3 mt-20 row">
					<div className="col-md-12">
						<h3><IntlMessages id="my_account.scanQrCode.step2" /></h3>
					</div>
				</div>
				{
                    loading
                    ?
                    <div className="text-center py-40">
                        <CircularProgress className="progress-primary" />
                    </div>
					:
					<Fragment>
						<div className="offset-md-3 downloadappbox row">
							<div className="col-md-9">
								<Card className="marginbox border border-dark">
									<CardBody className="d-flex row">
										<div className="col-md-4">
											<span className="d-flex justify-content-center align-items-center">
												<img className="img-fluid d-xs-none" alt="share" width="250" height="250" src={AuthenticatorUri} />
											</span>
										</div>
										<div className="col-md-8">
											{/* <p className="fs-180 fw-bold mt-20 text-uppercase"><TextToImage name={SharedKey} x="0" y="10" /></p> */}
											<p className="fs-180 fw-bold mt-20 text-uppercase"><img src={simgUrl} alt="image" /></p>
											<span className="fs-50 d-block text-muted"><IntlMessages id="my_account.scanQrCode.msgQRCode" /></span>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>
						<div className="downloadappbox offset-md-3 row">
							<div className="col-md-12">
								<h3><IntlMessages id="my_account.scanQrCode.scannedQRCode" /></h3>
							</div>
						</div>						
					</Fragment>
				}
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ googleauthenable }) => {
	var response = {
		data: googleauthenable.data,
		loading: googleauthenable.loading,
		errObj: googleauthenable.error
	};
	return response;
};

export default connect(mapStateToProps, {
	getGoogleAuthInfo
})(ScanQrWdgt);