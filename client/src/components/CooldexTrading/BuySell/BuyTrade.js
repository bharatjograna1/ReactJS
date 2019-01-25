// Component for display Buyer Order Data By:Tejas Date : 13/9/2018

// import scrollbar
import { Scrollbars } from "react-custom-scrollbars";

import React, { Fragment, Component } from "react";
import { Table } from "reactstrap";

import $ from 'jquery';

import Divider from "@material-ui/core/Divider";

// intl messages
import IntlMessages from "Util/IntlMessages";

// import for display Loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// import Action 
import {
  getBuyerOrderList,
  doBulkSellOrder,  
} from 'Actions/Trade';

// function for connect store
import { connect } from "react-redux";

import AppConfig from 'Constants/AppConfig';
var buyOrderDepth = AppConfig.totalOrders;

class BuyOrderRow extends Component {
  // User For Open Dislog box For Bulk Order
  bulkOrderProcess(key) {

    if(key < 999) 
      this.props.openModal(key);
  }

  render() {
    var lastClass = "text-success",
      changeClass = "";

      if (this.props.UpDownBit === 1 ) {      
        changeClass = "blink_me";
      }

      const highDepth = this.props.Price !== '-' ? parseFloat(this.props.Amount * 100 / buyOrderDepth).toFixed(2) : 0;

    return (
      <tr
        key={this.props.indexValue.toString()}   
        onClick={() => this.bulkOrderProcess(this.props.indexValue)}
        style={{cursor:"pointer",background: "linear-gradient(rgba(18,184,134,.15),rgba(18,184,134,.15))",
        backgroundRepeat: "no-repeat",
        backgroundSize: (highDepth >= 100 && highDepth ? '100%' : highDepth+"%") }}    
        className={(this.props.UpDownBit === 1)? changeClass + " buyOrderClass" : ''}     
      >
      <td className="text-success">{<IntlMessages id="trading.placeorder.label.buy" />} {this.props.indexValue + 1}</td>
        <td>{this.props.Price !== '-' ? parseFloat(this.props.Price).toFixed(8) : '-'}</td>
        <td className={lastClass}>{this.props.Amount !== '-' ? parseFloat(this.props.Amount).toFixed(8) : '-'}</td>
        <td>{this.props.Price !== '-' ? parseFloat(this.props.Amount * this.props.Price).toFixed(8) : '-'}</td>
      </tr>
    );
  }
}

class BuyTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyerOrderList: this.props.buyerOrderList.length ? this.props.buyerOrderList : [],
      modal: false,
      modalInfo: 0,
      sectionReload: false,
      showLoader: true,
      oldState: [],
      grandTotal: 0,
      bulkOrders: [],
      modalBuy: false,
      bulkOrderBit: 0,
      bulkOrderResponse: [],
      socketData:[],
      socketLastPriceData:[],
      lastPrice:0,
      UpDown:1,
      isComponentActive:1,
      socketBuyData:[],
      buyOrderBit:0,
      lastPriceRecord:{}
    };  

    this.isComponentActive = 1;
  }

  //Open Modal add new Schedule dailog
  setOrders = (index) =>{
    var grandTotal = 0;
    var amount = 0;
    var price = 0
    const bulkOrders = [];

      if (this.state.buyerOrderList.length !==0 ) {
        this.state.buyerOrderList.map((value, key) => {

          if (index >= key) {            
            amount = amount + value.Amount;            
          }

          if(index === key ){
            price=value.Price
          }

        });
      }
      this.props.setData(price,amount)    
  }
  
  componentDidMount(){

    this.props.hubConnection.on('RecieveLastPrice', (receivedMessage) => {
            
        //console.log("Get Data from signalR  ",receivedMessage);
        if(this.state.isComponentActive === 1 && receivedMessage !==null ){ 

          try {

            const marketCap = JSON.parse(receivedMessage);          
            if ((marketCap.EventTime && this.state.socketLastPriceData.length === 0) || 
              (this.state.socketLastPriceData.length > 0 && marketCap.EventTime > this.state.socketLastPriceData.EventTime) ) {     
              //console.log("change last price ",marketCap.Data.LastPrice)    
              this.setState({
                lastPrice:marketCap.Data.LastPrice,
                upDownBit:marketCap.Data.UpDownBit,              
                socketLastPriceData : marketCap
              })

            }         

          } catch(error)    {
            
          }         
             
        }
        
      });

    this.props.hubConnection.on('RecieveBuyerBook', (receivedMessage) => {
     
      //console.log("Get Data from signalR RecieveBuyerBook", receivedMessage);
      if (this.isComponentActive ===1 && receivedMessage !== null) {
        
        try {

          const receivedMessageData = JSON.parse(receivedMessage);
          
          if ((receivedMessageData.EventTime && this.state.socketBuyData.length ==0) || 
          (this.state.socketBuyData.length !== 0 && receivedMessageData.EventTime >= this.state.socketBuyData.EventTime) ) {
              
            const newData = receivedMessageData.Data
            if(this.props.currencyPair === receivedMessageData.Parameter){
              
              if(parseFloat(newData.Price) !==0 ){
                
                var latestBuyOrders = this.state.buyerOrderList;
                
                latestBuyOrders.forEach(function(buyOrder,index){ latestBuyOrders[index].UpDownBit = 0 });
    
                var findIndexPrice = latestBuyOrders.findIndex(buyerOrder => parseFloat(buyerOrder.Price) === parseFloat(newData.Price));
                
                if(findIndexPrice === -1){
                  
                  if(parseFloat(newData.Amount) > 0) {
                    newData.UpDownBit = 1
                    latestBuyOrders.push(newData)
                  }
                  
                } else {
                  
                  if(parseFloat(newData.Amount) > 0){
                    
                    latestBuyOrders[findIndexPrice].UpDownBit = 1
                    latestBuyOrders[findIndexPrice].Amount = newData.Amount
                  } else {
                    
                    latestBuyOrders.splice(findIndexPrice,1)
                  }
                  
                }
                
                this.setState({ buyerOrderList: latestBuyOrders, socketBuyData: receivedMessageData });

              } else if(parseFloat(newData.Price) === 0 && newData.Amount >= 0) {

                this.setState({ lastPriceRecord: newData, socketBuyData: receivedMessageData });
                
              }
              
            }           
    
          }
    
        } catch(error) {
          // console.log(error);
        }

      }

    });

  }

  componentWillUnmount() {
    this.isComponentActive = 0;
  }
   // This will Invoke when component will recieve Props or when props changed
  componentWillReceiveProps(nextprops) {    
    
    //console.log("buy order props",nextprops);
    if(nextprops.buyerOrderList && this.state.buyOrderBit !== nextprops.buyerOrderBit){
      
      var lastPriceRecord = {};
      var newBuyerOrderDetail = [];

      nextprops.buyerOrderList.map(function(buyOrderDetail,buyOrderIndex) { 
        
        if(parseFloat(buyOrderDetail.Price) === 0 && parseFloat(buyOrderDetail.Amount) > 0) {
          //console.log("in");
          lastPriceRecord = buyOrderDetail;
        } else {
          newBuyerOrderDetail.push(buyOrderDetail);
          //console.log("out",nextprops.buyerOrderList[buyOrderIndex]);
        }

      });
      //console.log("nextprops newBuyerOrderDetail",newBuyerOrderDetail);
      this.setState({
        buyerOrderList: newBuyerOrderDetail,
        showLoader: false, 
        buyOrderBit:nextprops.buyerOrderBit,
        lastPriceRecord:lastPriceRecord     
      })

    } else if (nextprops.buyerOrderList.length === 0  && this.state.buyOrderBit !== nextprops.buyerOrderBit) {

      this.setState({
        buyerOrderList: [],
        showLoader: false,
        buyOrderBit:nextprops.buyerOrderBit,
        lastPriceRecord:{}
      })

    }

    if(nextprops.currentMarketCap && nextprops.currentMarketCap.LastPrice && nextprops.currentMarketCap.LastPrice > 0) {
      this.setState({lastPrice:nextprops.currentMarketCap.LastPrice})
    }

  }

  // Render Component for Buyer Order
  render() {

    const { buyerOrderList , lastPriceRecord,lastPrice} = this.state;
    
    var buyOrderDetail = $.extend(true,[],buyerOrderList);
    var lastPriceRecordDetail = $.extend(true,[],lastPriceRecord);

    //console.log("LastPrice ",lastPrice);
    //console.log("LastPriceRecord ",lastPriceRecordDetail);
    //console.log("buyOrderDetail ",buyOrderDetail);
    if(lastPrice > 0 && lastPriceRecordDetail && lastPriceRecordDetail.Amount > 0) {

      var findLastPriceIndex = buyOrderDetail.findIndex(buyerOrder => parseFloat(buyerOrder.Price) === parseFloat(lastPrice));
      //console.log("findLastPriceIndex",findLastPriceIndex);          
      if(findLastPriceIndex === -1){
        
        lastPriceRecordDetail.UpDownBit = 1;
        lastPriceRecordDetail.Price = lastPrice;
        buyOrderDetail.push(lastPriceRecordDetail)

      } else {
        //console.log("findLastPriceIndex Amount",buyOrderDetail[findLastPriceIndex].Amount,lastPriceRecordDetail.Amount);
        buyOrderDetail[findLastPriceIndex].UpDownBit = 1
        buyOrderDetail[findLastPriceIndex].Amount = buyOrderDetail[findLastPriceIndex].Amount + lastPriceRecordDetail.Amount;

      }
        
    }

    buyOrderDetail.sort(function(a, b) {      
      return parseFloat(b.Price) - parseFloat(a.Price)
    })

    //console.log("buy trade",this.state.buyerOrderList);
    buyOrderDepth = Math.max.apply(Math, buyOrderDetail.map(function(o) { return o.Amount; }))
    
    //console.log("buyOrderDetail",buyOrderDetail,buyOrderDetail.length);
    $(".buyOrderClass").removeClass('blink_me');
    var firstPrice = 0;

    const diffLimit = 5 - buyOrderDetail.length;
    // console.log("buyOrderDetail",buyOrderDetail);
    var buyOrderList = [];

    buyOrderDetail.map((newBuyOrder, indexValue) => {

      if(this.props.displayTable === false) { 

        if(indexValue < 5){

          buyOrderList.push(<BuyOrderRow
            key={indexValue}        
            Price={newBuyOrder.Price}
            Amount={newBuyOrder.Amount}        
            openModal={this.setOrders}
            indexValue={indexValue}
            UpDownBit={newBuyOrder.UpDownBit}
          />);

        }

      } else {

        buyOrderList.push(<BuyOrderRow
          key={indexValue}        
          Price={newBuyOrder.Price}
          Amount={newBuyOrder.Amount}        
          openModal={this.setOrders}
          indexValue={indexValue}
          UpDownBit={newBuyOrder.UpDownBit}
        />);

      }     

    });
    
    if(this.props.displayTable === false && diffLimit <= 5) {

      for(var lastIndex = buyOrderDetail.length;lastIndex < 5;lastIndex++) {
        buyOrderList.push(<BuyOrderRow
          key={lastIndex}        
          Price={"-"}
          Amount={"-"}        
          openModal={this.setOrders}
          indexValue={lastIndex}
          UpDownBit={0}
        />);
      }

    }

    if(buyOrderDetail.length !==0 && (lastPrice === 0 || lastPrice === 'undefined')) {
      var firstPrice = buyOrderDetail[0].Price
    } else {
     var firstPrice = lastPrice
    }

    if(typeof firstPrice === 'undefined' || firstPrice === '' || firstPrice === null || firstPrice === '-') {
      firstPrice = 0;
    }
    
    return (
      <Fragment >      
        {this.props.loading &&
          <JbsSectionLoader />
        }

        {this.props.displayTable === true &&         
          <Table className="m-0 p-0">
            <thead>
              <tr className="text-dark">
              <th></th>
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
        } 
<Divider className="dividerbuyselltrade"/>
        {/* {firstPrice !== 0  &&
        <div className="updownmarket">
          <div className={classnames((this.props.UpDownBit === 1) ? "text-success" : "text-danger"
            , "text-center fs-24")}>
            {this.props.UpDownBit === 1 ? <i className="ti-arrow-up text-success"></i> :
              <i className="ti-arrow-down text-danger"></i>} &nbsp;
                 {(firstPrice != 0) && parseFloat(firstPrice).toFixed(8)}

            {(this.props.UpDownBit === 1) ? <i className="material-icons text-success float-right">network_cell</i> :
              <i className="material-icons text-danger float-right">network_cell</i>}
          </div> 
          </div>
        }        */}

        {this.props.displayTable === true &&
        <Scrollbars
        className="jbs-scroll"
        autoHeight
        autoHeightMin={this.props.autoHeightMin}
        autoHeightMax={this.props.autoHeightMax}
        autoHide
      >
         <Table className="table m-0 p-0">               
          <tbody>
            {buyOrderList}
          </tbody>   
          </Table>
          </Scrollbars>  
      }
      {this.props.displayTable === false &&         
        <Table className="table m-0 p-0">
          <tbody>
            {buyOrderList}
          </tbody>
        </Table>       
      }  
      </Fragment>
    );
  }
}

const mapStateToProps = ({ buyerOrder,currentMarketCap,settings }) => {

  return {
    loading: buyerOrder.loading, 
    currentMarketCap: currentMarketCap.currentMarketCap,
    darkMode:settings.darkMode
  };
  
}

/* // Set Props when actions are dispatch
const mapStateToProps = state => ({
   //buyerOrder: state.buyerOrder.buyerOrder,  
  loading:state.buyerOrder.loading,
  darkMode:state.settings.darkMode,
  currentMarketCap: state.currentMarketCap.currentMarketCap
}); */

// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
    
  }
)(BuyTrade);
