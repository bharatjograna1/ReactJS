// Component for Display My Orders History By:Tejas Date : 13/9/2018

import React, { Fragment } from "react";
// import modal dialog boxes
import { Table, Modal, ModalBody, ModalFooter, Button } from "reactstrap";

// import For Display notification
import { NotificationManager } from "react-notifications";

import { Row, Col,Card } from 'reactstrap';

// intl messages
import IntlMessages from "Util/IntlMessages";

// import check box and labels
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

// Display Alert Box
import { Alert } from 'reactstrap';

// import Action For Get Open Order Records
import { getOpenOrderList, doCancelOrder } from "Actions/Trade";

// import scrollbar
import { Scrollbars } from "react-custom-scrollbars";

// import loader for section
import JbsSectionLoader from "Components/JbsPageLoader/JbsLoader";

// import connect function
import { connect } from "react-redux";

class OpenOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      activeMyOpenOrder: [],
      modal: false,
      modalInfo: -1,
      sectionReload: false,
      showLoader: true,
      socketData:[],
      cancelOrderSuccess:false,
      displayOtherPairs:false,
      isComponentActive:1
    };
    this.openModal = this.openModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  //Open Modal add new Schedule dailog
  openModal(index) {
    this.setState({ modalInfo: index, modal: true });
  }

  // handle close add new Schedule dailog
  handleClose() {
    this.setState({ modal: false,modalInfo:-1,cancelOrderSuccess:false, sectionReload: false});
  }

  // Handle Checkbox for display particular currency Data
  handleChangeDisplayPair =  event => {    
    this.setState({ displayOtherPairs: !this.state.displayOtherPairs});
  };

  // function for cancel order
  cancelOrder(total) {
    this.setState({ sectionReload: true });

    var currrentOrder = {};
    // itrerate object and get particular order
    if (this.state.activeMyOpenOrder) {
      this.state.activeMyOpenOrder.map((value, key) => {
        if (key === this.state.modalInfo) {
          currrentOrder = value;
         }
      });
    }

    // call action for cancel order
    this.props.doCancelOrder({ Order: currrentOrder });
  }

  // This will invoke Before component render
  componentWillMount() {         
    const pair = this.props.currencyPair;
    this.isComponentActive = 1;
    // Call When Get Data From Socket/SignalR
      //this.props.hubConnection.on('RecieveActiveOrder', (openOrderDetail) => {
      this.props.hubConnection.on('RecieveOpenOrder', (openOrderDetail) => {
        //console.log("call from SignalR RecieveOpenOrder",openOrderDetail);
        if (this.isComponentActive === 1 && openOrderDetail !== null) {

          var openorders = this.state.activeMyOpenOrder;          
          var opendata = [] 
          try {

            const openOrderDetailData = JSON.parse(openOrderDetail);
  
            if ((openOrderDetailData.EventTime && this.state.socketData.length === 0) || 
              (this.state.socketData.length !== 0 && openOrderDetailData.EventTime >= this.state.socketData.EventTime) ) {
  
                const newData = openOrderDetailData.Data
                if(parseFloat(newData.Price) >= 0 ) {

                  var findIndexOrderId = openorders.findIndex(openorders => parseFloat(openorders.Id) === parseFloat(newData.Id));

                  if(findIndexOrderId === -1){
                    
                    if(parseFloat(newData.Amount) > 0) { 
                      opendata.push(newData)     
                      openorders.map((value,key) =>{
                        opendata.push(value)
                      })                
                      //openorders.push(newData)
                    }

                  } else {

                    if(parseFloat(newData.Amount) > 0){
                      openorders[findIndexOrderId].Amount = newData.Amount
                      opendata = openorders
                    } else {
                      openorders.splice(findIndexOrderId,1)
                      opendata = openorders
                    }
                    
                  }

                }     

            }

            this.setState({ activeMyOpenOrder: opendata, socketData: openOrderDetailData });

          }catch(error){
            
          }
        }
        
      });

      this.props.getOpenOrderList({});

  }

  componentWillUnmount() {
    this.isComponentActive = 0;
  }
  
  // This will Invoke when component will recieve Props or when props changed
  componentWillReceiveProps(nextprops) {

    if (nextprops.activeMyOpenOrder.length !== 0 ) {
      
      // set Active My Open Order list if gets from API only
      this.setState({
        activeMyOpenOrder: nextprops.activeMyOpenOrder,
        showLoader: false
      });
    }

    if (nextprops.activeMyOpenOrder.length === 0) {
      this.setState({
        activeMyOpenOrder: [],
        showLoader: false
      });
    }

    if(nextprops.cancelOrder && this.state.sectionReload) {

      if(nextprops.cancelOrder.statusCode === 200 && nextprops.cancelOrder.ErrorCode == 4643){        
        NotificationManager.success(<IntlMessages id={`openorder.cancelorder.message.${nextprops.cancelOrder.ErrorCode}`} />);
      }
      this.setState({
        ...this.state,
        showLoader: false,
        sectionReload:false,
        modalInfo:-1,
        modal:false,
        //cancelOrderSuccess:true
      });
    }

  }

  render() {
    const activeMyOpenData = [];
    if (this.state.activeMyOpenOrder) {
      this.state.activeMyOpenOrder.map(value => {
        if(this.state.displayOtherPairs){
          if(value.PairName == this.props.currencyPair){
            activeMyOpenData.push(value);
          }
        }else{
          activeMyOpenData.push(value);
        }
        
      });
    }

    return (
      <Fragment>
        <Card className="cooldexopenorder">
        <Row className="cooldexopentitle"> 
            <Col md={10} className="p-0">
            <h3>{<IntlMessages id="trading.newTrading.openorder.text"/>}</h3>
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
        
          <div className="table-responsive-design" >
            {this.props.loading && <JbsSectionLoader />}
            <Table className="m-0 p-0">
              <thead>
                <tr className="bg-light">
                  <th>
                    {" "}
                    {<IntlMessages id="trading.activeorders.label.pair" />}
                  </th>
                  <th className="numeric">
                    {" "}
                    {<IntlMessages id="trading.activeorders.label.type" />}
                  </th>
                  <th className="numeric">
                    {" "}
                    {<IntlMessages id="trading.activeorders.label.price" />}
                  </th>
                  <th className="numeric">
                    {" "}
                    {<IntlMessages id="trading.activeorders.label.amount" />}
                  </th>
                  <th className="numeric">
                    {" "}
                    {<IntlMessages id="trading.activeorders.label.date" />}
                  </th>
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
                  {activeMyOpenData.length !==0 ?
                  activeMyOpenData.map((value, key) => {
                    return <tr
                      style={{ cursor: "pointer" }}
                      key={key}
                      onClick={() => this.openModal(key)}
                    >                      
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
                      <td className="text-center">{parseFloat(value.Amount).toFixed(8)}</td>
                      <td className="text-center">{value.TrnDate.replace('T',' ').split('.')[0]}</td>
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

            <Modal isOpen={this.state.modal} className="myorderview">
            <h1 className="text-center mt-10">{<IntlMessages id="trading.activeorders.cancelorder.title" />}</h1>
                
              {this.props.cancelOrderLoading && <JbsSectionLoader />}

              <ModalBody>
                <div className="table-responsive">
                  <Table className="table m-0 p-0 hover bordered striped">
                    <thead>
                      <tr className="bg-primary text-white">
                       <th className="text-center">
                          {" "}
                          {
                            <IntlMessages id="trading.activeorders.label.pair" />
                          }
                        </th>
                        <th className="numeric text-center">
                          {" "}
                          {
                            <IntlMessages id="trading.activeorders.label.type" />
                          }
                        </th>
                        <th className="numeric text-center">
                          {" "}
                          {
                            <IntlMessages id="trading.activeorders.label.price" />
                          }
                        </th>
                        <th className="numeric text-center">
                          {" "}
                          {
                            <IntlMessages id="trading.activeorders.label.amount" />
                          }
                        </th>
                        <th className="numeric text-center">
                          {" "}
                          {<IntlMessages id="trading.activeorders.label.date" />}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeMyOpenData.length ? (
                        activeMyOpenData.map(
                          (value, key) =>
                            key === this.state.modalInfo && (
                              <tr key={key}>                                
                                <td className="text-center">{value.PairName}</td> 
                                <td
                                  className={
                                    value.Type == "BUY" ? "text-success text-center" : "text-danger text-center"
                                  }
                                >
                                  {value.Type == "BUY" ? <IntlMessages id="sidebar.openOrders.filterLabel.type.buy"/> :
                                <IntlMessages id="sidebar.openOrders.filterLabel.type.sell"/>}
                                </td>
                                <td className="text-center">{parseFloat(value.Price).toFixed(8)}</td>
                                <td className="text-center">{parseFloat(value.Amount).toFixed(8)}</td>
                                <td className="text-center">{value.TrnDate.replace('T',' ').split('.')[0]}</td>
                              </tr>
                            )
                        )
                      ) : (
                          <tr>
                            <td colSpan="5">
                              <Alert color="danger" className="text-center fs-32">
                                <IntlMessages id="trading.activeorders.label.nodata" />
                              </Alert>
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </Table>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="raised"
                  color="primary"
                  className="text-white"
                  onClick={() => this.cancelOrder(activeMyOpenData)}
                >
                  <span>
                    <IntlMessages id="trading.activeorders.cancelorder.button.cancelorder" />
                  </span>
                </Button>
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
          </div>
        
        </Card>
      </Fragment>
    );
  }
}

// Set Props when actions are dispatch
const mapStateToProps = state => ({
  activeMyOpenOrder: state.openOrder.activeOpenMyOrder,
  loading: state.openOrder.loading,
  cancelOrderLoading:state.openOrder.cancelOrderLoading,
  cancelOrder:state.openOrder.cancelOrder,
});

// connect action with store for dispatch
export default connect(
  mapStateToProps,
  {
    getOpenOrderList,
    doCancelOrder
  }
)(OpenOrder);
