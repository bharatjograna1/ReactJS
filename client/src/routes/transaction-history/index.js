/**
 * Auther : Devang Parekh
 * Created : 20/09/2018
 * Transaction History Component
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Form, FormGroup, Label, Input,Row,Col } from 'reactstrap';
import Button from '@material-ui/core/Button';

import { NotificationManager } from 'react-notifications';

// import section loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// import neccessary actions
import {
	transactionHistory,
	transactionHistoryRefresh,	
} from 'Actions';
 import {getPairList} from "Actions/Trade"
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// jbs card box
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';

// intl messages means convert text into selected languages
import IntlMessages from 'Util/IntlMessages';

// import ex data tables for display table
import ExDatatable from './components/ex_datatable';

// define transaction history component
class TransactionHistory extends Component {

	// make default state values on load
	constructor(props) {
		super();
		this.state = {
			start_date: "",
			end_date: "",
			currentDate : new Date().toISOString().slice(0, 10),
			pair: '',
			status: 0,
			market:'',
			type: '',
			onLoad: 0,
			showLoader: false,
			pairList:[],
			getTransactionHistory:0
		}

		this.onApply = this.onApply.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
	}

	// used to handle change event of every input field and set values in states
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleChangeDate(event) {
		if(event.target.value <= this.state.currentDate){
			this.setState({ [event.target.name]: event.target.value });
		}else{
			NotificationManager.error(<IntlMessages id="trading.openorders.properdate" />)
		}	
	}

	componentDidMount(){
		this.props.getPairList()
	}
	// apply button used to call transaction list
	onApply(event) {		
		event.preventDefault();
		const data = {
			pair:this.state.pair,
			trade:this.state.type,
			fromDate:this.state.start_date,
			toDate:this.state.end_date,
			status:this.state.status,
			page:0,
			marketType:this.state.market
		}

		if((this.state.start_date !== '' && this.state.end_date == '') || (this.state.end_date !== '' && this.state.start_date == '')){
			
			NotificationManager.error(<IntlMessages id="trading.openorders.dateselect" />);
		}else if(this.state.end_date < this.state.start_date){			

			NotificationManager.error(<IntlMessages id="trading.openorders.datediff" />);
		}else if(this.state.end_date > this.state.currentDate){

			NotificationManager.error(<IntlMessages id="trading.openorders.endcurrentdate" />);
		}else if(this.state.start_date > this.state.currentDate){

			NotificationManager.error(<IntlMessages id="trading.openorders.startcurrentdate" />);
		}else{
			this.setState({showLoader:true,getTransactionHistory:1})
			this.props.transactionHistory(data);
		}
		
	}
	componentWillReceiveProps(nextprops){		

		if(nextprops.pairList.length){
			this.setState({
				pairList:nextprops.pairList
			})
		}
		if(nextprops.transactionList.length){
			this.setState({
				showLoader: false
			})
		}

		if(nextprops.errorCode.ReturnCode !== 0 && nextprops.errorCode.length !==0 && this.state.getTransactionHistory){
			NotificationManager.error(<IntlMessages id={`error.trading.transaction.${nextprops.errorCode.ErrorCode}`} />);
			this.setState({
				getTransactionHistory:0
			})
		}

	}

	render() {

		var pairs = []
		if(this.state.pairList.length){
			this.state.pairList.map(value =>{
				value.PairList.map(info =>{
					pairs.push(info)
				})
			})
		}
	
		var data=[]
		if(this.props.transactionList.length !==0){

			data = this.props.transactionList;
			data.map((value,index) =>{
				if(value.Price === 0) {
					data[index].Price = <IntlMessages id="trading.placeorder.label.market" />;
				}	
			});

		}		

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
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.date"} />
			},
			{
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.pair"} />
			},
			{
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.type"} />
			},
			{
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.price"} />
			}, {
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.amount"} />

			}, {
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.fee"} />

			}, {
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.total"} />

			}, {
				name: <IntlMessages id={"sidebar.transactionHistory.tableHeading.status"} />
			}
		];

		return (
			<Fragment>
				{ this.props.loading &&
					<JbsSectionLoader />
				}
				<div className="charts-widgets-wrapper">
					<PageTitleBar title={<IntlMessages id="sidebar.transactionHistory.list" />} match={this.props.match} />
				
					<div className="transaction-history-detail">
					<JbsCollapsibleCard heading="">
						<Row>
							<Col md={12}>
								<div className="top-filter clearfix transaction-search">
									<Form name="frm_search" className="mb-10">
									<Row>
										<Col md={2}>
											<Label for="startDate1">{<IntlMessages id="sidebar.transactionHistory.filterLabel.startDate" />}</Label>
											<Input type="date" name="start_date" value={this.state.start_date} id="startDate1" placeholder="yyyy/mm/dd" onChange={this.handleChangeDate} />
										</Col>
										<Col md={2}>
											<Label for="endDate1">{<IntlMessages id="sidebar.transactionHistory.filterLabel.endDate" />}</Label>
											<Input type="date" name="end_date" value={this.state.end_date} id="endDate1" placeholder="yyyy/mm/dd" onChange={this.handleChangeDate} />
										</Col>
										<Col md={1}>
											<Label for="Select-2">{<IntlMessages id="sidebar.transactionHistory.filterLabel.type" />}</Label>
											<div className="app-selectbox-sm">
												<Input type="select" name="type" value={this.state.type} id="Select-2" onChange={this.handleChange}>													
													<IntlMessages id="sidebar.transactionhistory.dropdown.select">
														{ (select) =>
															<option value="">{select}</option>
														}
													</IntlMessages>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.type.buy">
														{ (buy) =>
															<option value="buy">{buy}</option>
														}
													</IntlMessages>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.type.sell">
														{ (sell) =>
															<option value="sell">{sell}</option>
														}
													</IntlMessages>
												</Input>
											</div>
										</Col>
										<Col md={2}>
											<Label for="Select-1">{<IntlMessages id="sidebar.transactionHistory.filterLabel.currencyPair" />}</Label>
											<div className="app-selectbox-sm">
												<Input type="select" name="pair" value={this.state.pair} id="Select-1" onChange={this.handleChange}>
													<IntlMessages id="transactioncharge.report.filter.option.label.select">
														{ (labelSelect) =>
															<option value="">{labelSelect}</option>
														}
													</IntlMessages>
													
													{pairs.map(( currency, key) =>
														 <option key={key} value={currency.PairName}>{currency.PairName}</option>	
													)}												
																									
												</Input>
											</div>
										</Col>
										<Col md={2}>
											<Label for="Select-2">{<IntlMessages id="sidebar.transactionHistory.filterLabel.status" />}</Label>
											<div className="app-selectbox-sm">
												<Input type="select" name="status" value={this.state.status} id="Select-2" onChange={this.handleChange}>													
													<IntlMessages id="sidebar.transactionHistory.filterLabel.status.selectStatus">
														{ (selectStatus) =>
															<option value="0">{selectStatus}</option>
														}
													</IntlMessages>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.status.success">
														{ (success) =>
															<option value="1">{success}</option>
														}
													</IntlMessages>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.status.open">
														{ (open) =>
															<option value="2">{open}</option>
														}
													</IntlMessages>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.status.cancel">
														{ (cancel) =>
															<option value="9">{cancel}</option>
														}
													</IntlMessages>
												</Input>
											</div>
										</Col>

										<Col md={2}>
											<Label for="Select-4"><IntlMessages id="sidebar.transactionHistory.tableHeading.market"/></Label>
											<div className="app-selectbox-sm">
												<Input type="select" name="market" value={this.state.market} id="Select-2" onChange={this.handleChange}>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.market">
														{ (market) =>
															<option value="">{market}</option>
														}
													</IntlMessages>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.limit">
														{ (limit) =>
															<option value="limit">{limit}</option>
														}
													</IntlMessages>
													<IntlMessages id="sidebar.transactionHistory.filterLabel.marketa">
														{ (marketa) =>
															<option value="market">{marketa}</option>
														}
													</IntlMessages>
												</Input>
											</div>
										</Col>
										<Col md={1}>
											<Label className="d-block">&nbsp;</Label>
											<Button onClick={this.onApply} color="primary" variant="raised" className="mr-10 text-white"><IntlMessages id="sidebar.transactionHistory.button.apply" /></Button>
										</Col>
										</Row>
									</Form>
								</div>
							</Col>
						</Row>
						</JbsCollapsibleCard>
						{data.length !==0 && 
						<ExDatatable
							title="sidebar.transactionHistory.list"
							data={data}
							columns={columns}
							options={options}
							darkMode={this.props.darkMode}
						/>
						}
					</div>
					
				</div>
			</Fragment>
		);
	}
}

// map states to props when changed in states from reducer
const mapStateToProps = ({ transactionHistory,tradePairList , settings }) => {
	const { darkMode } = settings;
	const { transactionList, loading,errorCode } = transactionHistory;
	const {pairList} = tradePairList;		
	return { transactionList,pairList, loading , darkMode,errorCode }
}

// export this component with action methods and props
export default connect(mapStateToProps, { transactionHistory, transactionHistoryRefresh,getPairList })(TransactionHistory);
