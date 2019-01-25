/**
 * Auther : Devang Parekh
 * Created : 20/09/2018
 * Open Orders Component
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Form, Label, Input, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';

// import neccessary actions
import {
	openOrders,
	openOrdersRefresh
} from 'Actions';

import { getPairList } from "Actions/Trade"

import { NotificationManager } from 'react-notifications';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// import section loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// jbs card box
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';

// intl messages means convert text into selected languages
import IntlMessages from 'Util/IntlMessages';

// import ex data tables for display table
import ExDatatable from './components/ex_datatable';

// define Open Orders component
class OpenOrders extends Component {

	// make default state values on load
	constructor(props) {
		super();
		this.state = {
			start_date: new Date().toISOString().slice(0, 10),
			end_date: new Date().toISOString().slice(0, 10),
			currentDate: new Date().toISOString().slice(0, 10),
			pair: '',
			type: "",
			onLoad: 0,
			pairList: [],
			getOpenOrders: 0
		}

		this.onApply = this.onApply.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
	}

	// used to handle change event of every input field and set values in states
	handleChange(event) {
		if (event.target.value <= this.state.currentDate) {
			this.setState({ [event.target.name]: event.target.value });
		} else {
			NotificationManager.error(<IntlMessages id="trading.openorders.properdate" />)
		}

	}

	componentDidMount() {
		this.props.getPairList()
	}
	// Used for set Currency Pairs
	handleChangeCurrency(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	// Used for set Types
	handleChangeType(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	// apply button used to call open orders list
	onApply(event) {
		event.preventDefault();
		const data = {
			pair: this.state.pair,
			orderType: this.state.type,
			fromDate: this.state.start_date,
			toDate: this.state.end_date,
			page: 0,
		}

		// Validation For Dates And Currency Pairs By Tejas Date : 14/11/2018
		if ((this.state.start_date !== '' && this.state.end_date == '') || (this.state.end_date !== '' && this.state.start_date == '')) {

			NotificationManager.error(<IntlMessages id="trading.openorders.dateselect" />);
		} else if (this.state.end_date < this.state.start_date) {

			NotificationManager.error(<IntlMessages id="trading.openorders.datediff" />);
		} else if (this.state.end_date > this.state.currentDate) {

			NotificationManager.error(<IntlMessages id="trading.openorders.endcurrentdate" />);
		} else if (this.state.start_date > this.state.currentDate) {

			NotificationManager.error(<IntlMessages id="trading.openorders.startcurrentdate" />);
		} else {

			this.setState({ showLoader: true, getOpenOrders: 1 })
			this.props.openOrders(data);
		}
	}


	componentWillReceiveProps(nextprops) {

		if (nextprops.pairList.length) {
			this.setState({
				pairList: nextprops.pairList
			})
		}

		if (nextprops.errorCode.ReturnCode !== 0 && nextprops.errorCode.length !== 0 && this.state.getOpenOrders) {
			NotificationManager.error(<IntlMessages id={`error.trading.transaction.${nextprops.errorCode.ErrorCode}`} />);
			this.setState({
				getOpenOrders: 0
			})
		}
	}

	render() {

		var pairs = []
		if (this.state.pairList.length) {
			this.state.pairList.map(value => {
				value.PairList.map(info => {
					pairs.push(info)
				})
			})
		}

		const data = this.props.openOrdersList;

		// define options for data tables
		const options = {
			filterType: 'dropdown',
			responsive: 'scroll',
			selectableRows: false,
			filter: false,
			textLabels: {
                body: {
                    noMatch: <IntlMessages id="wallet.emptyTable" />,
                    toolTip: <IntlMessages id="wallet.sort" />
                }
            },
		};
		// define columns for data tables
		const columns = [
			{
				name: <IntlMessages id={"sidebar.openOrders.tableHeading.tradeid"} />,

			},
			{
				name: <IntlMessages id={"sidebar.openOrders.tableHeading.amount"} />
			},
			{
				name: <IntlMessages id={"sidebar.openOrders.tableHeading.price"} />
			},
			{
				name: <IntlMessages id={"sidebar.openOrders.tableHeading.type"} />
			}, 

			 {
				name: <IntlMessages id={"sidebar.openOrders.tableHeading.pair"} />
			}, {
				name: <IntlMessages id={"sidebar.openOrders.tableHeading.date"} />
			}
		]
		

		return (
			<Fragment>
				{this.props.loading &&
					<JbsSectionLoader />
				}

				<div className="charts-widgets-wrapper">
					<PageTitleBar title={<IntlMessages id="sidebar.openOrders.list" />} match={this.props.match} />
					<div className="transaction-history-detail">
						<JbsCollapsibleCard >
							<Row>
								<Col md={12}>
									<div className="top-filter clearfix orderlist-search">
										<Form name="frm_search" className="mb-10">
											<Row>
												<Col md={2}>
													<Label for="startDate">{<IntlMessages id="sidebar.openOrders.filterLabel.startDate" />}</Label>
													<Input type="date" name="start_date" value={this.state.start_date} id="startDate" placeholder="dd/mm/yyyy" onChange={this.handleChange} />
												</Col>
												<Col md={2}>
													<Label for="endDate">{<IntlMessages id="sidebar.openOrders.filterLabel.endDate" />}</Label>
													<Input type="date" name="end_date" value={this.state.end_date} id="endDate" placeholder="dd/mm/yyyy" onChange={this.handleChange} />
												</Col>
												<Col md={3}>
													<Label for="Select-2">{<IntlMessages id="sidebar.openOrders.filterLabel.type" />}</Label>
													<div className="app-selectbox-sm">
														<Input type="select" name="type" value={this.state.type} id="Select-2" onChange={this.handleChangeType}>
															<IntlMessages id="transactioncharge.report.filter.option.label.select">
																{(select) =>
																	<option value="">{select}</option>
																}
															</IntlMessages>
															<IntlMessages id="sidebar.transactionHistory.filterLabel.type.buy">
																{(buy) =>
																	<option value="buy">{buy}</option>
																}
															</IntlMessages>
															<IntlMessages id="sidebar.transactionHistory.filterLabel.type.sell">
																{(sell) =>
																	<option value="sell">{sell}</option>
																}
															</IntlMessages>
														</Input>
													</div>
												</Col>
												<Col md={3}>
													<Label for="Select-1">{<IntlMessages id="sidebar.openOrders.filterLabel.currencyPair" />}</Label>
													<div className="app-selectbox-sm">
														<Input type="select" name="pair" value={this.state.pair} id="Select-1" onChange={this.handleChangeCurrency}>
															<option value="all"><IntlMessages id="transactioncharge.report.filter.option.label.select" /></option>
															{pairs.map((currency, key) =>
																<option key={key} value={currency.PairName}>{currency.PairName}</option>
															)}
														</Input>
													</div>
												</Col>
												<Col md={2}>
													<Label className="d-block">&nbsp;</Label>
													<Button onClick={this.onApply} color="primary" variant="raised" className="mr-10 text-white"><IntlMessages id="sidebar.openOrders.button.apply" /></Button>
												</Col>
											</Row>
										</Form>
									</div>
								</Col>
							</Row>
						</JbsCollapsibleCard>
						<ExDatatable
							title="sidebar.openOrders.list"
							data={data.map(item => {
								{
									var type = item.Type == "BUY" ? <IntlMessages id="sidebar.openOrders.filterLabel.type.buy" /> :
										<IntlMessages id="sidebar.openOrders.filterLabel.type.sell" />
								}
								return [
									item.Id,
									item.Amount,
									(item.Price === 0 ?  <IntlMessages id="trading.placeorder.label.market" /> : item.Price),
									type,
									item.PairName,
									item.TrnDate.replace('T', ' ').split('.')[0]
								]
							})}
							columns={columns}
							options={options}
						/>
					</div>
				</div>

			</Fragment>
		);
	}
}

// map states to props when changed in states from reducer
const mapStateToProps = ({ openOrders, tradePairList }) => {
	const { openOrdersList, loading, errorCode } = openOrders;
	const { pairList } = tradePairList;
	return { openOrdersList, pairList, loading, errorCode }
}

// export this component with action methods and props
export default connect(mapStateToProps, { openOrders, openOrdersRefresh, getPairList })(OpenOrders);
