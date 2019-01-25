/* 
    Developer : Nishant Vadgama
    Date : 17-09-2018
    File Comment : Withdraw to address model component
*/
import React, { Component, Fragment } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { NotificationManager } from 'react-notifications';
// Import component for internationalization
import IntlMessages from 'Util/IntlMessages';

import { connect } from 'react-redux';

// Used For Set Conditional Base Classes
import classnames from "classnames";

// import component for Card Design
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';
import Select from "react-select";
import Dialog from '@material-ui/core/Dialog';
import validator from 'validator';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import JbsSectionLoader from 'Components/JbsSectionLoader/JbsSectionLoader';
import Slide from '@material-ui/core/Slide';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import AppConfig from 'Constants/AppConfig';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const BalanceWidget = ({ coin, balance, selectWallet }) => (
    <div className="social-card mb-10 mt-10 p-15" onClick={selectWallet}>
        <div className="d-flex justify-content-between text-white w-100">
            <div className="align-items-start">
                <span className="font-weight-bold">{balance}</span>
                <span className="fs-12">{coin}</span>
            </div>
            <div className="align-items-end pl-20">
                <h2><i className="zmdi zmdi-balance-wallet"></i></h2>
            </div>
        </div>
    </div>
);
const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};
const Menu = (list, selectWallet) => list.map((wallet, key) => {
    return (
        <div className="col-sm-12 w-xs-half-block" key={key}>
            <BalanceWidget
                coin={wallet.WalletName}
                balance={wallet.Balance}
                selectWallet={(e) => selectWallet(e, wallet)}
            />
        </div>
    );
});

// add validation 
const validateWithdrawRequest = require('../../validation/Withdraw/Withdraw');

export const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
export const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

// class For Display  withdraw component
class Withdraw extends Component {
    state = {
        notifiacationFlag: false,
        addressSelected: '',
        showDialog: false,
        errors: {},
        selectedCurrency: '',
        address: '',
        label: '',
        amount: '',
        // balance: 0,
        walletId: 0,
        showNoWallet: false,
        whitelistingBit: false,
        hideArrows: true,
        hideSingleArrow: true,
        twoFA: false,
        code: "",
    };

    constructor() {
        super()
        this.onChange = this.onChange.bind(this);
        this.selectWallet = this.selectWallet.bind(this);
    }

    // It will invoke when props changed
    componentWillReceiveProps(nextProps) {
        // success 2fa validattion
        if (nextProps.response2fa.hasOwnProperty("ErrorCode") && nextProps.response2fa.ErrorCode == 0) {
            const object = {
                "asset": this.state.selectedCurrency,
                "address": this.state.address,
                "DebitWalletID": this.state.walletId,
                "WhitelistingBit": (this.state.whitelistingBit) ? 1 : 0,
                "AddressLabel": this.state.label,
                "TrnMode": 21, // 31 for APP
                "Amount": this.state.amount,
                "Nonce": new Date().getTime()
            }
            this.props.doWithdraw(object);
            this.handleClose();
            this.setState({ notifiacationFlag: true, code: "" });
        }

        // load first currency on page load
        if (nextProps.currencies.length && this.state.selectedCurrency === '') {
            var BreakException = {};
            try {
                nextProps.currencies.forEach((currency, index) => {
                    if (currency.IsWithdraw) {
                        let e = {
                            value: currency.SMSCode,
                            IsWithdraw: currency.IsWithdraw,
                            WebsiteUrl: currency.WebsiteUrl
                        }
                        this.onChangeSelectCurrency(e);
                        //break once set currency on load
                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
        }
        // if get success response on withdraw
        if (nextProps.response.hasOwnProperty('ReturnCode') && nextProps.response.ReturnCode == 0 && this.state.notifiacationFlag) {
            NotificationManager.success(nextProps.response.response.TrnID, nextProps.response.ReturnMsg);
            this.setState({
                errors: {},
                address: '',
                label: '',
                amount: '',
                addressSelected: '',
                notifiacationFlag: false,
                whitelistingBit: false,
            });
            //due to not updating immediate records from server put timeout
            setTimeout(function () {
                //refresh balance
                let e = {
                    value: this.state.selectedCurrency,
                    IsWithdraw: 1,
                    WebsiteUrl: this.state.WebsiteUrl
                }
                this.onChangeSelectCurrency(e);
                //refresh history
                this.props.refreshHistory();
            }.bind(this), 3000);
        } else if (nextProps.response.hasOwnProperty('ReturnCode') && nextProps.response.ReturnCode == 1 && this.state.notifiacationFlag) {
            NotificationManager.error(<IntlMessages id={`apiWalletErrCode.${nextProps.response.ErrorCode}`} />);
            this.setState({ notifiacationFlag: false });
        }
    }

    onChangeSelectCurrency(e) {
        // if (this.state.selectedCurrency !== e.value) {
        //process only if withdraw is enable
        if (e.IsWithdraw === 1) {
            this.setState({
                willGetAmount: 0.0,
                addressSelected: '',
                selectedCurrency: e.value,
                WebsiteUrl: e.WebsiteUrl,
                errors: {},
                address: '',
                label: '',
                amount: '',
                walletId: 0,
                whitelistingBit: false,
                notifiacationFlag: false,
            });
            this.props.onChangeSelectCurrency(e.value);
        } else {
            this.setState({ showNoWallet: true });
        }
        //}
    }

    onWithdraw(event) {
        event.preventDefault();
        const { errors, isValid } = validateWithdrawRequest(
            this.state,
            this.props.IsWhitelisting,
            this.props.WithdrawalDailyLimit,
            this.props.balance.AvailableBalance,
            this.props.feeAndLimit.MinAmount,
            this.props.feeAndLimit.MaxAmount,
        );
        this.setState({ errors: errors });
        if (isValid) {
            //check if whitelist is OFF
            if (!this.props.IsWhitelisting) {
                //check 2FA enable 
                if (this.props.location.state.hasOwnProperty('userData')
                    && this.props.location.state.userData.TwoFactorEnabled) {
                    this.setState({
                        twoFA: true,
                        showDialog: true
                    });
                } else {
                    //refirect to enable 2FA
                    NotificationManager.info(<IntlMessages id={`wallet.withdraw2FAWarning`} />);
                    setTimeout(function () {
                        window.location.href = '/app/my-account/my-profile-info';
                    }.bind(this), 3000);
                }
            } else {
                this.setState({
                    twoFA: false,
                    showDialog: true
                });
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    // onchange amount field
    onChangeAmount(e) {
        if (validator.isDecimal(e.target.value, { force_decimal: false, decimal_digits: '0,8' }) || e.target.value == "") {
            let amount = e.target.value;
            if (this.props.feeAndLimit.ChargeType === 1) {// fixed
                amount = amount - this.props.feeAndLimit.ChargeValue;
            } else if (this.props.feeAndLimit.ChargeType === 2) { // percentage
                let per = (amount * (this.props.feeAndLimit.ChargeValue / 100));
                amount = amount - per;
            }
            this.setState({ amount: e.target.value, willGetAmount: (amount > 0) ? amount : 0 });
        }
    }

    handleClose = () => {
        this.setState({ showDialog: false, code: "" });
    };

    handleNoWalletConfirmation(e) {
        this.setState({ showNoWallet: false });
    }

    handleConfirmation = () => {
        // check for whitelist bit
        if (this.state.twoFA) {
            if (this.state.code != "")
                this.props.verify2fa({
                    'Code': this.state.code,
                });
        } else {
            const object = {
                "asset": this.state.selectedCurrency,
                "address": this.state.address,
                "DebitWalletID": this.state.walletId,
                "WhitelistingBit": (this.state.whitelistingBit) ? 1 : 0,
                "AddressLabel": this.state.label,
                "TrnMode": 21, // 31 for APP
                "Amount": this.state.amount,
                "Nonce": new Date().getTime()
            }
            this.props.doWithdraw(object);
            this.handleClose();
            this.setState({ notifiacationFlag: true });
        }
    };

    getImage(coin) {
        try {
            return require(`Assets/icon/${coin.toLowerCase()}.png`);
        } catch (e) {
            return require(`Assets/icon/default.png`);
        }
    }

    selectWallet(e, wallet) {
        e.preventDefault();
        //if wallet has balance then procceed further else not
        if (wallet.Balance != 0) {
            this.setState({ walletId: wallet.AccWalletID });
            this.props.getBalanceById(wallet.AccWalletID);
            this.props.getFeeAndLimits({
                "TrnType": 4,
                "CoinName": this.state.selectedCurrency
            });
            // get whitelisted addres only if global configuration is ON
            if (this.props.IsWhitelisting)
                this.props.getAddressById(wallet.AccWalletID);
        } else {
            NotificationManager.error(<IntlMessages id={`trading.placeorder.error.minBalance`} />);
        }
    }

    onChangeSelectAddress(e) {
        if (e.target.value == '-1') {
            window.location.href = '/app/address-whitelist';
        } else {
            this.setState({
                addressSelected: e.target.value,
                address: this.props.addresses[e.target.value].Address,
                label: this.props.addresses[e.target.value].Name,
            })
        }
    }

    render() {
        const { hideArrows, hideSingleArrow } = this.state;
        const walletList = Menu(this.props.wallets, this.selectWallet);
        const currencies = this.props.currencies;
        const { errors } = this.state;
        return (
            <Fragment>
                <JbsCollapsibleCard
                    colClasses="col-sm-12 col-md-12 col-xl-6"
                    heading=''
                    fullBlock
                >
                    {this.props.loading && <JbsSectionLoader />}
                    <div className="d-block pt-30 pl-30 pr-30 pb-10">
                        <Form>
                            {currencies.length != 0 && <Select
                                options={currencies.map((coin, i) => ({
                                    label: (
                                        <span>
                                            <img
                                                src={AppConfig.coinlistImageurl + '/' + coin.SMSCode + '.png'}
                                                className="mr-10"
                                                height="25px"
                                                width="25px"
                                                alt={coin.SMSCode}
                                            />
                                            {coin.SMSCode}
                                        </span>
                                    ),
                                    value: coin.SMSCode,
                                    IsWithdraw: coin.IsWithdraw,
                                    WebsiteUrl: coin.WebsiteUrl
                                }))}
                                onChange={e => this.onChangeSelectCurrency(e)}
                                value={{ label: this.state.selectedCurrency }}
                            />}
                        </Form>
                        {/* {this.state.selectedCurrency && <p className="w-100 d-flex justify-content-end mt-10 mb-0">
                            <span className="">
                                <a target="_blank" href={this.state.WebsiteUrl} className="desopithyperlink-btc">
                                    {<IntlMessages id="wallet.AGWhat's" />} {this.state.selectedCurrency + "?"}
                                </a>
                            </span>
                        </p>} */}
                    </div>
                    {this.props.wallets.length !== 0 && <div>
                        <div className="d-block pt-0 pl-30 pr-30 pb-20">
                            <h4>{<IntlMessages id="wallet.WDSelectWallet" />}</h4>
                            <ScrollMenu
                                data={walletList}
                                hideArrows={hideArrows}
                                hideSingleArrow={hideSingleArrow}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                menuClass={''}
                            />
                        </div>
                        {this.props.balance.hasOwnProperty('AvailableBalance') && <div><div className="d-flex pt-10 pl-30 pr-30 pb-30">
                            <div className="col-sm-3">
                                <span className="col-sm-12">
                                    <span className="font-weight-bold text-center">{this.props.balance.ShadowBalance}</span>
                                    <span className="fs-14 badge badge-danger">{<IntlMessages id="wallet.lien" />}</span>
                                </span>
                            </div>
                            <div className="col-sm-3">
                                <span className="col-sm-12">
                                    <span className="font-weight-bold text-center">{this.props.balance.StackingBalance}</span>
                                    <span className="fs-14 badge badge-warning">{<IntlMessages id="wallet.stack" />}</span>
                                </span>
                            </div>
                            <div className="col-sm-3">
                                <span className="col-sm-12">
                                    <span className="font-weight-bold text-center">{this.props.balance.UnClearedBalance}</span>
                                    <span className="fs-14 badge badge-info">{<IntlMessages id="wallet.pending" />}</span>
                                </span>
                            </div>
                            <div className="col-sm-3">
                                <span className="col-sm-12">
                                    <span className="font-weight-bold text-center">{this.props.balance.AvailableBalance}</span>
                                    <span className="fs-14 badge badge-success">{<IntlMessages id="wallet.available" />}</span>
                                </span>
                            </div>
                        </div>
                            <JbsCollapsibleCard
                                colClasses={classnames(
                                    { commonwalletjbscard_darkmode: this.props.darkMode },
                                    "col-sm-12 col-md-12 col-xl-12 pl-30 pr-30"
                                )}
                                heading={<IntlMessages id="wallet.AGImportantTitle" />}
                                fullBlock
                            >
                                <div className="col-sm-12 col-md-12 col-xl-12 pl-20 pr-20">
                                    <div className="justify-content-between d-flex">
                                        <p className="mb-0">{<IntlMessages id="wallet.WDMinWithdraw" />} : {this.props.feeAndLimit.MinAmount} {this.state.selectedCurrency}</p>
                                        <p className="mb-0">{<IntlMessages id="wallet.WDMaxWithdraw" />} : {this.props.feeAndLimit.MaxAmount} {this.state.selectedCurrency}</p>
                                    </div>
                                    <p className="mb-0">{<IntlMessages id="wallet.WDImportantNotice" />}</p>
                                </div>
                                <div className="col-sm-12 col-md-12 col-xl-12 p-20">
                                    <div className="lazy-up demo1">
                                        <div className=" col-sm-12 col-md-12 col-xl-12 p-0">
                                            <Form>
                                                <FormGroup className="mb-5 mt-5">
                                                    <h5 className="mb-5">{this.state.selectedCurrency} {<IntlMessages id="wallet.WDWithdrawAddress" />}</h5>
                                                    {this.props.IsWhitelisting == 1 && <div>
                                                        <Input type="select" name="address" id="address"
                                                            value={this.state.addressSelected}
                                                            onChange={(e) => this.onChangeSelectAddress(e)} >
                                                            {/* <option value="" >{<IntlMessages id="wallet.errCTAddressRequired" />}</option> */}
                                                            <IntlMessages id="wallet.errCTAddressRequired">
                                                                {(optionValue) =>
                                                                    <option value="">{optionValue}</option>
                                                                }
                                                            </IntlMessages>
                                                            {this.props.addresses.length && this.props.addresses.map((address, key) =>
                                                                <option value={key} key={key}>{address.Name} - {address.Address}</option>
                                                            )}
                                                            {/* <option value="-1">{<IntlMessages id="wallet.WDUseNewAddress" />}</option> */}
                                                            <IntlMessages id="wallet.WDUseNewAddress">
                                                                {(optionValue) =>
                                                                    <option value="-1">{optionValue}</option>
                                                                }
                                                            </IntlMessages>
                                                        </Input>
                                                        {errors.address && <span className="text-danger"><IntlMessages id={errors.address} /></span>}
                                                    </div>}
                                                    {this.props.IsWhitelisting == 0 && <div>
                                                        <div className="col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0 mt-0">
                                                            <div className="col-sm-3 col-md-3 col-xl-3 p-0">
                                                                <IntlMessages id="wallet.WDInputLabel">
                                                                    {(placeholder) =>
                                                                        <Input type="text" name="label" id="label" placeholder={placeholder} autoComplete="off" maxLength="20"
                                                                            value={this.state.label}
                                                                            onChange={this.onChange}
                                                                        />
                                                                    }
                                                                </IntlMessages>
                                                            </div>
                                                            <div className=" col-sm-9 col-md-9 col-xl-9 pr-0">
                                                                <IntlMessages id="wallet.WDInputAddress">
                                                                    {(placeholder) =>
                                                                        <Input type="text" name="address" id="address" placeholder={placeholder} autoComplete="off" maxLength="50"
                                                                            value={this.state.address}
                                                                            onChange={this.onChange}
                                                                        />
                                                                    }
                                                                </IntlMessages>
                                                            </div>
                                                        </div>
                                                        {(errors.label || errors.address) && <div className="col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0">
                                                            <div className="col-sm-3 col-md-3 col-xl-3 p-0">
                                                                {errors.label && <span className="text-danger"><IntlMessages id={errors.label} /></span>}
                                                            </div>
                                                            <div className=" col-sm-9 col-md-9 col-xl-9 pr-0">
                                                                {errors.address && <span className="text-danger"><IntlMessages id={errors.address} /></span>}
                                                            </div>
                                                        </div>}
                                                        <div className="w-100 d-flex justify-content-end mt-5 mb-0">
                                                            <Label check>
                                                                <Input type="checkbox"
                                                                    color="primary"
                                                                    checked={this.state.whitelistingBit}
                                                                    onChange={(e) => this.setState({ whitelistingBit: !this.state.whitelistingBit })} />
                                                                <IntlMessages id={"wallet.WDWhitelistandstore"} />
                                                            </Label>
                                                        </div>
                                                    </div>}
                                                </FormGroup>
                                            </Form>
                                        </div>

                                        <Form onSubmit={(e) => { e.preventDefault() }}>
                                            <FormGroup>
                                                <Label for="Limit" className="font-weight-bold">{<IntlMessages id="wallet.WDLabelAmount" />}</Label>
                                                <Label for="" className="float-right">{<IntlMessages id="wallet.WD24Limit" />}: <span className="font-weight-bold">{this.props.WithdrawalDailyLimit} {this.state.selectedCurrency}</span></Label>
                                                <div className=" col-sm-12 col-md-12 col-xl-12 d-inline-flex p-0" >
                                                    <div className=" col-sm-10 col-md-10 col-xl-10 p-0">
                                                        <IntlMessages id="wallet.TSAvailable">
                                                            {(placeholder) =>
                                                                <Input type="text" name="amount" id="amount" placeholder={placeholder + ':' + this.props.balance.AvailableBalance} autoComplete="off"
                                                                    value={this.state.amount}
                                                                    onChange={(e) => this.onChangeAmount(e)} />
                                                            }
                                                        </IntlMessages>
                                                    </div>
                                                    <div className=" col-sm-2 col-md-2 col-xl-2 p-0">
                                                        <h1 className="w-100 p-0 m-0"><span className="badge badge-secondary w-100 h-100 badge badge-primary d-block p-10">{this.state.selectedCurrency}</span></h1>
                                                    </div>
                                                </div>
                                                {errors.amount && <span className="text-danger"><IntlMessages id={errors.amount} /></span>}
                                            </FormGroup>
                                        </Form>
                                        <Label for="">{<IntlMessages id="wallet.WDTrnFee" />}: <span className="font-weight-bold"> {this.props.feeAndLimit.ChargeValue} {(this.props.feeAndLimit.ChargeType == 2) ? "%" : ""} {this.state.selectedCurrency}</span></Label>
                                        <Label for="" className="float-right">{<IntlMessages id="wallet.WDWillGet" />}: <span className="font-weight-bold"> {this.state.willGetAmount} {this.state.selectedCurrency}</span></Label>
                                        <div className="col-sm-12 col-md-12 col-xl-12 p-0">
                                            <Button color="primary" className="rounded-0 border-0" onClick={(e) => this.onWithdraw(e)} ><IntlMessages id="button.submit" /></Button>
                                        </div>
                                    </div>
                                </div>
                            </JbsCollapsibleCard>
                        </div>}
                    </div>}
                    {this.state.selectedCurrency && <div>
                        <Divider />
                        <div className="col-sm-12 col-md-12 col-xl-12 p-30">
                            <h4>{<IntlMessages id="wallet.AGPleaseNote" />}</h4>
                            <ul type="circle" className="pl-20 mb-0">
                                <li>
                                    {<IntlMessages id="wallet.WDPleaseNoteFirst" />}
                                </li>
                                <li>
                                    <div className={this.props.darkMode ? 'desopithyperlink-darkmode' : 'desopithyperlink'}>
                                        {<IntlMessages id="wallet.WDPleaseNoteSecond1" />}<a href="/app/history/withdraw" className="desopithyperdata">{<IntlMessages id="wallet.AGPLinkHistory" />}</a>{<IntlMessages id="wallet.WDPleaseNoteSecond2" />}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>}
                    <Dialog
                        open={this.state.showDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        fullWidth={true}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        {(this.state.twoFA) ?
                            <Fragment>
                                <DialogTitle id="alert-dialog-slide-title">
                                    {<IntlMessages id="myAccount.Dashboard.2faAuthentication" />}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        {this.props.response2fa.loading && <JbsSectionLoader />}
                                        <FormGroup className="mb-0">
                                            <Label for="Code"><IntlMessages id="my_account.googleAuthCode" /></Label>
                                            <Input type="text" name="Code" id="Code" maxLength="6" autoComplete="off" value={this.state.code} onChange={(e) => (this.setState({ code: e.target.value }))} />
                                            {this.props.errors.hasOwnProperty("ErrorCode") && <span className="text-danger"><IntlMessages id={`apiErrCode.${this.props.errors.ErrorCode}`} /></span>}
                                        </FormGroup>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="raised" onClick={this.handleConfirmation} className={classnames("btn-success text-white mr-20", { "disabled": !this.state.code })} > <IntlMessages id="wallet.btnVerify" /></Button>
                                </DialogActions>
                            </Fragment>
                            :
                            <Fragment>
                                <DialogTitle id="alert-dialog-slide-title">
                                    {"Are you sure?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        <ul type="circle" className="pl-20 mb-0">
                                            <li>{<IntlMessages id="wallet.WDPleaseNoteFirst" />}</li>
                                            <li>{<IntlMessages id="wallet.WDPleaseNoteSecond1" />}<a href="#">{<IntlMessages id="wallet.AGPLinkHistory" />}</a>{<IntlMessages id="wallet.WDPleaseNoteSecond2" />}</li>
                                        </ul>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="raised" onClick={this.handleClose} className="btn-danger text-white mr-10"><IntlMessages id="button.cancel" /></Button>
                                    <Button variant="raised" onClick={this.handleConfirmation} className="btn-success text-white mr-10"><IntlMessages id="wallet.AGDialogButtonAgree" /></Button>
                                </DialogActions>
                            </Fragment>
                        }
                    </Dialog>
                    <Dialog
                        open={this.state.showNoWallet}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleNoWalletConfirmation}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            {<IntlMessages id="wallet.AGDialogTitle" />}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {<IntlMessages id="wallet.AGDialogContent" />}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="raised" onClick={(e) => this.handleNoWalletConfirmation(e)} className="btn-success text-white mr-10">{<IntlMessages id="wallet.AGDialogButtonAgree" />}</Button>
                        </DialogActions>
                    </Dialog>
                </JbsCollapsibleCard>
            </Fragment>
        )
    }
}

const mapDispatchToProps = ({ settings }) => {
    const { darkMode } = settings;
    return { darkMode };
}

export default connect(mapDispatchToProps, {
})(Withdraw);
