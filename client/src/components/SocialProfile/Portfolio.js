/**
 * Auther : Salim Deraiya
 * Created : 18/12/2018
 * Updated : 
 * Portfolia Component
 */
import React, { Component, Fragment } from "react";
import MUIDataTable from "mui-datatables";
import { Badge, Alert } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
// intl messages
import IntlMessages from "Util/IntlMessages";

//Data Object
const portfolioData = [
    {
        currency_img : 'https://cleandevtest.azurewebsites.net/SSO_Account/CurrencyLogo/btc.png',
        currency_name : 'BTC',
        amount : 100.25451,
        available : 78.25525,
        open_price : 0.334,
        current_price : 0.359,
        value : 2887.45,
        profit_loss : '+254.25',
        profit_loss_per : '-7.54%'
    },
    {
        currency_img : 'https://cleandevtest.azurewebsites.net/SSO_Account/CurrencyLogo/ltc.png',
        currency_name : 'LTC',
        amount : 100.25451,
        available : 78.25525,
        open_price : 0.334,
        current_price : 0.359,
        value : 2887.45,
        profit_loss : '+254.25',
        profit_loss_per : '-7.54%'
    },
    {
        currency_img : 'https://cleandevtest.azurewebsites.net/SSO_Account/CurrencyLogo/eth.png',
        currency_name : 'ETH',
        amount : 100.25451,
        available : 78.25525,
        open_price : 0.334,
        current_price : 0.359,
        value : 2887.45,
        profit_loss : '+254.25',
        profit_loss_per : '-7.54%'
    },
    {
        currency_img : 'https://cleandevtest.azurewebsites.net/SSO_Account/CurrencyLogo/zrx.png',
        currency_name : 'ZRX',
        amount : 100.25451,
        available : 78.25525,
        open_price : 0.334,
        current_price : 0.359,
        value : 2887.45,
        profit_loss : '+254.25',
        profit_loss_per : '-7.54%'
    }
];

//Columns Object
const columns = [
	{
		name: <IntlMessages id="sidebar.colAsset" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colAmtAvailable" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colOpenPrice" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colCurrentPrice" />,
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: <IntlMessages id="sidebar.colValue" />,
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: <IntlMessages id="sidebar.colProfitLoss" />,
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: <IntlMessages id="sidebar.colProfitLossPsnt" />,
		options: {
			filter: false,
			sort: false
		}
	}
];

const options = {
	filterType: "select",
	responsive: "scroll",
	selectableRows: false,
    resizableColumns: false,
    viewColumns: false,
	filter: false,
	download: false,
	textLabels: {
		body: {
			noMatch: <IntlMessages id="wallet.emptyTable" />,
			toolTip: <IntlMessages id="wallet.sort" />,
		}
	}
};

class Portfolio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list : [],
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading : false
		};

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	componentWillMount() {
		this.setState({ list : portfolioData });
	}

	render() {
        const { list, err_alert, err_msg, success_msg, success_alert, loading } = this.state;
	    return (
			<Fragment>
				{success_msg && <div className="alert_area">
					<Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
				</div>}
				{err_msg && <div className="alert_area">
					<Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
				</div>}
				{
					loading
					? 
					<div className="text-center py-40">
                        <CircularProgress className="progress-primary" />
                    </div>
					:
					<Fragment>
						<div className="mt-20 portfolio-list">
                            <div className={this.props.darkMode ? 'ipwhitelist-darkmode':'ipwhitelist'}>
                                <MUIDataTable title={<IntlMessages id="socialProfile.portfolioList" />} columns={columns} options={options}
                                    data={list.map((item, key) => {
                                        return [
											<span className="crnc_img">
												<img src={item.currency_img} alt="Icon" title={item.currency_name} width="25" height="25" className="mr-10" />
												{item.currency_name}
											</span>,
											<Fragment>
												<span className="d-block">{item.amount} /</span>
												<span className="d-block">{item.available}</span>
											</Fragment>,
                                            item.open_price,
                                            item.current_price,
                                            item.value,
											<span className={item.profit_loss > 0 ? 'positive' : 'negative'}>{item.profit_loss}</span>,
											<span className={item.profit_loss_per > 0 ? 'positive' : 'negative'}>{item.profit_loss_per}</span>
                                        ];
                                    })}
                                />
                            </div>
						</div>
					</Fragment>
				}
			</Fragment>
		);
	}
}

export default Portfolio;