/**
 * My Profile Info
 */
import React, { Component } from "react";

// My Account Import
import { MyProfileInfoWdgt } from "Components/MyAccount";
import { Card } from 'reactstrap';

// jbs collapsible card
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";

export default class myPortfolioInfo extends Component {
  render() {
    return (
      <div>
        {/* <JbsCollapsibleCard> */}
          <Card>
          <MyProfileInfoWdgt />
          </Card>
        {/* </JbsCollapsibleCard> */}
      </div>
    );
  }
}
