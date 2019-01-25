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
const topGainerData = [
    {
        image : 'Assets/image/user-profile.png',
        user_name : 'fifty-five',
        country : 'india',
        full_name : 'Albert Dietrich',
        popular:1,
        star : 1,
        return : 46.22,
        risk : 1,
        last: '12M',
        copiers : 430,
        last_7d_amt : 2.36,
        weekly_dd : -6.60,
        watch_list : 0
    },
    {
        image : 'Assets/image/user-profile.png',
        user_name : 'fifty-five',
        country : 'india',
        full_name : 'Albert Dietrich',
        popular:2,
        star : 2,
        return : 46.22,
        risk : 2,
        last: '12M',
        copiers : 430,
        last_7d_amt : 2.36,
        weekly_dd : -6.60,
        watch_list : 1
    },
    {
        image : 'Assets/image/user-profile.png',
        user_name : 'fifty-five',
        country : 'india',
        full_name : 'Albert Dietrich',
        popular:3,
        star : 3,
        return : -46.22,
        risk : 3,
        last: '12M',
        copiers : 430,
        last_7d_amt : 2.36,
        weekly_dd : -6.60,
        watch_list : 0
    },
    {
        image : 'Assets/image/user-profile.png',
        user_name : 'fifty-five',
        country : 'india',
        full_name : 'Albert Dietrich',
        popular:4,
        star : 4,
        return : 46.22,
        risk : 4,
        last: '12M',
        copiers : 430,
        last_7d_amt : 2.36,
        weekly_dd : -6.60,
        watch_list : 1
    },
    {
        image : 'Assets/image/user-profile.png',
        user_name : 'fifty-five',
        country : 'india',
        full_name : 'Albert Dietrich',
        popular:5,
        star : 5,
        return : -46.22,
        risk : 5,
        last: '12M',
        copiers : 430,
        last_7d_amt : -2.36,
        weekly_dd : -6.60,
        watch_list : 0
    }
];

//Columns Object
const columns = [
	{
		name: <IntlMessages id="sidebar.colPeople" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colReturn" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colRiskScore" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colCopiers" />,
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: <IntlMessages id="sidebar.colCopiersChange" />,
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: <IntlMessages id="sidebar.colWeeklyDD" />,
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: <IntlMessages id="sidebar.colActions" />,
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
    sorting:false,
	download: false,
	textLabels: {
		body: {
			noMatch: <IntlMessages id="wallet.emptyTable" />,
			toolTip: <IntlMessages id="wallet.sort" />,
		}
	}
};

class TopLeaderList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list : [],
			watchlist:false,
            watchListFlag:false
		};

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	componentWillMount() {
		this.setState({ list : topGainerData });
	}

	render() {
        const { list, watchListFlag, err_alert, err_msg, success_msg, success_alert, loading } = this.state;
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
						<div className="mt-20 top-gainer-list">
                            <div className="list_layout_area">
                                <MUIDataTable title={<IntlMessages id="socialProfile.topLeaderList" />} columns={columns} options={options}
                                    data={list.map((item, key) => {
                                        var watchlist = this.state;
                                        if(item.watch_list !== 'undefined') {
                                            watchlist = item.watch_list;
                                        }
                                        
                                        return [
											<Fragment>
                                                <div className="prsn_img">
                                                    <img src={require('Assets/image/user-profile.png')} alt="Image" />
                                                    <span className={"sprite-stats popular-"+item.popular}></span>
                                                </div>
                                                <div className="prn_name">
                                                    <h2>{item.user_name}</h2>
                                                    <h4>{item.full_name}</h4>
                                                </div>
                                            </Fragment>,
                                            <span className={item.return > 0 ? "positive" : "negative"}><i className={item.return > 0 ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i> {item.return}%</span>,
                                            <span className={"risk-label risk-"+item.risk}>{item.risk}</span>,
                                            item.copiers,
                                            <span className={item.last_7d_amt > 0 ? "positive" : "negative"}><i className={item.last_7d_amt > 0 ? "fa fa-arrow-up" : "fa fa-arrow-down"} aria-hidden="true"></i> {item.last_7d_amt}%</span>,
                                            item.weekly_dd+'%',
                                            <div className="watchlist_area">
                                                {
                                                    watchlist
                                                    ? <span className="icon active"><i className="fa fa-check" aria-hidden="true"></i></span>
                                                    : <span className="icon" onClick={this.showWatchList}><i className="fa fa-plus" aria-hidden="true"></i></span>
                                                }
                                                { 
                                                    watchListFlag &&
                                                    <div className="watchlist">
                                                        <ul>
                                                            <li><IntlMessages id="socialProfile.myWatchlist" /></li>
                                                            <li><IntlMessages id="socialProfile.addToNewList" /></li>
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
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

export default TopLeaderList;