// component for Display Sell And Buy Trade  By Tejas Date:13/9/2018

import React from "react";

import { Card, CardBody,Row ,Col } from "reactstrap";

// import component buy trade
import BuyTrade from "./BuyTrade";

// import component Sell trade
import SellTrade from "./SellTrade";
// import connect function for store
import { connect } from "react-redux";

// import Action
import {
  getSellerOrderList,  
  getBuyerOrderList,  
} from 'Actions/Trade';

//import Buysell iocn
import Updownarrow  from '../../../assets/icon/updownarrow.png';
import Uparrow  from '../../../assets/icon/uparrow.png';
import downarrow  from '../../../assets/icon/downarrow.png';

import $ from 'jquery';

class BuySellTrade extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      sectionReload: true,
      activeIndex: 0,
      displayTable:0,
      sellerOrder:[],
      buyerOrder:[],
      socketBuyData:[],
      socketSellData:[],
      socketLastPriceData :[],
      lastPrice:0,
      UpDown:1,
      //isComponentActive:1,
      loadInterval:'',
      buyOrderBit:0,
      lastPriceRecord:{},
      sellOrderBit:0,
    };

    this.changeOrderBook = this.changeOrderBook.bind(this);
  }
 

  handleChange(event, value) {
    this.setState({ activeIndex: value });
  }

  changeOrderBook = (event,value) =>{   
    //event.preventDefault(); 
    this.setState({
      displayTable:value
    })
  }

   // This will invoke After component render
   componentWillMount() {    
    const pair = this.props.currencyPair

    this.props.getSellerOrderList({ Pair: pair });
    this.props.getBuyerOrderList({ Pair: pair });
    
  }

  componentDidMount(){

    this.isComponentActive = 1;
    
    this.props.hubConnection.on('RecieveLastPrice', (receivedMessage) => {
            
      console.log("Get Data from signalR RecieveLastPrice",receivedMessage);
      if(this.isComponentActive === 1 && receivedMessage !==null ){ 

        try{

          const marketCap = JSON.parse(receivedMessage);          
          if ((marketCap.EventTime && this.state.socketLastPriceData.length === 0) || 
            (this.state.socketLastPriceData.length !== 0 && marketCap.EventTime > this.state.socketLastPriceData.EventTime) ) {     
                
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
     
      console.log("Get Data from signalR RecieveBuyerBook", receivedMessage);
      if (this.isComponentActive ===1 && receivedMessage !== null) {
        
        try {

          const receivedMessageData = JSON.parse(receivedMessage);
          
          if ((receivedMessageData.EventTime && this.state.socketBuyData.length ==0) || 
          (this.state.socketBuyData.length !== 0 && receivedMessageData.EventTime >= this.state.socketBuyData.EventTime) ) {
              
            const newData = receivedMessageData.Data
            
            if(this.props.currencyPair === receivedMessageData.Parameter){
              
              if(parseFloat(newData.Price) !==0 ){
                
                //var latestBuyOrders = this.state.buyerOrder;
                var latestBuyOrders = $.extend(true,[],this.state.buyerOrder);
                
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
                
                this.setState({ buyerOrder: latestBuyOrders, socketBuyData: receivedMessageData });

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

    this.props.hubConnection.on('RecieveSellerBook', (receivedMessage) => {
      
      console.log("Get Data from signalR RecieveSellerBook", receivedMessage);
      if (this.isComponentActive ===1 && receivedMessage !== null) {

        try {
 
          const receivedMessageData = JSON.parse(receivedMessage);
    
          if ((receivedMessageData.EventTime && this.state.socketSellData.length ==0) || 
            (this.state.socketSellData.length !== 0 && receivedMessageData.EventTime >= this.state.socketSellData.EventTime) ) {
            
            const newData = receivedMessageData.Data
            if(this.props.currencyPair === receivedMessageData.Parameter){

              if(parseFloat(newData.Price) !==0 ) {
    
               //var latestSellOrders = this.state.sellerOrder;
               var latestSellOrders = $.extend(true,[],this.state.sellerOrder);

               latestSellOrders.forEach(function(sellOrder,index){ latestSellOrders[index].UpDownBit = 0 });
    
                var findIndexPrice = latestSellOrders.findIndex(sellerOrder => parseFloat(sellerOrder.Price) === parseFloat(newData.Price));
              
                if(findIndexPrice === -1){
    
                  if(parseFloat(newData.Amount) > 0) {
                    newData.UpDownBit = 1
                    latestSellOrders.push(newData)
                  }
    
                } else {
    
                  if(parseFloat(newData.Amount) > 0) {
    
                   latestSellOrders[findIndexPrice].UpDownBit = 1
                   latestSellOrders[findIndexPrice].Amount = newData.Amount
    
                  } else {
                   latestSellOrders.splice(findIndexPrice,1)
                  }

                }
                //console.log("latestSellOrders",latestSellOrders)
                this.setState({ sellerOrder: latestSellOrders, socketSellData: receivedMessageData });

              } else if(parseFloat(newData.Price) === 0 && newData.Amount >= 0) {

                this.setState({ lastPriceRecord: newData, socketSellData: receivedMessageData });
                
              }
              
            }  

         }  
    
        } catch(error) {
          //console.log("sell section error",error)
        }
 
      }
 
     });

  }
 
  componentWillUnmount() {
    this.isComponentActive = 0;
  }

  componentWillReceiveProps(nextprops){

    if(nextprops.buyerOrder && this.state.buyOrderBit !== nextprops.buyerOrderBit){
      
      var lastPriceRecord = {};
      var newBuyerOrderDetail = [];

      nextprops.buyerOrder.map(function(buyOrderDetail,buyOrderIndex) { 
        
        if(parseFloat(buyOrderDetail.Price) === 0 && parseFloat(buyOrderDetail.Amount) > 0) {
          //console.log("in");
          lastPriceRecord = buyOrderDetail;
        } else {
          newBuyerOrderDetail.push(buyOrderDetail);
          //console.log("out",nextprops.buyerOrder[buyOrderIndex]);
        }

      });
      //console.log("nextprops newBuyerOrderDetail",newBuyerOrderDetail);
      this.setState({
        buyerOrder: newBuyerOrderDetail,
        showLoader: false, 
        buyOrderBit:nextprops.buyerOrderBit,
        lastPriceRecord:lastPriceRecord     
      })

    } else if (nextprops.buyerOrder.length === 0  && this.state.buyOrderBit !== nextprops.buyerOrderBit) {

      this.setState({
        buyerOrder: [],
        showLoader: false,
        buyOrderBit:nextprops.buyerOrderBit,
        lastPriceRecord:{}
      })

    }

    if(nextprops.currentMarketCap && nextprops.currentMarketCap.LastPrice && nextprops.currentMarketCap.LastPrice > 0) {
      this.setState({lastPrice:nextprops.currentMarketCap.LastPrice})
    }
    
    if(nextprops.sellerOrder && this.state.sellOrderBit !== nextprops.sellerOrderBit){
      
      var sellerData =[];
      var lastPriceRecord = {};
  
      nextprops.sellerOrder.map((newData,key) =>{
  
        if(parseFloat(newData.Price) === 0 && parseFloat(newData.Amount) > 0) {
          //console.log("in sell");
          lastPriceRecord = buyOrderDetail;
        } else {
          sellerData.push(newData);
          //console.log("out sell",nextprops.sellerOrder[key]);
        }
  
      })
  
      this.setState({
        sellerOrder: sellerData,
        showLoader: false,
        sellOrderBit:nextprops.sellerOrderBit,
        lastPriceRecord:lastPriceRecord
      })
  
    } else if (nextprops.sellerOrder.length === 0  && this.state.sellOrderBit !== nextprops.sellerOrderBit) {
        
      this.setState({
        showLoader: false,
        sellerOrder: [],
        oldState: this.state.sellerOrder,
        sellOrderBit:nextprops.sellerOrderBit,
        lastPriceRecord:{}
      })
  
    }
    
  }


  // Render Component for Buy Sell Tables
  render() {
 //const {price,oldPrice} = this.props;
  // console.log("parent buy state ",this.state.buyerOrder);
  // console.log("parent sell state ",this.state.sellerOrder);

  const { activeIndex } = this.state;
  if(this.state.buyerOrder.length !==0 && (this.state.lastPrice === 0 || this.state.lastPrice === 'undefined')) {
    var firstPrice =  parseFloat(this.state.buyerOrder[0].Price).toFixed(8);     
  } else {
   var firstPrice = parseFloat(this.state.lastPrice).toFixed(8);     
  }

  if(typeof firstPrice === 'undefined' || firstPrice === '' || firstPrice === null || firstPrice === '-') {
    firstPrice = parseFloat(0).toFixed(8);      
  }    
    return (
      <div
        heading=""
        className="col-sm-12 col-md-12 col-lg-12 d-sm-full m-0 p-0"        
      >
      <div className={this.props.darkMode ? 'BuySellleft-darkmode':'BuySellleft'}>
      <Card>      
        <div  className={this.props.darkMode ? "tradingheader_dark" : "tradingheader"}>
         <Row>
                <Col md={8}>
                  <ul>
                    <li><a href="#" onClick={(event) =>this.changeOrderBook(event,0)} className={this.state.displayTable == 0 ? 'active': ''}><img src={Updownarrow} /></a></li>
                    <li><a href="#" onClick={(event) =>this.changeOrderBook(event,1)} className={this.state.displayTable == 1 ? 'active':''}><img src={Uparrow} /></a></li>
                    <li><a href="#" onClick={(event) =>this.changeOrderBook(event,2)} className={this.state.displayTable == 2 ? 'active':''}><img src={downarrow} /></a></li>
                  </ul>
                </Col>
                <Col md={4}>                
                </Col>
              </Row>
            </div> 
              {this.state.displayTable == 0 && 
          <div className="table-responsive-design buysellbasic">
         
              
            <SellTrade
            {...this.props} 
              firstCurrency={this.props.firstCurrency}
              secondCurrency={this.props.secondCurrency}
              currencyPair={this.props.currencyPair}
              firstCurrencyBalance={this.props.firstCurrencyBalance}
              secondCurrencyBalance={this.props.secondCurrencyBalance}
              displayTable={false}  
              autoHeightMin={250}
              autoHeightMax={250}  
              hubConnection={this.props.hubConnection}
              setData = {this.props.setBuyOrders}            
              sellerOrder={this.state.sellerOrder} 
                sellerOrderBit = {this.props.sellerOrderBit}
                lastPrice={this.state.lastPrice}
                lastPriceRecord={this.state.lastPriceRecord}            />

            <BuyTrade
            {...this.props} 
              firstCurrency={this.props.firstCurrency}
              UpDownBit={this.props.UpDownBit}
              secondCurrency={this.props.secondCurrency}
              currencyPair={this.props.currencyPair}
              firstCurrencyBalance={this.props.firstCurrencyBalance}
              secondCurrencyBalance={this.props.secondCurrencyBalance}
              hubConnection={this.props.hubConnection}
              setData = {this.props.setSellOrders}
              displayTable={false}
              autoHeightMin={250}
              autoHeightMax={250}
              buyerOrder={this.state.buyerOrder}
                buyerOrderBit = {this.props.buyerOrderBit}
                lastPrice={this.state.lastPrice}
                lastPriceRecord={this.state.lastPriceRecord}            
            />
          </div>
              }

              {this.state.displayTable == 1 && 
              <div className="table-responsive-design" >
                  <BuyTrade
                  {...this.props} 
                  firstCurrency={this.props.firstCurrency}
                  UpDownBit={this.props.UpDownBit}
                  secondCurrency={this.props.secondCurrency}
                  currencyPair={this.props.currencyPair}
                  firstCurrencyBalance={this.props.firstCurrencyBalance}
                  secondCurrencyBalance={this.props.secondCurrencyBalance}
                  hubConnection={this.props.hubConnection}
                  displayTable={true}
                  setData = {this.props.setSellOrders}
                  autoHeightMin={460}
                  autoHeightMax={460}
                  buyerOrder={this.state.buyerOrder}
                  buyerOrderBit = {this.props.buyerOrderBit}
                  lastPrice={this.state.lastPrice}
                  lastPriceRecord={this.state.lastPriceRecord}
                />
              </div> 
              }

              {this.state.displayTable == 2 && 
                  <div className="table-responsive-design" >
                   <SellTrade
                   {...this.props} 
                    firstCurrency={this.props.firstCurrency}
                    secondCurrency={this.props.secondCurrency}
                    currencyPair={this.props.currencyPair}
                    firstCurrencyBalance={this.props.firstCurrencyBalance}
                    secondCurrencyBalance={this.props.secondCurrencyBalance}
                    hubConnection={this.props.hubConnection}
                    setData = {this.props.setBuyOrders}
                    displayTable={true}
                    autoHeightMin={460}
                    autoHeightMax={460}    
                    sellerOrder={this.state.sellerOrder} 
                    sellerOrderBit = {this.props.sellerOrderBit} 
                    lastPrice={this.state.lastPrice}
                    lastPriceRecord={this.state.lastPriceRecord}
                  />
                  
                  </div>
              }
        {/* </Scrollbars> */}
        </Card>
      </div>
      </div>
    );
  }
}

/* const mapStateToProps = state => ({
  buyerOrder: state.buyerOrder.buyerOrder, 
  sellerOrder: state.sellerOrder.sellerOrder,
  buyerOrderBit:state.buyerOrder.buyerOrderBit, 
  sellerOrderBit:state.sellerOrder.sellerOrderBit, 
  darkMode:state.settings.darkMode
}); */
const mapStateToProps = ({ buyerOrder,sellerOrder,settings,currentMarketCap }) => {

  return {
    buyerOrder: buyerOrder.buyerOrder, 
    sellerOrder: sellerOrder.sellerOrder,
    buyerOrderBit:buyerOrder.buyerOrderBit, 
    sellerOrderBit:sellerOrder.sellerOrderBit, 
    darkMode:settings.darkMode,
    currentMarketCap:currentMarketCap.currentMarketCap,
  };
  
  //return { buyerOrder,buyerOrderBit , sellerOrder,sellerOrderBit,darkMode };
  
}

export default connect(
  mapStateToProps,
  {
    getBuyerOrderList,    
    getSellerOrderList,    
  }
)(BuySellTrade);


