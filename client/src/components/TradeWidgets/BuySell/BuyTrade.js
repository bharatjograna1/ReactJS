// Component for display Buyer Order Data By:Tejas Date : 13/9/2018


// import scrollbar
import { Scrollbars } from "react-custom-scrollbars";

import React, { Fragment, Component } from "react";
import { Table } from "reactstrap";

import $ from 'jquery';

// intl messages
import IntlMessages from "Util/IntlMessages";

// import for display Loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

import classnames from 'classnames';

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
      buyerOrderList: this.props.buyerOrder,
      modal: false,
      modalInfo: 0,
      sectionReload: false,
      showLoader: false,
      oldState: [],
      grandTotal: 0,
      bulkOrders: [],
      modalBuy: false,
      bulkOrderBit: 0,
      bulkOrderResponse: [],
      lastPrice:this.props.lastPrice,
      UpDown:1,
      isComponentActive:1,
      lastPriceRecord:this.props.lastPriceRecord
    };  
        
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

  
  // This will Invoke when component will recieve Props or when props changed
  componentWillReceiveProps(nextprops) {    
    
    //console.log("buy order props",nextprops);
    //if(nextprops.buyerOrder){
      
      //console.log("nextprops newBuyerOrderDetail",newBuyerOrderDetail);
      this.setState({
        buyerOrderList: nextprops.buyerOrder,
        showLoader: false, 
        lastPriceRecord:nextprops.lastPriceRecord,
        lastPrice:nextprops.lastPrice,
      })

    /* } else {

      this.setState({
        buyerOrderList: [],
        showLoader: false, 
        lastPriceRecord:nextprops.lastPriceRecord,
        lastPrice:nextprops.lastPrice
      })

    } */

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

    const diffLimit = 12 - buyOrderDetail.length;
    // console.log("buyOrderDetail",buyOrderDetail);
    var buyOrderList = [];

    buyOrderDetail.map((newBuyOrder, indexValue) => {

      if(this.props.displayTable === false) { 

        if(indexValue < 12){

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
    
    if(this.props.displayTable === false && diffLimit <= 12) {

      for(var lastIndex = buyOrderDetail.length;lastIndex < 12;lastIndex++) {
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
          <Table className="table m-0 p-0">
          <thead>
              <tr className="text-dark">
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
        {firstPrice !== 0  &&
          <div className={this.props.darkMode ? 'buysellleftupdownmarket-darkmode':'buysellleftupdownmarket'}>
          <div className={classnames((this.props.UpDownBit === 1) ? "text-success" : "text-danger"
            , "text-center p-5 fs-24")}>
            {this.props.UpDownBit === 1 ? <i className="ti-arrow-up text-success"></i> :
              <i className="ti-arrow-down text-danger"></i>} &nbsp;
                 {(firstPrice != 0) && parseFloat(firstPrice).toFixed(8)}

            {(this.props.UpDownBit === 1) ? <i className="material-icons text-success float-right">network_cell</i> :
              <i className="material-icons text-danger float-right">network_cell</i>}
          </div> 
          </div>
        }

         {firstPrice == 0 &&
           <div className={this.props.darkMode ? 'buysellleftupdownmarket-darkmode':'buysellleftupdownmarket'}>
            <div className="text-center fs-24" style={{padding:"4px"}}>
              <i>{parseFloat(0).toFixed(8)}</i>
           </div>
          </div>
        }

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

const mapStateToProps = ({ buyerOrder,/* currentMarketCap ,*/settings }) => {

  return {
    loading: buyerOrder.loading, 
    //currentMarketCap: currentMarketCap.currentMarketCap,
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
