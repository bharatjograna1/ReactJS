/**
 * Jbs Trading Menu Layout
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import $ from 'jquery';

// Components
import Header from 'Components/Header/Header';
import Header1 from 'Components/LandingCooldex/components/header1';
import Footer from 'Components/Footer/Footer';
import CooldexFooter from 'Components/Footer/CooldexFooter';
//import HorizontalMenu from 'Components/HorizontalMenu/HorizontalMenu';
import TradingMenu from 'Components/TradingMenu/HorizontalMenu';
//import ThemeOptions from 'Components/ThemeOptions/ThemeOptions';
import Tour from 'Components/Tour';

// app config
import AppConfig from 'Constants/AppConfig';

// actions
import { startUserTour } from 'Actions';

// code for import necessary module for SignalR connectivity, code added by devang parekh 15-11-2018
import { NotificationManager } from "react-notifications";
import IntlMessages from "Util/IntlMessages";
const signalR = require("@aspnet/signalr");
const signalRURL = AppConfig.signalRURL
// end

class JbsHorizontalLayout extends Component {
    
    state = {
        height_style: {
            minHeight:0
        },
        // signalr Connection
        hubConnection: new signalR.HubConnectionBuilder().withUrl(signalRURL).configureLogging(signalR.LogLevel.None).build(),
    }

    constructor(props){
        super(props);
        
        window.JbsHorizontalLayout = this;
        //console.log(window.JbsHorizontalLayout);
    }

    reRefreshTokenSignalR() {
        //console.log("props",window.JbsHorizontalLayout.props);
        try {

            window.JbsHorizontalLayout.state.hubConnection.serverTimeoutInMilliseconds = 24 * 60 * 60 * 1000; // hour * minute * seconds * ms
            if(window.JbsHorizontalLayout.state.hubConnection.connection.connectionState !== 1 ) {

                //console.log("Start Connection",(new Date()));
                window.JbsHorizontalLayout.state.hubConnection.start().then(() => {
                    //console.log("Hub Connection",window.JbsHorizontalLayout.state.hubConnection);
                    //console.log("end connection",(new Date()));
                    window.JbsHorizontalLayout.state.hubConnection.invoke('OnConnected', localStorage.getItem('gen_access_token')).catch(err => console.error("Subscribe Error",err));

                    window.JbsHorizontalLayout.setState({hubConnection:window.JbsHorizontalLayout.state.hubConnection});

                });

            } else {
                window.JbsHorizontalLayout.state.hubConnection.invoke('OnTokenChange', localStorage.getItem('gen_access_token')).catch(err => console.error("Token Change",err))
            }
            
        } catch(error) {
            //console.log("error in refreshtoken",error)
        }
        
    }
       
    connectSignalR(Pair = '',BasedCurrency = '') {
        //console.log("connectSignalR : ")
        window.JbsHorizontalLayout.state.hubConnection.serverTimeoutInMilliseconds = 24 * 60 * 60 * 1000; // hour * minute * seconds * ms
        
        if(window.JbsHorizontalLayout.state.hubConnection.connection.connectionState !== 1 ) {

            //console.log("Start Connection",(new Date()));
            window.JbsHorizontalLayout.state.hubConnection.start().then(() => {
                //console.log("Hub Connection",window.JbsHorizontalLayout.state.hubConnection);
                //console.log("end connection",(new Date()));
                window.JbsHorizontalLayout.state.hubConnection.invoke('OnConnected', localStorage.getItem('gen_access_token')).catch(err => console.error("Subscribe Error",err));

                window.JbsHorizontalLayout.setState({hubConnection:window.JbsHorizontalLayout.state.hubConnection});

                if(Pair !== '' && BasedCurrency !== '') {
                    window.JbsHorizontalLayout.state.hubConnection.invoke('AddPairSubscription',Pair,"INR_BTC").catch(err => console.error("AddPairSubscription",err));
                    window.JbsHorizontalLayout.state.hubConnection.invoke('AddMarketSubscription',BasedCurrency,"BTC").catch(err => console.error("AddMarketSubscription",err));
                }

                window.JbsHorizontalLayout.state.hubConnection.on("RecieveNotification",(notificationDetail) => {
                    
                    //console.log("Get Data from signalR RecieveNotification", notificationDetail);
                    try {

                        notificationDetail = JSON.parse(notificationDetail);
                        if(typeof notificationDetail.Data !== 'undefined' && notificationDetail.Data !== '') {
                            //console.log("activityNotification.message."+notificationDetail.Data.MsgCode);
                            if(notificationDetail.Data.Type === 1) {
                                NotificationManager.success(<IntlMessages id={`activityNotification.message.${notificationDetail.Data.MsgCode}`} values={notificationDetail.Data} />);
                            } else if(notificationDetail.Data.Type === 2) {
                                NotificationManager.error(<IntlMessages id={`activityNotification.message.${notificationDetail.Data.MsgCode}`} values={notificationDetail.Data} />);
                            } else if(notificationDetail.Data.Type === 3) {
                                NotificationManager.info(<IntlMessages id={`activityNotification.message.${notificationDetail.Data.MsgCode}`} values={notificationDetail.Data} />);
                            }

                        }
                        
                        
                    } catch(error) {

                    }
                    
                });

            });

        } else {

            //console.log("already have Connection",(new Date()));

            window.JbsHorizontalLayout.state.hubConnection.invoke('OnConnected', localStorage.getItem('gen_access_token')).catch(err => console.error("Subscribe Error",err));

            window.JbsHorizontalLayout.setState({hubConnection:window.JbsHorizontalLayout.state.hubConnection});

            if(Pair !== '' && BasedCurrency !== '') {
                window.JbsHorizontalLayout.state.hubConnection.invoke('AddPairSubscription',Pair,"INR_BTC").catch(err => console.error("AddPairSubscription",err));
                window.JbsHorizontalLayout.state.hubConnection.invoke('AddMarketSubscription',BasedCurrency,"BTC").catch(err => console.error("AddMarketSubscription",err));
            }

        }

    }

    componentWillMount() {

        this.connectSignalR();
        this.updateDimensions();
    }

    componentDidMount() {
        const { windowWidth } = this.state;
        window.addEventListener("resize", this.updateDimensions);
        if (AppConfig.enableUserTour && windowWidth > 600) {
            setTimeout(() => {
                this.props.startUserTour();
            }, 2000);
        }
        //added dynamic height for footer by screen resolution wise set
        var xyz = $(".jbs-page-content").height();
        //console.log("xyz",xyz);
        xyz = 72+xyz+33;
        //console.log("xyz",xyz);
        if(xyz<$(window).height()){
            xyz=($(window).height()-xyz);
            //console.log("xyz",xyz);
            this.setState({height_style : {minHeight:(xyz)+"px"}});        
        }
        //console.log($(window).height());
    } 
 

    updateDimensions = () => {
        this.setState({ windowWidth: $(window).width(), windowHeight: $(window).height() });
    }

    renderPage() {

        const { pathname } = this.props.location;
        const { children, match } = this.props;
        const mystyle = this.state.height_style;
        //console.log("mystyle",mystyle);
        //console.log(pathname);
        
        this.props.location.state = { ...this.props.location.state,hubConnection : this.state.hubConnection,connectSignalR:this.connectSignalR};
        
        if (pathname === `${match.url}/chat` || pathname.startsWith(`${match.url}/mail`) || pathname === `${match.url}/todo`) {
            return (
                <div className="jbs-page-content p-0" >
                    {children}
                </div>
            );
        }
        return (
            <Scrollbars
                className="jbs-scroll"
                autoHide
                autoHideDuration={100}
                style={{ height: 'calc(100vh - 100px)' }}
            >
                <div className="jbs-page-content tradingdashboard" style={mystyle}>
                    {children}
                </div>
                {/* {this.props.location.pathname === '/app/dashboard/CooldexTrading' ? <CooldexFooter/> :  <Footer />} */}
                <CooldexFooter/>
            </Scrollbars>
        );
    }

    render() {
        return (
            <div className="app-horizontal collapsed-sidebar">
                <div className="app-container">
                <Tour />
                    <div className="jbs-page-wrapper">
                        <div className="jbs-app-content">
                            <div className="app-header  cooldex-header">
                                {/* //{this.props.location.pathname === '/app/dashboard/CooldexTrading' ? "app-header  cooldex-header" : "app-header"}> */}
                                {/* For Load Diffrent Header without login and Withlogin  */}
                                {/* <Header tradingMenu /> */}
                                {localStorage.getItem('gen_access_token') && localStorage.getItem('gen_id_token') && localStorage.getItem('gen_refresh_token') && localStorage.getItem('gen_access_token') != '' && localStorage.getItem('gen_id_token') != '' && localStorage.getItem('gen_refresh_token') !='' ? <Header tradingMenu /> : <Header1 />}
                                
                                {/* <Header1 /> */}
                            </div>
                            <div className="jbs-page">
                                {localStorage.getItem('gen_access_token') && localStorage.getItem('gen_id_token') && localStorage.getItem('gen_refresh_token') && localStorage.getItem('gen_access_token') != '' && localStorage.getItem('gen_id_token') != '' && localStorage.getItem('gen_refresh_token') !='' ? <TradingMenu classnames="trading-menu cooldextrading-menu"></TradingMenu> : ''}
                                
                                {/* // {this.props.location.pathname === '/app/dashboard/CooldexTrading' ? 'trading-menu cooldextrading-menu':'trading-menu'}/> */}
                                {this.renderPage()}
                            </div>
                            {/* <ThemeOptions /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



// map state to props
const mapStateToProps = () => {
    return { }
}

export default withRouter(connect(mapStateToProps, {
    startUserTour
})(JbsHorizontalLayout));