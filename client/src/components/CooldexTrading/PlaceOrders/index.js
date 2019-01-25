// Component for Place Order Detail And Displaying Components  By:Tejas Date : 13/9/2018

import React, { Component, Fragment } from "react";
import { TabPane, Row, Col } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
//import { NotificationManager } from 'react-notifications';
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// function for connect store
import { connect } from "react-redux";

import { getCurrentPrice } from "Actions/Trade";

//import  Limit Order type Component
import LimitOrder from "./limitOrders";

//import Market Order type Component
import MarketOrder from "./marketOrder";

//import Stop Limit Order type Component
import StopLimitOrder from "./stopLimitOrder";

// import spot Limit Order
import SpotOrder from "./SpotOrder";

// import for internationalization
import IntlMessages from "Util/IntlMessages";

import { getWallets } from "Actions/Withdraw";

import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currentPrice: [],
      firstCurrencyBalance: 0,
      secondCurrencyBalance: 0,
      Wallet: []
    };
  }

  // invoke before Compoent render
  componentDidMount() {
    //load Currency List
    this.props.getCurrentPrice({ Pair: this.props.currencyPair });    
  }

  componentWillMount() {
    
    this.setState({
      firstCurrencyBalance: this.props.firstCurrencyBalance,
      secondCurrencyBalance: this.props.secondCurrencyBalance
    });   
  }

  handleChange = (event, value) => {
    this.setState({
      value: value
    });
  };
  componentWillReceiveProps(nextprops) {
    if(nextprops.currencyPair !== this.props.currencyPair){
      this.setState({
        value:0
      })
    }
  }

  // change tab selection
  handleChangeIndex = index => {
    //set tab index value
    this.setState({ value: index });
  };
  render() {
    const darkMode = this.props.darkMode;
    if (this.state.firstCurrencyBalance === 0 && this.state.secondCurrencyBalance === 0 ) {
      this.state.firstCurrencyBalance = this.props.firstCurrencyBalance;
      this.state.secondCurrencyBalance = this.props.secondCurrencyBalance;
    }

    return (
      <Fragment>
        {/* {this.props.loading && <JbsSectionLoader />} */}
        <div>
          <Row className="pt-0. pl-0 pr-15">
            <Col md={8} className="cooldexplsheader pr-0">
              {/* <h4>{<IntlMessages id="trading.placeorder.label.title" />}</h4> */}
              <AppBar
                position="static"
                className={classnames(
                  darkMode && "darkordertabmenu p-0",
                  "cooldexplstebmenu p-0"
                )}
              >
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  //indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                  // scrollable
                  // scrollButtons="off"
                >
                  <Tab
                    label={<IntlMessages id="trading.placeorder.label.limit" />}
                    className={classnames(
                      { active: this.state.value === 0 },
                      ""
                    )}
                  />

                  <Tab
                    label={
                      <IntlMessages id="trading.placeorder.label.market" />
                    }
                    className={classnames(
                      { active: this.state.value === 1 },
                      ""
                    )}
                  />
                  {/* <Tab
                    label={
                      <IntlMessages id="trading.placeorder.label.spot" />
                    }
                    className={classnames(
                      { active: this.state.value === 2 },
                      ""
                    )}
                  />

                <Tab
                    label={
                      <IntlMessages id="trading.placeorder.label.stoplimit" />
                    }
                    className={classnames(
                      { active: this.state.value === 3 },
                      ""
                    )}
                  /> */}

                </Tabs>
              </AppBar>
            </Col>
            <Col md={4} className="text-right freelink">
              {" "}
              <div  className="mt-10 mr-10 freelinktitle">
              <IntlMessages id="trading.placeorder.label.fee" /> : 
              <IntlMessages id="trading.placeorder.label.takers" /> {" " + this.props.takers} {" "}
              <IntlMessages id="trading.placeorder.label.makers" /> {" " + this.props.makers} 
              </div>         
            </Col>
          </Row> 
        </div>

        {this.state.value === 0 && (
          <TabPane tabId={this.state.value}>
            <LimitOrder
              {...this.props}
              info={this.props}
              state={this.state}             
              firstCurrencyBalance={this.props.firstCurrencyBalance}
              secondCurrencyBalance={this.props.secondCurrencyBalance}
              bulkBuyOrder={this.props.bulkBuyOrder}
              bulkSellOrder={this.props.bulkSellOrder}
              firstCurrencyWalletId={this.props.firstCurrencyWalletId}
              secondCurrencyWalletId={this.props.secondCurrencyWalletId}
              takers={this.props.takersValue}
              makers={this.props.makersValue}
              handleChange={this.state.value}
            /> 
          </TabPane>
        )}
        {this.state.value === 1 && (
          <TabPane tabId={this.state.value}>
            <MarketOrder
              {...this.props}
              info={this.props.state}
              state={this.state}             
              firstCurrencyBalance={this.props.firstCurrencyBalance}
              secondCurrencyBalance={this.props.secondCurrencyBalance}
              bulkBuyOrder={this.props.bulkBuyOrder}
              bulkSellOrder={this.props.bulkSellOrder}
              firstCurrencyWalletId={this.props.firstCurrencyWalletId}
              secondCurrencyWalletId={this.props.secondCurrencyWalletId}
              takers={this.props.takersValue}
              makers={this.props.makersValue}
            />
          </TabPane>
        )}
        {/* this.state.value === 2 && (
          <TabPane tabId={this.state.value}>
            <SpotOrder
              {...this.props}
              info={this.props.state}
              state={this.state}             
              firstCurrencyBalance={this.props.firstCurrencyBalance}
              secondCurrencyBalance={this.props.secondCurrencyBalance}
              bulkBuyOrder={this.props.bulkBuyOrder}
              bulkSellOrder={this.props.bulkSellOrder}
              firstCurrencyWalletId={this.props.firstCurrencyWalletId}
              secondCurrencyWalletId={this.props.secondCurrencyWalletId}
              takers={this.props.takersValue}
              makers={this.props.makersValue}
            />
          </TabPane>
        ) */}

        {/* this.state.value === 3 && (
          <TabPane tabId={this.state.value}>
            <StopLimitOrder
              {...this.props}
              info={this.props.state}
              state={this.state}             
              firstCurrencyBalance={this.props.firstCurrencyBalance}
              secondCurrencyBalance={this.props.secondCurrencyBalance}
              bulkBuyOrder={this.props.bulkBuyOrder}
              bulkSellOrder={this.props.bulkSellOrder}
              firstCurrencyWalletId={this.props.firstCurrencyWalletId}
              secondCurrencyWalletId={this.props.secondCurrencyWalletId}
              takers={this.props.takersValue}
              makers={this.props.makersValue}
            />
          </TabPane>
        ) */}

      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings, currency, withdrawApp }) => {
  const { darkMode } = settings;
  const { currentPrice, loading, buyOrderLoading, sellOrderLoading } = currency;
  return { darkMode, currentPrice, loading, buyOrderLoading, sellOrderLoading };
};
// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
    getCurrentPrice,
    getWallets
  }
)(PlaceOrder);
