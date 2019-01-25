// routes
import Pages from "Routes/pages";
import Components from "Routes/components";
import Dashboard from "Routes/dashboard";
import MyAccount from "Routes/my-account";
import History from "Routes/history";

//added by devang parekh
import transactionHistory from "Routes/transaction-history";
import openOrders from "Routes/open-orders";

import Trading from "Routes/dashboard/trading";
import BasicTrading from "Routes/dashboard/Trading2";

// Added By Tejas
import TransactionChargeReport from "Routes/TransactionChargeReport";

// Added By TradeSummary
import TradeSummary from "Routes/trade-summary";

// Added By Nirmit
import TradeLedger from "Routes/trading-report";

// Added By Nirmit
import Ledger from "Routes/ledger";

//Added By Kevin
import SocialProfile from "Routes/social-profile";

/* Withdraw confirmation route - added by Nishant */
import WithdrawConfirmation from "Routes/withdraw-confirmation";

// async component
import {
    AsyncTermsAndConditionComponent,
    AsyncDepositComponent,
    AsyncWithdrawComponent,
    AsyncTokenStakingComponent,
    AsyncConvertTokenComponent,
    AsyncConfigurationComponent,
    AsyncTransferInComponent,
    AsyncTransferOutComponent,
    AsyncDecentAddgenComponent,
    AsyncAddressWhitelistComponent,
    AsyncBalanceComponent,
    AsyncIncomingTransactionsComponent,
    AsyncOutGoingTransactionComponent,
    AsyncTrading_DashboardComponent,
    AsyncCooldexTrading_DashboardComponent,
    AsyncCooldexFiat_Component,
    AsyncCooldexFunding_Component,
    AsyncMyWalletsComponent,
    AsyncWalletUserListComponent,
    AsyncWalletActivityComponent,
    AsyncTableComponent,
} from "Components/AsyncComponent/AsyncComponent";

export default [
    {
        path: "dashboard",
        component: Dashboard
    },
    {
        path: "pages",
        component: Pages
    },
    {
        path: "ui-components",
        component: Components
    },
    {
        path: "terms-and-condition",
        component: AsyncTermsAndConditionComponent
    },
    //Added by salim for MyAccount
    {
        path: "my-account",
        component: MyAccount
    },
    // added by devang parekh for open order and trade history
    {
        path: "transaction-history",
        component: transactionHistory
    },
    {
        path: "trading",
        component: Trading
    },
    {
        path: "open-orders",
        component: openOrders
    },
    {
        path: "deposit",
        component: AsyncDepositComponent
    },
    {
        path: "withdraw",
        component: AsyncWithdrawComponent
    },
    {
        path: "history",
        component: History
    },
    {
        path: "token-staking",
        component: AsyncTokenStakingComponent
    },
    {
        path: "convert-token",
        component: AsyncConvertTokenComponent
    },
    {
        path: "configuration",
        component: AsyncConfigurationComponent
    },
    {
        path: "transfer-in",
        component: AsyncTransferInComponent
    },
    {
        path: "transfer-out",
        component: AsyncTransferOutComponent
    },
    {
        path: "decent-addgen",
        component: AsyncDecentAddgenComponent
    },
    {
        path: "address-whitelist",
        component: AsyncAddressWhitelistComponent
    },
    {
        path: "transactioncharge-report",
        component: TransactionChargeReport
    },
    {
        path: "trading-report",
        component: TradeLedger
    },
    {
        path: "balance",
        component: AsyncBalanceComponent
    },
    {
        path: "ledger",
        component: Ledger
    },
    {
        path: "incoming-transactions",
        component: AsyncIncomingTransactionsComponent
    },
    {
        path: "outgoing-transaction",
        component: AsyncOutGoingTransactionComponent
    },
    {
        path: "trading3",
        component: AsyncTrading_DashboardComponent
    },
    {
        path: "basic",
        component: BasicTrading
    },
    {
        path: "advance",
        component: AsyncTrading_DashboardComponent
    },
    {
        path: "CooldexTrading",
        component: AsyncCooldexTrading_DashboardComponent
    },
    {
        path: "CooldexFiat",
        component: AsyncCooldexFiat_Component
    },
    {
        path: "CooldexFunding",
        component: AsyncCooldexFunding_Component
    },
    //Added by Kevin for Social Profile
    {
        path: "social-profile",
        component: SocialProfile
    },
    //added by Nishant for wallet sharing
    {
        path: "my-wallets",
        component: AsyncMyWalletsComponent
    },
    //added by Nishant for wallet sharing
    {
        path: "wallet-userlist",
        component: AsyncWalletUserListComponent
    },
    {
        path: "tradeSummary",
        component: TradeSummary
    },
    //added by Nishant for wallet activity
    {
        path: "wallet-activity",
        component: AsyncWalletActivityComponent
    },
    //added by Nishant for wallet activity
    {
        path: "withdraw-confirmation",
        component: WithdrawConfirmation
    },



    // added by Bharat Jograna
    {
        path: "bharat",
        component: AsyncTableComponent
    },

];
