/**
 * Auther : Salim Deraiya
 * Created : 10/10/2018
 * Soical Profile Dashboard
 */
import React from 'react';
import Loadable from 'react-loadable';
import PreloadWidget from 'Components/PreloadLayout/PreloadWidget';

const MyLoadingComponent = () => (
    <PreloadWidget />
)

/*=================  SALIM SECTION ==========================*/
const TopGainer = Loadable({
    loader: () => import("./TopGainer"),
    loading: MyLoadingComponent
});

const TopLooser = Loadable({
    loader: () => import("./TopLooser"),
    loading: MyLoadingComponent
});

const PopularLeaders = Loadable({
    loader: () => import("./PopularLeaders"),
    loading: MyLoadingComponent
});

const HistoricalPerformance = Loadable({
    loader: () => import("./HistoricalPerformance"),
    loading: MyLoadingComponent
});

const SocialPosting = Loadable({
    loader: () => import("./SocialPosting"),
    loading: MyLoadingComponent
});

const TopGainerGrid = Loadable({
    loader: () => import("./TopGainerGrid"),
    loading: MyLoadingComponent
});

const TopLooserGrid = Loadable({
    loader: () => import("./TopLooserGrid"),
    loading: MyLoadingComponent
});

const TopLeaderGrid = Loadable({
    loader: () => import("./TopLeaderGrid"),
    loading: MyLoadingComponent
});

const HistoricalPerformanceChart = Loadable({
    loader: () => import("./HistoricalPerformanceChart"),
    loading: MyLoadingComponent
});

const Portfolio = Loadable({
    loader: () => import("./Portfolio"),
    loading: MyLoadingComponent
});

const RecentTradingHistory = Loadable({
    loader: () => import("./RecentTradingHistory"),
    loading: MyLoadingComponent
});

const TopGainerList = Loadable({
    loader: () => import("./TopGainerList"),
    loading: MyLoadingComponent
});

const SocialSubscriptionPlan = Loadable({
    loader: () => import("./SocialSubscriptionPlan"),
    loading: MyLoadingComponent
});

export {
    //SALIM 
    TopGainer,
    TopLooser,
    PopularLeaders,
    HistoricalPerformance,
    SocialPosting,
    TopGainerGrid,
    TopLooserGrid,
    TopLeaderGrid,
    HistoricalPerformanceChart,
    Portfolio,
    RecentTradingHistory,
    TopGainerList,
    SocialSubscriptionPlan
}