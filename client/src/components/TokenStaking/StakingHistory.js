/* 
    Developer : Nishant Vadgama
    Date : 21-09-2018
    File Comment : Staking history component model
*/

import React from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import IntlMessages from "Util/IntlMessages";
import { FormGroup, Label, Input, Button } from "reactstrap";
// import component for Card Design
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";
// jbs section loader
import JbsSectionLoader from "Components/JbsSectionLoader/JbsSectionLoader";
import { changeDateFormat } from "Helpers/helpers";
import { getStakHistory } from "Actions/TokenStaking";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import { Table } from 'reactstrap';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
const initState = {
    FromDate: "",
    ToDate: "",
    Type: "",
    Slab: "",
    StakingType: "",
    totalCount: 0,
    Page: 0,
    PageSize: 10,
    showReset: false,
    showDialog: false,
    rowDetails: {}
}

// staking history
class StakingHistory extends React.Component {
    state = initState;
    //will mount fetch data before load...
    componentWillMount() {
        this.props.getStakHistory({
            PageSize: this.state.PageSize,
            Page: this.state.Page
        });
    }
    //on change props...
    componentWillReceiveProps(nextProps) {
        if (this.state.totalCount != nextProps.totalCount) {
            this.setState({ totalCount: nextProps.totalCount })
        }
    }
    // change date filter...
    onChangeDate(e, key) {
        e.preventDefault();
        this.setState({ [key]: e.target.value });
    }
    // get history on filter apply...
    getHistoryData(e) {
        e.preventDefault();
        this.setState({ showReset: true });
        this.props.getStakHistory({
            Page: this.state.Page,
            PageSize: this.state.PageSize,
            FromDate: this.state.FromDate,
            ToDate: this.state.ToDate,
            Type: this.state.Type,
            Slab: this.state.Slab,
            StakingType: this.state.StakingType,
        });
    }
    //clear filter
    clearFilter = () => {
        this.setState(initState);
        this.props.getStakHistory({
            PageSize: this.state.PageSize,
            Page: this.state.Page
        });
    }
    // view more
    viewMore(row) {
        this.setState({
            rowDetails: row,
            showDialog: true,
        })
    }
    render() {
        const columns = [
            "Sr",
            "StakingTypeName",
            "SlabTypeName",
            "StakingCurrency",
            "StakingAmount",
            "MaturityDate",
            "Status",
            "Actions"
        ];
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            selectableRows: false,
            rowsPerPageOptions: [10, 25, 50, 100],
            serverSide: true,
            page: this.state.Page,
            rowsPerPage: this.state.PageSize,
            count: this.state.totalCount,
            print: false,
            download: false,
            viewColumns: false,
            search: false,
            textLabels: {
                body: {
                    noMatch: <IntlMessages id="wallet.emptyTable" />,
                    toolTip: <IntlMessages id="wallet.sort" />,
                }
            },
            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changeRowsPerPage':
                        this.setState({
                            Page: tableState.page,
                            PageSize: tableState.rowsPerPage,
                            // searchValue: tableState.searchText,
                            // orderBy: orderBy,
                            // sortOrder: sortOrder,
                            // loading: false
                        });
                        this.props.getStakHistory({
                            Page: tableState.page,
                            PageSize: tableState.rowsPerPage,
                            FromDate: this.state.FromDate,
                            ToDate: this.state.ToDate,
                            Type: this.state.Type,
                            Slab: this.state.Slab,
                            StakingType: this.state.StakingType,
                        });
                        break;
                    case 'changePage':
                        this.setState({
                            Page: tableState.page,
                            PageSize: tableState.rowsPerPage,
                            // searchValue: tableState.searchText,
                            // orderBy: orderBy,
                            // sortOrder: sortOrder,
                            // loading: false
                        });
                        this.props.getStakHistory({
                            Page: tableState.page,
                            PageSize: tableState.rowsPerPage,
                            FromDate: this.state.FromDate,
                            ToDate: this.state.ToDate,
                            Type: this.state.Type,
                            Slab: this.state.Slab,
                            StakingType: this.state.StakingType,
                        });
                        break;
                    /* case 'search':
                        if (typeof tableState.searchText != 'undefined' && tableState.searchText != null && tableState.searchText.length > 2) {
                            this.setState({
                                page: tableState.page,
                                rowsPerPage: tableState.rowsPerPage,
                                searchValue: tableState.searchText,
                                orderBy: orderBy,
                                sortOrder: sortOrder,
                                loading: false
                            });
                            this.props.getCity({ page: tableState.page, rowsPerPage: tableState.rowsPerPage, searchValue: tableState.searchText, orderBy: orderBy, sortOrder: sortOrder });
                        }
                        else if (typeof tableState.searchText != 'undefined' && tableState.searchText == null) {

                            this.setState({
                                page: tableState.page,
                                rowsPerPage: tableState.rowsPerPage,
                                searchValue: tableState.searchText,
                                orderBy: orderBy,
                                sortOrder: sortOrder,
                                loading: false
                            });
                            this.props.getCity({ page: tableState.page, rowsPerPage: tableState.rowsPerPage, searchValue: tableState.searchText, orderBy: orderBy, sortOrder: sortOrder });
                        }

                        break;
                    case 'sort':
                        let sortingDirectionString = sortOrder == 1 ? -1 : 1;
                        this.setState({
                            page: tableState.page,
                            rowsPerPage: tableState.rowsPerPage,
                            searchValue: tableState.searchText,
                            orderBy: sortColumns[tableState.activeColumn].orderBy,
                            sortOrder: sortingDirectionString,
                            loading: false
                        });
                        this.props.getCity({ page: tableState.page, rowsPerPage: tableState.rowsPerPage, searchValue: tableState.searchText, orderBy: sortColumns[tableState.activeColumn].orderBy, sortOrder: sortingDirectionString });
                        break; */
                }
            }
        };
        return (
            <JbsCollapsibleCard
                colClasses="col-sm-12 col-md-12 col-xl-12"
                heading={<IntlMessages id="wallet.CTHistoryTitle" />}
                fullBlock
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="top-filter clearfix px-20 pb-20 token Stacking-search">
                            <FormGroup className="w-15 mb-0 pb-15">
                                <Label for="FromDate"><IntlMessages id="widgets.startDate" /></Label>
                                <Input
                                    type="date"
                                    name="FromDate"
                                    id="FromDate"
                                    placeholder="dd/mm/yyyy"
                                    value={this.state.FromDate}
                                    onChange={e => this.onChangeDate(e, "FromDate")}
                                />
                            </FormGroup>
                            <FormGroup className="w-15 mb-0 pb-15">
                                <Label for="ToDate"><IntlMessages id="widgets.endDate" /></Label>
                                <Input
                                    type="date"
                                    name="ToDate"
                                    id="ToDate"
                                    placeholder="dd/mm/yyyy"
                                    value={this.state.ToDate}
                                    onChange={e => this.onChangeDate(e, "ToDate")}
                                />
                            </FormGroup>
                            <FormGroup className="w-10 mb-0 pb-15">
                                <Label for="Type"><IntlMessages id="sidebar.type" /></Label>
                                <Input type="select" name="Type" id="Type" value={this.state.Type} onChange={(e) => this.onChangeDate(e, 'Type')}>
                                    <IntlMessages id="sidebar.type">
                                        {(optionValue) => <option value="">{optionValue}</option>}
                                    </IntlMessages>
                                    <IntlMessages id="wallet.Staking">
                                        {(optionValue) => <option value="1">{optionValue}</option>}
                                    </IntlMessages>
                                    <IntlMessages id="wallet.Unstaking">
                                        {(optionValue) => <option value="2">{optionValue}</option>}
                                    </IntlMessages>
                                </Input>
                            </FormGroup>
                            <FormGroup className="w-10 mb-0 pb-15">
                                <Label for="Slab"><IntlMessages id="wallet.slab" /></Label>
                                <Input type="select" name="Slab" id="Slab" value={this.state.Slab} onChange={(e) => this.onChangeDate(e, 'Slab')}>
                                    <IntlMessages id="wallet.slab">
                                        {(optionValue) => <option value="">{optionValue}</option>}
                                    </IntlMessages>
                                    <IntlMessages id="wallet.Range">
                                        {(optionValue) => <option value="2">{optionValue}</option>}
                                    </IntlMessages>
                                    <IntlMessages id="wallet.Fixed">
                                        {(optionValue) => <option value="1">{optionValue}</option>}
                                    </IntlMessages>
                                </Input>
                            </FormGroup>
                            <FormGroup className="w-10 mb-0 pb-15">
                                <Label for="StakingType"><IntlMessages id="wallet.StakingType" /></Label>
                                <Input type="select" name="StakingType" id="StakingType" value={this.state.StakingType} onChange={(e) => this.onChangeDate(e, 'StakingType')}>
                                    <IntlMessages id="wallet.StakingType">
                                        {(optionValue) => <option value="">{optionValue}</option>}
                                    </IntlMessages>
                                    <IntlMessages id="wallet.FixedDeposit">
                                        {(optionValue) => <option value="1">{optionValue}</option>}
                                    </IntlMessages>
                                    <IntlMessages id="wallet.Charge">
                                        {(optionValue) => <option value="2">{optionValue}</option>}
                                    </IntlMessages>
                                </Input>
                            </FormGroup>
                            <FormGroup className="mb-0">
                                <Label className="d-block">&nbsp;</Label>
                                <Button
                                    color="primary"
                                    className="border-0 rounded-0"
                                    onClick={e => this.getHistoryData(e)}
                                >
                                    <IntlMessages id="widgets.apply" />
                                </Button>
                            </FormGroup>
                            {this.state.showReset && <FormGroup className="mb-5">
                                <Label className="d-block">&nbsp;</Label>
                                <Button color="success" className="border-0 rounded-0" onClick={(e) => this.clearFilter()}>
                                    <IntlMessages id="button.clear" />
                                </Button>
                            </FormGroup>}
                        </div>
                    </div>
                </div>
                {this.props.showLoading && <JbsSectionLoader />}

                <div className={this.props.darkMode ? 'StackingHistorydarkmode' : 'StackingHistory'}>
                    <MUIDataTable
                        title={""}
                        data={this.props.stakHistoryList.map((item, key) => {
                            return [
                                key + 1,
                                item.StakingTypeName,
                                item.SlabTypeName,
                                item.StakingCurrency,
                                item.StakingAmount,
                                changeDateFormat(item.MaturityDate, 'YYYY-MM-DD HH:mm:ss'),
                                item.Status ? <IntlMessages id="sidebar.active" /> : <IntlMessages id="sidebar.inActive" />,
                                <div className="list-action">
                                    <a
                                        href="javascript:void(0)"
                                        onClick={e => this.viewMore(item)}
                                    >
                                        <i className="ti-eye" />
                                    </a>
                                </div>
                            ];
                        })}
                        columns={columns}
                        options={options}
                    />
                </div>
                <Dialog
                    open={this.state.showDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth
                    maxWidth='md'
                    onClose={(e) => this.setState({ showDialog: false })}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <div className="list-action justify-content-between d-flex">
                            {<IntlMessages id="wallet.stakingDetails" />}
                            <a
                                href="javascript:void(0)"
                                onClick={(e) => this.setState({ showDialog: false })}
                            >
                                <i className="ti-close" />
                            </a>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.rowDetails.hasOwnProperty("PolicyDetailID") && <div className="row">
                                <div className="col-sm-6 p-0">
                                    <Table bordered className="mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.StakingType" /></td>
                                                <td className="w-50">{this.state.rowDetails.StakingTypeName}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.StakingCurrency" /></td>
                                                <td className="w-50">{this.state.rowDetails.StakingCurrency}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.duration" /></td>
                                                <td className="w-50">
                                                    {this.state.rowDetails.DurationMonth} <IntlMessages id="wallet.Months" />, {this.state.rowDetails.DurationWeek} <IntlMessages id="wallet.Weeks" />
                                                </td>
                                            </tr>
                                            {this.state.rowDetails.StakingType === 1 && <React.Fragment>
                                                <tr>
                                                    <td className="w-50"><IntlMessages id="wallet.interestType" /></td>
                                                    <td className="w-50">{this.state.rowDetails.InterestTypeName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-50"><IntlMessages id="wallet.MaturityCurrency" /></td>
                                                    <td className="w-50">{this.state.rowDetails.MaturityCurrency}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-50"><IntlMessages id="wallet.EnableStakingBeforeMaturity" /></td>
                                                    <td className="w-50">{this.state.rowDetails.EnableStakingBeforeMaturity ? <IntlMessages id="sidebar.yes" /> : <IntlMessages id="sidebar.no" />}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-50"><IntlMessages id="wallet.MaturityDate" /></td>
                                                    <td className="w-50">{changeDateFormat(this.state.rowDetails.MaturityDate, 'YYYY-MM-DD HH:mm:ss')}</td>
                                                </tr>
                                            </React.Fragment>}
                                            {this.state.rowDetails.StakingType === 2 && <tr>
                                                <td className="w-50"><IntlMessages id="wallet.TSCurrentTradingFees" /></td>
                                                <td className="w-50">
                                                    <IntlMessages id="trading.placeorder.label.makers" /> : {this.state.rowDetails.MakerCharges.toFixed(8)}{", "} <IntlMessages id="trading.placeorder.label.takers" /> :{" "}{this.state.rowDetails.TakerCharges.toFixed(8)}
                                                </td>
                                            </tr>}
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.RenewUnstakingEnable" /></td>
                                                <td className="w-50">{this.state.rowDetails.RenewUnstakingEnable ? <IntlMessages id="sidebar.yes" /> : <IntlMessages id="sidebar.no" />}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.AmountCredited" /></td>
                                                <td className="w-50">{this.state.rowDetails.AmountCredited.toFixed(8)}</td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                </div>
                                <div className="col-sm-6 p-0">
                                    <Table bordered className="mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.slab" /></td>
                                                <td className="w-50">{this.state.rowDetails.SlabTypeName}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.StakingAmount" /></td>
                                                <td className="w-50">{this.state.rowDetails.StakingAmount.toFixed(8)}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="widgets.status" /></td>
                                                <td className="w-50">{this.state.rowDetails.Status ? <IntlMessages id="sidebar.yes" /> : <IntlMessages id="sidebar.no" />}</td>
                                            </tr>
                                            {this.state.rowDetails.StakingType === 1 && <React.Fragment>
                                                <tr>
                                                    <td className="w-50"><IntlMessages id="wallet.interest" /></td>
                                                    <td className="w-50">{this.state.rowDetails.InterestValue.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-50"><IntlMessages id="wallet.MaturityAmount" /></td>
                                                    <td className="w-50">{this.state.rowDetails.MaturityAmount.toFixed(8)}</td>
                                                </tr>

                                                <tr>
                                                    <td className="w-50"><IntlMessages id="wallet.EnableStakingBeforeMaturityCharge" /></td>
                                                    <td className="w-50">{this.state.rowDetails.EnableStakingBeforeMaturityCharge}</td>
                                                </tr>
                                            </React.Fragment>}
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.EnableAutoUnstaking" /></td>
                                                <td className="w-50">{this.state.rowDetails.EnableAutoUnstaking ? <IntlMessages id="sidebar.yes" /> : <IntlMessages id="sidebar.no" />}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.RenewUnstakingPeriod" /></td>
                                                <td className="w-50">{this.state.rowDetails.RenewUnstakingPeriod}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-50"><IntlMessages id="wallet.UnstakingDate" /></td>
                                                <td className="w-50">{changeDateFormat(this.state.rowDetails.UnstakingDate, 'YYYY-MM-DD HH:mm:ss')}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </JbsCollapsibleCard>
        );
    }
}

const mapDispatchToProps = ({ stakingHistoryReducer, settings }) => {
    const { darkMode } = settings;
    const { showLoading, stakHistoryList, totalCount } = stakingHistoryReducer;
    return { showLoading, stakHistoryList, totalCount, darkMode };
};

export default connect(mapDispatchToProps, {
    getStakHistory
})(StakingHistory);
