// Component for display Seller Order Data By:Tejas Date : 13/9/2018

import React, { Fragment, Component } from "react";

import $ from 'jquery';

// import scrollbar
import { Scrollbars } from "react-custom-scrollbars";

import classnames from 'classnames';

// components for modal/ dialog box
import { Table} from "reactstrap";

// Import For Loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// intl messages
import IntlMessages from "Util/IntlMessages";

// function for connect store
import { connect } from "react-redux";

import AppConfig from 'Constants/AppConfig';
import { Divider } from "@material-ui/core";
var sellorDepth = AppConfig.totalOrders;

class SellOrderRow extends Component {
  // Function for Open Dislog box For Bulk Order
  bulkOrderProcess(key) {
    if(key < 999)
      this.props.placeOrder(key);
  }

  render() {
    var lastClass = "text-danger",
      changeClass = "";

    if (this.props.UpDownBit === 1 ) {      
      changeClass = "blink_me";
    }

    const highDepth = this.props.Price !== '-' ? parseFloat(this.props.Amount * 100 / sellorDepth).toFixed(2) : 0;

    return (
      <tr
        key={this.props.indexValue.toString()}              
        onClick={() => this.bulkOrderProcess(this.props.indexValue)}
        style={{cursor:"pointer",background: "linear-gradient(rgba(250,82,82,.15),rgba(250,82,82,.15))",
          backgroundRepeat: "no-repeat",
          backgroundSize: (highDepth >= 100 ? '100%' : highDepth+"%") }}    
          className={(this.props.UpDownBit === 1)? changeClass + " sellOrderClass" : ''}     
      >
        <td>{this.props.Price !== '-' ? parseFloat(this.props.Price).toFixed(8) : '-'}</td>
        <td className={lastClass}>{this.props.Amount !== '-' ? parseFloat(this.props.Amount).toFixed(8) : '-'}</td>
        <td>{this.props.Price !== '-' ? parseFloat(this.props.Amount * this.props.Price).toFixed(8) : '-'}</td>
      </tr>
    );
  }
}

class SellTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerOrderList: this.props.sellerOrder,
      sectionReload: false,
      showLoader: false,
      oldState: [],
      grandTotal: 0,
      bulkOrders: [],              
      lastPrice:this.props.lastPrice,
      lastPriceRecord:this.props.lastPriceRecord,
    };    
    
    this.isComponentActive = 1; 

  }

  setOrders = (index) =>{
    
    var amount = 0;
    var price = 0    

      if (this.state.sellerOrderList.length !==0 ) {    
           
        this.state.sellerOrderList.map((value, key) => {    
          
         if(key >= index){
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
    
    /* console.log("sell order props",nextprops);
    if(nextprops.sellerOrder){ */
      
      this.setState({
        sellerOrderList: nextprops.sellerOrder,
        showLoader: false, 
        lastPriceRecord:nextprops.lastPriceRecord,
        lastPrice:nextprops.lastPrice,
      })

    /* } else {

      this.setState({
        sellerOrderList: [],
        showLoader: false, 
        lastPriceRecord:nextprops.lastPriceRecord,
        lastPrice:nextprops.lastPrice
      })

    } */
  
  }

  componentWillUnmount() {
    
  } 

  // Render Component for Seller Order
  render() {
        
    const { sellerOrderList , lastPriceRecord, lastPrice} = this.state;

    var sellOrderDetail = $.extend(true,[],sellerOrderList);
    var lastPriceRecordDetail = $.extend(true,[],lastPriceRecord);

    //console.log("LastPrice Sell",lastPrice);
    //console.log("LastPriceRecord Sell",lastPriceRecordDetail);
    //console.log("sellOrderDetail ",sellOrderDetail);
    if(lastPrice > 0 && lastPriceRecordDetail && lastPriceRecordDetail.Amount > 0) {

      var findLastPriceIndex = sellOrderDetail.findIndex(buyerOrder => parseFloat(buyerOrder.Price) === parseFloat(lastPrice));
                
      if(findLastPriceIndex === -1){
        
        lastPriceRecordDetail.UpDownBit = 1;
        lastPriceRecordDetail.Price = lastPrice;
        sellOrderDetail.push(lastPriceRecordDetail)

      } else {
        
        sellOrderDetail[findLastPriceIndex].UpDownBit = 1
        sellOrderDetail[findLastPriceIndex].Amount = sellOrderDetail[findLastPriceIndex].Amount + lastPriceRecordDetail.Amount;

      }
        
    }

    sellOrderDetail.sort(function(a, b) {      
      return parseFloat(b.Price) - parseFloat(a.Price)
    })

    sellorDepth = Math.max.apply(Math, sellOrderDetail.map(function(o) { return o.Amount; }))

    var sellOrderListRow = [];
    
    $(".sellOrderClass").removeClass('blink_me');

    const diffLimit = 12 - sellOrderDetail.length;
    var countSell = sellOrderDetail.length;
    //console.log("diffLimit sell",diffLimit);
    //console.log("sellOrderDetail",sellOrderDetail);
    var lastIndex = 0
    if(this.props.displayTable === false && diffLimit <= 12) {
      var countSell = 4;
      for(;lastIndex < diffLimit ; lastIndex++) {
        
        sellOrderListRow.push(
          <SellOrderRow
            key={lastIndex}
            Price={"-"}
            Amount={"-"}
            indexValue={countSell--}
            placeOrder={this.setOrders}
            UpDownBit={0}
            length = {sellOrderDetail.length}
          />
        );

      }
      
    }

    sellOrderDetail.map((newSellOrder, indexValue) => {

      if(this.props.displayTable === false){ 

        if(lastIndex < 12){

          sellOrderListRow.push(
            <SellOrderRow
              key={lastIndex}
              Price={newSellOrder.Price}
              Amount={newSellOrder.Amount}
              indexValue={countSell--}
              placeOrder={this.setOrders}
              UpDownBit={newSellOrder.UpDownBit}
              length = {sellOrderDetail.length}
            />
          );

        }
        
        lastIndex++;

      } else {

        sellOrderListRow.push(
          <SellOrderRow
            key={indexValue}
            Price={newSellOrder.Price}
            Amount={newSellOrder.Amount}
            indexValue={countSell--}
            placeOrder={this.setOrders}
            UpDownBit={newSellOrder.UpDownBit}
            length = {sellOrderDetail.length}
          />
        );

      }
        
    });

    if(sellOrderDetail.length !==0){
      var firstPrice = sellOrderDetail[sellOrderDetail.length - 1].Price
    } else {
      var firstPrice = 0;
    }

    return (
      <Fragment>
        {this.props.loading && <JbsSectionLoader />}
        {this.props.displayTable === false ?
         <div>
          <Table className="m-0 p-0">
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

            <Table className="m-0 p-0">  
              <tbody>{sellOrderListRow}</tbody>
            </Table>   

         </div> :
         <div>
          <Table className="m-0 p-0">
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
            <Scrollbars
              className="jbs-scroll"
              autoHeight
              autoHeightMin={this.props.autoHeightMin}
              autoHeightMax={this.props.autoHeightMax}
              autoHide
            >
            <Table className="m-0 p-0">
              <tbody>{sellOrderListRow}</tbody>
            </Table> 
          </Scrollbars>  
        </div>    
        }
        <Divider/>
         {(this.props.displayTable && firstPrice !== 0 ) &&
        <div className="updownmarket">
          <div className={classnames((this.props.UpDownBit === 1) ? "text-success" : "text-danger"
            , "text-center fs-24")} style={{padding:"9px"}}>
            {this.props.UpDownBit === 1 ? <i className="ti-arrow-up text-success"></i> :
              <i className="ti-arrow-down text-danger"></i>} &nbsp;
                 {(firstPrice !== 0) ? parseFloat(firstPrice).toFixed(8) : parseFloat(0).toFixed(8) }

            {(this.props.UpDownBit === 1) ? <i className="material-icons text-success float-right">network_cell</i> :
              <i className="material-icons text-danger float-right">network_cell</i>}
          </div> 
          </div> 
        }

        {(this.props.displayTable && firstPrice == 0 ) &&
           <div className="updownmarket">
            <div className="text-center fs-24" style={{padding:"9px"}}>
              <i>{parseFloat(0).toFixed(8)}</i>
           </div>
          </div>
        }
      </Fragment>
      
    );
  }
}

// Set Props when actions are dispatch
const mapStateToProps = state => ({
  //sellerOrder: state.sellerOrder.sellerOrder,  
  loading:state.sellerOrder.loading,
  darkMode:state.settings.darkMode,
  //currentMarketCap: state.currentMarketCap.currentMarketCap
});

// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
       
  }
)(SellTrade);
