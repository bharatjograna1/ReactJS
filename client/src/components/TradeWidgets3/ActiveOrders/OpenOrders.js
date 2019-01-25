// Component for Display My Orders History By:Tejas Date : 13/9/2018

import React, { Fragment } from "react";
// import modal dialog boxes
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button,Row, Col } from "reactstrap";

//  Used For Display Notification 
import { NotificationManager } from "react-notifications";

// intl messages
import IntlMessages from "Util/IntlMessages";

// Display Alert Box
import { Alert } from 'reactstrap';

// import Action For Get Open Order Records
import { getRecentOrderList } from "Actions/Trade";

// import scrollbar
import { Scrollbars } from "react-custom-scrollbars";

// import loader for section
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// import connect function
import { connect } from "react-redux";

class MyOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      activeOpenOrder: [],      
      showLoader: true,
      socketData:[]
    };    
  }


  componentWillMount() {

    this.isComponentActive = 1;

    // Invoke When Get Response From Socket/SignalR
    this.props.hubConnection.on('RecieveRecentOrder', (openOrderDetail) => {
    
      //console.log("Get Data from signalR RecieveRecentOrder", openOrderDetail);
      if (this.isComponentActive === 1 && openOrderDetail !== null) {

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
    //this.setState({isComponentActive:0});
    this.isComponentActive = 0;
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
      <Fragment>
          <div className="table-responsive-design" >
            
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
              autoHeightMin={180}
              autoHeightMax={180}
              autoHide
            >
            {this.props.loading && <JbsSectionLoader />}
            <Table className="m-0 p-0">
              <tbody>
                  {activeOpenOrder !==0 && 
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
                      {value.StatusCode === 1 && <span className="badge badge-success w-50" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.1"/>}</span>}
                      {value.StatusCode === 4 && <span className="badge badge-info w-50" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.4"/>}</span>}                                            
                      {value.StatusCode === 2 && <span className="badge badge-danger w-50" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.2"/>}</span>}
                      {value.StatusCode === 3 && <span className="badge badge-danger w-50" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.3"/>}</span>}
                      {value.StatusCode === 5 && <span className="badge badge-danger w-50" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.5"/>}</span>}
                      {value.StatusCode === 6 && <span className="badge badge-danger w-50" style={{fontSize:'12px'}}>{<IntlMessages id="myorders.response.status.6"/>}</span>}
                     
                      </td>
                    <td className="text-center">{value.DateTime.replace('T',' ').split('.')[0]}</td>
                        </tr>
                      })
                    }
                  </tbody>                                      
            </Table>
            </Scrollbars>


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
           }
            
          </div>
      </Fragment>
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
