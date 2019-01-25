/**
 * Ecommerce Dashboard
 */
import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
// intl messages
import IntlMessages from 'Util/IntlMessages';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import Divider from '@material-ui/core/Divider';
import { JbsCard, JbsCardContent, JbsCardHeading } from 'Components/JbsCard';

import {
	TopGainerGrid,
	TopLooserGrid,
	TopLeaderGrid,
	HistoricalPerformanceChart,
	Portfolio,
	RecentTradingHistory
} from "Components/SocialProfile";

export default class SocialProfileDashboard extends Component {
	render() {
		return (
			<div className="ecom-dashboard-wrapper">
				<PageTitleBar title="Social Profile Dashboard" match={this.props.match} />
				<JbsCard colClasses="col-sm-full">
					<h2 className="clearfix jbs-block-title py-10">
						<span><IntlMessages id="sidebar.topGainer" /></span>
						<Link className="float-right" to="/app/social-profile/top-gainer"><IntlMessages id="sidebar.viewAll" /></Link>
					</h2>
					<Divider />
        			<JbsCardContent>						
						<TopGainerGrid />
					</JbsCardContent>
				</JbsCard>
				<JbsCard colClasses="col-sm-full">
					<h2 className="clearfix jbs-block-title py-10">
						<span><IntlMessages id="sidebar.topLooser" /></span>
						<Link className="float-right" to="/app/social-profile/top-looser"><IntlMessages id="sidebar.viewAll" /></Link>
					</h2>
					<Divider />
        			<JbsCardContent>
						<TopLooserGrid />
					</JbsCardContent>
				</JbsCard>
				<JbsCard colClasses="col-sm-full">
					<h2 className="clearfix jbs-block-title py-10">
						<span><IntlMessages id="sidebar.topLeaders" /></span>
						<Link className="float-right" to="/app/social-profile/top-leader"><IntlMessages id="sidebar.viewAll" /></Link>
					</h2>
					<Divider />
        			<JbsCardContent>
						<TopLeaderGrid />
					</JbsCardContent>
				</JbsCard>
				<JbsCard colClasses="col-sm-full">
					<h2 className="clearfix jbs-block-title py-10">
						<span><IntlMessages id="sidebar.historicalPerformance" /></span>
					</h2>
					<Divider />
        			<JbsCardContent>
						<HistoricalPerformanceChart />
					</JbsCardContent>
				</JbsCard>
				<JbsCard colClasses="col-sm-full">
					<h2 className="clearfix jbs-block-title py-10">
						<span><IntlMessages id="sidebar.portfolio" /></span>
					</h2>
					<Divider />
        			<JbsCardContent>
						<Portfolio />
					</JbsCardContent>
				</JbsCard>
				<JbsCard colClasses="col-sm-full">
					<h2 className="clearfix jbs-block-title py-10">
						<span><IntlMessages id="sidebar.recentTradingHistory" /></span>
					</h2>
					<Divider />
        			<JbsCardContent>
						<RecentTradingHistory />
					</JbsCardContent>
				</JbsCard>
			</div>
		)
	}
}