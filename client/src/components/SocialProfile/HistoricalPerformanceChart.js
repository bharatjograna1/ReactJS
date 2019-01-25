/**
 * Auther : Salim Deraiya
 * Created : 17/12/2018
 * Historical Performance Chart
 */
import React, { Component, Fragment } from "react";
// intl messages
import IntlMessages from "Util/IntlMessages";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const yearData = [
    {
        year : 2018,
        data : [0.15,3.67,1.30,1.38,0.67,3.67,-2.57,-1.40,0.16,0.25,-0.17,0.33],
        total : 7.52
    },
    {
        year : 2017,
        data : [2.00,3.17,3.98,2.10,1.20,2.31,1.11,-1.50,1.03,2.26,2.09,4.04],
        total : 26.40
    },
    {
        year : 2016,
        data : [9.20,10.07,1.58,2.18,0.08,-1.66,-11.60,2.74,2.27,1.38,-1.94,3.72],
        total : 17.60
    }
]

var maxValue = Math.max(...yearData[0]['data']);
var minValue = Math.abs(Math.min(...yearData[0]['data']));
var finalValue = maxValue > minValue ? maxValue : minValue;
/* var chartOption = {
    chart: {
        className:'performance_chart',
        height: 300,
        spacingBottom:0,
        // enabled:false,
        animation:false,
        styledMode: true,
        type: 'column'
    },
    plotOptions: {
        column:{
            pointWidth:100 //line width
        },
        connectNulls:true
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: [{
        tickPositions: [-maxValue,0,maxValue],
        className: 'highcharts-color-0',
        title: {
            text: ''
        }
    }],
    series: [{
        data: [0.15,3.67,1.30,1.38,0.67,3.67,-2.57,-1.40,0.16,0.25,-0.17,0.33], //yearData['2018']['data'],
        maxPointWidth:100
    }]
}; */

class HistoricalPerformanceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentYear : yearData[0]['year'],
            data : yearData,
            optionChart : {
                chart: {
                    className:'performance_chart',
                    height: 300,
                    margin: [20, 100, 35, 100],
                    spacingBottom:0,
                    animation:false,
                    styledMode: true,
                    type: 'column'
                },
                plotOptions: {
                    column:{
                        pointWidth:100 //line width
                    },
                    connectNulls:true
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: [{
                    tickPositions: [-finalValue,0.00,finalValue],
                    className: 'highcharts-color-0',
                    title: {
                        text: ''
                    }
                }],
                series: [{
                    data: [0.15,3.67,1.30,1.38,0.67,3.67,-2.57,-1.40,0.16,0.25,-0.17,0.33], //yearData['2018']['data'],
                    maxPointWidth:100
                }]
            }
        };        
    }

    onChangeData(chartData) {
        // console.log('chart data :',chartData);
        var newChartObj = Object.assign({},this.state.optionChart);
        var maxValue = Math.max(...chartData.data);
        var minValue = Math.abs(Math.min(...chartData.data));
        var finalValue = maxValue > minValue ? maxValue : minValue;
        newChartObj.yAxis[0]['tickPositions'] = [-finalValue,0.00,finalValue];
        newChartObj.series[0]['data'] = chartData.data;
        this.setState({ currentYear : chartData.year, optionChart : newChartObj });
    }

    render() {
        const { data, optionChart, currentYear } = this.state;
        return (
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={optionChart} />
                { data.length > 0 &&
                    <table className="table text-center performance_tbl">
                        <thead>
                            <tr>
                                <th scope="col"><IntlMessages id="sidebar.year" /></th>
                                <th scope="col"><IntlMessages id="sidebar.jan" /></th>
                                <th scope="col"><IntlMessages id="sidebar.feb" /></th>
                                <th scope="col"><IntlMessages id="sidebar.mar" /></th>
                                <th scope="col"><IntlMessages id="sidebar.apr" /></th>
                                <th scope="col"><IntlMessages id="sidebar.may" /></th>
                                <th scope="col"><IntlMessages id="sidebar.jun" /></th>
                                <th scope="col"><IntlMessages id="sidebar.jul" /></th>
                                <th scope="col"><IntlMessages id="sidebar.aug" /></th>
                                <th scope="col"><IntlMessages id="sidebar.sep" /></th>
                                <th scope="col"><IntlMessages id="sidebar.oct" /></th>
                                <th scope="col"><IntlMessages id="sidebar.nov" /></th>
                                <th scope="col"><IntlMessages id="sidebar.dec" /></th>
                                <th scope="col"><IntlMessages id="sidebar.total" /></th>
                            </tr>
                        </thead>
                        <tbody>                        
                            {data.map((list,index) => (
                                <tr className={list.year === currentYear ? "active" : ''} onClick={() => this.onChangeData(list)} key={index}>
                                    <th scope="row" className="td-year">{list.year}</th>
                                    <td className={list.data[0] > 0 ? 'td-positive' : 'td-negative'}>{list.data[0]}</td>
                                    <td className={list.data[1] > 0 ? 'td-positive' : 'td-negative'}>{list.data[1]}</td>
                                    <td className={list.data[2] > 0 ? 'td-positive' : 'td-negative'}>{list.data[2]}</td>
                                    <td className={list.data[3] > 0 ? 'td-positive' : 'td-negative'}>{list.data[3]}</td>
                                    <td className={list.data[4] > 0 ? 'td-positive' : 'td-negative'}>{list.data[4]}</td>
                                    <td className={list.data[5] > 0 ? 'td-positive' : 'td-negative'}>{list.data[5]}</td>
                                    <td className={list.data[6] > 0 ? 'td-positive' : 'td-negative'}>{list.data[6]}</td>
                                    <td className={list.data[7] > 0 ? 'td-positive' : 'td-negative'}>{list.data[7]}</td>
                                    <td className={list.data[8] > 0 ? 'td-positive' : 'td-negative'}>{list.data[8]}</td>
                                    <td className={list.data[9] > 0 ? 'td-positive' : 'td-negative'}>{list.data[9]}</td>
                                    <td className={list.data[10] > 0 ? 'td-positive' : 'td-negative'}>{list.data[10]}</td>
                                    <td className={list.data[11] > 0 ? 'td-positive' : 'td-negative'}>{list.data[11]}</td>
                                    <td className="td-total">{list.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </Fragment>
        );
    }
}

export default HistoricalPerformanceChart;