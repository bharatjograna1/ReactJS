/* 
    Developer : Kevin Ladani
    Date : 13-12-2018
    File Comment : Follower Profile Configuration Component
*/
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import { Form, Input, Label, Alert, Button } from "reactstrap";
import FormGroup from "@material-ui/core/FormGroup";
import LinearProgress from '@material-ui/core/LinearProgress';
//Import addFollower Config Action...
import { getFollowerConfig, editFollowerConfig } from "Actions/SocialProfile";
import { 
    getDeviceInfo,
    getIPAddress,
    getHostName,
    getMode
} from "Helpers/helpers";
const validateFollowerProfileConfigForm = require("../../validation/SocialProfile/follower_profile_configuration");

class FollowerProfileConfigWdgt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Can_Copy_Trade: "",
				Can_Mirror_Trade: "",
				Enable_Auto_Copy_Trade_Functionality: "",
				Default_Copy_Trade_Percentage: "",
				Maximum_Copy_Trade_Percentage: "",
				Maximum_Transaction_Amount_Limit: "",
				Maximum_Number_of_Transactions_Limit: ""
            },
            loading : false,
            showForm : true,
            err_msg: '',
            err_alert: true,
            success_msg: '',
            success_alert: true,
            disablePlan : false,
            errors: {}
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDismiss() {
        this.setState({ err_alert: false, success_alert : false });
    }

    componentWillMount() {
        var leaderConfig = this.props.history.location.state;
        if(leaderConfig.profileId > 0) {
            var newObj = Object.assign({},this.state.data);
            newObj.ProfileId = leaderConfig.profileId;
            this.setState({ data : newObj });
        } else {
            this.setState({ showForm : false, err_msg: <IntlMessages id="apiErrCode.0" />, err_alert: false });
            setTimeout(() => {
                this.props.history.push('/app/social-profile');
            },5000);
        }
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('NextProps :',nextProps);
        this.setState({ loading : nextProps.loading, err_msg: '', err_alert: false, success_msg: '', success_alert: false });       

        if (nextProps.data.ReturnCode === 1 || nextProps.data.ReturnCode === 9) {
			var errMsg = nextProps.data.ErrorCode === 1 ? nextProps.data.ReturnMsg : <IntlMessages id={`apiErrCode.${nextProps.data.ErrorCode}`} />;
			this.setState({ err_alert: true, err_msg: errMsg });
		} else if (nextProps.data.ReturnCode === 0) {
            this.setState({ success_alert: true, success_msg: nextProps.data.ReturnMsg });
        }
    }

    handleChange(event) {
        let newObj = Object.assign({}, this.state.data);
        newObj[event.target.name] = event.target.value;
        this.setState({ data: newObj });
    }

    onSubmit(event) {
        event.preventDefault();
        const { errors, isValid } = validateFollowerProfileConfigForm(this.state.data);
        this.setState({ err_alert: false, errors: errors });

        if (isValid) {
            var reqObj = Object.assign({},this.state.data);
            reqObj.DeviceId = getDeviceInfo();
            reqObj.Mode = getMode();
            // reqObj.IPAddress = getIPAddress();
            reqObj.HostName = getHostName();

            let self = this;
            getIPAddress().then(function (ipAddress) {
                reqObj.IPAddress = ipAddress;
                self.props.getFollowerConfig(reqObj);
            });
        }
    }
    
    render() {
        const { err_alert, err_msg, success_msg, success_alert, errors, showForm, loading } = this.state;
        const { Can_Copy_Trade, Can_Mirror_Trade, Enable_Auto_Copy_Trade_Functionality, Default_Copy_Trade_Percentage, Maximum_Copy_Trade_Percentage, Maximum_Transaction_Amount_Limit, Maximum_Number_of_Transactions_Limit } = this.state.data;
        return (
            <div className="jbs-page-content">
                <div className="jbs-page-content col-md-12 mx-auto">
                    {loading && <div><LinearProgress color="secondary" /></div>}
                    {success_msg && <div className="alert_area">
                        <Alert color="success" isOpen={success_alert} toggle={this.onDismiss}>{success_msg}</Alert>
                    </div>}
                    {err_msg && <div className="alert_area">
                        <Alert color="danger" isOpen={err_alert} toggle={this.onDismiss}>{err_msg}</Alert>
                    </div>}
                    <Fragment>
                    {
                        showForm && 
                        <Form>
                            <FormGroup row className="mb-20">
                                <Label for="Can_Copy_Trade" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.canCopyTrade" /></Label>
                                <div className="col-md-7">
                                    <Input type="select" name="Can_Copy_Trade" value={Can_Copy_Trade} id="Can_Copy_Trade" onChange={this.handleChange}>
                                        <IntlMessages id="sidebar.pleaseSelect">{(selectOption) => <option value="">{selectOption}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.yes">{(yes) => <option value="1">{yes}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.no1">{(no) => <option value="2">{no}</option>}</IntlMessages>
                                    </Input>
                                    {errors.Can_Copy_Trade && (<span className="text-danger text-left"><IntlMessages id={errors.Can_Copy_Trade} /></span>)}
                                </div>
                            </FormGroup>
                            <FormGroup row className="mb-20">
                                <Label for="Can_Mirror_Trade" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.canMirrorTrade" /></Label>
                                <div className="col-md-7">
                                    <Input type="select" name="Can_Mirror_Trade" value={Can_Mirror_Trade} id="Can_Mirror_Trade" onChange={this.handleChange}>
                                        <IntlMessages id="sidebar.pleaseSelect">{(selectOption) => <option value="">{selectOption}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.yes">{(yes) => <option value="1">{yes}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.no1">{(no) => <option value="2">{no}</option>}</IntlMessages>
                                    </Input>
                                    {errors.Can_Mirror_Trade && (<span className="text-danger text-left"><IntlMessages id={errors.Can_Mirror_Trade} /></span>)}
                                </div>
                            </FormGroup>
                            <FormGroup row className="mb-20">
                                <Label for="Enable_Auto_Copy_Trade_Functionality" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.autoCopyTrade" /></Label>
                                <div className="col-md-7">
                                    <Input type="select" name="Enable_Auto_Copy_Trade_Functionality" value={Enable_Auto_Copy_Trade_Functionality} id="Enable_Auto_Copy_Trade_Functionality" onChange={this.handleChange}>
                                        <IntlMessages id="sidebar.pleaseSelect">{(selectOption) => <option value="">{selectOption}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.yes">{(yes) => <option value="1">{yes}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.no1">{(no) => <option value="2">{no}</option>}</IntlMessages>
                                    </Input>
                                    {errors.Enable_Auto_Copy_Trade_Functionality && (<span className="text-danger text-left"><IntlMessages id={errors.Enable_Auto_Copy_Trade_Functionality} /></span>)}
                                </div>
                            </FormGroup>
                            <FormGroup row className="mb-20">
                                <Label for="Default_Copy_Trade_Percentage" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.defaultCopyTradePercentage" /></Label>
                                <div className="col-md-7">
                                    <IntlMessages id="socialProfile.enterDefaultCopyTradePercentage">
                                        {(placeholder) =>
                                            <Input type="text" name="Default_Copy_Trade_Percentage" value={Default_Copy_Trade_Percentage} placeholder={placeholder} id="Default_Copy_Trade_Percentage" onChange={this.handleChange} />
                                        }
                                    </IntlMessages>
                                    {errors.Default_Copy_Trade_Percentage && (<span className="text-danger text-left"><IntlMessages id={errors.Default_Copy_Trade_Percentage} /></span>)}
                                </div>
                            </FormGroup>
                            <FormGroup row className="mb-20">
                                <Label for="Maximum_Copy_Trade_Percentage" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.maxCopyTrade" /></Label>
                                <div className="col-md-7">
                                    <IntlMessages id="socialProfile.enterMaxCopyTrade">
                                        {(placeholder) =>
                                            <Input type="text" name="Maximum_Copy_Trade_Percentage" value={Maximum_Copy_Trade_Percentage} placeholder={placeholder} id="Maximum_Copy_Trade_Percentage" onChange={this.handleChange} />
                                        }
                                    </IntlMessages>
                                    {errors.Maximum_Copy_Trade_Percentage && (<span className="text-danger text-left"><IntlMessages id={errors.Maximum_Copy_Trade_Percentage} /></span>)}
                                </div>
                            </FormGroup>
                            <FormGroup row className="mb-20">
                                <Label for="Maximum_Transaction_Amount_Limit" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.maxTransactionLimit" /></Label>
                                <div className="col-md-7">
                                    <IntlMessages id="socialProfile.entermaxTransactionAmount">
                                        {(placeholder) =>
                                            <Input type="text" name="Maximum_Transaction_Amount_Limit" value={Maximum_Transaction_Amount_Limit} placeholder={placeholder} id="Maximum_Transaction_Amount_Limit" onChange={this.handleChange} />
                                        }
                                    </IntlMessages>
                                    {errors.Maximum_Transaction_Amount_Limit && (<span className="text-danger text-left"><IntlMessages id={errors.Maximum_Transaction_Amount_Limit} /></span>)}
                                </div>
                            </FormGroup>
                            <FormGroup row className="mb-20">
                                <Label for="Maximum_Number_of_Transactions_Limit" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.maxTransactionAmount" /></Label>
                                <div className="col-md-7">
                                    <IntlMessages id="socialProfile.enterMaxTransactionLimit">
                                        {(placeholder) =>
                                            <Input type="text" name="Maximum_Number_of_Transactions_Limit" value={Maximum_Number_of_Transactions_Limit} placeholder={placeholder} id="Maximum_Number_of_Transactions_Limit" onChange={this.handleChange} />
                                        }
                                    </IntlMessages>
                                    {errors.Maximum_Number_of_Transactions_Limit && (<span className="text-danger text-left"><IntlMessages id={errors.Maximum_Number_of_Transactions_Limit} /></span>)}
                                </div>
                            </FormGroup>

                            <FormGroup row className="mb-20">
                                <Label className="col-md-5" />
                                <div className="col-md-2">
                                    <Button variant="raised" className="btn-primary text-white" onClick={this.onSubmit}><IntlMessages id="button.save" /></Button>
                                </div>
                                <div className="col-md-2">
                                    <Link to="/app/social-profile" variant="raised" className="btn btn-danger text-white"><IntlMessages id="button.cancel" /></Link>
                                </div>
                            </FormGroup>
                        </Form>
                    }
                    </Fragment>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ socialProfileRdcer }) => {
    const response = {
        data: socialProfileRdcer.followerData,
        loading: socialProfileRdcer.loading
    }
    return response;
};

export default withRouter(connect(mapStateToProps, {
    getFollowerConfig,
    editFollowerConfig
})(FollowerProfileConfigWdgt));