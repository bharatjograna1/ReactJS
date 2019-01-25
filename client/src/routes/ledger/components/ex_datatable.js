/**
 * Data Table For Ledger
 */
import React, { Component } from "react";
import MUIDataTable from "mui-datatables";

const ExDatatable = ({ title, data, columns, options , darkMode }) => {
  return (
    <div className={darkMode ? 'DepositWithdrawHistory-darkmode':'DepositWithdrawHistory'}>
        <MUIDataTable
          title=""
          data={data}
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
