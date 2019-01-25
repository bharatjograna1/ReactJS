/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// sagas
import feedbacksSagas from "./Feedbacks";
import pageContentSagas from "./PageContent";

//Parthbhai....
import loginHistorySagas from "./MyAccount/LoginHistory";
import ipHistorySagas from "./MyAccount/IPHistory";
import deviceManagementSagas from "./MyAccount/DeviceManagement";
import editProfileSagas from "./MyAccount/EditProfile";
import antiPhishingCodeSagas from "./MyAccount/AntiPhishingCode";

//Kevinbhai....
import userauthSagas from "./MyAccount/UserAuth";
import usermobileauthSagas from "./MyAccount/UserMobileAuth";
import userblockchainauthSagas from "./MyAccount/UserBlockchainAuth";
import smsauthSagas from "./MyAccount/SmsAuth";
import enablegoogleauthSagas from "./MyAccount/EnableGoogleAuth";
import resetpasswordSagas from "./MyAccount/ResetPassword";
import changepasswordSagas from "./MyAccount/ChangePassword";
import disablesmsauthSagas from "./MyAccount/DisableSmsAuth";
import disablegoogleauthSagas from "./MyAccount/DisableGoogleAuth";
import membershipLevelSagas from "./MyAccount/Membership";
import tradeSummarySagas from "./MyAccount/tradeSummary";
import topGainersSagas from "./MyAccount/TopGainers";
import topLosersSagas from "./MyAccount/TopLosers";
import ipWhitelistSagas from "./MyAccount/IPWhitelist";
import deviceListSagas from "./MyAccount/DeviceWhitelisting";
import themeConfigSagas from "./MyAccount/ThemeConfiguration";
import forgotConfirmationSagas from "./MyAccount/ForgotConfirmation";

import socialProfileSagas from "./SocialProfile/SocialProfile";

//Salimbhai....
import twoFAAuthenticationSagas from "./MyAccount/2FAAuthentication";
import forgotPasswordSagas from "./MyAccount/ForgotPassword";
import loginSagas from "./MyAccount/Login";
import personalVerificationFormSagas from "./MyAccount/PersonalVerificationForm";
import enterpriseVerificationFormSagas from "./MyAccount/EnterpriseVerificationForm";
import referralFriendsSagas from "./MyAccount/ReferralFriends";
import referralLatestCommissionHisorySagas from "./MyAccount/ReferralLatestCommissionHisory";
import activityListSagas from "./MyAccount/ActivityList";
import apiSettingSagas from "./MyAccount/APISetting";
import socialLoginSagas from "./MyAccount/SocialLogin";
import complainSagas from "./MyAccount/Complain";
import normalRegisterSagas from "./MyAccount/NormalRegistration";
import signupEmailOTPSagas from "./MyAccount/SignupEmailWithOTP";
import signupMobileOTPSagas from "./MyAccount/SignupMobileWithOTP";
import normalLoginSagas from "./MyAccount/NormalLogin";
import signinEmailOTPSagas from "./MyAccount/SigninEmailWithOTP";
import signinMobileOTPSagas from "./MyAccount/SigninMobileWithOTP";
import authorizationTokenSagas from "./MyAccount/AuthorizationToken";
import signupBlockchainSagas from "./MyAccount/SignupWithBlockchain";
import emailConfirmationSagas from "./MyAccount/EmailConfirmation";
import deviceAuthorizeSagas from "./MyAccount/DeviceAuthorize";
import socialTradingPolicySagas from "./SocialProfile/SocialTradingPolicy";

// added by Tejas
import tradeSagas from "./Trade/Pair";
import pairListSagas from "./Trade/PairList";
import holdingsSaga from "./Trade/HoldingsSaga";
// import sellerOrderSaga from './Trade/SellerOrderSaga';
// import buyerOrderSaga from './Trade/BuyerOrderSaga';
// import marketTradeHistorySaga from './Trade/MarketTradeHistorySaga';
import openOrderSaga from "./Trade/OpenOrdersSaga";
import recentOrderSaga from "./Trade/RecentOrdersSaga";
import currentMarketCapSaga from "./Trade/CurrentMarketCapSaga";
import newsTickerSaga from "./Trade/NewsTickerSaga";
import currencySaga from "./Trade/CurrencyDetailsSaga";
import placeOrderSaga from "./Trade/PlaceOrderSaga";
import chartData from "./Trade/TradeChartDataSaga";
import transactionCharge from "./TransactionCharge/TransactionChargeSaga";
//import topGainerLoserSaga from './Trade/TopGainerLoserSaga';

// added by devang parekh
import transactionHistory from "./TransactionHistory";
import openOrders from "./OpenOrders";

// Added By Kushal
import contactusSagas from "./Contactus/Contactus";
import newsSagas from "./News/News";
import faqSagas from "./Faq/Faq";
import annoucementSagas from "./Annoucement/Annoucement";
import apiSagas from "./Api/Api";

/* Added By Nishant */
import depositHistorySaga from "./Deposit/HistorySaga";
import withdrawHistorySaga from "./Withdraw/HistorySaga";
import addressGenerationSaga from "./Deposit/AddressGenerationSaga";
import withdrawSaga from "./Withdraw/WithdrawSaga";
import tokenStakingSaga from "./TokenStaking/TokenStakingSaga";
import stakingHistorySaga from "./TokenStaking/StakingHistorySaga";
import convertHistorySaga from "./ConvertToken/ConvertHistorySaga";
import convertTokenInfoSaga from "./ConvertToken/ConvertTokenSaga";
import limitControlSaga from "./LimitsControl/LimitsControlSaga";
import transferInSaga from "./TransferInOut/TransferInSaga";
import transferOutSaga from "./TransferInOut/TransferOutSaga";
import decentAddressGenSaga from "./DecentAddressGen/DecentAddressGenSaga";
import whitelistedAddressListSaga from "./AddressWhitelist/WhitelistedAddressListSaga";
import fundBalanceSaga from "./FundBalances/FundBalancesSaga";
import incomingTransactionsSaga from "./IncomingTransactions/IncomingTransactionsSaga";
import outGoingTransactionsSaga from "./OutGoingTransaction/OutGoingTransactionSaga";
import myWalletSaga from "./MyWallets/MyWalletsSaga";

//added by Nirmit
import tradingledgerSaga from "./TradingReport/TradingLedgerSaga";

// added By Tejas
import myLedgerSaga from "./TradingReport/MyLedgerSaga";

// added By Kushal
import coinListSaga from "./Coinlist/Coinlist";
// added by Jayesh 
import languagesSaga from "./Language/Language";
import surveySaga from "./Survey/Survey";
// added code by devang parekh 26-12-2018
import coinSliderSaga from "./LandingPage/CoinSlider";
//added by Kushal parekh 28-12-2018
import regionsSagas from "./Regions/Regions";

import tradeSummaryReport from './TradingReport/TradeSummarySaga';

//Added by Jayesh Pathak 09-01-2019
import helpcenterSagas from "./HelpCenter/HelpCenter";



// added by Bharat Jograna
import tablesaga from './tablesaga/tablesaga'

export default function* rootSaga(getState) {
  yield all([
    feedbacksSagas(),
    pageContentSagas(),

    //Parthbhai...
    loginHistorySagas(),
    ipHistorySagas(),
    deviceManagementSagas(),
    editProfileSagas(),
    antiPhishingCodeSagas(),

    //Kevinbhai....
    userauthSagas(),
    usermobileauthSagas(),
    userblockchainauthSagas(),
    smsauthSagas(),
    enablegoogleauthSagas(),
    resetpasswordSagas(),
    changepasswordSagas(),
    disablesmsauthSagas(),
    disablegoogleauthSagas(),
    membershipLevelSagas(),
    tradeSummarySagas(),
    topGainersSagas(),
    topLosersSagas(),
    ipWhitelistSagas(),
    deviceListSagas(),
    themeConfigSagas(),
    forgotConfirmationSagas(),

    socialProfileSagas(),

    //Salimbhai....
    twoFAAuthenticationSagas(),
    forgotPasswordSagas(),
    loginSagas(),
    personalVerificationFormSagas(),
    enterpriseVerificationFormSagas(),
    referralFriendsSagas(),
    referralLatestCommissionHisorySagas(),
    activityListSagas(),
    apiSettingSagas(),
    socialLoginSagas(),
    complainSagas(),
    normalRegisterSagas(),
    signupEmailOTPSagas(),
    signupMobileOTPSagas(),
    normalLoginSagas(),
    signinEmailOTPSagas(),
    signinMobileOTPSagas(),
    authorizationTokenSagas(),
    signupBlockchainSagas(),
    emailConfirmationSagas(),
    deviceAuthorizeSagas(),
    socialTradingPolicySagas(),

    // added by tejas
    pairListSagas(),
    tradeSagas(),
    holdingsSaga(),
    // sellerOrderSaga(),
    // buyerOrderSaga(),
    // marketTradeHistorySaga(),
    openOrderSaga(),
    recentOrderSaga(),
    currentMarketCapSaga(),
    newsTickerSaga(),
    currencySaga(),
    placeOrderSaga(),
    chartData(),
    transactionCharge(),

    // added by devang parekh
    transactionHistory(),
    openOrders(),

    //Added by Kushal
    contactusSagas(),
    newsSagas(),
    faqSagas(),
    annoucementSagas(),
    apiSagas(),

    /* Added By Nishant */
    depositHistorySaga(),
    withdrawHistorySaga(),
    addressGenerationSaga(),
    withdrawSaga(),
    tokenStakingSaga(),
    stakingHistorySaga(),
    convertHistorySaga(),
    convertTokenInfoSaga(),
    limitControlSaga(),
    transferInSaga(),
    transferOutSaga(),
    decentAddressGenSaga(),
    whitelistedAddressListSaga(),
    fundBalanceSaga(),
    myWalletSaga(),
    //added Nirmit
    tradingledgerSaga(),
    //added By tejas
    myLedgerSaga(),
    //added by Kushal
    coinListSaga(),
    incomingTransactionsSaga(),
    outGoingTransactionsSaga(),
    coinSliderSaga(),
    //added by Jayesh
    languagesSaga(),
    surveySaga(),
    regionsSagas(),

    //added by tejas
    //topGainerLoserSaga(),

    tradeSummaryReport(),
    //Added by Jayesh
    helpcenterSagas(),



    // added by Bharat Jograna
    tablesaga(),
  ]);
}
