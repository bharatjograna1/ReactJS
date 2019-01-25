import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { Row, Col, Card, Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import EditProfileWdgt from "./EditProfileWdgt";
import UserProfileBasicInfoBlk from "./UserProfileBasicInfoBlk";
import WithdrawLimitLevelBlk from "./WithdrawLimitLevelBlk";
import VerifyDocumentTypeWdgt from "./VerifyDocumentTypeWdgt";
import PersonalVerificationFormWdgt from "./PersonalVerificationFormWdgt";
import EnterpriseVerificationFormWdgt from "./EnterpriseVerificationFormWdgt";
import MembershipLevelsCompWdgt from "./MembershipLevelsCompWdgt";

// intl messages
import IntlMessages from "Util/IntlMessages";

// Used For Set Conditional Base Classes
import classnames from "classnames";

// jbs collapsible card
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";


class ProfileWdgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ViewComponent: "View1"
    };
    this.onCancel = this.onCancel.bind(this);
  }

  changeComponentView(newName) {
    this.setState({
      ViewComponent: newName
    });
  }
  onCancel() {
    this.setState({
      ViewComponent: "View1"
    });
  }
  render() {
    var GetViewMembershipLevel;
    var GetView;
    var BackBtn;

    if (this.state.ViewComponent === "View1") {
      GetView = (
        <div className="row mx-auto">
            <div className="col-md-6">
              <JbsCollapsibleCard
                colClasses={classnames({ commonwalletjbscard_darkmode: this.props.darkMode })}>
                <UserProfileBasicInfoBlk {...this.props} />
              </JbsCollapsibleCard>
            </div>
            <div className="col-md-6">
              <JbsCollapsibleCard
                colClasses={classnames({ commonwalletjbscard_darkmode: this.props.darkMode })}>
                <WithdrawLimitLevelBlk {...this.props}
                  changeComponentView={this.changeComponentView.bind(this)} />
              </JbsCollapsibleCard>
            </div>
        </div>
      );
    }
    if (this.state.ViewComponent === "View2") {
      GetView = (
        <VerifyDocumentTypeWdgt {...this.props}
          changeComponentView={this.changeComponentView.bind(this)}
        />
      );
    }
    if (this.state.ViewComponent === "View3") {
      GetView = (
        <PersonalVerificationFormWdgt {...this.props}
          changeComponentView={this.changeComponentView.bind(this)}
        />
      );
    }
    if (this.state.ViewComponent === "View4") {
      GetView = (
        <EnterpriseVerificationFormWdgt {...this.props}
          changeComponentView={this.changeComponentView.bind(this)}
        />
      );
    }
    if (this.state.ViewComponent === "View5") {
      GetView = ("");
      GetViewMembershipLevel = (
        <MembershipLevelsCompWdgt {...this.props}
          changeComponentView={this.changeComponentView.bind(this)}
        />
      );
    }
    if (this.state.ViewComponent !== "View1") {
      BackBtn = (
        <Button
          onClick={this.onCancel}
          className="btn btn-danger text-white text-center mt-10"
        >
          <IntlMessages id="button.back" />
        </Button>
      );
    }

    return (
      <div>
        {GetView === "" ?
          <div>
            <div className="tabformtitle">
              <span>Personal Information</span>
              <p>
                Manage your personal details, contact information, language,
                country and timezone settings.
            </p>
            </div>

            <div className="ml-10 user-account-body">
              <div className="col-md-1 offset-md-11 mb-10">{BackBtn}</div>
              <div className="card p-15 mb-5">{GetViewMembershipLevel}</div>
            </div>
          </div>
          :

          <div>
            <Tabs defaultTab="PersonalInformation" onChange={tabId => { }}>
              <Row>
                <Col md={3} className="pr-0 ">
                  <div className="innertabpanel ">
                    <TabList className="myaccountinnerTab">
                      <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ' : 'innertabmenu'} tabFor="PersonalInformation">
                        <IntlMessages id="myAccount.Dashboard.myProfileInfo.profileWdgt.personalInformation" />
                      </Tab>
                      <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ' : 'innertabmenu'} tabFor="UpdateProfile">
                        <IntlMessages id="myAccount.Dashboard.myProfileInfo.profileWdgt.updateProfile" />
                      </Tab>
                      {/* <Tab  className={this.props.darkMode ? 'innertabmenu-darkmode ':'innertabmenu'} tabFor="EmailAddress">
                    Email Address
                  </Tab> */}
                      {/* <Tab  className={this.props.darkMode ? 'innertabmenu-darkmode ':'innertabmenu'} tabFor="PhoneNumbers">
                    Phone Numbers
                  </Tab> */}
                    </TabList>
                  </div>
                </Col>
                <Col md={9} className="pl-0">
                  <TabPanel tabId="PersonalInformation" >
                    <div className="tabformtitle">
                      <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.profileWdgt.personalInformation" /></span>
                      <p>
                        <IntlMessages id="myAccount.Dashboard.myProfileInfo.profileWdgt.personalInformation.description" />
                      </p>
                    </div>

                    <div className="ml-10 user-account-body">
                      <div className="col-md-1 offset-md-11 mb-10">{BackBtn}</div>
                      <div className="p-15  mb-5">{GetView}</div>
                    </div>
                  </TabPanel>
                  <TabPanel tabId="UpdateProfile">
                    <div className="tabformtitle">
                      <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.profileWdgt.updateProfile" /></span>
                      <p>
                        <IntlMessages id="myAccount.Dashboard.myProfileInfo.profileWdgt.personalInformation.description" />
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-sm-12">
                            <EditProfileWdgt {...this.props} />
                      </div>
                    </div>
                  </TabPanel>
                  {/* <TabPanel tabId="EmailAddress">
                <div className="tabformtitle">
                  <span>My Email Address</span>
                  <p>
                    Update your email preferences of primary/secondary
                    addresses. If you forget your password, we'll send reset
                    instructions to your email.
                  </p>
                </div>

                <Col sm={{ size: 3, offset: 9 }}>
                  <Link
                    to=""
                    className="btn btn-danger text-white text-center mb-20"
                  >
                    Add Email
                  </Link>
                </Col>
                <Col md={{ size: 8, offset: 1 }}>
                  <Form>
                    <FormGroup>
                      <label>Primary Email</label>
                      <Input
                        type="email"
                        name="Email"
                        id="Email"
                        placeholder="Email"
                      />
                    </FormGroup>
                    <Button
                      className="btn-primary text-white text-bold btn-block w-100"
                      variant="raised"
                      size="large"
                    >
                      Edit
                    </Button>
                  </Form>
                </Col>
              </TabPanel> */}
                  {/* <TabPanel tabId="PhoneNumbers">
                <div className="tabformtitle">
                  <span>My Phone Numbers</span>
                  <p>
                    Recovery phone numbers help you regain access to your
                    account in case you forget your password. The primary number
                    can be used to log into
                  </p>
                </div>
                <Col sm={{ size: 3, offset: 9 }}>
                  <Link
                    to=""
                    className="btn btn-danger text-white text-center mb-20"
                  >
                    Add Phone
                  </Link>
                </Col>
                <Col md={{ size: 10, offset: 1 }}>
                  <div className="myprofilenumber">
                    <span>Primary Number</span>
                    <p>9876543210</p>
                  </div>
                  <div className="myprofilenumber">
                    <span>Recovery Phone Number</span>
                    <p>(+91) 9876543210</p>
                  </div>
                </Col>
              </TabPanel> */}
                </Col>
              </Row>
            </Tabs>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { darkMode } = settings;
  return { darkMode };
}

export default connect(mapStateToProps)(ProfileWdgt);