/* 
    Developer : Kevin Ladani
    Date : 13-12-2018
    UpdatedBy : Salim Deraiya 26-12-2018
    File Comment : Leader Profile Configuration Component
*/
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import { Form, Input, Label, Alert, Button } from "reactstrap";
import FormGroup from "@material-ui/core/FormGroup";
import LinearProgress from '@material-ui/core/LinearProgress';
//Import addFollower Config Action...
import { getLeaderConfig, editLeaderConfig } from "Actions/SocialProfile";
import { 
    getDeviceInfo,
    getIPAddress,
    getHostName,
    getMode
} from "Helpers/helpers";
const validateLeaderProfileConfigForm = require("../../validation/SocialProfile/leader_profile_configuration");

class LeaderProfileConfigWdgt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                ProfileId: '',
                Default_Visibility_of_Profile: '',
                Max_Number_Followers_can_Follow: '',
                // Min_Balance_Require_in_Follower_Account_to_Follow: ''
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
        const { errors, isValid } = validateLeaderProfileConfigForm(this.state.data);
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
                self.props.getLeaderConfig(reqObj);
            });
        }
    }
    
    render() {
        const { err_alert, err_msg, success_msg, success_alert, errors, showForm, loading } = this.state;
        // const { Default_Visibility_of_Profile, Max_Number_Followers_can_Follow, Min_Balance_Require_in_Follower_Account_to_Follow } = this.state.data;
        const { Default_Visibility_of_Profile, Max_Number_Followers_can_Follow } = this.state.data;
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
                                <Label for="Default_Visibility_of_Profile" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.profileVisibility" /></Label>
                                <div className="col-md-7">
                                    <Input type="select" name="Default_Visibility_of_Profile" value={Default_Visibility_of_Profile} id="Default_Visibility_of_Profile" onChange={this.handleChange}>
                                        <IntlMessages id="sidebar.pleaseSelect">{(selectOption) => <option value="">{selectOption}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.public">{(Public) => <option value="1">{Public}</option>}</IntlMessages>
                                        <IntlMessages id="sidebar.private">{(Private) => <option value="2">{Private}</option>}</IntlMessages>
                                    </Input>
                                    {errors.Default_Visibility_of_Profile && (<span className="text-danger text-left"><IntlMessages id={errors.Default_Visibility_of_Profile} /></span>)}
                                </div>
                            </FormGroup>
                            <FormGroup row className="mb-20">
                                <Label for="Max_Number_Followers_can_Follow" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.maximumFollowersAllow" /></Label>
                                <div className="col-md-7">
                                    <IntlMessages id="socialProfile.enterMaxFollowersAllow">
                                        {(placeholder) =>
                                            <Input type="text" name="Max_Number_Followers_can_Follow" value={Max_Number_Followers_can_Follow} placeholder={placeholder} id="Max_Number_Followers_can_Follow" onChange={this.handleChange} />
                                        }
                                    </IntlMessages>
                                    {errors.Max_Number_Followers_can_Follow && (<span className="text-danger text-left"><IntlMessages id={errors.Max_Number_Followers_can_Follow} /></span>)}
                                </div>
                            </FormGroup>
                            {/* <FormGroup row className="mb-20">
                                <Label for="Min_Balance_Require_in_Follower_Account_to_Follow" className="control-label col-md-5 text-right" ><IntlMessages id="socialProfile.minBalanceRequireToAllow" /></Label>
                                <div className="col-md-7">
                                    <IntlMessages id="socialProfile.enterMinBalanceRequireToAllow">
                                        {(placeholder) =>
                                            <Input type="text" name="Min_Balance_Require_in_Follower_Account_to_Follow" value={Min_Balance_Require_in_Follower_Account_to_Follow} placeholder={placeholder} id="Min_Balance_Require_in_Follower_Account_to_Follow" onChange={this.handleChange} />
                                        }
                                    </IntlMessages>
                                    {errors.Min_Balance_Require_in_Follower_Account_to_Follow && (<span className="text-danger text-left"><IntlMessages id={errors.Min_Balance_Require_in_Follower_Account_to_Follow} /></span>)}
                                </div>
                            </FormGroup> */}
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
        data : socialProfileRdcer.leaderData,
        loading : socialProfileRdcer.loading
    }
    return response;
};

export default withRouter(connect(mapStateToProps, {
    getLeaderConfig,
    editLeaderConfig
})(LeaderProfileConfigWdgt));