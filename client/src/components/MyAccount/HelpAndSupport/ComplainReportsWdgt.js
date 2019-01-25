/**
 * My Account - Complain Reports
 * Develop By : Salim Deraiya
 * Created Date : 03/10/2018
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
// intl messages
import IntlMessages from 'Util/IntlMessages';
//Import Referral Friends Actions...
import { complainList } from 'Actions/MyAccount';
import { Badge } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
//change date formate from the helper.js
import { changeDateFormat } from "Helpers/helpers";
// import ComplainReplayFormWdgt from './ComplainReplayFormWdgt';
//Table Object...
const columns = [
    {
        name:<IntlMessages id="sidebar.colHash" />,
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name:<IntlMessages id="sidebar.colType" />,
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name:<IntlMessages id="sidebar.colDate" />,
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name:<IntlMessages id="sidebar.colSubject" />,
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name:<IntlMessages id="sidebar.colDescription" />,
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name:<IntlMessages id="sidebar.colStatus" />,
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name:<IntlMessages id="sidebar.colActions" />,
        options: {
            filter: false,
            sort: false,
        }
    },
];
const options = {
    textLabels: {
        body: {
            noMatch: "Sorry, no matching records found",
            toolTip: "Sort",
        }
    },
    filterType: 'dropdown',
    responsive: 'scroll',
    selectableRows: false,
    resizableColumns: false,
    viewColumns: false,
    filter: false,
	download: false,
    rowsPerPageOptions: [10, 25, 50, 100],
};

const ComplainStatus = ({ status_id }) => {
    let htmlStatus = '';
    if (status_id === "Open") {
        htmlStatus = <Badge color="success"><IntlMessages id="sidebar.open" /></Badge>;
    } else {
        htmlStatus = <Badge color="danger"><IntlMessages id="sidebar.closed" /></Badge>;
    }
    return htmlStatus;
}

class ComplainReportsWdgt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ComplainNumber: "",
            Subject: "",
            list: [],
            ListComplain: false,
        }
    }

    componentWillMount() {
        this.props.complainList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: nextProps.loading });

        if (typeof nextProps.getList !== 'undefined' && nextProps.getList.userWiseCompaintDetailResponces.length > 0) {
            this.setState({ list: nextProps.getList.userWiseCompaintDetailResponces });
        }
    }

    onComplainReply(ComplainNumber) {
        this.props.myCallbackComplainWdgt(this.state.ListComplain, ComplainNumber);
    }

    render() {
        const { list, loading } = this.state;
        return (
            <Fragment>
                {
                    loading
                        ?
                        <div className="text-center py-40"><CircularProgress className="progress-primary" thickness={2} /></div>
                        :
                        <div className={this.props.darkMode ? 'transaction-history-detail-darkmode' : 'transaction-history-detail'}>
                            <MUIDataTable
                                title={<IntlMessages id="sidebar.complain" />}
                                columns={columns}
                                options={options}
                                data={
                                    list.map((lst, index) => {
                                        return [
                                            index + 1,
                                            lst.Type,
                                            changeDateFormat(lst.CreatedDate, 'YYYY-MM-DD HH:mm:ss'),
                                            <p className="Complainlist">{lst.Subject}</p>,
                                            <p className="Complainlist">{lst.Description}</p>,
                                            <Fragment><ComplainStatus status_id={lst.Status} /></Fragment>,
                                            <Fragment>
                                                <a href="javascript:void(0);"
                                                    onClick={() => this.onComplainReply(lst.CompainNumber)}
                                                >
                                                    <i className="zmdi zmdi-replay zmdi-hc-2x" />
                                                </a>
                                                {/* <Link color="primary" to={{ pathname: 'replay-complain', state: { id: lst.CompainNumber, subject: lst.Subject } }}><i className="zmdi zmdi-replay zmdi-hc-2x" /></Link> */}
                                            </Fragment>
                                        ];
                                    })
                                }
                            />

                        </div>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = ({ complainRdcer, settings }) => {
    const { darkMode } = settings;
    const { getList, loading } = complainRdcer;
    return { getList, loading, darkMode }
}

export default connect(mapStateToProps, {
    complainList
})(ComplainReportsWdgt);
