/* 
    Developer : Nishant Vadgama
    Date : 25-09-2018
    File Commet : Configuration and Preference setting page
*/
import React, { Component, Fragment } from "react";
import validator from "validator";
import { connect } from "react-redux";
import { TimePicker } from "material-ui-pickers";
import IntlMessages from "Util/IntlMessages";
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";
import JbsSectionLoader from "Components/JbsSectionLoader/JbsSectionLoader";
import Divider from "@material-ui/core/Divider";
import { NotificationManager } from "react-notifications";

// Used For Set Conditional Base Classes
import classnames from "classnames";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getWallets, getLimitInfo, postLimitInfo } from "Actions/LimitsControl";
// add validation
const validateTradeLimitRequest = require("../../validation/LimitsControl/ValidateTradeRequest");
const validateWithdrawLimitRequest = require("../../validation/LimitsControl/ValidateWithdrawRequest");
const validateDepositLimitRequest = require("../../validation/LimitsControl/ValidateDepositRequest");
const validateApiLimitRequest = require("../../validation/LimitsControl/ValidateApiRequest");
class LimitsControl extends Component {
    state = {
        trade: {
            AccWalletID: "",
            TrnType: 1,
            LimitPerDay: "0",
            LimitPerHour: "0",
            LimitPerTransaction: "0",
            LifeTime: "0",
            StartTime: null,
            EndTime: null
        },
        withdraw: {
            AccWalletID: "",
            TrnType: 2,
            LimitPerDay: "0",
            LimitPerHour: "0",
            LimitPerTransaction: "0",
            LifeTime: "0",
            StartTime: null,
            EndTime: null
        },
        deposit: {
            AccWalletID: "",
            TrnType: 3,
            LimitPerDay: "0",
            LimitPerHour: "0",
            LimitPerTransaction: "0",
            LifeTime: "0",
            StartTime: null,
            EndTime: null
        },
        apicalls: {
            AccWalletID: "",
            TrnType: 4,
            LimitPerDay: "0",
            LimitPerHour: "0",
            LimitPerTransaction: "0",
            LifeTime: "0",
            StartTime: null,
            EndTime: null
        },
        showTrade: false,
        showWithdraw: false,
        showDeposit: false,
        showApi: false,
        errors: {}
    };

    componentWillMount() {
        this.props.getWallets();
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.limitInfo &&
            nextProps.limitInfo.ReturnCode === 0 &&
            nextProps.limitInfo.statusCode === 200
        ) {
            let tradeObj = {
                AccWalletID: this.state.trade.AccWalletID,
                TrnType: 1,
                LimitPerDay: "0",
                LimitPerHour: "0",
                LimitPerTransaction: "0",
                LifeTime: "0",
                StartTime: null,
                EndTime: null
            };
            let withdrawObj = {
                AccWalletID: this.state.withdraw.AccWalletID,
                TrnType: 2,
                LimitPerDay: "0",
                LimitPerHour: "0",
                LimitPerTransaction: "0",
                LifeTime: "0",
                StartTime: null,
                EndTime: null
            };
            let depositObj = {
                AccWalletID: this.state.deposit.AccWalletID,
                TrnType: 3,
                LimitPerDay: "0",
                LimitPerHour: "0",
                LimitPerTransaction: "0",
                LifeTime: "0",
                StartTime: null,
                EndTime: null
            };
            let apicallsObj = {
                AccWalletID: this.state.apicalls.AccWalletID,
                TrnType: 4,
                LimitPerDay: "0",
                LimitPerHour: "0",
                LimitPerTransaction: "0",
                LifeTime: "0",
                StartTime: null,
                EndTime: null
            };
            if (nextProps.limitInfo.WalletLimitConfigurationRes.length) {
                nextProps.limitInfo.WalletLimitConfigurationRes.forEach(function (config) {
                    if (
                        config.TrnType === 1 &&
                        tradeObj.AccWalletID === config.AccWalletID
                    ) {
                        // trade
                        tradeObj["LimitPerDay"] = "" + config.LimitPerDay;
                        tradeObj["LimitPerHour"] = "" + config.LimitPerHour;
                        tradeObj["LimitPerTransaction"] = "" + config.LimitPerTransaction;
                        tradeObj["LifeTime"] = "" + config.LifeTime;
                        if (config.StartTime === 0) {
                            tradeObj["StartTime"] = null;
                        } else {
                            tradeObj["StartTime"] = config.StartTime;
                        }
                        if (config.EndTime === 0) {
                            tradeObj["EndTime"] = null;
                        } else {
                            tradeObj["EndTime"] = config.EndTime;
                        }
                    } else if (
                        config.TrnType === 2 &&
                        withdrawObj.AccWalletID === config.AccWalletID
                    ) {
                        // withdraw
                        withdrawObj["LimitPerDay"] = "" + config.LimitPerDay;
                        withdrawObj["LimitPerHour"] = "" + config.LimitPerHour;
                        withdrawObj["LimitPerTransaction"] = "" + config.LimitPerTransaction;
                        withdrawObj["LifeTime"] = "" + config.LifeTime;
                        if (config.StartTime === 0) {
                            withdrawObj["StartTime"] = null;
                        } else {
                            withdrawObj["StartTime"] = config.StartTime;
                        }
                        if (config.EndTime === 0) {
                            withdrawObj["EndTime"] = null;
                        } else {
                            withdrawObj["EndTime"] = config.EndTime;
                        }
                    } else if (
                        config.TrnType === 3 &&
                        depositObj.AccWalletID === config.AccWalletID
                    ) {
                        // deposit
                        depositObj["LimitPerDay"] = "" + config.LimitPerDay;
                        depositObj["LimitPerHour"] = "" + config.LimitPerHour;
                        depositObj["LimitPerTransaction"] = "" + config.LimitPerTransaction;
                        depositObj["LifeTime"] = "" + config.LifeTime;
                        if (config.StartTime === 0) {
                            depositObj["StartTime"] = null;
                        } else {
                            depositObj["StartTime"] = config.StartTime;
                        }
                        if (config.EndTime === 0) {
                            depositObj["EndTime"] = null;
                        } else {
                            depositObj["EndTime"] = config.EndTime;
                        }
                    } else if (
                        config.TrnType === 4 &&
                        apicallsObj.AccWalletID == config.AccWalletID
                    ) {
                        // API calls
                        apicallsObj["LimitPerDay"] = "" + config.LimitPerDay;
                        apicallsObj["LimitPerHour"] = "" + config.LimitPerHour;
                        apicallsObj["LimitPerTransaction"] = "" + config.LimitPerTransaction;
                        apicallsObj["LifeTime"] = "" + config.LifeTime;
                        if (config.StartTime === 0) {
                            apicallsObj["StartTime"] = null;
                        } else {
                            apicallsObj["StartTime"] = config.StartTime;
                        }
                        if (config.EndTime === 0) {
                            apicallsObj["EndTime"] = null;
                        } else {
                            apicallsObj["EndTime"] = config.EndTime;
                        }
                    }
                });
                this.setState({ trade: tradeObj });
                this.setState({ withdraw: withdrawObj });
                this.setState({ deposit: depositObj });
                this.setState({ apicalls: apicallsObj });
            }
        }
        //get response
        if (
            nextProps.response.hasOwnProperty("ReturnCode") &&
            nextProps.response.ReturnCode == 0 &&
            (this.state.showApi || this.state.showDeposit || this.state.showTrade || this.state.showWithdraw)
        ) {
            NotificationManager.success(nextProps.response.ReturnMsg);
            this.setState({
                showApi: false,
                showDeposit: false,
                showTrade: false,
                showWithdraw: false
            });
            if (nextProps.limitInfo.WalletLimitConfigurationRes != null && nextProps.limitInfo.WalletLimitConfigurationRes.length) {
                nextProps.limitInfo.WalletLimitConfigurationRes.forEach(function (config) {
                    nextProps.getLimitInfo(config.AccWalletID);
                });
            }
        } else if (
            nextProps.response.hasOwnProperty("ReturnCode") &&
            nextProps.response.ReturnCode != 0 &&
            (this.state.showApi || this.state.showDeposit || this.state.showTrade || this.state.showWithdraw)
        ) {
            this.setState({
                showApi: false,
                showDeposit: false,
                showTrade: false,
                showWithdraw: false
            });
            NotificationManager.error(
                <IntlMessages id={`apiWalletErrCode.${nextProps.response.ErrorCode}`} />
            );
        }
    }
    // numberic value only
    validateOnlyNumeric(value) {
        const regexNumeric = /^[0-9.]+$/;
        if (
            regexNumeric.test(value) &&
            validator.isDecimal(value, {
                force_decimal: false,
                decimal_digits: "0,8"
            })
        ) {
            return true;
        } else {
            return false;
        }
    }
    // on change trade block
    onTradeChange(e) {
        if (e.target.value) {
            if (e.target.type === "select-one") {
                // Trade
                let tempObj = this.state.trade;
                tempObj["LimitPerDay"] = "0";
                tempObj["LimitPerHour"] = "0";
                tempObj["LimitPerTransaction"] = "0";
                tempObj["LifeTime"] = "0";
                tempObj["StartTime"] = null;
                tempObj["EndTime"] = null;
                tempObj[e.target.name] = e.target.value;
                this.setState({
                    showWithdraw: false,
                    showDeposit: false,
                    showApi: false,
                    showTrade: true,
                    trade: tempObj
                });
                this.props.getLimitInfo(e.target.value);
            } else {
                if (this.validateOnlyNumeric(e.target.value)) {
                    let tempObj = this.state.trade;
                    tempObj[e.target.name] = e.target.value;
                    this.setState({ showTrade: true, trade: tempObj });
                }
            }
        }
    }

    handleTradeDateChange = (type, e) => {
        let tempObj = this.state.trade;
        if (e !== null) {
            //removed second and milisecond from time
            tempObj[type] = e.seconds(0).milliseconds(0).valueOf();
        } else {
            tempObj[type] = null;
        }
        this.setState({ showTrade: true, trade: tempObj })
    };

    handleWithdrawDateChange = (type, e) => {
        let tempObj = this.state.withdraw;
        if (e !== null) {
            //removed second and milisecond from time
            tempObj[type] = e.seconds(0).milliseconds(0).valueOf();
        } else {
            tempObj[type] = null;
        }
        this.setState({ showWithdraw: true, withdraw: tempObj })
    };

    handleDepositDateChange = (type, e) => {
        let tempObj = this.state.deposit;
        if (e !== null) {
            //removed second and milisecond from time
            tempObj[type] = e.seconds(0).milliseconds(0).valueOf();
        } else {
            tempObj[type] = null;
        }
        this.setState({ showDeposit: true, deposit: tempObj })
    };

    handleApiDateChange = (type, e) => {
        let tempObj = this.state.apicalls;
        if (e !== null) {
            //removed second and milisecond from time
            tempObj[type] = e.seconds(0).milliseconds(0).valueOf();
        } else {
            tempObj[type] = null;
        }
        this.setState({ showApi: true, apicalls: tempObj })
    };

    // on change withdraw block
    onWithdrawChange(e) {
        if (e.target.value) {
            if (e.target.type === "select-one") {
                let tempObj = this.state.withdraw;
                tempObj["LimitPerDay"] = "0";
                tempObj["LimitPerHour"] = "0";
                tempObj["LimitPerTransaction"] = "0";
                tempObj["LifeTime"] = "0";
                tempObj["StartTime"] = null;
                tempObj["EndTime"] = null;
                tempObj[e.target.name] = e.target.value;
                this.setState({
                    showTrade: false,
                    showDeposit: false,
                    showApi: false,
                    showWithdraw: true,
                    withdraw: tempObj
                });
                this.props.getLimitInfo(e.target.value);
            } else {
                if (this.validateOnlyNumeric(e.target.value)) {
                    let tempObj = this.state.withdraw;
                    tempObj[e.target.name] = e.target.value;
                    this.setState({ showWithdraw: true, withdraw: tempObj });
                }
            }
        }
    }

    // on change trade block
    onDepositChange(e) {
        if (e.target.value) {
            if (e.target.type === "select-one") {
                let tempObj = this.state.deposit;
                tempObj["LimitPerDay"] = "0";
                tempObj["LimitPerHour"] = "0";
                tempObj["LimitPerTransaction"] = "0";
                tempObj["LifeTime"] = "0";
                tempObj["StartTime"] = null;
                tempObj["EndTime"] = null;
                tempObj[e.target.name] = e.target.value;
                this.setState({
                    showTrade: false,
                    showWithdraw: false,
                    showApi: false,
                    showDeposit: true,
                    eposit: tempObj
                });
                this.props.getLimitInfo(e.target.value);
            } else {
                if (this.validateOnlyNumeric(e.target.value)) {
                    let tempObj = this.state.deposit;
                    tempObj[e.target.name] = e.target.value;
                    this.setState({ showDeposit: true, deposit: tempObj });
                }
            }
        }
    }

    // on change trade block
    onAPIChange(e) {
        if (e.target.value) {
            if (e.target.type === "select-one") {
                let tempObj = this.state.apicalls;
                tempObj["LimitPerDay"] = "0";
                tempObj["LimitPerHour"] = "0";
                tempObj["LimitPerTransaction"] = "0";
                tempObj["LifeTime"] = "0";
                tempObj["StartTime"] = null;
                tempObj["EndTime"] = null;
                tempObj[e.target.name] = e.target.value;
                this.setState({
                    showTrade: false,
                    showWithdraw: false,
                    showDeposit: false,
                    showApi: true,
                    apicalls: tempObj
                });
                this.props.getLimitInfo(e.target.value);
            } else {
                if (this.validateOnlyNumeric(e.target.value)) {
                    let tempObj = this.state.apicalls;
                    tempObj[e.target.name] = e.target.value;
                    this.setState({ showApi: true, apicalls: tempObj });
                }
            }
        }
    }

    //on close hide buttons trade
    onCloseTrade(e) {
        this.setState({ showTrade: false, errors: {} });
    }
    //on close hide buttons withdraw
    onCloseWithdraw(e) {
        this.setState({ showWithdraw: false, errors: {} });
    }
    //on close hide buttons deposit
    onCloseDeposit(e) {
        this.setState({ showDeposit: false, errors: {} });
    }
    //on close hide buttons APi
    onCloseApi(e) {
        this.setState({ showApi: false, errors: {} });
    }

    // on submit trade limit control
    onSubmitTrade(event) {
        event.preventDefault();
        const { errors, isValid } = validateTradeLimitRequest(this.state.trade);
        this.setState({ errors: errors });
        if (isValid) {
            this.props.postLimitInfo(this.state.trade);
        }
    }
    // on submit withdraw limit control
    onSubmitWithdraw(event) {
        event.preventDefault();
        const { errors, isValid } = validateWithdrawLimitRequest(this.state.withdraw);
        this.setState({ errors: errors });
        if (isValid) {
            this.props.postLimitInfo(this.state.withdraw);
        }
    }
    // on submit deposit limit control
    onSubmitDeposit(event) {
        event.preventDefault();
        const { errors, isValid } = validateDepositLimitRequest(this.state.deposit);
        this.setState({ errors: errors });
        if (isValid) {
            this.props.postLimitInfo(this.state.deposit);
        }
    }
    // on submit deposit limit control
    onSubmitApi(event) {
        event.preventDefault();
        const { errors, isValid } = validateApiLimitRequest(this.state.apicalls);
        this.setState({ errors: errors });
        if (isValid) {
            this.props.postLimitInfo(this.state.apicalls);
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <Fragment>
                <div className="row justify-content-center">
                    <JbsCollapsibleCard
                        colClasses={classnames(
                            { commonwalletjbscard_darkmode: this.props.darkMode },
                            "col-sm-12 col-md-10 col-lg-8"
                        )}
                        fullBlock
                        heading={<IntlMessages id="wallet.CFLCTradingLimits" />}
                        customClasses="overflow-hidden"
                    >
                        {this.props.loading && <JbsSectionLoader />}
                        <div className="col-sm-12 px-30 py-10">
                            <Divider />
                        </div>
                        <div className="col-sm-12 px-30 py-20">
                            {this.state.showTrade && this.props.showLoading && (
                                <JbsSectionLoader />
                            )}
                            <Form className="row">
                                <div className="col-sm-3">
                                    <FormGroup className="mb-0">
                                        <Label for="AccWalletID" className="font-weight-bold">
                                            <IntlMessages id={"wallet.WDSelectWallet"} />
                                        </Label>
                                        <Input
                                            type="select"
                                            name="AccWalletID"
                                            id="AccWalletID"
                                            value={this.state.trade.AccWalletID}
                                            onChange={e => this.onTradeChange(e)}
                                        >
                                            <option value="">Select</option>
                                            {this.props.wallets.map((coin, key) => (
                                                <option value={coin.AccWalletID} key={key}>
                                                    {coin.WalletName} - {coin.CoinName}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerHour" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperhour"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerHour"
                                                id="LimitPerHour"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.trade.LimitPerHour}
                                                onChange={e => this.onTradeChange(e)}
                                                disabled={!this.state.trade.AccWalletID}
                                            />
                                            {errors.tradeLimitHour && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.tradeLimitHour} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerDay" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperday"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerDay"
                                                id="LimitPerDay"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.trade.LimitPerDay}
                                                onChange={e => this.onTradeChange(e)}
                                                disabled={!this.state.trade.AccWalletID}
                                            />
                                            {errors.tradeLimitDay && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.tradeLimitDay} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.limitpertrn"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerTransaction"
                                                id="LimitPerTransaction"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.trade.LimitPerTransaction}
                                                onChange={e => this.onTradeChange(e)}
                                                disabled={!this.state.trade.AccWalletID}
                                            />
                                            {errors.tradeLimitTrn && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.tradeLimitTrn} />
                                                </span>
                                            )}
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LifeTime" className="font-weight-bold">
                                                <IntlMessages id={"wallet.lifetimeLimit"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LifeTime"
                                                id="LifeTime"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.trade.LifeTime}
                                                onChange={e => this.onTradeChange(e)}
                                                disabled={!this.state.trade.AccWalletID}
                                            />
                                            {errors.tradeLifeTimeLimit && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.tradeLifeTimeLimit} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label for="StartTime" className="font-weight-bold">
                                                <IntlMessages id={"wallet.fromTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    name="StartTime"
                                                    value={this.state.trade.StartTime}
                                                    onChange={e =>
                                                        this.handleTradeDateChange("StartTime", e)
                                                    }
                                                    disabled={!this.state.trade.AccWalletID}
                                                />
                                                {errors.tradeStartTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.tradeStartTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label for="EndTime" className="font-weight-bold">
                                                <IntlMessages id={"wallet.endTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    name="EndTime"
                                                    value={this.state.trade.EndTime}
                                                    onChange={e =>
                                                        this.handleTradeDateChange("EndTime", e)
                                                    }
                                                    disabled={!this.state.trade.AccWalletID}
                                                />
                                                {errors.tradeEndTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.tradeEndTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="col-sm-12 px-30 pb-20 pt-0 justify-content-center d-flex">
                            {this.state.showTrade && !this.props.showLoading && (
                                <FormGroup className="mb-10">
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="primary"
                                        onClick={e => this.onSubmitTrade(e)}
                                    >
                                        <IntlMessages id={"button.save"} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="danger"
                                        onClick={e => this.onCloseTrade(e)}
                                    >
                                        <IntlMessages id={"button.cancel"} />
                                    </Button>
                                </FormGroup>
                            )}
                        </div>
                    </JbsCollapsibleCard>
                </div>
                <div className="row justify-content-center">
                    <JbsCollapsibleCard
                        colClasses={classnames(
                            { commonwalletjbscard_darkmode: this.props.darkMode },
                            "col-sm-12 col-md-10 col-lg-8"
                        )}
                        fullBlock
                        heading={<IntlMessages id="wallet.CFLCWithdrawLimist" />}
                        customClasses="overflow-hidden"
                    >
                        {this.props.loading && <JbsSectionLoader />}
                        <div className="col-sm-12 px-30 py-10">
                            <Divider />
                        </div>
                        <div className="col-sm-12 px-30 py-20">
                            {this.state.showWithdraw && this.props.showLoading && (
                                <JbsSectionLoader />
                            )}
                            <Form className="row">
                                <div className="col-sm-3">
                                    <FormGroup className="mb-0">
                                        <Label for="AccWalletID" className="font-weight-bold">
                                            <IntlMessages id={"wallet.WDSelectWallet"} />
                                        </Label>
                                        <Input
                                            type="select"
                                            name="AccWalletID"
                                            id="AccWalletID"
                                            value={this.state.withdraw.AccWalletID}
                                            onChange={e => this.onWithdrawChange(e)}
                                        >
                                            <option value="">Select</option>
                                            {this.props.wallets.map((coin, key) => (
                                                <option value={coin.AccWalletID} key={key}>
                                                    {coin.WalletName} - {coin.CoinName}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerHour" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperhour"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerHour"
                                                id="LimitPerHour"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.withdraw.LimitPerHour}
                                                onChange={e => this.onWithdrawChange(e)}
                                                disabled={!this.state.withdraw.AccWalletID}
                                            />
                                            {errors.withdrawLimitHour && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.withdrawLimitHour} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerDay" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperday"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerDay"
                                                id="LimitPerDay"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.withdraw.LimitPerDay}
                                                onChange={e => this.onWithdrawChange(e)}
                                                disabled={!this.state.withdraw.AccWalletID}
                                            />
                                            {errors.withdrawLimitDay && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.withdrawLimitDay} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.limitpertrn"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerTransaction"
                                                id="LimitPerTransaction"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.withdraw.LimitPerTransaction}
                                                onChange={e => this.onWithdrawChange(e)}
                                                disabled={!this.state.withdraw.AccWalletID}
                                            />
                                            {errors.withdrawLimitTrn && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.withdrawLimitTrn} />
                                                </span>
                                            )}
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LifeTime" className="font-weight-bold">
                                                <IntlMessages id={"wallet.lifetimeLimit"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LifeTime"
                                                id="LifeTime"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.withdraw.LifeTime}
                                                onChange={e => this.onWithdrawChange(e)}
                                                disabled={!this.state.withdraw.AccWalletID}
                                            />
                                            {errors.withdrawLifeTimeLimit && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.withdrawLifeTimeLimit} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.fromTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    value={this.state.withdraw.StartTime}
                                                    onChange={e =>
                                                        this.handleWithdrawDateChange("StartTime", e)
                                                    }
                                                    disabled={!this.state.withdraw.AccWalletID}
                                                />
                                                {errors.withdrawStartTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.withdrawStartTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.endTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    value={this.state.withdraw.EndTime}
                                                    onChange={e =>
                                                        this.handleWithdrawDateChange("EndTime", e)
                                                    }
                                                    disabled={!this.state.withdraw.AccWalletID}
                                                />
                                                {errors.withdrawEndTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.withdrawEndTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="col-sm-12 px-30 py-20 justify-content-center d-flex">
                            {this.state.showWithdraw && !this.props.showLoading && (
                                <FormGroup className="mb-10">
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="primary"
                                        onClick={e => this.onSubmitWithdraw(e)}
                                    >
                                        <IntlMessages id={"button.save"} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="danger"
                                        onClick={e => this.onCloseWithdraw(e)}
                                    >
                                        <IntlMessages id={"button.cancel"} />
                                    </Button>
                                </FormGroup>
                            )}
                        </div>
                    </JbsCollapsibleCard>
                </div>
                <div className="row justify-content-center">
                    <JbsCollapsibleCard
                        colClasses={classnames(
                            { commonwalletjbscard_darkmode: this.props.darkMode },
                            "col-sm-12 col-md-10 col-lg-8"
                        )}
                        fullBlock
                        heading={<IntlMessages id="wallet.CFLCDepositLimits" />}
                        customClasses="overflow-hidden"
                    >
                        {this.props.loading && <JbsSectionLoader />}
                        <div className="col-sm-12 px-30 py-10">
                            <Divider />
                        </div>
                        <div className="col-sm-12 px-30 py-20">
                            {this.state.showDeposit && this.props.showLoading && (
                                <JbsSectionLoader />
                            )}
                            <Form className="row">
                                <div className="col-sm-3">
                                    <FormGroup className="mb-0">
                                        <Label for="AccWalletID" className="font-weight-bold">
                                            <IntlMessages id={"wallet.WDSelectWallet"} />
                                        </Label>
                                        <Input
                                            type="select"
                                            name="AccWalletID"
                                            id="AccWalletID"
                                            value={this.state.deposit.AccWalletID}
                                            onChange={e => this.onDepositChange(e)}
                                        >
                                            <option value="">Select</option>
                                            {this.props.wallets.map((coin, key) => (
                                                <option value={coin.AccWalletID} key={key}>
                                                    {coin.WalletName} - {coin.CoinName}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerHour" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperhour"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerHour"
                                                id="LimitPerHour"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.deposit.LimitPerHour}
                                                onChange={e => this.onDepositChange(e)}
                                                disabled={!this.state.deposit.AccWalletID}
                                            />
                                            {errors.depositLimitHour && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.depositLimitHour} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerDay" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperday"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerDay"
                                                id="LimitPerDay"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.deposit.LimitPerDay}
                                                onChange={e => this.onDepositChange(e)}
                                                disabled={!this.state.deposit.AccWalletID}
                                            />
                                            {errors.depositLimitDay && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.depositLimitDay} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.limitpertrn"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerTransaction"
                                                id="LimitPerTransaction"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.deposit.LimitPerTransaction}
                                                onChange={e => this.onDepositChange(e)}
                                                disabled={!this.state.deposit.AccWalletID}
                                            />
                                            {errors.depositLimitTrn && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.depositLimitTrn} />
                                                </span>
                                            )}
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LifeTime" className="font-weight-bold">
                                                <IntlMessages id={"wallet.lifetimeLimit"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LifeTime"
                                                id="LifeTime"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.deposit.LifeTime}
                                                onChange={e => this.onDepositChange(e)}
                                                disabled={!this.state.deposit.AccWalletID}
                                            />
                                            {errors.depositLifeTimeLimit && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.depositLifeTimeLimit} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.fromTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    value={this.state.deposit.StartTime}
                                                    onChange={e =>
                                                        this.handleDepositDateChange("StartTime", e)
                                                    }
                                                    disabled={!this.state.deposit.AccWalletID}
                                                />
                                                {errors.depositStartTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.depositStartTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.endTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    value={this.state.deposit.EndTime}
                                                    onChange={e =>
                                                        this.handleDepositDateChange("EndTime", e)
                                                    }
                                                    disabled={!this.state.deposit.AccWalletID}
                                                />
                                                {errors.depositEndTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.depositEndTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="col-sm-12 px-30 py-20 justify-content-center d-flex">
                            {this.state.showDeposit && !this.props.showLoading && (
                                <FormGroup className="mb-10">
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="primary"
                                        onClick={e => this.onSubmitDeposit(e)}
                                    >
                                        <IntlMessages id={"button.save"} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="danger"
                                        onClick={e => this.onCloseDeposit(e)}
                                    >
                                        <IntlMessages id={"button.cancel"} />
                                    </Button>
                                </FormGroup>
                            )}
                        </div>
                    </JbsCollapsibleCard>
                </div>
                {/* <div className="row justify-content-center">
                    <JbsCollapsibleCard
                        colClasses={classnames(
                            { commonwalletjbscard_darkmode: this.props.darkMode },
                            "col-sm-12 col-md-10 col-lg-8"
                        )}
                        fullBlock
                        heading={<IntlMessages id="wallet.CFLCAPICallLimits" />}
                        customClasses="overflow-hidden"
                    >
                        {this.props.loading && <JbsSectionLoader />}
                        <div className="col-sm-12 px-30 py-10">
                            <Divider />
                        </div>
                        <div className="col-sm-12 px-30 py-20">
                            {this.state.showApi && this.props.showLoading && (
                                <JbsSectionLoader />
                            )}
                            <Form className="row">
                                <div className="col-sm-3">
                                    <FormGroup className="mb-0">
                                        <Label for="AccWalletID" className="font-weight-bold">
                                            <IntlMessages id={"wallet.WDSelectWallet"} />
                                        </Label>
                                        <Input
                                            type="select"
                                            name="AccWalletID"
                                            id="AccWalletID"
                                            value={this.state.apicalls.AccWalletID}
                                            onChange={e => this.onAPIChange(e)}
                                        >
                                            <option value="">Select</option>
                                            {this.props.wallets.map((coin, key) => (
                                                <option value={coin.AccWalletID} key={key}>
                                                    {coin.WalletName} - {coin.CoinName}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerHour" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperhour"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerHour"
                                                id="LimitPerHour"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.apicalls.LimitPerHour}
                                                onChange={e => this.onAPIChange(e)}
                                                disabled={!this.state.apicalls.AccWalletID}
                                            />
                                            {errors.apiCallLimitHour && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.apiCallLimitHour} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label for="LimitPerDay" className="font-weight-bold">
                                                <IntlMessages id={"wallet.limitperday"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerDay"
                                                id="LimitPerDay"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.apicalls.LimitPerDay}
                                                onChange={e => this.onAPIChange(e)}
                                                disabled={!this.state.apicalls.AccWalletID}
                                            />
                                            {errors.apiCallLimitDay && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.apiCallLimitDay} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.limitpertrn"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LimitPerTransaction"
                                                id="LimitPerTransaction"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.apicalls.LimitPerTransaction}
                                                onChange={e => this.onAPIChange(e)}
                                                disabled={!this.state.apicalls.AccWalletID}
                                            />
                                            {errors.apiCallLimitTrn && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.apiCallLimitTrn} />
                                                </span>
                                            )}
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <FormGroup className="col-sm-4">
                                            <Label for="LifeTime" className="font-weight-bold">
                                                <IntlMessages id={"wallet.lifetimeLimit"} />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="LifeTime"
                                                id="LifeTime"
                                                placeholder={"0"}
                                                maxLength="10"
                                                value={this.state.apicalls.LifeTime}
                                                onChange={e => this.onAPIChange(e)}
                                                disabled={!this.state.apicalls.AccWalletID}
                                            />
                                            {errors.apiCallLifeTimeLimit && (
                                                <span className="text-danger">
                                                    <IntlMessages id={errors.apiCallLifeTimeLimit} />
                                                </span>
                                            )}
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.fromTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    value={this.state.apicalls.StartTime}
                                                    onChange={e =>
                                                        this.handleApiDateChange("StartTime", e)
                                                    }
                                                    disabled={!this.state.apicalls.AccWalletID}
                                                />
                                                {errors.apiCallStartTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.apiCallStartTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-sm-4">
                                            <Label
                                                for="LimitPerTransaction"
                                                className="font-weight-bold"
                                            >
                                                <IntlMessages id={"wallet.endTime"} />
                                            </Label>
                                            <div className="timePicker col-sm-12 p-0">
                                                <TimePicker
                                                    clearable
                                                    value={this.state.apicalls.EndTime}
                                                    onChange={e =>
                                                        this.handleApiDateChange("EndTime", e)
                                                    }
                                                    disabled={!this.state.apicalls.AccWalletID}
                                                />
                                                {errors.apiCallEndTime && (
                                                    <span className="text-danger">
                                                        <IntlMessages id={errors.apiCallEndTime} />
                                                    </span>
                                                )}
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="col-sm-12 px-30 py-20 justify-content-center d-flex">
                            {this.state.showApi && !this.props.showLoading && (
                                <FormGroup className="mb-10">
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="primary"
                                        onClick={e => this.onSubmitApi(e)}
                                    >
                                        <IntlMessages id={"button.save"} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="border-0 rounded-0 mx-10 px-20"
                                        color="danger"
                                        onClick={e => this.onCloseApi(e)}
                                    >
                                        <IntlMessages id={"button.cancel"} />
                                    </Button>
                                </FormGroup>
                            )}
                        </div>
                    </JbsCollapsibleCard>
                </div> */}
            </Fragment>
        );
    }
}

const mapDispatchToProps = ({ limitsControl, settings }) => {
    const { darkMode } = settings;
    const { wallets, showLoading, limitInfo, loading, response } = limitsControl;
    return { wallets, showLoading, limitInfo, loading, response, darkMode };
};

export default connect(
    mapDispatchToProps,
    {
        getWallets,
        getLimitInfo,
        postLimitInfo
    }
)(LimitsControl);
