/* 
    Developer : Nishant Vadgama
    Date : 20-09-2018
    File Comment : Token stacking root componet
*/
import React, { Component } from "react";
// Import component for internationalization
import IntlMessages from "Util/IntlMessages";
// import component for Page Title
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import TokenStacking from "Components/TokenStacking/TokenStacking";
import StackingHistory from "Components/TokenStacking/StackingHistory";

// Create Class For Display token stacking details
class TokenStackingIndex extends Component {
  // render frees unfreez token details with history
  render() {
    const { match } = this.props;
    return (
      <div>
        <div className="Deposit">
          <PageTitleBar
            title={<IntlMessages id="wallet.TSPageTitle" />}
            match={match}
          />
          <div className="row">
            {/* <TokenStacking />
            <StackingHistory /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default TokenStackingIndex;
