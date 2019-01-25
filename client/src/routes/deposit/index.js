// Component  For Deposit page 

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import IntlMessages from 'Util/IntlMessages';
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import AddressGeneration from 'Components/Deposit/AddressGeneration';
import DepositWithdrawHistory from 'Components/Trading/DepositWithdrawHistory';

// Deposit Actions
import {
    getCurrency,
    getWallets,
    getBalance,
    getDefaultAddress,
    getDepositHistory,
    generateNewAddress
} from 'Actions/Deposit';

// deposit page root component
class deposit extends Component {
    state = {
        Coin: '',
        FromDate: "",
        ToDate: "",
        today: "",
    };

    // Function for call method of get Balance
    componentWillMount() {
        let today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' : '') + today.getDate();
        this.setState({ FromDate: today, ToDate: today, today: today });
        this.props.getCurrency();
    }

    onChangeSelectCurrency(currency) {
        let reqObj = {
            Coin: currency,
            FromDate: this.state.FromDate,
            ToDate: this.state.ToDate,
        }
        this.props.getWallets({ Coin: currency });
        this.props.getDepositHistory(reqObj);
        this.setState({ Coin: currency });
    }

    onChangeDate(e, key) {
        e.preventDefault();
        this.setState({ [key]: e.target.value });
    }

    getHistoryData(e) {
        e.preventDefault();
        if (this.state.FromDate != "" && this.state.ToDate != "") {
            this.props.getDepositHistory(this.state);
        }
    }

    // on click function will redirect to view all deposit history 
    onClickViewAll() {
        this.props.history.push('/app/history/deposit');
    }

    render() {
        return (
            <Fragment>
                <PageTitleBar title={<IntlMessages id="sidebar.deposit" />} match={this.props.match} />
                <div className="row">

                    <AddressGeneration
                        loading={this.props.loading}
                        wallets={this.props.wallets}
                        currencies={this.props.currencies}
                        newAddress={this.props.response}
                        defaultAddress={this.props.defaultAddress}
                        onChangeSelectCurrency={(e) => this.onChangeSelectCurrency(e)}
                        balance={this.props.balance}
                        getBalanceById={this.props.getBalance}
                        getDefaultAddress={this.props.getDefaultAddress}
                        generateNewAddress={this.props.generateNewAddress} />

                    <JbsCollapsibleCard
                        colClasses="col-sm-12 col-md-12 col-xl-6"
                        fullBlock
                    >
                        <div className="jbs-block-title">
                            <h4>{<IntlMessages id="wallet.history" />}</h4>
                            <div className="contextual-link">
                                <a onClick={() => this.onClickViewAll()}>{<IntlMessages id="wallet.viewall" />}</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="top-filter clearfix px-20 pb-20">
                                    <FormGroup className="w-35 mb-0">
                                        <Label for="FromDate"><IntlMessages id="wallet.startDate" /></Label>
                                        <Input type="date" name="date" id="FromDate" placeholder="dd/mm/yyyy" value={this.state.FromDate} onChange={(e) => this.onChangeDate(e, 'FromDate')} max={this.state.today} />
                                    </FormGroup>
                                    <FormGroup className="w-35 mb-0">
                                        <Label for="ToDate"><IntlMessages id="wallet.endDate" /></Label>
                                        <Input type="date" name="date" id="ToDate" placeholder="dd/mm/yyyy" value={this.state.ToDate} onChange={(e) => this.onChangeDate(e, 'ToDate')} max={this.state.today} />
                                    </FormGroup>
                                    {/* <FormGroup className="mb-0">
                                        <Label className="d-block">&nbsp;</Label>
                                        <Button variant="raised" size="small" color="primary" className="mr-10" onClick={(e) => this.getHistoryData(e)}><IntlMessages id="widgets.apply" /></Button>
                                    </FormGroup> */}
                                    <FormGroup className="mb-0">
                                        <Label className="d-block">&nbsp;</Label>
                                        <Button color="primary" className={"mr-10 border-0 rounded-0 " + ((this.state.FromDate == "" || this.state.ToDate == "") ? "disabled" : "")} onClick={e => this.getHistoryData(e)}><IntlMessages id="widgets.apply" /></Button>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <DepositWithdrawHistory
                            loading={this.props.deposithistoryLoading}
                            history={this.props.deposithistory}
                            darkMode={this.props.darkMode}
                        />
                    </JbsCollapsibleCard>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ adddressGeneration, depositHistory, settings }) => {
    const { darkMode } = settings;
    const { currencies, wallets, loading, response, balance, defaultAddress } = adddressGeneration;
    const { deposithistory, deposithistoryLoading } = depositHistory;
    return { currencies, wallets, deposithistory, response, loading, darkMode, deposithistoryLoading, balance, defaultAddress };
};

export default connect(mapStateToProps, {
    getCurrency,
    getWallets,
    getBalance,
    getDefaultAddress,
    getDepositHistory,
    generateNewAddress
})(deposit);