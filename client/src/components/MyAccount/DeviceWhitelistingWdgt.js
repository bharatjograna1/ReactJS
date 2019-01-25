/**
 * List Device WhiteListing
 */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//intl messages
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import { Badge, Alert } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
// delete confirmation dialog
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
//Actions
import { deviceWhiteList, deleteDeviceWhiteList, disableDeviceWhiteList, enableDeviceWhiteList } from "Actions/MyAccount";
//change date formate from the helper.js
import { 
	changeDateFormat,
    getDeviceInfo,
    getIPAddress,
    getHostName,
    getMode
} from "Helpers/helpers";

//Table Object...
const columns = [
	{
		name: <IntlMessages id="my_account.deviceWhitelisting.colDevice_name" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="my_account.deviceWhitelisting.colRecent_activity" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colStatus" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="sidebar.colActions" />,
		options: {
			filter: false,
			sort: true
		}
	},
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

class DeviceWhitelistingWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				SelectedDeviceId: '',
				DeviceId: getDeviceInfo(),
				Mode: getMode(),
				IPAddress: '', //getIPAddress(),
				HostName: getHostName()
			},
			list:[],
			PageIndex : 0,
			Page_Size : 100,
			loading: false
		}

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	componentWillMount() {
		this.getDeviceWhiteList();
	}

	getDeviceWhiteList() {
		const reqObj = {
			PageIndex : this.state.PageIndex,
			Page_Size : this.state.Page_Size
		}
		this.props.deviceWhiteList(reqObj);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ loading: nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });
        		
		if(nextProps.ext_flag) {
			if (nextProps.data.ReturnCode === 1) {
				var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
				this.setState({ err_alert: true, err_msg: errMsg });
			} else if (nextProps.data.statusCode === 200) {
				this.setState({ 
					success_msg: nextProps.data.ReturnMsg, 
					success_alert: true,
					loading : true
				});
				setTimeout(() => this.getDeviceWhiteList(), 2000);
			}
		} else if(Object.keys(nextProps.data).length > 0 && (typeof(nextProps.data.DeviceList) !== 'undefined' || nextProps.data.DeviceList.length > 0)) {
			this.setState({ list : nextProps.data.DeviceList });
		}
	}

	onEnableDevice(deviceId) {
		const newObj = Object.assign({}, this.state.data);
		newObj.SelectedDeviceId = deviceId;
		this.setState({ data : newObj });

		let self = this;
		getIPAddress().then(function (ipAddress) {
			newObj.IPAddress = ipAddress;
			self.props.enableDeviceWhiteList(newObj);
		});
	}

	onDisableDevice(deviceId) {
		const newObj = Object.assign({}, this.state.data);
		newObj.SelectedDeviceId = deviceId;
		this.setState({ data : newObj });

		let self = this;
		getIPAddress().then(function (ipAddress) {
			newObj.IPAddress = ipAddress;
			self.props.disableDeviceWhiteList(newObj);
		});
	}

	handleCheckChange = name => (event, checked) => {
		this.setState({ [name]: checked });
	};

	onDeleteDeviceDialog(deviceId) {
		const newObj = Object.assign({}, this.state.data);
		newObj.SelectedDeviceId = deviceId;
		this.setState({ data : newObj });

		this.refs.deleteConfirmationDialog.open();
	}

	onDeleteDevice() {
		let self = this;
		var reqObj = Object.assign({},this.state.data);
		getIPAddress().then(function (ipAddress) {
			reqObj.IPAddress = ipAddress;
			self.props.deleteDeviceWhiteList(reqObj);
		});
		this.refs.deleteConfirmationDialog.close();
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
						<Fragment>
							<div className={this.props.darkMode ? 'ipwhitelist-darkmode':'ipwhitelist'}>
								<MUIDataTable title={<IntlMessages id="sidebar.deviceWhitelisting" />} columns={columns} options={options}
									data={list.map((item, key) => {
										return [
											<Fragment>
												{item.Device}
												<span className="d-block">({item.DeviceOS})</span>
											</Fragment>,
											changeDateFormat(item.CreatedDate,'YYYY-MM-DD HH:mm:ss'),
											(
												item.IsEnable 
												?
												<Badge color="success" onClick={() => this.onDisableDevice(item.Id)} style={{'cursor':'pointer'}}>
													<IntlMessages id="sidebar.active" />
												</Badge>
												:
												<Badge color="danger" onClick={() => this.onEnableDevice(item.Id)} style={{'cursor':'pointer'}}>
													<IntlMessages id="sidebar.inActive" />
												</Badge>
											),
											<Fragment>
												<Button className="text-danger" onClick={() => this.onDeleteDeviceDialog(item.Id)}>
													<i className="material-icons">delete</i>
												</Button>
											</Fragment>
										];
									})}
								/>
						</div>
						<DeleteConfirmationDialog
							ref="deleteConfirmationDialog"
							title={<IntlMessages id="sidebar.deleteConfirm" />}
							message={<IntlMessages id="sidebar.deleteDeviceNote" />}
							onConfirm={() => this.onDeleteDevice()}
						/>
						</Fragment>
                    }
                </div>
            </Fragment>
		);
	}
}

const mapStateToProps = ({ deviceRdcer , settings}) => {
    const { darkMode } = settings;
	const { data, loading, ext_flag } = deviceRdcer;
    return { data, loading, ext_flag, darkMode}
}

export default withRouter(connect(mapStateToProps,{
	deviceWhiteList,
	deleteDeviceWhiteList,
	disableDeviceWhiteList,
	enableDeviceWhiteList
})(DeviceWhitelistingWdgt));