/**
 * Form Elemets
 */
/**
 * MyAcount Dashboard Wdgt
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
// jbs collapsible card
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";
// intl messages
import IntlMessages from "Util/IntlMessages";

export default class MyAccountDashboardWdgt extends Component {
  render() {
    var Profile = "Profile";
    var Security = "Security";
    var Authentication = "Authentication";
    var ActiveSessions = "ActiveSessions";
    var ActiveHistory = "ActiveHistory";
    var Complain = "Complain";
    return (
      <div>
        <Row>
          <Col md={3}>
            <JbsCollapsibleCard>
              <Link to={{ pathname: "/app/my-account/my-profile-info", state: { Profile } }} className="myaccountbox">
                <img className="img-fluid"
                  alt={<IntlMessages id="myAccount.Dashboard.myProfileInfo" />} src={require('Assets/img/MyAccount/IconMyProfile.png')} />
                <span><IntlMessages id="myAccount.Dashboard.myProfileInfo" /></span>
              </Link>
            </JbsCollapsibleCard>
          </Col>
          <Col md={3}>
            <JbsCollapsibleCard>
              <Link to={{ pathname: "/app/my-account/my-profile-info", state: { Security } }} className="myaccountbox">
                <img className="img-fluid"
                  alt={<IntlMessages id="myAccount.Dashboard.Security" />} src={require('Assets/img/MyAccount/IconSecurity.png')} />
                <span><IntlMessages id="myAccount.Dashboard.Security" /></span>
              </Link>
            </JbsCollapsibleCard>
          </Col>
          <Col md={3}>
            <JbsCollapsibleCard>
              <Link to={{ pathname: "/app/my-account/my-profile-info", state: { Authentication } }} className="myaccountbox">
                <img className="img-fluid"
                  alt={<IntlMessages id="myAccount.Dashboard.2faAuthentication" />} src={require('Assets/img/MyAccount/2fa.png')} />
                <span><IntlMessages id="myAccount.Dashboard.2faAuthentication" /></span>
              </Link>
            </JbsCollapsibleCard>
          </Col>
          <Col md={3}>
            <JbsCollapsibleCard>
              <Link to={{ pathname: "/app/my-account/my-profile-info", state: { ActiveHistory } }} className="myaccountbox">
                <img className="img-fluid"
                  alt={<IntlMessages id="myAccount.Dashboard.activeHistory" />} src={require('Assets/img/MyAccount/IconActiveHistory.png')} />
                <span><IntlMessages id="myAccount.Dashboard.activeHistory" /></span>
              </Link>
            </JbsCollapsibleCard>
          </Col>
          <Col md={3}>
            <JbsCollapsibleCard>
              <Link to={{ pathname: "/app/my-account/my-profile-info", state: { Complain } }} className="myaccountbox">
                <img className="img-fluid"
                  alt={<IntlMessages id="my_account.helpNSupoort" />} src={require('Assets/img/MyAccount/IconSupport.png')} />
                <span><IntlMessages id="my_account.helpNSupoort" /></span>
              </Link>
            </JbsCollapsibleCard>
          </Col>
        </Row>
        {/* <Row>
        <Col md={4}>
           <JbsCollapsibleCard>
              <Link to="" className="myaccountbox">
                <img className="img-fluid"
                 alt="Profile Images" src={require('Assets/img/user-profile.png')} />
                <span>Profile Images</span>
              </Link>
            </JbsCollapsibleCard>
          </Col>
          <Col md={4}>
           <JbsCollapsibleCard>
              <Link to={{pathname:"/app/my-account/my-profile-info",state:{ActiveSessions}}} className="myaccountbox">
                <img className="img-fluid"
                 alt="Active Sessions" src={require('Assets/img/Icon_ActiveSessions.png')} />
                <span>Active Sessions</span>
              </Link>
            </JbsCollapsibleCard>
          </Col>          
        </Row> */}
      </div>
    );
  }
}

