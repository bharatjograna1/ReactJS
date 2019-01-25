// Component for Stop Limit Place Order Detail By:Tejas Date : 13/9/2018

import React from "react";

import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import {
  validateBuyStop,
  validateBuyLimit,
  validateBuyAmount,
  validateBuyTotal,
  validateSellStop,
  validateSellLimit,
  validateSellAmount,
  validateSellTotal,
  validateOnlyNumeric,
  validateBuyData,
  validateSellData
} from "../../../validation/vaildateBuySellRequest";

// intl messages
import IntlMessages from "Util/IntlMessages";

import { Card, CardBody } from "reactstrap";

// function for connect store
import { connect } from "react-redux";

import { doBuyOrder, doSellOrder } from "Actions/Trade";

import classnames from "classnames";
import { NotificationManager } from "react-notifications";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class StopLimitOrder extends React.Component {
  state = {
    modalStopSell: false,
    modalStopBuy: false,
    modalInfo: 0,

    selectedSellValue: 0,
    selectedBuyValue: 0,

    isStopBuyValid: true,
    isLimitBuyValid: true,
    isAmountBuyValid: true,
    isTotalBuyValid: true,

    isStopSellValid: true,
    isLimitSellValid: true,
    isAmountSellValid: true,
    isTotalSellValid: true,

    stopBuyError: "",
    limitBuyError: "",
    amountBuyError: "",
    totalBuyError: "",

    stopSellError: "",
    limitSellError: "",
    amountSellError: "",
    totalSellError: "",

    formErrors: {},

    stopBuy: "",
    limitBuy: "",
    amountBuy: "",
    totalBuy: "",

    stopSell: "",
    limitSell: "",
    amountSell: "",
    totalSell: "",
    showLoader: false,
    buyOrderResponse: [],
    sellOrderResponse: [],
    buyStopOrderBit: 0,
    sellStopOrderBit: 0,

    errorSpotLimit: ''
  };
  // handle close add new Schedule dailog
  handleClose() {
    this.setState({
      modalStopBuy: false,
      modalStopSell: false,
      buyOrderResponse: [],
      sellOrderResponse: [],
      buyStopOrderBit: 0,
      sellStopOrderBit: 0
    });
  }

  componentWillReceiveProps(nextprops) {

    if(nextprops.bulkBuyOrder && nextprops.bulkBuyOrder.Price && nextprops.bulkBuyOrder.Amount && nextprops.bulkBuyOrder.Total) {
      this.setState({
        priceBuy:parseFloat(nextprops.bulkBuyOrder.Price).toFixed(8),
        amountBuy:parseFloat(nextprops.bulkBuyOrder.Amount).toFixed(8),
        totalBuy:nextprops.bulkBuyOrder.Total
      })
      // this.state.priceBuy = parseFloat(nextprops.bulkBuyOrder.Price).toFixed(8)
      // this.state.amountBuy = parseFloat(nextprops.bulkBuyOrder.Amount).toFixed(8)
      // this.state.totalBuy = nextprops.bulkBuyOrder.Total

    }

    if(nextprops.bulkSellOrder && nextprops.bulkSellOrder.Price && nextprops.bulkSellOrder.Amount && nextprops.bulkSellOrder.Total) {
      this.setState({
        priceSell:parseFloat(nextprops.bulkSellOrder.Price).toFixed(8),
        amountSell:parseFloat(nextprops.bulkSellOrder.Amount).toFixed(8),
        totalSell:nextprops.bulkSellOrder.Total
      })

      // this.state.priceSell = parseFloat(nextprops.bulkSellOrder.Price).toFixed(8)
      // this.state.amountSell = parseFloat(nextprops.bulkSellOrder.Amount).toFixed(8)
      // this.state.totalSell = nextprops.bulkSellOrder.Total
    }


    if (nextprops.buyOrder.length) {
      if (this.state.buyStopOrderBit) {
        this.setState({
          buyOrderResponse: nextprops.buyOrder,
          sellOrderResponse: [],
          showLoader: false,
          modalStopBuy: true,
          modalStopSell: false,
          priceBuy: 0,
          amountBuy: "",
          totalBuy: "",
      
          priceSell:0,
          amountSell: "",
          totalSell: "",
          errorSpotLimit: ""
        });
      } else {
        this.setState({
          buyOrderResponse: []
        })
      }
    } else if (nextprops.error.ReturnCode == 1 && this.state.buyStopOrderBit) {
      NotificationManager.error(nextprops.error.ReturnMsg)
      this.setState({
        errorSpotLimit: nextprops.error.ReturnMsg,
        buyOrderResponse: [],
        buyStopOrderBit: 0,
        priceBuy: "",
        amountBuy: "",
        totalBuy: "",

        priceSell: "",
        amountSell: "",
        totalSell: "",
      })
    }

    if (nextprops.sellOrder.length) {
      if (this.state.sellStopOrderBit) {
        this.setState({
          sellOrderResponse: nextprops.sellOrder,
          buyOrderResponse: [],
          showLoader: false,
          modalStopSell: true,
          // modalStopBuy: false,
          priceBuy: "",
          amountBuy: "",
          totalBuy: "",

          priceSell: "",
          amountSell: "",
          totalSell: "",
          errorSpotLimit: ""
        });
      } else {
        this.setState({
          sellOrderResponse: []
        })
      }
    } else if (nextprops.error.ReturnCode == 1 && this.state.sellStopOrderBit) {
      NotificationManager.error(nextprops.error.ReturnMsg)
      this.setState({
        errorSpotLimit: nextprops.error.ReturnMsg,
        sellOrderResponse: [],
        sellStopOrderBit: 0,
        priceBuy: "",
        amountBuy: "",
        totalBuy: "",

        priceSell: "",
        amountSell: "",
        totalSell: "",
      })
    }

    if (nextprops.currentBuyPrice && nextprops.currentSellPrice) {
      if (
        nextprops.currentBuyPrice !== this.state.currentBuyPrice &&
        nextprops.currentSellPrice !== this.state.currentSellPrice
      ) {
        this.setState({
          limitBuy: parseFloat(nextprops.currentBuyPrice).toFixed(8),
          limitSell: parseFloat(nextprops.currentSellPrice).toFixed(8)
        });
      }
    }
  }  
  validateBuyStop = event => {
    //    console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ stopBuy: event.target.value });

      const { isValid, errors } = validateBuyStop(event.target.value);

      if (isValid) {
        this.setState({ isStopBuyValid: true });

      } else {
        this.setState({
          isStopBuyValid: false,
          stopBuyError: errors.buyStop,
          total: ""
        });
      }
    } else if (event.target.value == "") {
      // process for blank message
      this.setState({ stopBuy: event.target.value, totalBuy: "" });
    }
  };

  validateSellLimit = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ limitSell: event.target.value });

      const { isValid, errors } = validateSellLimit(event.target.value);

      if (isValid) {
        this.setState({ isLimitSellValid: true });

        if (this.state.amountSell != "" && this.state.isAmountSellValid) {
          this.setState({
            totalSell: parseFloat(
              parseFloat(this.state.amountSell) * parseFloat(event.target.value)
            ).toFixed(8),
            isTotalSellValid: true
          });
        } else {
          this.setState({ totalSell: "", isTotalSellValid: true });
        }
      } else {
        this.setState({
          isLimitSellValid: false,
          limitSellError: errors.sellLimit,
          total: ""
        });
      }
    } else if (event.target.value == "") {
      // process for blank message
      this.setState({ limitSell: event.target.value, totalSell: "" });
    }
  };

  validateSellStop = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ stopSell: event.target.value });

      const { isValid, errors } = validateSellStop(event.target.value);

      if (isValid) {
        this.setState({ isStopSellValid: true });

      } else {
        this.setState({
          isStopSellValid: false,
          stopSellError: errors.sellStop,
          total: ""
        });
      }
    } else if (event.target.value == "") {
      // process for blank message
      this.setState({ stopSell: event.target.value, totalSell: "" });
    }
  };

  validateBuyLimit = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ limitBuy: event.target.value });

      const { isValid, errors } = validateBuyLimit(event.target.value);

      if (isValid) {
        this.setState({ isLimitBuyValid: true });

        if (this.state.amountBuy !== "" && this.state.isAmountBuyValid) {
          this.setState({
            totalBuy: parseFloat(
              parseFloat(this.state.amountBuy) * parseFloat(event.target.value)
            ).toFixed(8),
            isTotalBuyValid: true
          });
        } else {
          this.setState({ totalBuy: "", isTotalBuyValid: true });
        }
      } else {
        this.setState({
          isLimitBuyValid: false,
          limitBuyError: errors.buyLimit,
          total: ""
        });
      }
    } else if (event.target.value === "") {
      // process for blank message
      this.setState({ limitBuy: event.target.value, totalBuy: "" });
    }
  };

  validateBuyAmount = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      const { isValid, errors } = validateBuyAmount(event.target.value);

      this.setState({ amountBuy: event.target.value });

      if (isValid) {
        this.setState({ isAmountBuyValid: true });

        if (this.state.limitBuy !== "" && this.state.isLimitBuyValid) {
          this.setState({
            totalBuy: parseFloat(
              parseFloat(event.target.value) * parseFloat(this.state.limitBuy)
            ).toFixed(8),
            isTotalBuyValid: true
          });
        } else {
          this.setState({ totalBuy: "", isTotalBuyValid: true });
        }
      } else {
        this.setState({
          isAmountBuyValid: false,
          amountBuyError: errors.buyAmount,
          totalBuy: ""
        });
      }
    } else if (event.target.value === "") {
      // process for blank message
      this.setState({ amountBuy: event.target.value, total: "" });
    }
  };

  validateBuyTotal = event => {
    //   console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ totalBuy: event.target.value });

      const { isValid, errors } = validateBuyTotal(event.target.value);
      if (isValid) {
        this.setState({ isTotalBuyValid: true });

        // calculation process of Amount
        if (
          this.state.limitBuy !== "" &&
          this.state.isLimitBuyValid &&
          this.state.totalBuy !== 0
        ) {
          this.setState({
            amountBuy: parseFloat(
              parseFloat(event.target.value) / parseFloat(this.state.limitBuy)
            ).toFixed(8),
            isAmountBuyValid: true
          });
        } else {
          this.setState({ amountBuy: "", isAmountBuyValid: true });
        }
      } else {
        this.setState({
          isTotalBuyValid: false,
          totalBuyError: errors.buyTotal
        });
      }
    } else if (event.target.value === "") {
      // process for blank message
      this.setState({
        totalBuy: event.target.value,
        total: "",
        amountBuy: ""
      });
    }
  };

  validateSellAmount = event => {
    // console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      const { isValid, errors } = validateSellAmount(event.target.value);

      this.setState({ amountSell: event.target.value });

      if (isValid) {
        this.setState({ isAmountSellValid: true });
        if (this.state.limitSell !== "" && this.state.isLimitSellValid) {
          this.setState({
            totalSell: parseFloat(
              parseFloat(event.target.value) * parseFloat(this.state.limitSell)
            ).toFixed(8),
            isTotalSellValid: true
          });
        } else {
          this.setState({ totalSell: "", isTotalSellValid: true });
        }
      } else {
        this.setState({
          isAmountSellValid: false,
          amountSellError: errors.sellAmount,
          totalSell: ""
        });
      }
    } else if (event.target.value === "") {
      // process for blank message
      this.setState({ amountSell: event.target.value, total: "" });
    }
  };

  validateSellTotal = event => {
    // console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ totalSell: event.target.value });

      const { isValid, errors } = validateSellTotal(event.target.value);
      if (isValid) {
        this.setState({ isTotalSellValid: true });

        // calculation process of Amount
        if (
          this.state.limitSell !== "" &&
          this.state.isLimitSellValid &&
          this.state.totalSell !== 0
        ) {
          this.setState({
            amountSell: parseFloat(
              parseFloat(event.target.value) / parseFloat(this.state.limitSell)
            ).toFixed(8),
            isAmountSellValid: true
          });
        } else {
          this.setState({ amountSell: "", isAmountSellValid: true });
        }
      } else {
        this.setState({
          isTotalSellValid: false,
          totalSellError: errors.sellTotal
        });
      }
    } else if (event.target.value === "") {
      // process for blank message
      this.setState({
        totalSell: event.target.value,
        total: "",
        amountSell: ""
      });
    }
  };

  changeSelectedBuyValue = value => {
    if (this.state.selectedBuyValue === value) {
      // this.setState({ selectedBuyValue: 0 })
    } else {
      //      this.setState({ selectedBuyValue: value })
      // calculation process of Amount
      if (
        this.state.limitBuy !== "" &&
        this.state.isLimitBuyValid &&
        this.state.totalBuy !== 0 &&
        this.state.amountBuy !== 0
      ) {
        //total = (this.props.info.secondCurrencyBalance*25)/100
        var total = parseFloat(
          parseFloat(
            parseFloat(this.props.secondCurrencyBalance) *
            parseFloat(value)
          ) / 100
        ).toFixed(8);
        this.setState({
          amountBuy: parseFloat(
            parseFloat(total) / parseFloat(this.state.limitBuy)
          ).toFixed(8),
          totalBuy: total,
          isAmountBuyValid: true,
          isTotalBuyValid: true
        });
      } else {
        this.setState({
          amountBuy: "",
          totalBuy: "",
          isTotalBuyValid: true,
          isAmountBuyValid: true
        });
      }
    }
  };

  changeSelectedSellValue = value => {
    if (this.state.selectedSellValue === value) {
      // this.setState({ selectedSellValue: 0 })
    } else {
      // this.setState({ selectedSellValue: value })
      // calculation process of Amount
      if (
        this.state.limitSell !== "" &&
        this.state.isLimitSellValid &&
        this.state.totalSell !== 0 &&
        this.state.amountSell !== 0
      ) {
        //total = (this.props.info.secondCurrencyBalance*25)/100
        var amount = parseFloat(
          parseFloat(
            parseFloat(this.props.firstCurrencyBalance) * parseFloat(value)
          ) / 100
        ).toFixed(8);
        this.setState({
          totalSell: parseFloat(
            parseFloat(this.state.limitSell) * parseFloat(amount)
          ).toFixed(8),
          amountSell: amount,
          isAmountSellValid: true,
          isTotalSellValid: true
        });
      } else {
        this.setState({
          amountSell: "",
          totalSell: "",
          isTotalSellValid: true,
          isAmountSellValid: true
        });
      }
    }
  };

  doSellOrder = event => {
    const info = this.props.info;

    const data = {
      currencyPairID: info.currencyPairID,
      debitWalletID: this.props.firstCurrencyWalletId,
      creditWalletID: this.props.secondCurrencyWalletId,
      feePer: 0,
      fee: 0,
      trnMode: 21,
      stop: this.state.stopSell,
      limit: this.state.limitSell,
      amount: this.state.amountSell,
      total: this.state.totalSell,
      ordertype: 3,
      orderSide: 5,
    };
    const { isValid, errors } = validateSellData(data);
    if (!isValid) {
      if (errors.sellLimit) {
        this.setState({
          isLimitSellValid: false,
          limitSellError: errors.sellLimit,
          total: ""
        });
      }

      if (errors.sellAmount) {
        this.setState({
          isAmountSellValid: false,
          amountSellError: errors.sellAmount,
          totalSell: ""
        });
      }

      if (errors.sellTotal) {
        this.setState({
          isTotalSellValid: false,
          totalSellError: errors.sellTotal
        });
      }
    } else {
      if (
        this.state.limitSell !== 0 &&
        this.state.limitSell !== "" &&
        this.state.stopSell !== "" &&
        this.state.amountSell !== 0 &&
        this.state.amountSell !== "" &&
        this.state.totalSell !== 0 &&
        this.state.totalSell !== "" &&
        this.state.isAmountSellValid &&
        this.state.isLimitSellValid &&
        this.state.isTotalSellValid &&
        this.state.isStopSellValid
      ) {
        this.setState({
          orderType: "Sell",
          firstCurrency: info.firstCurrency,
          secondCurrency: info.secondCurrency,
          firstCurrencyBalance: this.props.firstCurrencyBalance,
          secondCurrencyBalance: this.props.secondCurrencyBalance
        });
        this.setState({
          showLoader: true,
          buyStopOrderBit: 0,
          sellStopOrderBit: 1
        });
        // this.props.doSellOrder(data);
        if (this.state.amountSell <= this.props.firstCurrencyBalance) {
          this.props.doSellOrder(data);
          // setTimeout(() => {
          //   this.props.doSellOrder(data);
          // }, 3000);
        } else {
          this.setState({ showLoader: false, sellStopOrderBit: 0 });
          NotificationManager.error(
            <IntlMessages id="trading.placeorder.error.minBalance" />
          );
        }
      } else {
        this.setState({ showLoader: false, sellStopOrderBit: 0 });
        NotificationManager.error(
          <IntlMessages id="trading.placeorder.error.properdata" />
        );
      }
    }
  };

  doBuyOrder = event => {
    const info = this.props.info;

    const data = {
      currencyPairID: info.currencyPairID,
      debitWalletID: this.props.secondCurrencyWalletId,
      creditWalletID: this.props.firstCurrencyWalletId,
      feePer: 0,
      fee: 0,
      trnMode: 21,
      stop: this.state.stopBuy,
      limit: this.state.limitBuy,
      amount: this.state.amountBuy,
      total: this.state.totalBuy,
      ordertype: 3,
      orderSide: 4,
    };
    const { isValid, errors } = validateBuyData(data);
    if (!isValid) {
      if (errors.buyLimit) {
        this.setState({
          isLimitBuyValid: false,
          limitBuyError: errors.buyLimit,
          total: ""
        });
      }

      if (errors.buyAmount) {
        this.setState({
          isAmountBuyValid: false,
          amountBuyError: errors.buyAmount,
          totalBuy: ""
        });
      }

      if (errors.buyTotal) {
        this.setState({
          isTotalBuyValid: false,
          totalBuyError: errors.buyTotal
        });
      }
    } else {
      if (
        this.state.limitBuy !== 0 &&
        this.state.limitBuy !== "" &&
        this.state.stopBuy !== "" &&
        this.state.amountBuy !== 0 &&
        this.state.amountBuy !== "" &&
        this.state.totalBuy !== 0 &&
        this.state.totalBuy !== "" &&
        this.state.isAmountBuyValid &&
        this.state.isLimitBuyValid &&
        this.state.isTotalBuyValid &&
        this.state.isStopBuyValid
      ) {
        //if (this.state.isAmountBuyValid && this.state.isPriceBuyValid && this.state.isTotalBuyValid) {
        this.setState({
          orderType: "Buy",
          firstCurrency: info.firstCurrency,
          secondCurrency: info.secondCurrency,
          firstCurrencyBalance: this.props.firstCurrencyBalance,
          secondCurrencyBalance: this.props.secondCurrencyBalance
        });
        this.setState({
          showLoader: true,
          buyStopOrderBit: 1,
          sellStopOrderBit: 0
        });
        // this.props.doBuyOrder(data);
        if (this.state.totalBuy <= this.props.secondCurrencyBalance) {
          this.props.doBuyOrder(data);
          // setTimeout(() => {
          //   this.props.doBuyOrder(data);
          // }, 3000);
        } else {
          this.setState({ showLoader: false, buyStopOrderBit: 0 });
          NotificationManager.error(
            <IntlMessages id="trading.placeorder.error.minBalance" />
          );
        }
      } else {
        this.setState({ showLoader: false, buyStopOrderBit: 0 });
        NotificationManager.error(
          <IntlMessages id="trading.placeorder.error.properdata" />
        );
      }
    }
  };

  render() {

    // if(this.props.bulkBuyOrder && this.props.bulkBuyOrder.Price && this.props.bulkBuyOrder.Amount && this.props.bulkBuyOrder.Total) {

    //   this.state.priceBuy = parseFloat(this.props.bulkBuyOrder.Price).toFixed(8)
    //   this.state.amountBuy = parseFloat(this.props.bulkBuyOrder.Amount).toFixed(8)
    //   this.state.totalBuy = this.props.bulkBuyOrder.Total

    // }

    // if(this.props.bulkSellOrder && this.props.bulkSellOrder.Price && this.props.bulkSellOrder.Amount && this.props.bulkSellOrder.Total) {
    //   this.state.priceSell = parseFloat(this.props.bulkSellOrder.Price).toFixed(8)
    //   this.state.amountSell = parseFloat(this.props.bulkSellOrder.Amount).toFixed(8)
    //   this.state.totalSell = this.props.bulkSellOrder.Total
    // }
    
    const data = this.props.info;
    return (
      <div className="col-sm-12 col-md-12 col-lg-12 p-0 d-flex">
        {this.props.loading && <JbsSectionLoader />}
        <div className="col-sm-6 col-md-6 col-lg-6 mb-0 pl-0">
          <Card className="jbs-block col-sm-12 col-md-12 col-lg-12">
            <CardBody className="pl-0 pr-0 pt-5 pb-0 d-flex justify-content-between">
              <h4 className="mb-5">
                {<IntlMessages id="trading.placeorder.label.buy" />}{" "}
                {data.firstCurrency}
              </h4>
              <p className="fs-14 mb-0">
                <a href="">
                  <i className="zmdi zmdi-balance-wallet">
                    {" "}
                    {this.props.secondCurrencyBalance.toFixed(8)}{" "}
                    {data.secondCurrency}
                  </i>
                </a>
              </p>
            </CardBody>
            <div className="mt-10 mb-10">
              <Form>
                <FormGroup row className="mb-0">
                  <Label sm={4} for="stop">
                    {
                      <IntlMessages id="trading.placeorder.stoplimit.label.stop" />
                    }
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      // onBlur={this.validateBuyStop}
                      name="stop"
                      id="stop"
                      placeholder={data.secondCurrency}
                      value={this.state.stopBuy}
                      onChange={this.validateBuyStop}
                      className={!this.state.isStopBuyValid ? "error" : ""}
                    />
                    {!this.state.isStopBuyValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.stopBuyError} />
                        </span>
                      </div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="mb-0">
                  <Label sm={4} for="limit">
                    {
                      <IntlMessages id="trading.placeorder.stoplimit.label.limit" />
                    }
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="limit"
                      id="limit"
                      placeholder={data.secondCurrency}
                      // onBlur={this.validateBuyLimit}
                      value={this.state.limitBuy}
                      onChange={this.validateBuyLimit}
                      className={!this.state.isLimitBuyValid ? "error" : ""}
                    />
                    {!this.state.isLimitBuyValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.limitBuyError} />
                        </span>
                      </div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="mb-0">
                  <Label sm={4} for="Amount">
                    {<IntlMessages id="trading.placeorder.label.amount" />}
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      //onBlur={this.validateBuyAmount}
                      disabled={
                        this.state.selectedBuyValue !== 0 ? true : false
                      }
                      name="amount"
                      id="amount"
                      placeholder={data.firstCurrency}
                      value={this.state.amountBuy}
                      onChange={this.validateBuyAmount}
                      className={!this.state.isAmountBuyValid ? "error" : ""}
                    />
                    {!this.state.isAmountBuyValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.amountBuyError} />
                        </span>
                      </div>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row className="mb-0">

                  <Col sm={12}>
                    <Row>
                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="25"
                          className={classnames(
                            { active: this.state.selectedBuyValue === 25 },
                            "orderbtnbuy-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedBuyValue(25);
                          }}
                        >
                          25%
                    </Button>
                      </Col>

                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="50"
                          className={classnames(
                            { active: this.state.selectedBuyValue === 50 },
                            "orderbtnbuy-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedBuyValue(50);
                          }}
                        >
                          50%
                    </Button>
                      </Col>

                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="75"
                          className={classnames(
                            { active: this.state.selectedBuyValue === 75 },
                            "orderbtnbuy-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedBuyValue(75);
                          }}
                        >
                          75%
                    </Button>
                      </Col>

                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="100"
                          className={classnames(
                            { active: this.state.selectedBuyValue === 100 },
                            "orderbtnbuy-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedBuyValue(100);
                          }}
                        >
                          100%
                    </Button>
                      </Col>
                    </Row>
                  </Col>
                </FormGroup>

                <FormGroup row className="mb-0">
                  <Label sm={4} for="Total">
                    {<IntlMessages id="trading.placeorder.label.total" />}
                  </Label>
                  <Col sm={8}>
                    {/* <Input type="text" name="total" id="total" value={this.props.state.totalSell} placeholder={data.secondCurrency} /> */}
                    <Input
                      type="text"
                      value={this.state.totalBuy}
                      //  onBlur={this.validateSellTotal}
                      name="total"
                      id="total"
                      onChange={this.validateBuyTotal}
                      placeholder={data.secondCurrency}
                      className={!this.state.isTotalBuyValid ? "error" : ""}
                    />

                    {!this.state.isTotalBuyValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.totalBuyError} />
                        </span>
                      </div>
                    )}

                  </Col>
                </FormGroup>

                <FormGroup className="mb-0">
                  <Row>
                    <Col sm={12}>
                      <Button
                        name={
                          <IntlMessages id="trading.placeorder.button.buy" />
                        }
                        onClick={event => {
                          this.doBuyOrder(event);
                        }}
                        className="btn btn-outline-success btnbuy-success"
                      >
                        {<IntlMessages id="trading.placeorder.button.buy" />}{" "}
                        {data.firstCurrency}
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </div>
          </Card>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 mb-0 pr-0 pl-0">
          <Card className="jbs-block col-sm-12 col-md-12 col-lg-12">
            <CardBody className="pl-0 pr-0 pt-5 pb-0 d-flex justify-content-between">
              <h4 className="mb-5">
                {<IntlMessages id="trading.placeorder.label.sell" />}{" "}
                {data.firstCurrency}
              </h4>
              <p className="fs-14 mb-0">
                <a href="">
                  <i className="zmdi zmdi-balance-wallet">
                    {" "}
                    {this.props.firstCurrencyBalance.toFixed(8)} {data.firstCurrency}
                  </i>
                </a>
              </p>
            </CardBody>

            <div className="mt-10 mb-10">
              <Form>
                <FormGroup row className="mb-0">
                  <Label sm={4} for="stop">
                    {
                      <IntlMessages id="trading.placeorder.stoplimit.label.stop" />
                    }
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      // onBlur={this.validateSellStop}
                      name="stop"
                      id="stop"
                      placeholder={data.secondCurrency}
                      value={this.state.stopSell}
                      onChange={this.validateSellStop}
                      className={!this.state.isStopSellValid ? "error" : ""}
                    />
                    {!this.state.isStopSellValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.stopSellError} />
                        </span>
                      </div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="mb-0">
                  <Label sm={4} for="limit">
                    {
                      <IntlMessages id="trading.placeorder.stoplimit.label.limit" />
                    }
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="limit"
                      id="limit"
                      placeholder={data.secondCurrency}
                      //onBlur={this.validateSellLimit}
                      value={this.state.limitSell}
                      onChange={this.validateSellLimit}
                      className={!this.state.isLimitSellValid ? "error" : ""}
                    />
                    {!this.state.isLimitSellValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.limitSellError} />
                        </span>
                      </div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="mb-0">
                  <Label sm={4} for="Amount">
                    {<IntlMessages id="trading.placeorder.label.amount" />}
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      //  onBlur={this.validateSellAmount}
                      disabled={
                        this.state.selectedSellValue !== 0 ? true : false
                      }
                      name="amount"
                      id="amount"
                      placeholder={data.firstCurrency}
                      value={this.state.amountSell}
                      onChange={this.validateSellAmount}
                      className={!this.state.isAmountSellValid ? "error" : ""}
                    />
                    {!this.state.isAmountSellValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.amountSellError} />
                        </span>
                      </div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="mb-0">
                  <Col sm={12}>
                    <Row>
                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="25"
                          className={classnames(
                            { active: this.state.selectedSellValue === 25 },
                            "orderbtnsell-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedSellValue(25);
                          }}
                        >
                          25%
                    </Button>
                      </Col>

                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="50"
                          className={classnames(
                            { active: this.state.selectedSellValue === 50 },
                            "orderbtnsell-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedSellValue(50);
                          }}
                        >
                          50%
                    </Button>
                      </Col>

                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="75"
                          className={classnames(
                            { active: this.state.selectedSellValue === 75 },
                            "orderbtnsell-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedSellValue(75);
                          }}
                        >
                          75%
                    </Button>
                      </Col>

                      <Col sm={3} className="m-0 p-0">
                        <Button
                          value="100"
                          className={classnames(
                            { active: this.state.selectedSellValue === 100 },
                            "orderbtnsell-percentage btn-xs m-2"
                          )}
                          onClick={event => {
                            this.changeSelectedSellValue(100);
                          }}
                        >
                          100%
                    </Button>
                      </Col>
                    </Row>
                  </Col>
                </FormGroup>

                <FormGroup row className="mb-0">
                  <Label sm={4} for="Total">
                    {<IntlMessages id="trading.placeorder.label.total" />}
                  </Label>
                  <Col sm={8}>
                    {/* <Input type="text" name="total" id="total" value={this.props.state.totalSell} placeholder={data.secondCurrency} /> */}
                    <Input
                      type="text"
                      value={this.state.totalSell}
                      //  onBlur={this.validateSellTotal}
                      name="total"
                      id="total"
                      onChange={this.validateSellTotal}
                      placeholder={data.secondCurrency}
                      className={!this.state.isTotalSellValid ? "error" : ""}
                    />

                    {!this.state.isTotalSellValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.totalSellError} />
                        </span>
                      </div>
                    )}

                  </Col>
                </FormGroup>

                <FormGroup className="mb-10">
                  <Row>
                    <Col sm={12}>
                      <Button
                        name={
                          <IntlMessages id="trading.placeorder.button.sell" />
                        }
                        onClick={event => {
                          this.doSellOrder(event);
                        }}
                        className="btn btn-outline-danger btnsell-danger"
                      >
                        {<IntlMessages id="trading.placeorder.button.sell" />}{" "}
                        {data.firstCurrency}
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
            </div>
          </Card>
        </div>

        {this.state.buyOrderResponse && (
          <Modal isOpen={this.state.modalStopBuy}>
            <ModalHeader>
              {<IntlMessages id="trading.orders.bulksellorders.title" />}
            </ModalHeader>

            <ModalBody>
              {this.state.buyOrderResponse.map((value, key) => {
                return (
                  <div key={key}>
                    <p>Transaction ID : {value.trnID}</p>
                    {/* <h1>{value.Message}</h1> */}
                  </div>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="raised"
                onClick={() => this.handleClose()}
                className="btn-danger text-white"
              >
                <span>
                  <IntlMessages id="button.cancel" />
                </span>
              </Button>
            </ModalFooter>
          </Modal>
        )}
        {this.state.sellOrderResponse && (
          <Modal isOpen={this.state.modalStopSell}>
            <ModalHeader>
              {<IntlMessages id="trading.orders.bulksellorders.title" />}
            </ModalHeader>

            <ModalBody>
              {this.state.sellOrderResponse.map((value, key) => {
                return (
                  <div key={key}>
                    <p>Transaction ID : {value.trnID}</p>
                    {/* <h1>{value.Message}</h1> */}
                  </div>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="raised"
                onClick={() => this.handleClose()}
                className="btn-danger text-white"
              >
                <span>
                  <IntlMessages id="button.cancel" />
                </span>
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  }
}

// export component
//export default StopLimitOrder;

// Set Props when actions are dispatch
const mapStateToProps = state => ({
  buyOrder: state.placeOrder.buyOrder,
  sellOrder: state.placeOrder.sellOrder,
  loading: state.placeOrder.loading,
  error: state.placeOrder.error
});

// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
    doBuyOrder,
    doSellOrder
  }
)(StopLimitOrder);
