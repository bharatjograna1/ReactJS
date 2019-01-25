import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Tabs, TabProvider, Tab, TabPanel, TabList } from "react-web-tabs"; 
import ChangepasswordWdgt from "./ChangepasswordWdgt";
import AddIPWhitelistWdgt from './AddIPWhitelistWdgt';
// intl messages
import IntlMessages from "Util/IntlMessages";

class SecurityWdgt extends Component {
  render() {
    return (
      <div>
        <TabProvider>
          <Tabs
            defaultTab="ChangePassword"
            onChange={tabId => {
              //console.log(tabId);
            }}
          >
            <Row>
              <Col className="pr-0" md={3}>
                <div className="innertabpanel">
                  <TabList className="myaccountinnerTab">
                    <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ':'innertabmenu'} tabFor="ChangePassword">
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.security.changePassword" />
                    </Tab>
                    {/* <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ':'innertabmenu'} tabFor="SecurityQuestion">
                      Security Question
                    </Tab> */}
                    <Tab className={this.props.darkMode ? 'innertabmenu-darkmode ':'innertabmenu'} tabFor="AllowedIPAddress">
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.security.allowedIPAddress" />
                    </Tab>
                    {/* <Tab className="innertabmenu">
                      <Link to="">App Passwords</Link>
                    </Tab> */}
                  </TabList>
                </div>
              </Col>
              <Col md={9} className="pl-0">
                <TabPanel tabId="ChangePassword">
                  <div className="tabformtitle">
                    <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.security.changePassword" /></span>
                    <p>
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.security.updateAccountPassword" />
                      
                    </p>
                  </div>
                    <ChangepasswordWdgt {...this.props} />
                </TabPanel>
                {/* <TabPanel tabId="SecurityQuestion">
                  <div className="tabformtitle">
                    <span>Security Question</span>
                    <p>
                      Add a security question to protect your account. In case
                      you forget your password, we'll ask for the secret answer
                      to verify identity.
                    </p>
                  </div>
                  <Col md={{ size: 8, offset: 1 }}>
                    <Form>
                      <FormGroup>
                        <Input
                          type="password"
                          name="SeqCurrentPassword"
                          id="SeqCurrentPassword"
                          placeholder="Current Password"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="text"
                          name="SecurityQuestion"
                          id="SecurityQuestion"
                          placeholder="Security Question"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="text"
                          name="Answer"
                          id="Answer"
                          placeholder="Answer"
                        />
                      </FormGroup>
                      <Row>
                        <Col md={6}>
                          <Button
                            className="btn btn-primary text-white text-bold btn-block w-100"
                            size="large"
                          >
                            save
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            className="btn btn-secondary text-white text-bold btn-block w-100"
                            size="large"
                          >
                            Clear
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </TabPanel> */}
                <TabPanel tabId="AllowedIPAddress">
                  <div className="tabformtitle">
                    <span><IntlMessages id="myAccount.Dashboard.myProfileInfo.security.allowedIPAddress" /></span>
                    <p>
                    <IntlMessages id="myAccount.Dashboard.myProfileInfo.security.manageTrustedIP" />
                    </p>
                  </div>
                  <Row>
                    <Col sm={9}>
                      <div className="ml-10">
                      <IntlMessages id="myAccount.Dashboard.myProfileInfo.security.trustedIPAddressRestrictions" />
                        
                      </div>
                      <div className="ml-10">
                      <IntlMessages id="myAccount.Dashboard.myProfileInfo.security.activateThisAllowIP" />
                        
                      </div>
                    </Col>
                    <Col sm={3}>
                      {/* <Link
                        to=""
                        className="btn btn-danger text-white text-center mb-30"
                      >
                        Add New
                      </Link> */}
                    </Col>
                  </Row>                  
                  <Row>
                    <Col md={{ size: 8, offset: 1 }}>
                      <AddIPWhitelistWdgt {...this.props} />
                    </Col>
                  </Row>
                </TabPanel>
              </Col>
            </Row>
          </Tabs>
        </TabProvider>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const { darkMode } = settings;
  return { darkMode };
}

export default connect(mapStateToProps)(SecurityWdgt);
