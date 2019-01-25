// component for Display Sell And Buy Trade  By Tejas Date:13/9/2018

import React from "react";

// import component buy trade
import BuyTrade from "./BuyTrade";

// intl messages
import IntlMessages from "Util/IntlMessages";

// import component Sell trade
import SellTrade from "./SellTrade";
// import connect function for store
import { connect } from "react-redux";

// import Action
import {
  getSellerOrderList,  
  getBuyerOrderList,  
} from 'Actions/Trade';

import Typography from '@material-ui/core/Typography';

function TabContainer({ children }) {
  return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
          {children}
      </Typography>
  );
}

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
      loadInterval:''
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
   componentDidMount() {    
    const pair = this.props.currencyPair

    this.props.getSellerOrderList({ Pair: pair });
    this.props.getBuyerOrderList({ Pair: pair });
    
  }

  //componentWillMount(){
  componentDidMount(){

    this.isComponentActive = 1;
    
    this.props.hubConnection.on('RecieveLastPrice', (receivedMessage) => {
            
      //console.log("Get Data from signalR  ",receivedMessage);
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

  }

  componentWillUnmount() {
    //this.setState({isComponentActive:0});
    this.isComponentActive = 0;
  }

  componentWillReceiveProps(nextprops){
    
    if(nextprops.buyerOrder && this.state.buyOrderBit !== nextprops.buyerOrderBit){
      var buyerData=[]       

      nextprops.buyerOrder.map((newData,key) =>{
        newData.UpDownBit = 0;
        buyerData.push(newData)
      })

      this.setState({
        buyerOrder: buyerData,
      })

    } else if (nextprops.buyerOrder.length === 0  && this.state.buyOrderBit !== nextprops.buyerOrderBit) {
      this.setState({
        buyerOrder: []
      })
    }

    if(nextprops.sellerOrder && this.state.sellOrderBit !== nextprops.sellerOrderBit){
      
      var sellerData=[]      
      nextprops.sellerOrder.map((newData,key) =>{
        newData.UpDownBit = 0;
        sellerData.push(newData)
      })
      
      sellerData.sort(function(a, b) {      
        return parseFloat(b.Price) - parseFloat(a.Price)
      })

      this.setState({
        sellerOrder: sellerData,
      })    

    } else if (nextprops.sellerOrder.length === 0  && this.state.sellOrderBit !== nextprops.sellerOrderBit) {
      this.setState({
        sellerOrder: []
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
      
      <div>
        <div className="activetitle">
        <h3>{<IntlMessages id="trading.newTrading.activetardes.text"/>}</h3>
        <h5><IntlMessages id="trading.marketcap.label.lastprice" /> {" " + firstPrice + " "} ({this.props.secondCurrency})</h5>
        </div>
        {/* <span>Last Price 0.4712 USDT</span> */}
          {this.state.displayTable === 0 ?          
            <div className="" >
              
              <SellTrade  firstCurrency={this.props.firstCurrency}
                          secondCurrency={this.props.secondCurrency}
                          currencyPair={this.props.currencyPair}
                          firstCurrencyBalance={this.props.firstCurrencyBalance}
                          secondCurrencyBalance={this.props.secondCurrencyBalance}
                          displayTable={false}
                          autoHeightMin={118}
                          autoHeightMax={118}
                          hubConnection={this.props.hubConnection}
                          setData = {this.props.setBuyOrders}
                          sellerOrderList={this.state.sellerOrder}
                          sellerOrderBit = {this.props.sellerOrderBit}
                        />

              <BuyTrade   firstCurrency={this.props.firstCurrency}
                          UpDownBit={this.props.UpDownBit}
                          secondCurrency={this.props.secondCurrency}
                          currencyPair={this.props.currencyPair}
                          firstCurrencyBalance={this.props.firstCurrencyBalance}
                          secondCurrencyBalance={this.props.secondCurrencyBalance}
                          autoHeightMin={118}
                          displayTable={false}
                          autoHeightMax={118}
                          hubConnection={this.props.hubConnection}                
                          setData = {this.props.setSellOrders}
                          buyerOrderList={this.state.buyerOrder}
                          buyerOrderBit = {this.props.buyerOrderBit}
                        />
              {/* <Row className="groupbox">
                  <Col sm={6}><IntlMessages id="trading.newTrading.buyselltrade.group" /> </Col>
                  <Col sm={6} className="text-right pt-5">0.0000</Col>
                  <Col sm={6} className="text-right"><Link to="/"><IntlMessages id="trading.newTrading.buyselltrade.more" /></Link></Col> 
              </Row> */}
            </div>    : ''      
          }

          {this.state.displayTable === 1 ?        
            <div className="" >            
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
                          autoHeightMin={120}
                          autoHeightMax={120}
                          buyerOrder={this.state.buyerOrder} 
                        />
            </div>     : ''     
          }

          {this.state.displayTable === 2 ?          
            <div className="table-responsive-design tradingbuysell" >            
              <SellTrade
                        {...this.props} 
                            firstCurrency={this.props.firstCurrency}
                            secondCurrency={this.props.secondCurrency}
                            currencyPair={this.props.currencyPair}
                            firstCurrencyBalance={this.props.firstCurrencyBalance}
                            secondCurrencyBalance={this.props.secondCurrencyBalance}
                            displayTable={true}
                            autoHeightMin={120}
                            autoHeightMax={120}
                            hubConnection={this.props.hubConnection}
                            setData = {this.props.setBuyOrders}
                            sellerOrder={this.state.sellerOrder}
                          />
            </div>  : ''
          }
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
const mapStateToProps = ({ buyerOrder,sellerOrder,settings }) => {

  return {
    buyerOrder: buyerOrder.buyerOrder, 
    sellerOrder: sellerOrder.sellerOrder,
    buyerOrderBit:buyerOrder.buyerOrderBit, 
    sellerOrderBit:sellerOrder.sellerOrderBit, 
    darkMode:settings.darkMode
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


