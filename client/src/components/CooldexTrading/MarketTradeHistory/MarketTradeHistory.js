// Component for Display Market Trade History By:Tejas Date : 13/9/2018

import React from "react";
import { Table, Row,Col} from "reactstrap";

//import section loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// intl messages
import IntlMessages from "Util/IntlMessages";

//import scroll bar
import { Scrollbars } from "react-custom-scrollbars";

// import Action 
import {
  getMarketTradeHistory,  
} from 'Actions/Trade';

// import connect function for store
import { connect } from "react-redux";

class MarketTradeRow extends React.Component {
  render() {
    var lastClass = "",
      changeClass = "";

    if (this.props.Type === "BUY") {
      lastClass = "text-success";
    } else if (this.props.Type === "SELL") {
      lastClass = "text-danger";
    } else {
      lastClass = "";
      changeClass = "";
    }

    return (
      <tr
        className={this.props.index == 0 ? 'blink_me':''}
        style={{ cursor: "pointer" }}
        key={this.props.index}
      >
        <td>{this.props.price === 0 ? parseFloat(this.props.lastPrice).toFixed(8) : parseFloat(this.props.price).toFixed(8)}</td>
        <td className={lastClass}>
          {parseFloat(this.props.Amount).toFixed(8)}
        </td>
        <td>{parseFloat(this.props.Amount * this.props.price).toFixed(8)}</td>
      </tr>
    );
  }
}

class MarketTrade extends React.Component {
  constructor() {
    super();
    this.state = {
      marketTradeHistory: [],
      showLoader: true,
      oldMarketTradeHistory: [],      
      NewMarketData: [],
      socketData: [],
      isComponentActive:1,
      lastPrice:0
    };
  }

  // This will invoke After component render
  componentWillMount() {
   
    const pair = this.props.currencyPair

    this.props.hubConnection.on('RecieveLastPrice', (receivedMessage) => {
            
      //console.log("Get Data from signalR  ",receivedMessage);
      if(this.state.isComponentActive === 1 && receivedMessage !==null ){ 

        try {

          const marketCap = JSON.parse(receivedMessage);  

          if ((marketCap.EventTime && this.state.socketLastPriceData.length === 0) || 
            (this.state.socketLastPriceData.length !== 0 && marketCap.EventTime > this.state.socketLastPriceData.EventTime) ) {     
                
            this.setState({
              lastPrice:marketCap.Data.LastPrice
            })

          }        

        } catch(error)    {
          
        }         
           
      }
      
    });

    this.props.hubConnection.on('RecieveOrderHistory', (receivedMessage) => {
      //console.log("Get Data from signalR RecieveOrderHistory", receivedMessage);

      if (this.state.isComponentActive === 1 && receivedMessage !== null) {
        var data = []
        try{
          const receivedMessageData = JSON.parse(receivedMessage);

          if ((receivedMessageData.EventTime && this.state.socketData.length === 0) || 
            (this.state.socketData.length !== 0 && receivedMessageData.EventTime > this.state.socketData.EventTime) ) {
              if(this.props.currencyPair === receivedMessageData.Parameter){
                data.push(receivedMessageData.Data)
                this.state.marketTradeHistory.map((value, key) => {
                  data.push(value)
                })
                this.setState({ marketTradeHistory: data, socketData: receivedMessageData });
              }            
          }
                    
        }catch(error){
          //console.log(error)
        }
      }
    });

    this.props.getMarketTradeHistory({ Pair: pair });
  }

  componentWillUnmount() {
    this.setState({isComponentActive:0});
  }

  componentWillReceiveProps(nextprops) {

    if (nextprops.marketTradeHistory && nextprops.marketTradeHistory !== null) {
      // set Market Trade History list if gets from API only
      this.setState({
        marketTradeHistory: nextprops.marketTradeHistory,
        showLoader: false
      });
    }

    if(nextprops.currentMarketCap && nextprops.currentMarketCap.LastPrice && nextprops.currentMarketCap.LastPrice > 0) {
      this.setState({lastPrice:nextprops.currentMarketCap.LastPrice})
    }

  }

  // Render Component for Market Trade History Order
  render() {

     const MarketTradeData = this.state.marketTradeHistory;
    var indexValue = 0;
    var marketTradeHistoryData = []
    var marketTradeHistoryList = [];
    if (this.state.marketTradeHistory.length !== 0) {

      MarketTradeData.map((newBuyOrder, key) => {

        marketTradeHistoryList.push(

          <MarketTradeRow
            price={newBuyOrder.Price}
            Amount={newBuyOrder.Amount}
            tradetime={newBuyOrder.DateTime}
            Type={newBuyOrder.Type}
            indexValue={indexValue}
            index={indexValue}
            key={indexValue}
            lastPrice={this.state.lastPrice}
          />

        );

        indexValue++;

      });
    }

    return (
      
        
         
          <div className="table-responsive-design m-0">
            {this.props.loading && <JbsSectionLoader />}
            <div className="tradingheader">
                {/* <h4><IntlMessages id="trading.orders.label.tradehistory" /></h4> */}
                <div className="coinbasetitle">{<IntlMessages id="trading.newTrading.markettrade.text"/>}</div>
            </div>
            
            <div className="markettradehis mt-20 pl-10 pr-10">
            <Table className="m-0 p-0">
              <thead>
                <tr>
                  <th>{<IntlMessages id="trading.orders.label.price" />} ({this.props.secondCurrency})</th>
                  <th className="numeric">
                    {<IntlMessages id="trading.orders.label.amount" />} ({this.props.firstCurrency})
                  </th>
                  <th className="numeric">
                    {<IntlMessages id="trading.orders.label.total" />} ({this.props.secondCurrency})
                  </th>
                </tr>
              </thead>
              </Table>
              <Scrollbars
                className="jbs-scroll"
                autoHeight
                autoHeightMin={this.props.autoHeightMin}
                autoHeightMax={this.props.autoHeightMax}
                autoHide
            >
              <Table className="table m-0 p-0">
                <tbody>{marketTradeHistoryList}</tbody>
              </Table>
              
                {this.state.marketTradeHistory.length ===0 &&           
                    <Row className="justify-content-center m-0">      
                        <Col className="text-center text-danger m-0 fs-32 mt-15" sm={12} style={{fontSize:"18px"}} >
                          <IntlMessages id="trading.orders.label.nodata" />                
                        </Col>
                    </Row>              
                }
              </Scrollbars>
            </div>
          </div>

        
      
    );
  }
}

// Set Props when actions are dispatch
/* const mapStateToProps = state => ({
  marketTradeHistory: state.marketTradeHistory.marketHistory,
  loading:state.marketTradeHistory.loading,
  darkMode:state.settings.darkMode
}); */

const mapStateToProps = ({ marketTradeHistory,currentMarketCap,settings }) => {

  return {
    marketTradeHistory:marketTradeHistory.marketHistory,
    loading: marketTradeHistory.loading, 
    currentMarketCap: currentMarketCap.currentMarketCap,
    darkMode:settings.darkMode
  };
  
}

// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
    getMarketTradeHistory,
  })(MarketTrade);
