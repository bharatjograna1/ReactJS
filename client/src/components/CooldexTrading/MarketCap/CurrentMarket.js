// Component for displaying Market Cap history Data By:Tejas Date : 12/9/2018

import React from "react";
import { Row,Col,Alert } from "reactstrap";

//import section loader
import JbsPropogateLoader from "Components/JbsPageLoader/JbsPropagateLoader";

// intl messages
import IntlMessages from "Util/IntlMessages";

// import Actions dor market cap list
import { getMarketCapList } from "Actions/Trade";

// import connect function for store
import { connect } from "react-redux";

// create Component
class CurrentMarket extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      langDropdownOpen: false,
      currentMarket: [],
      showLoader: true,
      oldMarketCapData: [],
      socketData:[],
      lastPrice:0,
      oldLastPrice:0,
      socketLastPriceData:[],
      upDownBit:1,
      Change24:0,
      isComponentActive:1
    };    
    }
    
  // This will invoke After component render
  componentWillMount() {
    // Call Actions For Get Market Cap List
    this.props.getMarketCapList({ Pair: this.props.currencyPair });

    this.props.hubConnection.on('RecieveMarketData', (receivedMessage) => {
        
      //console.log("Get Data from signalR  ",receivedMessage);
      if(this.state.isComponentActive === 1 && receivedMessage !==null ) { 

        try {

          const marketCap = JSON.parse(receivedMessage)
          if ((marketCap.EventTime && this.state.socketData.length === 0) || 
            (this.state.socketData.length !== 0 && marketCap.EventTime > this.state.socketData.EventTime) ) {          
            this.setState({
              currentMarket:marketCap.Data,
              oldMarketCapData:this.state.currentMarket,
              socketData : marketCap,
              Change24:this.state.currentMarket.Change24
            })
          }    

        } catch(error) {
          
        }
       
      }

    });

    this.props.hubConnection.on('RecieveLastPrice', (receivedMessage) => {
        
      //console.log("Get Data from signalR  ",receivedMessage);
      if(this.state.isComponentActive === 1 && receivedMessage !==null ){ 

        try{

          const marketCap = JSON.parse(receivedMessage)          
          
          if ((marketCap.EventTime && this.state.socketLastPriceData.length === 0) || 
            (this.state.socketLastPriceData.length !== 0 && marketCap.EventTime > this.state.socketLastPriceData.EventTime) ) {     
               
            this.setState({
              lastPrice:marketCap.Data.LastPrice,
              upDownBit:marketCap.Data.UpDownBit,
              oldLastPrice:this.state.lastPrice,
              socketLastPriceData : marketCap
            })
          }    

        } catch(error)    {
          
        }
       
      }

    });

  }

	// function to toggle dropdown menu
	toggle = () => {
		this.setState({
			langDropdownOpen: !this.state.langDropdownOpen
		});
	}

  componentWillUnmount(){
    this.setState({isComponentActive:0});
    clearInterval(this.timer);
  }
  // This will Invoke when component will recieve Props or when props changed
  componentWillReceiveProps(nextprops) {
    if (nextprops.currentMarketCap) {
      // set Market Cap list if gets from API only
      this.setState({
        oldMarketCapData: this.props.currentMarket,
        currentMarket: nextprops.currentMarketCap,
        showLoader: false
      });
    }
  }

  // Render Component for Current MArket List
  render() {
    
    var price = 0;
    var oldPrice = 0;

    // get price and old price
    if (this.state.currentMarket.length !==0 && this.state.lastPrice ==0) {   
      
      price = this.state.currentMarket.LastPrice;       
    }else if(this.state.currentMarket.length ===0 && this.state.lastPrice ==0 ){
      price =0 
    }
    else{
      price = this.state.lastPrice
    }

    return (
      
        <div className="">
          {this.state.currentMarket ? (            
                  <Row>    
                    <Col md={12}>   
                    {/* {this.state.showLoader && <JbsPropogateLoader loading={true} />} */}
                       <ul className="cooldexcurrentmarkettop">                       
                       <li>
                       <h3>
                        <span>
                            {this.props.firstCurrency+"/"+this.props.secondCurrency}
                          </span>
                        </h3>
                        
                       </li>
                         <li>
                            {this.state.upDownBit ? 
                              <span className="text-center text-success">
                                {parseFloat(price).toFixed(8)} <i className="ti-arrow-up" />
                              </span>
                              :
                              <span className="text-center text-danger">
                              {parseFloat(price).toFixed(8)} <i className="ti-arrow-down" />
                            </span>
                            }
                         </li>
                         <li>
                            <h3>{<IntlMessages id="trading.marketcap.label.24hchange" /> } {this.state.currentMarket.Change24 !==undefined ? parseFloat(this.state.currentMarket.Change24).toFixed(8):0}</h3>   
                         </li>
                         <li>
                            <h3>{<IntlMessages id="trading.marketcap.label.24hhigh" />} {this.state.currentMarket.High24 !== undefined ? parseFloat(this.state.currentMarket.High24).toFixed(8):0}</h3>
                         </li>
                         <li>
                            <h3>{<IntlMessages id="trading.marketcap.label.24hlow" />} {this.state.currentMarket.Low24 !== undefined ? parseFloat(this.state.currentMarket.Low24).toFixed(8):0}</h3>
                         </li>
                         <li>
                            <h3>{<IntlMessages id="trading.marketcap.label.24hvoulme" /> }  {this.state.currentMarket.Volume24 !== undefined ? parseFloat(this.state.currentMarket.Volume24).toFixed(8):0}</h3>  
                        </li>
                       </ul>
                    </Col>                    
                  </Row>             
          ) : (
            <div>
              <span>
              <Alert color="danger" className="text-center fs-32">
                          {<IntlMessages id="trading.marketcap.label.nodata" />}
                    </Alert>                 
              </span>
            </div>
          )}
        </div>

    );
  }
}

// Set Props when actions are dispatch
const mapStateToProps = state => ({
  currentMarketCap: state.currentMarketCap.currentMarketCap,  
});

// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
    getMarketCapList
  }
)(CurrentMarket);
