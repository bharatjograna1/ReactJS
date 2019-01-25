/**
 * Auther : Kevin Ladani
 * Created : 09/10/2018
 * Updated : 24/10/2018 (Salim Deraiya)
 * IP Whitelisting Component
 */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { Badge, Alert } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
// redux action
import { 
	listIPWhitelist,
	DeleteIPToWhitelist,
	disableIPWhitelist,
	enableIPWhitelist
} from "Actions/MyAccount";
// intl messages
import IntlMessages from "Util/IntlMessages";
// delete confirmation dialog
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";
//import EditIPWhitelistDialogWdgt from "Components/MyAccount/EditIPWhitelistDialogWdgt";
//Get IP,Hostname,deviceInfo and mode from the helper.js
import { 
	changeDateFormat,
    getDeviceInfo,
    getIPAddress,
    getHostName,
    getMode
} from "Helpers/helpers";

//Columns Object
const columns = [
	{
		name: <IntlMessages id="myaccount.ipWhitelistColumn.ip" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="my_account.IPWhitelis.addColumn.aliasName" />,
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
	/* {
		name: <IntlMessages id="myaccount.ipWhitelistColumn.device" />,
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: <IntlMessages id="myaccount.ipWhitelistColumn.country" />,
		options: {
			filter: false,
			sort: false
		}
	}, */
	{
		name: <IntlMessages id="myaccount.ipWhitelistColumn.date" />,
		options: {
			filter: false,
			sort: false
		}
	},
	{
		name: <IntlMessages id="myaccount.ipWhitelistColumn.action" />,
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
	},
	downloadOptions : {
		filename: 'IP_Whitelist_'+changeDateFormat(new Date(),'YYYY-MM-DD')+'.csv'
	}
	/* customToolbar: () => {
		return (
			<Link to="/app/my-account/add-ipwhitelist" className="btn-sm btn-primary text-white p-10  text-center">
				<IntlMessages id="my_account.IPWhitelist.addIPWhitelist" />
			</Link>
		);
	} */
};

class IPWhitelistWdgt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				SelectedIPAddress: '',
				DeviceId: getDeviceInfo(),
				Mode: getMode(),
				IPAddress: '', //getIPAddress(),
				HostName: getHostName()
			},
			editIp:[],
			list : [],
			err_msg: '',
			err_alert: true,
			success_msg: '',
			success_alert: true,
			loading : false,
			checkedSwitch: true,
			edit_screen : false,
			PageIndex : 0,
			PAGE_SIZE : 100,
			staticIP: '', //getIPAddress(),
		};

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ err_alert: false, success_alert: false });
	}

	componentWillMount() {
		this.getIPWhitelist();
		let self = this;
		getIPAddress().then(function (ipAddress) {
			self.setState({ staticIP : ipAddress });
		});
	}

	getIPWhitelist() {	
		const reqObj = {
			PageIndex : this.state.PageIndex,
			PAGE_SIZE : this.state.PAGE_SIZE
		}
		this.props.listIPWhitelist(reqObj);
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
				setTimeout(() => this.getIPWhitelist(), 2000);
			}
		} else if(Object.keys(nextProps.data).length > 0 && (typeof(nextProps.data.IpList) !== 'undefined' || nextProps.data.IpList.length > 0)) {
			this.setState({ list : nextProps.data.IpList });
		}
	}

	onEnableIP(IpAddress) {
		const newObj = Object.assign({}, this.state.data);
		newObj.SelectedIPAddress = IpAddress;
		this.setState({ data : newObj });

		let self = this;
		getIPAddress().then(function (ipAddress) {
			newObj.IPAddress = ipAddress;
			self.props.enableIPWhitelist(newObj);
		});
	}

	onDisableIP(IpAddress) {
		const newObj = Object.assign({}, this.state.data);
		newObj.SelectedIPAddress = IpAddress;
		this.setState({ data : newObj });

		let self = this;
		getIPAddress().then(function (ipAddress) {
			newObj.IPAddress = ipAddress;
			self.props.disableIPWhitelist(newObj);
		});
	}

	handleCheckChange = name => (event, checked) => {
		this.setState({ [name]: checked });
	};

	ondeleteIPWhitewlisDialog(IpAddress) {
		const newObj = Object.assign({}, this.state.data);
		newObj.SelectedIPAddress = IpAddress;
		this.setState({ data : newObj });

		this.refs.deleteConfirmationDialog.open();
	}

	ondeleteIPWhitelist() {
		let self = this;
		var reqObj = Object.assign({},this.state.data);
		getIPAddress().then(function (ipAddress) {
			reqObj.IPAddress = ipAddress;
			self.props.DeleteIPToWhitelist(reqObj);
		});
		this.refs.deleteConfirmationDialog.close();
	}

	oneditIPWhitewlis(ipObj) {
		var editObj = {
			SelectedIPAddress: ipObj.IpAddress,
			IpAliasName : ipObj.IpAliasName
		}
		this.setState({ editIp : editObj });
		this.refs.editIpWhitelistDialog.open();
	}

	render() {
		const { staticIP, checkedSwitch, list, err_alert, err_msg, success_msg, success_alert, loading, errors } = this.state;
	    return (
			<Fragment>
				{/* <div className="text-right">
					{checkedSwitch === false ? "Disable Feature" : "Enable Feature"}
					<Switch checked={this.state.checkedSwitch} onChange={this.handleCheckChange("checkedSwitch")} />
				</div> */}
				<div className="text-success p-15 mb-15 border border-success">
					<IntlMessages id="sidebar.colIpAddress" /> : {staticIP}
				</div>
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
						<div className="mt-20 transaction-history-detail">
							{checkedSwitch === false ? (
								<span className="pricing-main" />
							) : (
								<div className={this.props.darkMode ? 'ipwhitelist-darkmode':'ipwhitelist'}>
									<MUIDataTable title={<IntlMessages id="sidebar.ipWhitelist" />} columns={columns} options={options}
										data={list.map((item, key) => {
											return [
												item.IpAddress,
												item.IpAliasName == null ? '' : item.IpAliasName,
												/* ( 
													item.IsEnable 
													? <Badge color="success"><IntlMessages id="sidebar.active" /></Badge> 
													: <Badge color="danger"><IntlMessages id="sidebar.inActive" /></Badge> 
												), */
												(
													item.IsEnable 
													?
													<Badge color="success" onClick={() => this.onDisableIP(item.IpAddress)} style={{'cursor':'pointer'}}>
														<IntlMessages id="sidebar.active" />
													</Badge>
													:
													<Badge color="danger" onClick={() => this.onEnableIP(item.IpAddress)} style={{'cursor':'pointer'}}>
														<IntlMessages id="sidebar.inActive" />
													</Badge>
												),
												changeDateFormat(item.CreatedDate,'YYYY-MM-DD HH:mm:ss'),
												<Fragment>
													{/* {
														item.IsEnable 
														?
														<Button className="text-danger" onClick={() => this.onDisableIP(item.IpAddress)}>
															<IntlMessages id="sidebar.btnDisable" />
														</Button>
														:
														<Button className="text-success" onClick={() => this.onEnableIP(item.IpAddress)}>
															<IntlMessages id="sidebar.btnEnable" />
														</Button>
													} */}
													{/* <Button className="text-success" onClick={() => this.oneditIPWhitewlis(item)}>
														<i className="zmdi zmdi-edit zmdi-hc-2x" />
													</Button> */}
													<Button className="text-danger" onClick={() => this.ondeleteIPWhitewlisDialog(item.IpAddress)}>
														<i className="zmdi zmdi-close zmdi-hc-lg" />
													</Button>
												</Fragment>
											];
										})}
									/>
									</div>
								)}
						</div>
						<DeleteConfirmationDialog
							ref="deleteConfirmationDialog"
							title={<IntlMessages id="sidebar.deleteConfirm" />}
							message={<IntlMessages id="sidebar.deleteIPNote" />}
							onConfirm={() => this.ondeleteIPWhitelist()}
						/>
						{/* <EditIPWhitelistDialogWdgt ref="editIpWhitelistDialog" {...this.state.editIp} /> */}
					</Fragment>
				}
			</Fragment>
		);
	}
}
// map state to props
const mapStateToProps = ({ ipWhitelist ,settings  }) => {
	var response = {
		data: ipWhitelist.data,
		ext_flag: ipWhitelist.ext_flag,
		loading: ipWhitelist.loading,
		darkMode: settings.darkMode
	};
	return response ;
};

export default connect(mapStateToProps, {
	listIPWhitelist,
	DeleteIPToWhitelist,
	disableIPWhitelist,
	enableIPWhitelist
})(IPWhitelistWdgt);