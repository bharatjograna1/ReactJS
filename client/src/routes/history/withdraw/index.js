/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    File Comment : History -> Withdraw index file component
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import component for Card Design
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';
// import component for Page Title
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// Import component for internationalization
import IntlMessages from 'Util/IntlMessages';
//component for withdraw history
import DepositWithdrawHistory from 'Components/Trading/DepositWithdrawHistory';

import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    FormFeedback,
    Button
} from 'reactstrap';
// Withdraw History Actions
import {
    getWithdrawalHistory
} from 'Actions/Withdraw';

/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    Comment : withdraw history root componet
*/
class history extends Component {
    state = {
        FromDate: "",
        ToDate: "",
        today: "",
    };

    // Function for call method of get Balance
    componentWillMount() {
        let today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' : '') + today.getDate();
        this.setState({ FromDate: today, ToDate: today, today: today });
        let reqObj = {
            FromDate: today,
            ToDate: today,
        }
        this.props.getWithdrawalHistory(reqObj);
    }

    onChangeDate(e, key) {
        e.preventDefault();
        this.setState({ [key]: e.target.value });
    }

    getHistoryData(e) {
        e.preventDefault();
        if (this.state.FromDate != "" && this.state.ToDate != "") {
            this.props.getWithdrawalHistory(this.state);
        }
    }

    render() {
        return (
            <div className="History pb-20">
                <PageTitleBar title={<IntlMessages id="wallet.historyWithdrawTitle" />} match={this.props.match} />
                <JbsCollapsibleCard>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="top-filter clearfix px-20 withdrawl-search">
                                <FormGroup className="w-35 mb-0 pb-15">
                                    <Label for="FromDate"><IntlMessages id="wallet.startDate" /></Label>
                                    <Input type="date" name="date" id="FromDate" placeholder="dd/mm/yyyy" value={this.state.FromDate} onChange={(e) => this.onChangeDate(e, 'FromDate')} max={this.state.today} />
                                </FormGroup>
                                <FormGroup className="w-35 mb-0">
                                    <Label for="ToDate"><IntlMessages id="wallet.endDate" /></Label>
                                    <Input type="date" name="date" id="ToDate" placeholder="dd/mm/yyyy" value={this.state.ToDate} onChange={(e) => this.onChangeDate(e, 'ToDate')} max={this.state.today} />
                                </FormGroup>
                                <FormGroup className="mb-0">
                                    <Label className="d-block">&nbsp;</Label>
                                    <Button color="primary" className={"mr-10 border-0 rounded-0 " + ((this.state.FromDate == "" || this.state.ToDate == "") ? "disabled" : "")} onClick={(e) => this.getHistoryData(e)}><IntlMessages id="widgets.apply" /></Button>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </JbsCollapsibleCard>

                <DepositWithdrawHistory
                    loading={this.props.withdrawhistoryLoading}
                    history={this.props.withdrawhistory}
                    darkMode={this.props.darkMode}
                    title={<IntlMessages id="wallet.withdrawTableTile" />} />
            </div>
        )
    }
}

const mapDispatchToProps = ({ withdrawHistory, settings }) => {
    const { darkMode } = settings;
    const { withdrawhistory, withdrawhistoryLoading } = withdrawHistory;
    return { withdrawhistory, withdrawhistoryLoading, darkMode };
}

export default connect(mapDispatchToProps, {
    getWithdrawalHistory
})(history);
