/**
 * Dasboard Routes
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import {
  AsyncTradingDashboardComponent,
  AsyncTrading_DashboardComponent,
  AsyncCooldexTrading_DashboardComponent,
  AsyncCooldexFiat_Component,
  AsyncCooldexFunding_Component
} from "Components/AsyncComponent/AsyncComponent";

const Dashboard = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/CooldexTrading`} />
      <Route
        path={`${match.url}/trading`}
        component={AsyncTradingDashboardComponent}
      />
      <Route
        path={`${match.url}/trading3`}
        component={AsyncTrading_DashboardComponent}
      />
      <Route
        path={`${match.url}/CooldexTrading`}
        component={AsyncCooldexTrading_DashboardComponent}
      />
      <Route
        path={`${match.url}/CooldexFiat`}
        component={AsyncCooldexFiat_Component}
      />
      <Route
        path={`${match.url}/CooldexFunding`}
        component={AsyncCooldexFunding_Component}
      />
    </Switch>
  </div>
);

export default Dashboard;
