/**
 * Auther : Salim Deraiya
 * Created : 14/09/2018
 * Activity List Actions
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { FormGroup, Label, Input, Button, Badge } from 'reactstrap';
// jbs card box
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';
//Import Referral Friends Actions...
import { activityList } from 'Actions/MyAccount';
import CircularProgress from '@material-ui/core/CircularProgress';
//change date formate from the helper.js
import { changeDateFormat } from "Helpers/helpers";


//Columns Object
const columns = [
    {
        name: <IntlMessages id="sidebar.colHash" />,
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: <IntlMessages id="sidebar.colUserName" />,
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: <IntlMessages id="sidebar.colRemarks" />,
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: <IntlMessages id="sidebar.colDeviceName" />,
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: <IntlMessages id="sidebar.colIpAddress" />,
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: <IntlMessages id="sidebar.colAliasName" />,
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: <IntlMessages id="sidebar.colModuleType" />,
        options: {
            filter: false,
            sort: false,
        }
    },
];

//Table Options
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
		filename: 'Activity_Logs_'+changeDateFormat(new Date(),'YYYY-MM-DD')+'.csv'
	}
};

class ActivityListWdgt extends Component {
    constructor(props) {
        super();
        this.state = {
            componentName: '',
            Getdata: {
                PageIndex: 0,
                Page_Size: 100,
                FromDate: "",
                ToDate: ""
            },
            FromDate1: "",
            ToDate1: "",
            getList: [],
            showReset: false,
        }
    }

    onChangeHandler(e, key) {
        e.preventDefault();
        this.setState({ [key]: e.target.value });
    }

    componentWillMount() {
        let today = new Date();
        today = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' : '') + today.getDate();
        this.setState({ FromDate1: today, ToDate1: today });
        var newObj = Object.assign({}, this.state.Getdata);
        if (this.state.Getdata.FromDate === "" || this.state.Getdata.ToDate === "") {
            newObj.FromDate = today;
            newObj.ToDate = today;
        } else {
            newObj.FromDate = this.state.FromDate1;
            newObj.ToDate = this.state.ToDate1;
        }
        this.setState({ Getdata: newObj });
        this.props.activityList(newObj);
    }

    //Apply Filter option
    applyFilter = () => {
        var newObj = Object.assign({}, this.state.Getdata);
        newObj.FromDate = this.state.FromDate1;
        newObj.ToDate = this.state.ToDate1;
        this.setState({ getDate: newObj, showReset: true });
        this.props.activityList(newObj);
    }

    //clear filter
    clearFilter = () => {
        let today = new Date();
        today = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' : '') + today.getDate();
        var newObj = Object.assign({}, this.state.Getdata);
        newObj.FromDate = today;
        newObj.ToDate = today;
        this.setState({ Getdata: newObj, showReset: false, FromDate1: today, ToDate1: today });
        this.props.activityList(newObj);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: nextProps.loading })
        if (nextProps.list.GetActivityLogList !== undefined && Object.keys(nextProps.list).length !== undefined && Object.keys(nextProps.list).length > 0 && Object.keys(nextProps.list.GetActivityLogList).length > 0) {
            this.setState({ getList: nextProps.list.GetActivityLogList });
        } else {
            this.setState({ getList: [] });
        }
    }

    render() {
        const { getList } = this.state;
        const { FromDate1, ToDate1 } = this.state;
        const { loading } = this.props;
        return (
            <div>
                {
                    loading
                        ?
                        <div className="text-center py-40"><CircularProgress className="progress-primary" thickness={2} /></div>
                        :
                        <div>
                            <JbsCollapsibleCard>
                                <div className="col-md-12">
                                    <div className="top-filter clearfix ">
                                        <FormGroup className="w-15 mb-5 mr-2">
                                            <Label for="FromDate"><IntlMessages id="widgets.startDate" /></Label>
                                            <Input type="date" name="FromDate1" id="FromDate1" placeholder="dd/mm/yyyy" value={FromDate1} onChange={(e) => this.onChangeHandler(e, 'FromDate1')} />
                                        </FormGroup>
                                        <FormGroup className="w-15 mb-5 mr-2">
                                            <Label for="ToDate"><IntlMessages id="widgets.endDate" /></Label>
                                            <Input type="date" name="ToDate1" id="ToDate1" placeholder="dd/mm/yyyy" value={ToDate1} onChange={(e) => this.onChangeHandler(e, 'ToDate1')} />
                                        </FormGroup>
                                        <FormGroup className="mb-5 mr-0">
                                            <Label className="d-block">&nbsp;</Label>
                                            <Button color="primary" variant="raised" className="mr-10 text-white" onClick={() => this.applyFilter()}><IntlMessages id="widgets.apply" /></Button>
                                        </FormGroup>
                                        {this.state.showReset && <FormGroup className="mb-5 mr-0">
                                            <Label className="d-block">&nbsp;</Label>
                                            <Button className="btn-success text-white" onClick={(e) => this.clearFilter()}>
                                                <IntlMessages id="button.cancel" />
                                            </Button>
                                        </FormGroup>}
                                    </div>
                                </div>
                            </JbsCollapsibleCard>
                            <div className="StackingHistory">

                                <Fragment>
                                    {/* <p><IntlMessages id="my_account.recentActivityMsg" /></p> */}
                                    <div className={this.props.darkMode ? 'transaction-history-detail-darkmode' : 'transaction-history-detail'}>
                                        <MUIDataTable
                                            title={<IntlMessages id="sidebar.ActivityLog" />}
                                            columns={columns}
                                            data={
                                                getList.map((lst, index) => {
                                                    return [
                                                        index + 1,
                                                        lst.UserName,
                                                        lst.Remark,
                                                        lst.DeviceId,
                                                        lst.IPAddress,
                                                        lst.AliasName,
                                                        lst.ModuleTypeName,
                                                    ]
                                                })
                                            }
                                            options={options}
                                        />
                                    </div>
                                </Fragment>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ activityListRdcer, settings }) => {
    const { darkMode } = settings;
    const { list, loading } = activityListRdcer;
    return { list, loading, darkMode }
}

export default connect(mapStateToProps, {
    activityList
})(ActivityListWdgt);