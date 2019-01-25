/**
 * My Account - IP History Data Table
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { Badge, Alert } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
// intl messages
import IntlMessages from 'Util/IntlMessages';
//Import Referral Friends Actions...
import { ipHistoryList } from 'Actions/MyAccount';
//change date formate from the helper.js
import { changeDateFormat } from "Helpers/helpers";

//Table Object...
const columns = [
	{
		name: <IntlMessages id="sidebar.colDate" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colIpAddress" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colLocation" />,
		options: {
			filter: false,
			sort: true
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
	},
	downloadOptions : {
		filename: 'IP_History_'+changeDateFormat(new Date(),'YYYY-MM-DD')+'.csv'
	}
};

class IPHistoryDataTable extends Component {
    constructor(props) {
		super(props);
		this.state = {
			list : [],
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading : true,
			PageIndex : 0,
			Page_Size : 100
		};

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	componentWillMount() {
		const reqObj = {
			PageIndex : this.state.PageIndex,
			Page_Size : this.state.Page_Size
        }
		this.props.ipHistoryList(reqObj);
    }
    
    componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });

        if (nextProps.data.ReturnCode === 1) {
            var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
            this.setState({ err_alert: true, err_msg: errMsg });
        } else if(Object.keys(nextProps.data).length > 0 && (typeof(nextProps.data.IpHistoryList) !== 'undefined' || nextProps.data.IpHistoryList.length > 0)) {
            this.setState({ 
                success_msg: nextProps.data.ReturnMsg, 
                success_alert: true,
                list : nextProps.data.IpHistoryList
            });
        }
	}

	render() {
        const { list, err_alert, err_msg, success_msg, success_alert, loading } = this.state;        
		return (
			<Fragment>
                <div className={this.props.darkMode ? 'transaction-history-detail-darkmode':'transaction-history-detail'}>                
                    {/* {success_msg && <div className="alert_area">
                        <Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
                    </div>} */}
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
                        <div className={this.props.darkMode ? 'ipwhitelist-darkmode':'ipwhitelist'}>
                            <MUIDataTable title={<IntlMessages id="sidebar.ipHistory" />} columns={columns} options={options}
                                data={list.map((item, key) => {
                                    return [
										changeDateFormat(item.Date,'YYYY-MM-DD HH:mm:ss'),
                                        item.IpAddress,
                                        item.Location
                                    ];
                                })}
                            />
                    </div>
                    }
                </div>
            </Fragment>
		);
	}
}

const mapStateToProps = ({ ipHistoryRdcer , settings}) => {
    const { darkMode } = settings;
	const { data, loading } = ipHistoryRdcer;
    return { data, loading , darkMode}
}

export default connect(mapStateToProps,{
    ipHistoryList
}) (IPHistoryDataTable);