/**
 * Auther : Salim Deraiya
 * Created : 10/10/2018
 * Normal Registration
 */

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { Form, FormGroup, Input, Alert } from "reactstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
import $ from "jquery";
// redux action
import { 
    normalRegister,
    resendConfirmationLink
} from "Actions/MyAccount";

// intl messages
import IntlMessages from "Util/IntlMessages";
import PhoneInput, { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { 
    getDeviceInfo,
    getIPAddress,
    getHostName,    
    getMobileNoWithCountryCode
} from "Helpers/helpers";

// import Auth from '../../Auth/Auth';
// const auth = new Auth();
import AppConfig from 'Constants/AppConfig';

const validateNrmlRegister = require('../../validation/MyAccount/normal_register');

class NormalRegistrationWdgt extends Component {
    constructor() {
        super();
        this.state = {
            data : {
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmpassword: '',
                mobile: '',
                referalid: '',
                deviceId: getDeviceInfo(),
                mode: 'Web',
                ipAddress: '', //getIPAddress(),
                hostName: getHostName()
            },
            tem_mobile : '',
            CountryCode : AppConfig.defaultCountryCode,
            err_msg: '',
            err_alert: true,
            success_msg: '',
            success_alert: true,
            loading : false,
            confirm_link : false,
            errors: {}
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading : nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });

        if(nextProps.data.ErrorCode === 4036) {
            this.resendConfirmEmail(this.state.data);
            this.setState({ confirm_link : true });
        } else if (nextProps.data.ReturnCode === 1) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
		} else if (nextProps.data.ReturnCode === 0) {
            this.setState({ success_msg:nextProps.data.ReturnMsg, success_alert: true, confirm_link: true });
            //this.clearData();
            /* setTimeout(function() {
                this.props.history.push('/signin');
            }.bind(this), 5000); */
        }
    }

    onDismiss() {
        this.setState({ err_alert: false, success_alert : false });
    }

    onCountryChange(mobile) {
        var countryCode = $('#countryCode select').val();
        this.setState({ CountryCode : countryCode });
        if(typeof mobile !== 'undefined'){
            this.setState({ tem_mobile : mobile });
        }
    }

    onChange(event) {
        let newObj = Object.assign({}, this.state.data);
        newObj[event.target.name] = event.target.value;
        this.setState({ data : newObj });
    }

    clearData() {
        let clearData = Object.assign({}, this.state.data);
        clearData = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            mobile: '',
            referalid: '',
            deviceId: '',
            mode: '',
            ipAddress: '',
            hostName: ''
        }
        this.setState({ data : clearData });
    }

    resendConfirmEmail(data) {
        let cnfmObj = {
            email: data.email,
            deviceId: data.deviceId,
            mode: data.mode,
            // ipAddress: getIPAddress(),
            hostName: data.hostName
        }

        let self = this;
        getIPAddress().then(function (ipAddress) {
            cnfmObj.ipAddress = ipAddress;
            self.props.resendConfirmationLink(cnfmObj);
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.state.data.mobile = this.state.tem_mobile+'';
        this.state.data.CountryCode = this.state.CountryCode;
        const { errors, isValid } = validateNrmlRegister(this.state.data);
        this.setState({ err_alert: false, errors: errors });

        if (isValid) {
            var mObj = getMobileNoWithCountryCode(this.state.tem_mobile);
            
            let signupObj = Object.assign({},this.state.data);
            signupObj['mobile'] = mObj.mobile;
            // signupObj['ipAddress'] = getIPAddress();

            //Delete Extra Signup Object..
            delete signupObj["confirmpassword"];
            delete signupObj["referalid"];
            
            
            let self = this;
            getIPAddress().then(function (ipAddress) {
                signupObj['ipAddress'] = ipAddress;
                self.props.normalRegister(signupObj);
            });
        }
    }

    render() {
        const { username, firstname, lastname, mobile, email, password, confirmpassword, referalid } = this.state.data;
        const { tem_mobile, confirm_link, err_alert, err_msg, success_msg, success_alert, loading, errors, CountryCode } = this.state;
        return (
            <Fragment>
                {loading && <div><LinearProgress color="secondary" /></div>}
                {success_msg && <div className="alert_area">
                    <Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
                </div>}
                {err_msg && <div className="alert_area">
                    <Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
                </div>}
                {
                    confirm_link
                    ?
                    <div className="text-left my-15">
                        <h2><IntlMessages id="my_account.confTitle" /></h2>
                        <h4><IntlMessages id="my_account.confHey" /> {firstname+' '+lastname}</h4>
                        <p><IntlMessages id="my_account.confTitle" /> {email} <IntlMessages id="my_account.confMsg2" /></p>
                        <div className="clearfix">
                            <Button className="btn-info text-white" variant="raised" size="large" onClick={() => this.resendConfirmEmail(this.state.data)}><IntlMessages id="sidebar.btnResendConfirmEmail" /></Button>
                            <a className="btn-danger btn text-white float-right" href="/"><IntlMessages id="sidebar.btnBackToLogin" /></a>
                        </div>
                    </div>
                    :
                    <Form>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <IntlMessages id="myaccount.enterFirstName">
                                        { (placeholder) =>
                                            <Input type="text" value={firstname} name="firstname" id="firstname" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                        }
                                    </IntlMessages>
                                    {/* <Input type="text" value={firstname} name="firstname" id="firstname" className="has-input input-lg" placeholder="Enter First Name" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-user" /></span>
                                    {errors.firstname && <div className="text-danger text-left"><IntlMessages id={errors.firstname} /></div>}
                                </FormGroup>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <IntlMessages id="myaccount.enterLastName">
                                        { (placeholder) =>
                                            <Input type="text" value={lastname} name="lastname" id="lastname" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                        }
                                    </IntlMessages>
                                    {/* <Input type="text" value={lastname} name="lastname" id="lastname" className="has-input input-lg" placeholder="Enter Last Name" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-user" /></span>
                                    {errors.lastname && <div className="text-danger text-left"><IntlMessages id={errors.lastname} /></div>}
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <IntlMessages id="myaccount.enterUsername">
                                        { (placeholder) =>
                                            <Input type="text" value={username} name="username" id="username" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                        }
                                    </IntlMessages>
                                    {/* <Input type="text" value={username} name="username" id="username" className="has-input input-lg" placeholder="Enter Username" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-user" /></span>
                                    {errors.username && <div className="text-danger text-left"><IntlMessages id={errors.username} /></div>}
                                </FormGroup>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <IntlMessages id="myaccount.enterReferral">
                                        { (placeholder) =>
                                            <Input type="text" value={referalid} name="referalid" id="referalid" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                        }
                                    </IntlMessages>
                                    {/* <Input type="text" value={referalid} name="referalid" id="referalid" className="has-input input-lg" placeholder="Referral ID (Optional)" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-bookmark-alt" /></span>
                                    {errors.referalid && <div className="text-danger text-left"><IntlMessages id={errors.referalid} /></div>}
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <IntlMessages id="myaccount.enterEmailAdd">
                                        { (placeholder) =>
                                            <Input type="email" value={email} name="email" id="email" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                        }
                                    </IntlMessages>
                                    {/* <Input type="email" value={email} name="email" id="email" className="has-input input-lg" placeholder="Enter Email Address" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-email" /></span>
                                    {errors.email && <div className="text-danger text-left"><IntlMessages id={errors.email} /></div>}
                                </FormGroup>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper" id="countryCode">
                                    <IntlMessages id="myaccount.enterMobileNo">
                                        { (placeholder) =>
                                            // <Input type="text" value={mobile} name="mobile" id="mobile" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                            <PhoneInput className="has-input input-lg" name="tem_mobile" id="tem_mobile" country={CountryCode} limitMaxLength={true} international={false} placeholder={placeholder} value={ tem_mobile } onChange={(e) => this.onCountryChange(e)}  />
                                        }
                                    </IntlMessages>
                                    {/* <div>Is valid: { tem_mobile && isValidPhoneNumber(tem_mobile) ? 'true' : 'false' }</div>
                                    <div>National: { tem_mobile && formatPhoneNumber(tem_mobile, 'National') }</div>
                                    <div>International: { tem_mobile && formatPhoneNumber(tem_mobile, 'International') }</div> */}
                                    {/* <Input type="text" value={mobile} name="mobile" id="mobile" className="has-input input-lg" placeholder="Enter Mobile No" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-mobile" /></span>
                                    {errors.mobile && <div className="text-danger text-left"><IntlMessages id={errors.mobile} /></div>}
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <IntlMessages id="myaccount.enterPassword">
                                        { (placeholder) =>
                                            <Input type="password" value={password} name="password" id="password" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                        }
                                    </IntlMessages>
                                    {/* <Input type="password" value={password} name="password" id="password" className="has-input input-lg" placeholder="Enter Password" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-lock" /></span>
                                    {errors.password && <div className="text-danger text-left"><IntlMessages id={errors.password} /></div>}
                                </FormGroup>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <FormGroup className="has-wrapper">
                                    <IntlMessages id="myaccount.enterConfirmPassword">
                                        { (placeholder) =>
                                            <Input type="password" value={confirmpassword} name="confirmpassword" id="confirmpassword" className="has-input input-lg" placeholder={placeholder} onChange={this.onChange} />
                                        }
                                    </IntlMessages>
                                    {/* <Input type="password" value={confirmpassword} name="confirmpassword" id="confirmpassword" className="has-input input-lg" placeholder="Enter Confirm Password" onChange={this.onChange} /> */}
                                    <span className="has-icon"><i className="ti-lock" /></span>
                                    {errors.confirmpassword && <div className="text-danger text-left"><IntlMessages id={errors.confirmpassword} /></div>}
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup className="mb-15 text-center">
                            <Button disabled={loading} type="submit" className="btn-info text-white" variant="raised" size="large" onClick={this.onSubmit}><IntlMessages id="sidebar.btnRegister" /></Button>
                            {/* <Button className="btn-info text-white btn-block w-100" variant="raised" size="large" onClick={this.onSubmit}><IntlMessages id="sidebar.btnRegister" /></Button> */}
                        </FormGroup>
                    </Form>
                }
            </Fragment>
        );
    }
}

// map state to props
const mapStateToProps = ({ nrlRegRdcer }) => {
    var response = {
        data: nrlRegRdcer.data,
        loading: nrlRegRdcer.loading,
        confirm_link : nrlRegRdcer.confirm_link
    };
    return response;
};

export default withRouter(connect(mapStateToProps, {
    normalRegister,
    resendConfirmationLink
})(NormalRegistrationWdgt));
