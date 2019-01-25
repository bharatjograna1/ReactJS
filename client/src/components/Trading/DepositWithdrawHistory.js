/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    File Comment : Deposit/Witdhraw History Widget - Common
*/

import React, { Component, Fragment } from 'react';
import MUIDataTable from "mui-datatables";
import IntlMessages from 'Util/IntlMessages';
import JbsSectionLoader from 'Components/JbsSectionLoader/JbsSectionLoader';
import classnames from "classnames";
import { changeDateFormat } from "Helpers/helpers";
// Deposit & Withdraw History widget
class DepositWithdrawHistory extends Component {
    render() {
        const history = this.props.history;
        const title = this.props.title;
        const columns = [
            {
                name: <IntlMessages id="tradeSummary.filterLabel.trnNo" />,
                options: { filter: false, sort: true }
            },
            {
                name: <IntlMessages id="wallet.DWTableCoin" />,
                options: { filter: true, sort: true }
            },
            {
                name: <IntlMessages id="table.TrnID" />,
                options: { filter: false, sort: true }
            },
            {
                name: <IntlMessages id="wallet.DWTableAmount" />,
                options: { filter: false, sort: true }
            },
            {
                name: <IntlMessages id="wallet.DWTableDate" />,
                options: { filter: false, sort: true }
            },
            {
                name: <IntlMessages id="wallet.DWTableStatus" />,
                options: { filter: true, sort: true }
            },
            /* {
                name: <IntlMessages id="wallet.DWTableConfi" />,
                options: { filter: true, sort: true }
            }, */
            {
                name: <IntlMessages id="wallet.DWTableInfo" />,
                options: { filter: false, sort: true }
            },
        ];
        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            selectableRows: false,
            download: false,
            viewColumns: false,
            print: false,
            textLabels: {
                body: {
                    noMatch: <IntlMessages id="wallet.emptyTable" />,
                    toolTip: <IntlMessages id="wallet.sort" />,
                }
            }
        };
        return (
            <Fragment>
                <div className={this.props.darkMode ? 'DepositWithdrawHistory-darkmode' : 'DepositWithdrawHistory'}>
                    {this.props.loading && <JbsSectionLoader />}
                    <MUIDataTable
                        title={title}
                        data={history.map(item => {
                            var ExplorerLink = (item.hasOwnProperty('ExplorerLink')) ? JSON.parse(item.ExplorerLink) : '';
                            return [
                                item.TrnNo,
                                item.CoinName,
                                <a href={(ExplorerLink.length) ? ExplorerLink[0].Data + '/' + item.TrnId : item.TrnId} target="_blank">{item.TrnId}</a>,
                                item.Amount.toFixed(8),
                                changeDateFormat(item.Date, 'YYYY-MM-DD HH:mm:ss'),
                                item.StatusStr,
                                // item.Confirmations,
                                item.Information,
                            ]
                        })}
                        columns={columns}
                        options={options}
                    />
                </div>
            </Fragment>
        )
    }
}

export default DepositWithdrawHistory;