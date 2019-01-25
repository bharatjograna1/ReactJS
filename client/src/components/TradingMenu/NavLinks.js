// horizontal nav links
export default {
  Tradingmenu: [
    {
      path: "/dashboard/CooldexTrading",
      menu_title: "sidebar.experience",
      menu_icon: "zmdi zmdi-trending-up",
      //child_routes: null
      child_routes: [
        {
          path: "/dashboard/CooldexTrading",
          menu_title: "sidebar.trading"
        },
      ]
      // child_routes: [
      //   {
      //     path: "/basic",
      //     menu_title: "sidebar.basic"
      //   },
      //   {
      //     path: "/advance",
      //     menu_title: "sidebar.advance"
      //   },
      //   {
      //     path: "/dashboard/CooldexTrading",
      //     menu_title: "sidebar.CooldexTrading"
      //   },
      //   {
      //     path: "/dashboard/CooldexFiat",
      //     menu_title: "sidebar.CooldexFiat"
      //   },
      //   {
      //     path: "/dashboard/CooldexFunding",
      //     menu_title: "sidebar.CooldexFunding"
      //   },
      // ]
    },
    {
      path: "/open-orders",
      menu_title: "sidebar.openorders",
      menu_icon: "zmdi zmdi-assignment-o",
      child_routes: null
    },
    {
      menu_title: "sidebar.tradehistory",
      menu_icon: "zmdi zmdi-grid",
      child_routes: [
        {
          path: "/transaction-history",
          menu_title: "sidebar.transactionhistory"
        },
        // {
        //   path: "/transactioncharge-report",
        //   menu_title: "sidebar.transactioncharge"
        // },
        // {
        //   path: "/trading-report",
        //   menu_title: "sidebar.tradingLedger"
        // },
        {
          path: "/ledger",
          menu_title: "sidebar.ledger"
        },
        {
          path: "/tradeSummary",
          menu_title: "sidebar.tradeSummary"
        }
      ]
    },
    {
      path: "/balance",
      menu_title: "sidebar.fundsbalances",
      menu_icon: "zmdi zmdi-balance-wallet",
      child_routes: null
    },
    // {
    //   path: "/pages/faq",
    //   menu_title: "sidebar.support",
    //   menu_icon: "ti-headphone-alt",
    //   child_routes: null
    // },
    {
      path: "/pages/news",
      menu_title: "sidebar.newsmenu",
      menu_icon: "ti-comment-alt",
      child_routes: null
    },
    {
      path: "/my-account/my-account-dashboard",
      menu_title: "sidebar.myAccount",
      menu_icon: "ti-comment-alt",
      child_routes: null
    },
    // {
    //   menu_title: "sidebar.myAccount",
    //   menu_icon: "zmdi zmdi-accounts",
    //   child_routes: [
    //     {
    //       path: "/app/my-account/login-history",
    //       menu_title: "sidebar.loginHistory",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/ip-history",
    //       menu_title: "sidebar.ipHistory",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/login",
    //       menu_title: "sidebar.login",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/user-account",
    //       menu_title: "sidebar.userAccount",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/activity-list",
    //       menu_title: "sidebar.activityList",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/theme-configuration",
    //       menu_title: "sidebar.themeConfiguration",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/signup-with-email",
    //       menu_title: "sidebar.signupWithEmail",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/signup-with-blockchain",
    //       menu_title: "sidebar.signupWithBlockchain",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/reset-password",
    //       menu_title: "sidebar.resetPassword",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/signup-with-mobile",
    //       menu_title: "sidebar.signupWithMobile",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/change-password",
    //       menu_title: "sidebar.changePassword",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/membership-level",
    //       menu_title: "sidebar.membershipLevel",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/complain",
    //       menu_title: "sidebar.complain",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/trade-summary",
    //       menu_title: "sidebar.tradeSummary",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/top-gainers",
    //       menu_title: "sidebar.topGainers",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/top-losers",
    //       menu_title: "sidebar.topLosers",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/ip-whitelist",
    //       menu_title: "sidebar.ipWhitelist",
    //       exact: true
    //     },
    //     {
    //       path: "/app/my-account/device-whitelisting",
    //       menu_title: "sidebar.deviceWhitelisting",
    //       exact: true
    //     }
    //   ]
    // },
    {
      menu_title: "sidebar.Wallet",
      menu_icon: "zmdi zmdi-balance-wallet",
      child_routes: [
        {
          path: "/deposit",
          menu_title: "sidebar.deposits"
        },
        {
          path: "/history/deposit",
          menu_title: "sidebar.depositHistory"
        },
        {
          path: "/withdraw",
          menu_title: "sidebar.withdrawals"
        },
        {
          path: "/history/withdraw",
          menu_title: "sidebar.withdrawHistory"
        },
        /* {
          path: "/token-staking",
          menu_title: "wallet.TSPageTitle"
        }, */
        /*{
          path: "/convert-token",
          menu_title: "wallet.CTPageTitle"
        }, */
        {
          path: "/configuration",
          menu_title: "wallet.ConfigurationAndPreference"
        },
        /* {
          path: "/transfer-in",
          menu_title: "sidebar.transferin"
        },
        {
          path: "/transfer-out",
          menu_title: "sidebar.transferout"
        },
        {
          path: "/decent-addgen",
          menu_title: "sidebar.decentAddgen"
        }, */
        {
          path: "/address-whitelist",
          menu_title: "sidebar.withdrawalAddress"
        },
        {
          path: "/incoming-transactions",
          menu_title: "sidebar.incomingtransactions"
        },
        {
          path: "/outgoing-transaction",
          menu_title: "sidebar.outGoingTransaction"
        },
      ]
    },




    //Bharat Jograna
    {
      menu_title: "sidebar.Manage_Accounts",
      menu_icon: "zmdi zmdi-grid",
      child_routes: [
        {
          path: "/bharat",
          menu_title: "sidebar.Bharat"
        },
      ]
    },

    // {
    //   path: "/social-profile/social-profile-subscription",
    //   menu_title: "sidebar.socialProfile",
    //   menu_icon: "ti-comment-alt",
    //   child_routes: null
    // },
  ]
};
