import React from "react";
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import IntlMessages from "Util/IntlMessages";
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";
import JbsSectionLoader from "Components/JbsSectionLoader/JbsSectionLoader";
import Slide from "@material-ui/core/Slide";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { changeDateFormat } from "Helpers/helpers";
import Select from "react-select";
import AppConfig from 'Constants/AppConfig';
// actions for token staking
import {
    getWalletTypeList,
    getSlabList,
    getPreConfirmationDetails,
    postStackRequest
} from "Actions/TokenStaking";
import {
    getWallets,
} from "Actions/Withdraw";
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
// add validation
const validateStakingRequest = require("../../validation/TokenStaking/TokenStaking");
const initState = {
    getQuoteEnable: false,
    isEditable: true,
    StatkingTypeID: "1",
    CurrencyTypeID: "",
    CurrencyTypeName: null,
    PolicyDetailID: "",
    amount: "",
    totalValue: 0,
    selectedType: "Freeze",
    selectedSlab: "",
    errors: {},
    EnableAutoUnstaking: 0,
    AccWalletID: "",
};
// class For Display token staking component
class TokenStaking extends React.Component {
    state = initState;

    componentWillMount() {
        this.props.getWalletTypeList();
    }

    componentWillReceiveProps(nextProps) {
        //if plan not exist
        if (nextProps.planResponse.hasOwnProperty("ReturnCode") && nextProps.planResponse.ReturnCode === 1) {
            NotificationManager.error(<IntlMessages id={`error.trading.transaction.${nextProps.planResponse.ErrorCode}`} />);
        } else if (nextProps.planResponse.hasOwnProperty("ReturnCode") && nextProps.planResponse.ReturnCode === 0) {
            this.setState({ getQuoteEnable: true });
        }
        // if submit then disable allowed changes to following fields
        if (nextProps.preConfirmationDetails.hasOwnProperty("ReturnCode") && nextProps.preConfirmationDetails.ReturnCode === 1) {
            NotificationManager.error(<IntlMessages id={`error.trading.transaction.${nextProps.preConfirmationDetails.ErrorCode}`} />);
        } else if (nextProps.preConfirmationDetails.hasOwnProperty("ReturnCode") && nextProps.preConfirmationDetails.ReturnCode === 0) {
            this.setState({ isEditable: false, getQuoteEnable: false, EnableAutoUnstaking: nextProps.preConfirmationDetails.StakingDetails.EnableAutoUnstaking });
        }
        // get confirmation response validate
        if (nextProps.stakingResponse.hasOwnProperty('ReturnCode') && nextProps.stakingResponse.ReturnCode === 1) {
            NotificationManager.error(<IntlMessages id={`apiWalletErrCode.${nextProps.stakingResponse.ErrorCode}`} />);
        } else if (nextProps.stakingResponse.hasOwnProperty('ReturnCode') && nextProps.stakingResponse.ReturnCode === 0) {
            NotificationManager.success(nextProps.preConfirmationDetails.ReturnMsg);
            this.setState(initState);
        }
    }
    // handle pre submit event...
    onSubmit(event) {
        event.preventDefault();
        const { errors, isValid } = validateStakingRequest(this.state);
        this.setState({ errors: errors });
        if (isValid) {
            this.props.getPreConfirmationDetails({
                PolicyDetailID: parseInt(this.state.PolicyDetailID),
                Amount: parseFloat(this.state.amount)
            });
        }
    }
    // handle change event...
    onChangeHanlder(e, key) {
        e.preventDefault();
        this.setState({ [key]: e.target.value });
        if (key === 'StatkingTypeID' && this.state.CurrencyTypeID != '') {
            this.setState({
                PolicyDetailID: "",
                amount: "",
            });
            this.props.getSlabList({
                StatkingTypeID: e.target.value,
                CurrencyTypeID: this.state.CurrencyTypeID
            });
        }
    }
    //on change switch
    onChangeSwitch(e) {
        e.preventDefault();
        this.setState({ EnableAutoUnstaking: this.state.EnableAutoUnstaking ? 0 : 1 });
    }
    //handle cancel button event...
    handleCancel(e) {
        e.preventDefault();
        this.setState({ isEditable: true, getQuoteEnable: false });
    }
    //handle confirmation...
    handleConfirmation(e) {
        e.preventDefault();
        this.props.postStackRequest({
            StakingPolicyDetailID: this.state.PolicyDetailID,
            AccWalletID: this.state.AccWalletID,
            InterestValue: 2,
            ChannelID: 21, // fixed
            Amount: this.state.amount,
            MaturityDate: this.props.preConfirmationDetails.MaturityDetail.MaturityDate,
            MaturityAmount: this.props.preConfirmationDetails.MaturityDetail.MaturityAmount,
            MakerCharges: this.props.preConfirmationDetails.StakingDetails.MakerCharges,
            TakerCharges: this.props.preConfirmationDetails.StakingDetails.TakerCharges,
            EnableAutoUnstaking: this.state.EnableAutoUnstaking
        });
    }
    //on change select currency...
    onChangeSelectCurrency(e) {
        this.setState({ CurrencyTypeID: e.value, CurrencyTypeName: e.name });
        if (this.state.StatkingTypeID != '') {
            this.setState({
                PolicyDetailID: "",
                amount: "",
            });
            this.props.getSlabList({
                StatkingTypeID: this.state.StatkingTypeID,
                CurrencyTypeID: e.value
            });
            this.props.getWallets({ Coin: e.name });
        }
    }
    render() {
        const { errors } = this.state;
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
            print: false,
            download: false,
            viewColumns: false,
            search: false,
            textLabels: {
                body: {
                    noMatch: <IntlMessages id="wallet.emptyTable" />,
                    toolTip: <IntlMessages id="wallet.sort" />,
                }
            }
        }
        return (
            <JbsCollapsibleCard
                colClasses="col-sm-12 col-md-12 col-xl-12"
                heading=""
                fullBlock
            >
                <div className="row">
                    <div className="col-sm-6">
                        <JbsCollapsibleCard
                            colClasses="col-sm-12 col-md-12 col-xl-12 p-30"
                            customClasses="mb-0"
                            heading={<IntlMessages id="wallet.TSChangeSettings" />}
                            fullBlock
                        >
                            <div className="col-sm-12 col-md-12 col-xl-12 pt-0 pl-20 pr-20 pb-30">
                                <div className="lazy-up">
                                    <div className=" col-sm-12 col-md-12 col-xl-12 p-0">
                                        <Form onSubmit={(e) => { e.preventDefault() }}>
                                            <FormGroup className="mb-0">
                                                <div className="col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0 mb-10">
                                                    <div className="col-sm-3 col-md-3 col-xl-3 p-0">
                                                        <h5 className="pt-10">
                                                            {<IntlMessages id="trading.holdingorder.label.currency" />}
                                                        </h5>
                                                    </div>
                                                    <div className=" col-sm-9 col-md-9 col-xl-9 pr-0">
                                                        <Select
                                                            options={this.props.walletList.map((coin, i) => ({
                                                                label: (
                                                                    <span>
                                                                        <img
                                                                            src={AppConfig.coinlistImageurl + '/' + coin.CoinName + '.png'}
                                                                            className="mr-10"
                                                                            height="25px"
                                                                            width="25px"
                                                                            alt={coin.CoinName}
                                                                        />
                                                                        {coin.CoinName}
                                                                    </span>
                                                                ),
                                                                value: coin.Id,
                                                                name: coin.CoinName,
                                                            }))}
                                                            onChange={e => this.onChangeSelectCurrency(e)}
                                                            placeholder={<IntlMessages id="wallet.searchCoin" />}
                                                        />
                                                        {errors.CurrencyTypeID && (
                                                            <span className="text-danger">
                                                                <IntlMessages id={errors.CurrencyTypeID} />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0">
                                                    <div className="col-sm-3 col-md-3 col-xl-3 p-0">
                                                        <h5 className="pt-15">
                                                            {<IntlMessages id="wallet.TSSelectType" />}
                                                        </h5>
                                                    </div>
                                                    <div className=" col-sm-9 col-md-9 col-xl-9 pr-0">
                                                        <RadioGroup
                                                            row
                                                            aria-label="type"
                                                            name="type"
                                                            value={this.state.StatkingTypeID}
                                                            onChange={e => this.onChangeHanlder(e, 'StatkingTypeID')}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                control={<Radio />}
                                                                label={<IntlMessages id="wallet.FixedDeposit" />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                control={<Radio />}
                                                                label={<IntlMessages id="wallet.Charge" />}
                                                            />
                                                        </RadioGroup>
                                                        {errors.StatkingTypeID && (
                                                            <span className="text-danger">
                                                                <IntlMessages id={errors.StatkingTypeID} />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {this.state.CurrencyTypeID != '' && this.state.StatkingTypeID != '' && <React.Fragment>
                                                    {this.props.planlist.length !== 0 && <div className="col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0 mb-20">
                                                        <div className="col-sm-3 col-md-3 col-xl-3 p-0">
                                                            <h5 className="pt-10">
                                                                {<IntlMessages id="wallet.selectPlan" />}
                                                            </h5>
                                                        </div>
                                                        <div className=" col-sm-9 col-md-9 col-xl-9 pr-0">
                                                            <Input
                                                                type="select"
                                                                name="PolicyDetailID"
                                                                id="PolicyDetailID"
                                                                onChange={e => this.onChangeHanlder(e, "PolicyDetailID")}
                                                                value={this.state.PolicyDetailID}
                                                                disabled={!this.state.isEditable}
                                                            >
                                                                <option value="">
                                                                    {<IntlMessages id="wallet.selectPlan" />}
                                                                </option>
                                                                {this.props.planlist.map((item, key) => (
                                                                    <option value={item.PolicyDetailID} key={key}>
                                                                        {item.AvailableAmount}
                                                                    </option>
                                                                ))}
                                                            </Input>
                                                            {errors.PolicyDetailID && (
                                                                <span className="text-danger">
                                                                    <IntlMessages id={errors.PolicyDetailID} />
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>}
                                                    {this.props.planlist.length !== 0 && this.props.wallets.length != 0 && <div className="col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0 mb-20 mt-5">
                                                        <div className="col-sm-3 col-md-3 col-xl-3 p-0">
                                                            <h5 className="pt-10">
                                                                {<IntlMessages id="wallet.WDSelectWallet" />}
                                                            </h5>
                                                        </div>
                                                        <div className=" col-sm-9 col-md-9 col-xl-9 pr-0">
                                                            <Input
                                                                type="select"
                                                                name="AccWalletID"
                                                                id="AccWalletID"
                                                                onChange={e => this.onChangeHanlder(e, "AccWalletID")}
                                                                value={this.state.AccWalletID}
                                                                disabled={!this.state.isEditable}
                                                            >
                                                                <option value="">
                                                                    {<IntlMessages id="wallet.WDSelectWallet" />}
                                                                </option>
                                                                {this.props.wallets.map((item, key) => (
                                                                    <option value={item.AccWalletID} key={key}> {item.WalletName} [{item.Balance.toFixed(8)}]</option>
                                                                ))}
                                                            </Input>
                                                            {errors.AccWalletID && (
                                                                <span className="text-danger">
                                                                    <IntlMessages id={errors.AccWalletID} />
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>}
                                                    {this.props.planlist.length !== 0 && <div className="col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0 mt-5">
                                                        <div className="col-sm-3 col-md-3 col-xl-3 p-0">
                                                            <h5 className="pt-10">
                                                                {<IntlMessages id="wallet.CTAmount" />}
                                                            </h5>
                                                        </div>
                                                        <div className=" col-sm-9 col-md-9 col-xl-9 pr-0">
                                                            <Input
                                                                type="text"
                                                                name="amount"
                                                                id="amount"
                                                                onChange={e => this.onChangeHanlder(e, "amount")}
                                                                value={this.state.amount}
                                                                autoComplete="off"
                                                                disabled={!this.state.isEditable}
                                                            >
                                                            </Input>
                                                            {errors.amount && (
                                                                <span className="text-danger">
                                                                    <IntlMessages id={errors.amount} />
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>}
                                                    {this.props.planlist.length !== 0 && <div className="col-sm-12 col-md-12 col-xl-12 mt-30 p-0">
                                                        <div className="d-flex justify-content-center">
                                                            <Button
                                                                type="button"
                                                                disabled={!this.state.getQuoteEnable}
                                                                variant="raised"
                                                                className="rounded-0 border-0 w-20"
                                                                color="primary"
                                                                onClick={e => this.onSubmit(e)}
                                                            >
                                                                <IntlMessages id="wallet.getQuote" />
                                                            </Button>
                                                        </div>
                                                    </div>}
                                                </React.Fragment>}
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </JbsCollapsibleCard>
                    </div>
                    <div className="col-sm-6">
                        <div className="d-block p-30">
                            {this.props.preConfirmationDetails.hasOwnProperty('StakingDetails') &&
                                this.props.preConfirmationDetails.ReturnCode === 0 &&
                                <React.Fragment>
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <strong>{<IntlMessages id="wallet.stakingDetails" />}</strong>
                                        </h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.StakingType" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.StakingDetails.StakingTypeName}</h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.slab" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.StakingDetails.SlabTypeName}</h4>
                                    </div>
                                    <Divider />
                                    {this.props.preConfirmationDetails.StakingDetails.StakingType == 1 && <React.Fragment>
                                        <div className="col-sm-12 p-0 d-flex">
                                            <h4 className="w-40 p-10 m-0">
                                                <IntlMessages id="wallet.interestType" />
                                            </h4>
                                            <h4 className="p-10 m-0">{this.props.preConfirmationDetails.StakingDetails.InterestType === 1 ? <IntlMessages id="wallet.Fixed" /> : <IntlMessages id="wallet.Percentage" />}</h4>
                                        </div>
                                        <Divider />
                                        <div className="col-sm-12 p-0 d-flex">
                                            <h4 className="w-40 p-10 m-0">
                                                <IntlMessages id="wallet.interest" />
                                            </h4>
                                            <h4 className="p-10 m-0">{this.props.preConfirmationDetails.StakingDetails.InterestValue.toFixed(2)}</h4>
                                        </div>
                                        <Divider />
                                    </React.Fragment>}
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.duration" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.StakingDetails.DurationMonth} <IntlMessages id="wallet.Months" />, {this.props.preConfirmationDetails.StakingDetails.DurationWeek} <IntlMessages id="wallet.Weeks" /></h4>
                                    </div>
                                    <Divider />
                                    {this.props.preConfirmationDetails.StakingDetails.StakingType == 2 && <React.Fragment>
                                        <div className="col-sm-12 p-0 d-flex">
                                            <h4 className="w-40 p-10 m-0">
                                                <IntlMessages id="wallet.TSCurrentTradingFees" />
                                            </h4>
                                            <h4 className="p-10 m-0">
                                                <IntlMessages id="trading.placeorder.label.makers" /> : {this.props.preConfirmationDetails.StakingDetails.MakerCharges} <IntlMessages id="trading.placeorder.label.takers" /> :{" "}{this.props.preConfirmationDetails.StakingDetails.TakerCharges}
                                            </h4>
                                        </div>
                                        <Divider />
                                    </React.Fragment>}
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.EnableAutoUnstaking" />
                                        </h4>
                                        <FormControlLabel className="ml-0"
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    checked={this.state.EnableAutoUnstaking}
                                                    onChange={(e) => this.onChangeSwitch(e)}
                                                />
                                            }
                                            label={<IntlMessages id="wallet.EnableAutoUnstaking" />}
                                        />
                                    </div>
                                </React.Fragment>
                            }
                            {this.props.preConfirmationDetails.hasOwnProperty('MaturityDetail') &&
                                this.props.preConfirmationDetails.StakingDetails.StakingType == 1 &&
                                this.props.preConfirmationDetails.ReturnCode === 0 &&
                                <React.Fragment>
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <strong>{<IntlMessages id="wallet.maturityDetail" />}</strong>
                                        </h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.MaturityCurrency" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.MaturityDetail.MaturityCurrencyName}</h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.DWTableAmount" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.MaturityDetail.Amount}</h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.InterestAmount" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.MaturityDetail.InterestAmount.toFixed(2)}</h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.MaturityAmount" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.MaturityDetail.MaturityAmount.toFixed(8)}</h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            <IntlMessages id="wallet.EnableStakingBeforeMaturity" />
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.StakingDetails.EnableStakingBeforeMaturity}</h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            {<IntlMessages id="wallet.EnableStakingBeforeMaturityCharge" />}
                                        </h4>
                                        <h4 className="p-10 m-0">{this.props.preConfirmationDetails.StakingDetails.EnableStakingBeforeMaturityCharge.toFixed(8)}</h4>
                                    </div>
                                    <Divider />
                                    <div className="col-sm-12 p-0 d-flex">
                                        <h4 className="w-40 p-10 m-0">
                                            {<IntlMessages id="wallet.MaturityDate" />}
                                        </h4>
                                        <h4 className="p-10 m-0">{changeDateFormat(this.props.preConfirmationDetails.MaturityDetail.MaturityDate, 'YYYY-MM-DD HH:mm:ss')}</h4>
                                    </div>
                                </React.Fragment>
                            }
                            {this.props.preConfirmationDetails.hasOwnProperty('StakingDetails') &&
                                this.props.preConfirmationDetails.ReturnCode === 0 &&
                                <React.Fragment>
                                    <div className="col-sm-12 p-0 d-flex justify-content-center mt-10">
                                        <Button variant="raised" onClick={(e) => this.handleConfirmation(e)} className="btn-success text-white mr-10 border-0 rounded-0"><IntlMessages id="wallet.btnConfirm" /></Button>
                                        <Button variant="raised" onClick={(e) => this.handleCancel(e)} className="btn-danger text-white mr-10 border-0 rounded-0"><IntlMessages id="button.cancel" /></Button>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
                {this.props.showLoading && <JbsSectionLoader />}
            </JbsCollapsibleCard>
        );
    }
}

const mapDispatchToProps = ({ tokenStakingReducer, withdrawApp }) => {
    console.log(tokenStakingReducer);
    const { wallets } = withdrawApp;
    const { showLoading, planlist, planResponse, preConfirmationDetails, selectedSlab, walletList, stakingResponse } = tokenStakingReducer;
    return { showLoading, planlist, planResponse, preConfirmationDetails, selectedSlab, walletList, wallets, stakingResponse };
};

export default connect(mapDispatchToProps, {
    getWallets,
    getWalletTypeList,
    postStackRequest,
    getSlabList,
    getPreConfirmationDetails
})(TokenStaking);
