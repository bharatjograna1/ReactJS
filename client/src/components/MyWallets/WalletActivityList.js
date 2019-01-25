/* 
    Developer : Nishant Vadgama
    Date : 10-01-2019
    File Comment : wallet activity list component
*/
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
import JbsSectionLoader from 'Components/JbsSectionLoader/JbsSectionLoader';
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";
import AppConfig from 'Constants/AppConfig';
import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import Button from '@material-ui/core/Button';
//initial state
const initState = {
}
//my wallets methods...
import {
    walletRequestAction,
} from 'Actions/MyWallets';

class WalletActivityList extends Component {
    state = initState;
    //will mount fetch data
    componentWillMount() {
        // this.props.getAllWallets();
        /*  this.props.hubConnection.on('RecieveAnnouncement', (newsData) => {
             console.log("RecieveAnnouncement", newsData, (new Date()));
             var oldNewsData = this.state.newsList;
             try {
                 newsData = JSON.parse(newsData);
                 if (typeof newsData.Data !== 'undefined' && newsData.Data !== '') {
                     newsData.Data = JSON.parse(newsData.Data);
                     oldNewsData.push(newsData.Data.locale[localStorage.getItem('locale')]);
                     this.setState({ newsList: oldNewsData, totalcount: this.state.totalcount + 1 })
                     //console.log("totalcount2",totalcount);
                 }
             } catch (error) {
                 //console.log("error while parsing");
             }
         }); */
    }
    //on changing props...
    componentWillReceiveProps(nextProps) {
        if (nextProps.walletRequestResponse.hasOwnProperty("ReturnCode")) {
            if (nextProps.walletRequestResponse.ReturnCode == 0) {
                NotificationManager.success(nextProps.walletRequestResponse.ReturnMsg);
            } else if (nextProps.walletRequestResponse.ReturnCode == 1) {
                NotificationManager.error(<IntlMessages id={"apiWalletErrCode." + nextProps.walletRequestResponse.ErrorCode} />);
            }
        }
    }
    //accept request..
    onAccept(id) {
        this.props.walletRequestAction({
            Status: 1,
            RequestId: id
        });
    }
    //reject request...
    onReject(id) {
        this.props.walletRequestAction({
            Status: 9,
            RequestId: id
        });
    }
    //render component
    render() {
        const walletActivity = [
            {
                "RequestId": 8,
                "WalletName": "OMG2 DefaultWallet",
                "WalletType": "OMG",
                "StrStatus": "Pending",
                "Status": 0,
                "RoleName": "Admin",
                "ToEmail": "vishvata@jbspl.com",
                "FromEmail": "vishvata@jbspl.com",
                "Message": "Hello first",
                "OwnerApprovalStatus": 0,
                "StrOwnerApprovalStatus": "Pending",
                "RequestType": "AddRequest"
            },
            {
                "RequestId": 8,
                "WalletName": "OMG2 DefaultWallet",
                "WalletType": "OMG",
                "StrStatus": "Pending",
                "Status": 0,
                "RoleName": "Admin",
                "ToEmail": "vishvata@jbspl.com",
                "FromEmail": "vishvata@jbspl.com",
                "Message": "Hello first",
                "OwnerApprovalStatus": 0,
                "StrOwnerApprovalStatus": "Pending",
                "RequestType": "AddRequest"
            },
            {
                "RequestId": 8,
                "WalletName": "OMG2 DefaultWallet",
                "WalletType": "OMG",
                "StrStatus": "Pending",
                "Status": 0,
                "RoleName": "Admin",
                "ToEmail": "vishvata@jbspl.com",
                "FromEmail": "vishvata@jbspl.com",
                "Message": "Hello first",
                "OwnerApprovalStatus": 0,
                "StrOwnerApprovalStatus": "Pending",
                "RequestType": "AddRequest"
            },
            {
                "RequestId": 16,
                "WalletName": "BAT DefaultWallet",
                "WalletType": "BAT",
                "StrStatus": "Pending",
                "Status": 0,
                "RoleName": "Admin",
                "ToEmail": "rushabh@jbspl.com",
                "FromEmail": "nishant@jbspl.com",
                "Message": "join wallet",
                "OwnerApprovalStatus": 1,
                "StrOwnerApprovalStatus": "Accepted",
                "RequestType": "AddRequest"
            }
        ]
        return (
            <JbsCollapsibleCard
                colClasses="col-sm-6 offset-3"
                heading={<IntlMessages id="wallet.pendingRequests" />}
                fullBlock>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <tbody>
                            {walletActivity.length !== 0 && walletActivity.map((activity, key) => (
                                <tr key={key} >
                                    <td>
                                        <div className="media">
                                            <div className="media-left mr-15">
                                                <img src={AppConfig.coinlistImageurl + '/' + activity.WalletType + '.png'} height="40" width="40" className="mr-15" />
                                            </div>
                                            <div className="media-body">
                                                <span className="d-block fw-normal">{"Wallet: "}<strong>{activity.WalletName}</strong></span>
                                                <span className="fs-12 fw-normal"><strong>{activity.ToEmail}</strong>{" has invite you to join as "}<strong>{activity.RoleName}</strong></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <Button variant="raised" size="small" onClick={() => this.onAccept(activity.RequestId)} className="btn-primary mr-20 text-white"><IntlMessages id="button.accept" /></Button>
                                        <Button variant="raised" size="small" onClick={() => this.onReject(activity.RequestId)} className="btn-warning text-white"><IntlMessages id="button.reject" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {this.props.loading && <JbsSectionLoader />}
            </JbsCollapsibleCard>
        );
    }
}

const mapStateToProps = ({ MyWalletsReducer }) => {
    const { loading, walletRequestResponse } = MyWalletsReducer;
    return { loading, walletRequestResponse };
}
export default connect(mapStateToProps, {
    walletRequestAction
})(WalletActivityList);