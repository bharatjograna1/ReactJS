import React, { Component } from "react";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import NotFoundTable from "../NotFoundTable/notFoundTable";
import JbsSectionLoader from "Components/JbsSectionLoader/JbsSectionLoader";
import { getExplorerLink, changeDateFormat } from 'Helpers/helpers';

export default class IncomingTransactions extends Component {
    render() {
        const columns = [
            {
                name: <IntlMessages id="table.Sr" />,
                options: { sort: true, filter: false }
            },
            {
                name: <IntlMessages id="table.TrnID" />,
                options: { sort: true, filter: true }
            },
            {
                name: <IntlMessages id="table.WalletType" />,
                options: { sort: true, filter: true }
            },
            {
                name: <IntlMessages id="table.Address" />,
                options: { sort: true, filter: true }
            },
            // {
            //     name: <IntlMessages id="table.Confirmations" />,
            //     options: { sort: true, filter: false }
            // },
            {
                name: <IntlMessages id="table.Amount" />,
                options: { sort: true, filter: true }
            },
            {
                name: <IntlMessages id="wallet.DWTableDate" />,
                options: { filter: false, sort: true }
            },
        ];

        const options = {
            filterType: "multiselect",
            responsive: "scroll",
            selectableRows: false,
            download: false,
            viewColumns: false,
            filter: true,
            print: false,
            textLabels: {
                body: {
                    noMatch: <IntlMessages id="wallet.emptyTable" />,
                    toolTip: <IntlMessages id="wallet.sort" />,
                }
            }
        };

        return (
            <div className={this.props.darkMode ? 'transaction-history-detail-darkmode' : 'transaction-history-detail'}>
                {this.props.Loading && <JbsSectionLoader />}
                <MUIDataTable
                    data={this.props.data.map(item => {
                        var ExplorerLink = (item.hasOwnProperty('ExplorerLink')) ? JSON.parse(item.ExplorerLink) : '';
                        return [
                            item.AutoNo,
                            // <a href={getExplorerLink(item.WalletType, item.TrnID)} target="_blank">{item.TrnID}</a>,
                            <a href={(ExplorerLink.length) ? ExplorerLink[0].Data + '/' + item.TrnID : item.TrnID} target="_blank">{item.TrnID}</a>,
                            item.WalletType,
                            item.Address,
                            // item.Confirmations + '/' + item.ConfirmationCount,
                            item.Amount.toFixed(8),
                            changeDateFormat(item.Date, 'YYYY-MM-DD HH:mm:ss'),
                        ];
                    })}
                    columns={columns}
                    options={options}
                />
            </div>
        );
    }
}
