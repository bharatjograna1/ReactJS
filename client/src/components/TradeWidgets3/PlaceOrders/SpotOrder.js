// Component for Stop Place Order Detail By:Tejas Date : 13/9/2018

import React from "react";

import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

// intl messages
import IntlMessages from "Util/IntlMessages";

import classnames from "classnames";

import { Card, CardBody } from "reactstrap";

// function for connect store
import { connect } from "react-redux";

import { doBuyOrder, doSellOrder } from "Actions/Trade";

import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

import { NotificationManager } from "react-notifications";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  validateBuyPrice,
  validateBuyAmount,
  validateBuyTotal,
  validateSellPrice,
  validateSellAmount,
  validateSellTotal,
  validateOnlyNumeric,
  validateBuyData,
  validateSellData
} from "../../../validation/vaildateBuySellRequest";

class StopOrder extends React.Component {
  state = {
    modalStopSell: false,
    modalStopBuy: false,
    modalInfo: 0,

    selectedSellValue: 0,
    selectedBuyValue: 0,

    isPriceBuyValid: true,
    isAmountBuyValid: true,
    isTotalBuyValid: true,

    isPriceSellValid: true,
    isAmountSellValid: true,
    isTotalSellValid: true,

    priceBuyError: "",
    amountBuyError: "",
    totalBuyError: "",

    priceSellError: "",
    amountSellError: "",
    totalSellError: "",

    formErrors: {},

    priceBuy: 0,
    amountBuy: "",
    totalBuy: "",

    priceSell:0,
    amountSell: "",
    totalSell: "",
    showLoader: false,

    buyOrderResponse: [],
    sellOrderResponse: [],
    buyStopOrderBit: 0,
    sellStopOrderBit: 0,

    errorSpot: ''
  };

  validateBuyPrice = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ priceBuy: event.target.value });

      const { isValid, errors } = validateBuyPrice(event.target.value);

      if (isValid) {
        this.setState({ isPriceBuyValid: true });

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
          isPriceBuyValid: false,
          priceBuyError: errors.buyPrice,
          total: ""
        });
      }
    } else if (event.target.value === "") {
      // process for blank message
      this.setState({ priceBuy: event.target.value, totalBuy: "" });
    }
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
          priceBuy: "",
          amountBuy: "",
          totalBuy: "",

          priceSell: "",
          amountSell: "",
          totalSell: "",
          errorSpot: ""
        });
      } else {
        this.setState({
          buyOrderResponse: []
        })
      }
    } else if (nextprops.error.ReturnCode == 1 && this.state.buyStopOrderBit) {
      NotificationManager.error(nextprops.error.ReturnMsg)
      this.setState({
        errorSpot: nextprops.error.ReturnMsg,
        buyOrderResponse: [],
        buyStopOrderBit: 0,
        priceBuy: "",
        amountBuy: "",
        totalBuy: "",

        priceSell: "",
        amountSell: "",
        totalSell: ""
      })
    }

    if (nextprops.sellOrder.length) {
      if (this.state.sellStopOrderBit) {
        this.setState({
          sellOrderResponse: nextprops.sellOrder,
          buyOrderResponse: [],
          showLoader: false,
          modalStopSell: true,
          modalStopBuy: false,
          priceBuy: "",
          amountBuy: "",
          totalBuy: "",

          priceSell: "",
          amountSell: "",
          totalSell: "",
          errorSpot: ""
        });
      } else {
        this.setState({
          sellOrderResponse: []
        })
      }
    } else if (nextprops.error.ReturnCode == 1 && this.state.sellStopOrderBit) {
      NotificationManager.error(nextprops.error.ReturnMsg)
      this.setState({
        errorSpot: nextprops.error.ReturnMsg,
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
          priceBuy: parseFloat(nextprops.currentBuyPrice).toFixed(8),
          priceSell: parseFloat(nextprops.currentSellPrice).toFixed(8)
        });
      }
    }
  }

  validateBuyAmount = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      const { isValid, errors } = validateBuyAmount(event.target.value);

      this.setState({ amountBuy: event.target.value });

      if (isValid) {
        this.setState({ isAmountBuyValid: true });

        if (this.state.price != "" && this.state.isPriceBuyValid) {
          this.setState({
            totalBuy: parseFloat(
              parseFloat(event.target.value) * parseFloat(this.state.priceBuy)
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
    } else if (event.target.value == "") {
      // process for blank message
      this.setState({
        amountBuy: event.target.value,
        total: "",
        totalBuy: ""
      });
    }
  };

  validateBuyTotal = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ totalBuy: event.target.value });

      const { isValid, errors } = validateBuyTotal(event.target.value);
      if (isValid) {
        this.setState({ isTotalBuyValid: true });

        // calculation process of Amount
        if (
          this.state.priceBuy !== "" &&
          this.state.isPriceBuyValid &&
          this.state.totalBuy !== 0
        ) {
          this.setState({
            amountBuy: parseFloat(
              parseFloat(event.target.value) / parseFloat(this.state.priceBuy)
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
    } else if (event.target.value == "") {
      // process for blank message
      this.setState({ totalBuy: event.target.value, total: "", amountBuy: "" });
    }
  };

  validateSellPrice = event => {
    //    console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ priceSell: event.target.value });

      const { isValid, errors } = validateSellPrice(event.target.value);

      if (isValid) {
        this.setState({ isPriceSellValid: true });

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
          isPriceSellValid: false,
          priceSellError: errors.sellPrice,
          total: ""
        });
      }
    } else if (event.target.value === "") {
      // process for blank message
      this.setState({ priceSell: event.target.value, totalSell: "" });
    }
  };

  validateSellAmount = event => {
    //     console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      const { isValid, errors } = validateSellAmount(event.target.value);

      this.setState({ amountSell: event.target.value });

      if (isValid) {
        this.setState({ isAmountSellValid: true });
        if (this.state.priceSell !== "" && this.state.isPriceSellValid) {
          this.setState({
            totalSell: parseFloat(
              parseFloat(event.target.value) * parseFloat(this.state.priceSell)
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
      this.setState({
        amountSell: event.target.value,
        total: "",
        totalSell: ""
      });
    }
  };

  validateSellTotal = event => {
    //  console.log(event.target.value);
    if (validateOnlyNumeric(event.target.value)) {
      this.setState({ totalSell: event.target.value });

      const { isValid, errors } = validateSellTotal(event.target.value);
      if (isValid) {
        this.setState({ isTotalSellValid: true });

        // calculation process of Amount
        if (
          this.state.priceSell !== "" &&
          this.state.isPriceSellValid &&
          this.state.totalSell !== 0
        ) {
          this.setState({
            amountSell: parseFloat(
              parseFloat(event.target.value) / parseFloat(this.state.priceSell)
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
      //  this.setState({ selectedBuyValue: 0 })
    } else {
      //  this.setState({ selectedBuyValue: value })
      // calculation process of Amount
      if (
        this.state.priceBuy !== "" &&
        this.state.isPriceBuyValid &&
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
            parseFloat(total) / parseFloat(this.state.priceBuy)
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
      //    this.setState({ selectedSellValue: 0 })
    } else {
      //    this.setState({ selectedSellValue: value })
      // calculation process of Amount
      if (
        this.state.priceSell != "" &&
        this.state.isPriceSellValid &&
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
            parseFloat(this.state.priceSell) * parseFloat(amount)
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
      amount: this.state.amountSell,
      ordertype: 4,
      orderSide: 5,
    };
    const { isValid, errors } = validateSellData(data);
    if (!isValid) {
      if (errors.sellPrice) {
        this.setState({
          isPriceSellValid: false,
          priceSellError: errors.sellPrice,
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
      if (this.state.amountSell !== 0 && this.state.amountSell !== "") {
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

        //this.props.doSellOrder(data);
        if (this.state.amountSell <= this.props.info.firstCurrencyBalance) {
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
      amount: this.state.amountBuy,
      ordertype: 4,
      orderSide: 4,
    };

    const { isValid, errors } = validateBuyData(data);
    if (!isValid) {
      if (errors.buyPrice) {
        this.setState({
          isPriceBuyValid: false,
          priceBuyError: errors.buyPrice,
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
      if (this.state.amountBuy !== 0 && this.state.amountBuy !== "") {
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
        this.props.doBuyOrder(data);
        if (this.state.totalBuy <= this.props.secondCurrencyBalance) {
          this.props.doBuyOrder(data);
          // setTimeout(() => {
          //   this.props.doBuyOrder(data);
          // }, 3000);
        } else {
          this.setState({ showLoader: false, buyStopOrderBit: 0 })
          NotificationManager.error(<IntlMessages id="trading.placeorder.error.minBalance" />)
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
                  <Label sm={4} for="Price">
                    {<IntlMessages id="trading.placeorder.label.price" />}
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      // onBlur={this.validateBuyPrice}
                      name="price"
                      id="price"
                      placeholder={data.secondCurrency}
                      value={this.state.priceBuy}
                      onChange={this.validateBuyPrice}
                      className={!this.state.isPriceBuyValid ? "error" : ""}
                      disabled={this.state.priceBuy ? "true" : "false"}
                    />
                    {!this.state.isPriceBuyValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.priceBuyError} />
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
                      //  onBlur={this.validateBuyAmount}
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
                  <Label sm={4} for="Price">
                    {<IntlMessages id="trading.placeorder.label.price" />}
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      //  onBlur={this.validateSellPrice}
                      name="price"
                      id="price"
                      placeholder={data.secondCurrency}
                      value={this.state.priceSell}
                      disabled={this.state.priceSell ? "true" : "false"}
                      onChange={this.validateSellPrice}
                      className={!this.state.isPriceSellValid ? "error" : ""}
                    />
                    {!this.state.isPriceSellValid && (
                      <div>
                        <span className="text-danger">
                          <IntlMessages id={this.state.priceSellError} />
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
                      //onBlur={this.validateSellAmount}
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
                  <Col sm={12} >

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
                    </Row></Col>
                </FormGroup>

                <FormGroup className="mb-0">
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
//export default StopOrder;

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
)(StopOrder);
