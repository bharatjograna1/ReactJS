/**
 * Active User Component
 */
import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import MatButton from "@material-ui/core/Button";
// intl messages
import IntlMessages from "Util/IntlMessages";

export default class WithdrawLimitLevelBlk extends Component {
	// const WithdrawLimitLevelBlk = () => {
	constructor(props) {
		super(props);
		this.onChangeVerifyDocumentTypeView = this.onChangeVerifyDocumentTypeView.bind(
			this
		);
		this.onChangeMembershipLevelView = this.onChangeMembershipLevelView.bind(
			this
		);
	}

	/**
	 * On onChangeVerifyDocumentTypeView
	 */
	onChangeVerifyDocumentTypeView() {
		this.props.changeComponentView("View2");
	}

	/**
	 * On onChangeMembershipLevelView
	 */
	onChangeMembershipLevelView() {
		this.props.changeComponentView("View5");
	}

	render() {
		return (
			<Fragment>
				<div className="row">
					<div className="col-md-4 pb-0 pt-20">
						<p className="text-center h-60">
							<IntlMessages id="my_account.24Withdraw2BTC" />
							<span className="d-block pt-15 levelcolor">
								<i aria-hidden="true" className="icon-layers font-2x mr-5" />
								<IntlMessages id="sidebar.level1" />
							</span>
						</p>
					</div>
					<div className="col-md-4 pb-0 pt-20">
						<p className="text-center h-60">
							<IntlMessages id="my_account.24Withdraw100BTC" />
							<span className="d-block pt-15">
								<i aria-hidden="true" className="icon-layers font-2x mr-5" />
								<IntlMessages id="sidebar.level2" />
							</span>
						</p>
					</div>
					<div className="col-md-4 pb-0 pt-20">
						<p className="text-center h-60">
							<IntlMessages id="my_account.higherLimit" />
							<span className="d-block pt-40">
								<i aria-hidden="true" className="icon-layers font-2x mr-5" />
								<IntlMessages id="sidebar.level3" />
							</span>
						</p>
					</div>
				</div>
				<div className="text-center">
				<Link to="/app/my-account/personal-verification" className="text-primary mr-30"><IntlMessages id="my_account.submitVerificationDocuments" /></Link>
					{/* <MatButton className="text-primary mt-10 mr-10" style={{ border: "1px solid" }} onClick={this.onChangeVerifyDocumentTypeView}><IntlMessages id="my_account.submitVerificationDocuments" /></MatButton>
					<Link to="/app/my-account/verify-documents-type" className="text-primary mr-30"><IntlMessages id="my_account.submitVerificationDocuments" /></Link>
					<MatButton className="text-primary mt-10" style={{border: "1px solid"}} onClick={this.onChangeMembershipLevelView}><IntlMessages id="sidebar.btnClickKnowMore" /></MatButton>
					<Link to="/app/my-account/membership-level" className="text-primary ml-30"><IntlMessages id="sidebar.btnClickKnowMore" /></Link> */}
				</div>
			</Fragment>
		);
	}
}