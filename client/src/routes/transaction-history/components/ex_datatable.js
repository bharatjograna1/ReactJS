/**
 * About Us Page
 */
import React from "react";
import MUIDataTable from "mui-datatables";

// intl messages
import IntlMessages from "Util/IntlMessages";

const ExDatatable = ({ title, data, columns, options , darkMode }) => {
  return (
    <div className={darkMode ? 'DepositWithdrawHistory-darkmode':'DepositWithdrawHistory'}>
      <MUIDataTable
        title={<IntlMessages id={title} />}
        data={data.map(item => {
          {var type = item.Type == "BUY" ? <IntlMessages id="sidebar.openOrders.filterLabel.type.buy"/> :
          <IntlMessages id="sidebar.openOrders.filterLabel.type.sell"/>}  

          {var status = <IntlMessages id={`myorders.response.status.${item.Status}`} />}
          return [
            item.DateTime.replace('T', ' ').split('.')[0],
            item.PairName,
            type,
            item.Price,
            item.Amount,
            item.ChargeRs,
            item.Total,
            status
          ];
        })}
        columns={columns}
        options={options}
      />
    </div>
  );
};

ExDatatable.defaultProps = {
  title: "",
  data: [],
  columns: [],
  options: []
};

export default ExDatatable;
