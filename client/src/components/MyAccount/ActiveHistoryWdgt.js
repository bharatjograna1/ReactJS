import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import IPHistoryDataTable from './IPHistoryDataTable';
import LoginHistoryDataTable from './LoginHistoryDataTable';
import { connect } from 'react-redux';
import IPWhitelistWdgt from './IPWhitelistWdgt';
import DeviceWhitelistingWdgt from './DeviceWhitelistingWdgt';
import ActivityListWdgt from './ActivityListWdgt';
// intl messages
import IntlMessages from "Util/IntlMessages";

class ActiveHistoryWdgt extends Component {
  render() {
    return (
      <div>
        <Tabs defaultTab="IPHistory" onChange={tabId => { }}>
          <Row>
            <Col md={3} className="pr-0">
              <div className="innertabpanel">
                <TabList className="myaccountinnerTab">
                  <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ' : 'innertabmenu'} tabFor="IPHistory">
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipHistory" />
                  </Tab>
                  <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ' : 'innertabmenu'} tabFor="LoginHistory">
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.loginHistory" />
                  </Tab>
                  {/* <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ':'innertabmenu'}tabFor="ActivityList">
                    Activity List
                  </Tab> */}
                  <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ' : 'innertabmenu'} tabFor="IPWhitelisting">
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipWhitelisting" />
                  </Tab>
                  <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ' : 'innertabmenu'} tabFor="DeviceWhitelisting">
                    <IntlMessages id="sidebar.deviceWhitelisting" />
                  </Tab>
                  {/* <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ' : 'innertabmenu'} tabFor="ActivityList">
                    <IntlMessages id="sidebar.ActivityLog" />
                  </Tab> */}
                </TabList>
              </div>
            </Col>
            <Col md={9} className="pl-0">
              <TabPanel tabId="IPHistory">
                <div className="tabformtitle">
                  <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipHistory.information" /></span>
                  <p>
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipWhitelistingInformation.description" />
                  </p>
                </div>

                <Col md={{ size: 12, offset: 0 }}>

                  <IPHistoryDataTable {...this.props} />
                </Col>

              </TabPanel>
              <TabPanel tabId="LoginHistory">
                <div className="tabformtitle">
                  <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.loginHistory.information" /></span>
                  <p>
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipWhitelistingInformation.description" />
                  </p>
                </div>

                <Col md={{ size: 12, offset: 0 }}>
                  <LoginHistoryDataTable {...this.props} />
                </Col>

              </TabPanel>
              {/* <TabPanel tabId="ActivityList">
                <div className="tabformtitle">
                  <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.activityList.information" /></span>
                  <p>
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipWhitelistingInformation.description" />
                  </p>
                </div>

                <Col md={{ size: 12, offset: 0 }}>
                  <ActivityListWdgt {...this.props} />
                </Col>
              </TabPanel> */}
              <TabPanel tabId="IPWhitelisting">
                <div className="tabformtitle">
                  <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipWhitelistingInformation" /></span>
                  <p>
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.ipWhitelistingInformation.description" />
                  </p>
                </div>

                <Col md={{ size: 12, offset: 0 }}>
                  <IPWhitelistWdgt {...this.props} />
                </Col>
              </TabPanel>
              <TabPanel tabId="DeviceWhitelisting">
                <div className="tabformtitle">
                  <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.deviceWhiteListing" /></span>
                  <p><IntlMessages id="myAccount.Dashboard.myProfileInfo.activityHistory.deviceWhiteListing.description" /></p>
                </div>
                <Col md={{ size: 12, offset: 0 }}>
                  <DeviceWhitelistingWdgt {...this.props} />
                </Col>
              </TabPanel>
            </Col>
          </Row>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { darkMode } = settings;
  return { darkMode };
}

export default connect(mapStateToProps)(ActiveHistoryWdgt);
