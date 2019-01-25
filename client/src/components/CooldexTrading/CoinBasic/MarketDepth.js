import React, { Component } from 'react';
// import High Chart Details
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
 import {data} from './MarketDepthData';
 import { connect } from "react-redux";
 import {
  getSellerOrderList,  
  getBuyerOrderList,  
} from 'Actions/Trade';

 class MarketDepth extends Component {
   constructor(props){
     super(props)
     this.state={
       askData:[],
       bidData:[]
     }
    
   }
  componentDidMount(){
    const pair = this.props.currencyPair
    this.props.getSellerOrderList({ Pair: pair });
    this.props.getBuyerOrderList({ Pair: pair });
  }

  componentWillReceiveProps(nextprops){

    var askDepthTotal = 0;
    var bidDepthTotal = 0;

    var sellerorder=[];
    var buyerorder=[];

    if(nextprops.sellerOrder.length !==0){
      
      nextprops.sellerOrder.map((value,key) =>{
        if(parseFloat(value.Price) !== 0) {
          askDepthTotal += parseFloat(value.Amount)
          sellerorder.push([value.Price,askDepthTotal])
        }
      })

      this.setState({
        askData:sellerorder
      })

    } else {

      this.setState({
        askData:[]
      })

    }

    if(nextprops.buyerOrder.length !==0){
      
      nextprops.buyerOrder.map((value,key) =>{
        if(parseFloat(value.Price) !== 0) {
          bidDepthTotal += parseFloat(value.Amount)
          buyerorder.push([value.Price,bidDepthTotal])
        }
      })

      this.setState({
        bidData:buyerorder
      })

    } else {

      this.setState({
        bidData:[]
      })

    }
  }

  render() {
    
    const options = {          
      chart: {
        type: 'area',
        zoomType: 'xy',   
        backgroundColor: this.props.darkMode ? '#2c3644': 'transparent',   
        color:   this.props.darkMode ? 'white': '#464D69',  
     },
     title: {
      text: null,
      style: {
        color:   this.props.darkMode ? 'white': '#464D69',
      }
    },
    xAxis: [{
      type: 'logarithmic',
      title: {
        text: null,
        style: {
          color:   this.props.darkMode ? 'white': '#464D69',
        },
      },
      width: '50%',
      labels: {
        style: {
          color: 'green'
        }
      }
    }, {
      type: 'logarithmic',
      title: {
        text: null,
        style: {
          color:   this.props.darkMode ? 'white': '#464D69',
        },
      },
      labels: {
        style: {
          color: 'red'
        }
      },
      offset: 0,
      left: '50%',
      width: '50%'
    }],
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: null,
        style: {
          color:   this.props.darkMode ? 'white': '#464D69',
        }
      }
    },
     responsive: {
        rules: [{
            condition: {
                maxWidth:600
            },
            chartOptions: {
                chart: {
                    height:225
                },
                subtitle: {
                    text: null
                },
                navigator: {
                    enabled: false
                }
            }
        }]
    },
    rangeSelector:{
      enabled: false,
      inputEnabled: false
    },
    legend: {
      enabled: false
    },
    scrollbar:{
      enabled: false
    },
    navigator: {
      enabled: false
    },
    plotOptions: {
      area: {
        softThreshold: true,
        marker: {
          radius: 2
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 3
          }
        },
        threshold: null
      },
    },    

    series: [{
      name: 'Bids',
      type: 'area',
      data: this.state.bidData,
      color: 'rgb(161,243,121)',
      fillColor: 'rgba(161,243,121, 0.9)',
      xAxis: 0,
    }, {
      name: 'Asks',
      type: 'area',
      data: this.state.askData,
      color: 'rgb(237,114,72)',
      fillColor: 'rgba(237,114,72, 0.9)',
      xAxis: 1,
    }]
    };
    
    return (
      <div>
         <div>       
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        </div>
        {/* </Scrollbars> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  buyerOrder: state.buyerOrder.buyerOrder, 
  sellerOrder: state.sellerOrder.sellerOrder,    
  darkMode:state.settings.darkMode
});

export default connect(
  mapStateToProps,
  {
    getBuyerOrderList,    
    getSellerOrderList,    
  }
)(MarketDepth);
