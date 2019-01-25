// Component for Display Open Orders History By:Tejas Date : 13/9/2018

import React from "react";
import { Table, Row, Col,Card } from 'reactstrap';

// intl messages
import IntlMessages from "Util/IntlMessages";

// import Action
import { getRecentOrderList } from "Actions/Trade";

// import check box and labels
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

//import scroll bar
import { Scrollbars } from "react-custom-scrollbars";

//import section loader
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// function for connect store
import { connect } from "react-redux";

class MyOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      activeOpenOrder: [],
      showLoader: true,
      socketData:[],
      displayOtherPairs:false,
      isComponentActive:1
    };
  }

  // Handle Checkbox for display particular currency Data
  handleChangeDisplayPair =  event => {    
    this.setState({ displayOtherPairs: !this.state.displayOtherPairs});
  };
  
  componentWillMount() {    
    
      // Invoke When Get Response From Socket/SignalR
      this.props.hubConnection.on('RecieveRecentOrder', (openOrderDetail) => {
      
        //console.log("Get Data from signalR RecieveRecentOrder", openOrderDetail);
        if (this.state.isComponentActive === 1 && openOrderDetail !== null) {

          var recentOrders = this.state.activeOpenOrder
          var recentData=[]
          try {

            const openOrderDetailData = JSON.parse(openOrderDetail);
  
            if ((openOrderDetailData.EventTime && this.state.socketData.length === 0) || 
              (this.state.socketData.length !== 0 && openOrderDetailData.EventTime >= this.state.socketData.EventTime) ) {
  
                const newData = openOrderDetailData.Data                
                if(parseFloat(newData.TrnNo) > 0 ) {                  

                  var findIndexOrderId = recentOrders.findIndex(recentOrders => parseFloat(recentOrders.TrnNo) === parseFloat(newData.TrnNo));

                  if(findIndexOrderId === -1){
                    if(parseFloat(newData.Qty) > 0) {                      
                      recentData.push(newData)
                      recentOrders.map((value,key) =>{
                        recentData.push(value)
                      })
                    }

                  } else {

                    if(parseFloat(newData.Qty) > 0){
                      recentOrders[findIndexOrderId] = newData
                      recentData = recentOrders
                    }

                  }
                }
            }
  
            this.setState({ activeOpenOrder: recentData, socketData: openOrderDetailData });

          } catch(error) {
            
          }
        }

      });

      this.props.getRecentOrderList({});
      
  }

  componentWillUnmount() {
    this.setState({isComponentActive:0});
  }
  
  // Used To Set State Data From Props
  componentWillReceiveProps(nextprops) {
   
    if (nextprops.activeOpenOrder.length !== 0) {      
      // set Active My Open Order list if gets from API only
      this.setState({
        activeOpenOrder: nextprops.activeOpenOrder,
        showLoader: false
      });
    }
  }

  // Render Component for Active Open Order
  render() {

    const activeOpenOrder = [];
    if (this.state.activeOpenOrder) {
      this.state.activeOpenOrder.map(value => {
        if(this.state.displayOtherPairs){
          if(value.PairName == this.props.currencyPair){
            activeOpenOrder.push(value);
          }
        }else{
          activeOpenOrder.push(value);
        }        
      });
    }

    return (
     <Card className="cooldexopenorder">
       <Row className="cooldexopentitle">
            <Col md={10} className="p-0">            
            <h3>{<IntlMessages id="trading.newTrading.openhistory.text"/>}</h3>
            </Col>

            <Col md={2} className="p-0">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.displayOtherPairs}
                  onChange={this.handleChangeDisplayPair}              
                  icon={<CheckBoxOutlineBlankIcon  />}
                  checkedIcon={<CheckBoxIcon  />}                
                />
              }
              label={<IntlMessages id="trading.activeorders.hidepairs"/>}
              />
            </Col>
        </Row>
     
        <div className="table-responsive-design">
          {this.props.loading && <JbsSectionLoader />}
          <Table className="m-0 p-0">
            <thead>
              <tr className="bg-light">
                <th>{<IntlMessages id="trading.activeorders.label.pair" />}</th>
                <th className="numeric">
                  {<IntlMessages id="trading.activeorders.label.type" />}
                </th>
                <th className="numeric">
                  {<IntlMessages id="trading.activeorders.label.price" />}
                </th>
                <th className="numeric">
                  {<IntlMessages id="trading.activeorders.label.quantity" />}
                </th>
                <th className="numeric">
                  {<IntlMessages id="trading.activeorders.label.status" />}
                </th>
                <th>{<IntlMessages id="trading.activeorders.label.date" />}</th>
              </tr>
            </thead>
            </Table>

             <Scrollbars
                className="jbs-scroll"
                autoHeight
                autoHeightMin={220}
                autoHeightMax={220}
                autoHide
              >
              <Table className="table m-0 p-0">
                  <tbody>
                     {activeOpenOrder.length !==0 ? 
                activeOpenOrder.map((value, key) => {
                        return <tr key={key}>                          
                          <td className="text-center">{value.PairName}</td>
                          <td 
                            className={
                              value.Type == "BUY" ? "text-success text-center" : "text-danger text-center"
                            }
                          >
                           {value.Type == "BUY" ? <IntlMessages id="sidebar.openOrders.filterLabel.type.buy"/> :
                         <IntlMessages id="sidebar.openOrders.filterLabel.type.sell"/>}
                      </td>
                          <td className="text-center">{value.Price === 0 ? <IntlMessages id="trading.placeorder.label.market" /> : parseFloat(value.Price).toFixed(8)}</td>
                          <td className="text-center">{value.Qty}</td>
                               {/* <td className="text-center">{value.Status}</td> */}
                      <td className="text-center">
                      {value.StatusCode === 1 && <span className="badge badge-success w-40" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.1"/>}</span>}
                      {value.StatusCode === 4 && <span className="badge badge-info w-40" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.4"/>}</span>}                                            
                      {value.StatusCode === 2 && <span className="badge badge-danger w-40" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.2"/>}</span>}
                      {value.StatusCode === 3 && <span className="badge badge-danger w-40" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.3"/>}</span>}
                      {value.StatusCode === 5 && <span className="badge badge-danger w-40" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.5"/>}</span>}
                      {value.StatusCode === 6 && <span className="badge badge-danger w-40" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.6"/>}</span>}
                     
                      </td>
                    <td className="text-center">{value.DateTime.replace('T',' ').split('.')[0]}</td>
                        </tr>
                      })
                      :
                      <tr>
                <td>
                  <Row className="justify-content-center m-0">      
                  <Col className="text-center m-0" sm={12}>
                    <span>
                      <i className="zmdi zmdi-view-list-alt" style={{fontSize:"80px"}}></i><br/>                  
                    </span>      
                    </Col>
    
                    <Col className="text-center text-danger m-0 fs-32" sm={12} style={{fontSize:"18px"}} >
                      <IntlMessages id="trading.activeorders.label.nodata" />                
                    </Col>
                </Row> 
                </td>
              </tr>
                    }
                  </tbody>
              </Table>
            </Scrollbars>
{/* 

           {activeOpenOrder ===0 &&             
            <Row className="justify-content-center m-0">      
              <Col className="text-center m-0" sm={12}>
                <span>
                  <i className="zmdi zmdi-view-list-alt" style={{fontSize:"80px"}}></i><br/>                  
                </span>      
                </Col>

                <Col className="text-center text-danger m-0 fs-32" sm={12} style={{fontSize:"18px"}} >
                  <IntlMessages id="trading.activeorders.label.nodata" />                
                </Col>
            </Row>              
           } */}

        </div>
      </Card>
      
    );
  }
}

// Set Props when actions are dispatch
const mapStateToProps = state => ({
  activeOpenOrder: state.recentOrder.OpenOrder,
  loading: state.recentOrder.loading
});

// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
    getRecentOrderList
  }
)(MyOrder);
