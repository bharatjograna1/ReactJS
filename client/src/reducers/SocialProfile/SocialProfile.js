/**
 * Auther : Kevin Ladani
 * Created : 19/12/2018
 * UpdatedBy : Salim Deraiya 24/12/2018
 * Social Profile Reducers
 */
import {
    //Get Leader Config
    GET_LEADER_CONFIG,
    GET_LEADER_CONFIG_SUCCESS,
    GET_LEADER_CONFIG_FAILURE,

    //Edit Leader Config
    EDIT_LEADER_CONFIG,
    EDIT_LEADER_CONFIG_SUCCESS,
    EDIT_LEADER_CONFIG_FAILURE,

    //Get Follower Config
    GET_FOLLOWER_CONFIG,
    GET_FOLLOWER_CONFIG_SUCCESS,
    GET_FOLLOWER_CONFIG_FAILURE,

    //Edit Follower Config
    EDIT_FOLLOWER_CONFIG,
    EDIT_FOLLOWER_CONFIG_SUCCESS,
    EDIT_FOLLOWER_CONFIG_FAILURE,

    //Get Social Profile Subscription
    GET_SOCIAL_PROFILE_SUBSCRIPTION,
    GET_SOCIAL_PROFILE_SUBSCRIPTION_SUCCESS,
    GET_SOCIAL_PROFILE_SUBSCRIPTION_FAILURE,

    //Social Profile Subscribe
    SOCIAL_PROFILE_SUBSCRIBE,
    SOCIAL_PROFILE_SUBSCRIBE_SUCCESS,
    SOCIAL_PROFILE_SUBSCRIBE_FAILURE,

    //Social Profile UnSubscribe
    SOCIAL_PROFILE_UNSUBSCRIBE,
    SOCIAL_PROFILE_UNSUBSCRIBE_SUCCESS,
    SOCIAL_PROFILE_UNSUBSCRIBE_FAILURE,
} from 'Actions/types';


/*
* Initial State
*/
const INIT_STATE = {
    loading: false,
    getleaderData: [],
    getfollowerData: [],
    leaderData: [],
    followerData: [],
    subscriptionData: [],
    subscribeData: {}
}

//Check Action for Complain...
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //Get Leader Profile Configuration..
        case GET_LEADER_CONFIG:
            return { ...state, loading: true, leaderData : '' };

        case GET_LEADER_CONFIG_SUCCESS:
            return { ...state, loading: false, leaderData: action.payload };

        case GET_LEADER_CONFIG_FAILURE:
            return { ...state, loading: false, leaderData: action.payload };

        //Edit Leader Profile Configuration..
        case EDIT_LEADER_CONFIG:
            return { ...state, loading: true, leaderData : '' };

        case EDIT_LEADER_CONFIG_SUCCESS:
            return { ...state, loading: false, leaderData: action.payload };

        case EDIT_LEADER_CONFIG_FAILURE:
            return { ...state, loading: false, leaderData: action.payload };

        //Get Follower Profile Configuration..
        case GET_FOLLOWER_CONFIG:
            return { ...state, loading: true, followerData : '' };

        case GET_FOLLOWER_CONFIG_SUCCESS:
            return { ...state, loading: false, followerData: action.payload };

        case GET_FOLLOWER_CONFIG_FAILURE:
            return { ...state, loading: false, followerData: action.payload };

        //Edit Follower Profile Configuration..
        case EDIT_FOLLOWER_CONFIG:
            return { ...state, loading: true, followerData : '' };

        case EDIT_FOLLOWER_CONFIG_SUCCESS:
            return { ...state, loading: false, followerData: action.payload };

        case EDIT_FOLLOWER_CONFIG_FAILURE:
            return { ...state, loading: false, followerData: action.payload };

        //Get Social Profile Subscription...
        case GET_SOCIAL_PROFILE_SUBSCRIPTION:
            return { ...state, loading: true, subscribeData : '', subscriptionData : '' };

        case GET_SOCIAL_PROFILE_SUBSCRIPTION_SUCCESS:
            return { ...state, loading: false, subscriptionData: action.payload };

        case GET_SOCIAL_PROFILE_SUBSCRIPTION_FAILURE:
            return { ...state, loading: false, subscriptionData: action.payload };

        //Social Profile Subscribe...
        case SOCIAL_PROFILE_SUBSCRIBE:
            return { ...state, loading: true };

        case SOCIAL_PROFILE_SUBSCRIBE_SUCCESS:
            return { ...state, loading: false, subscribeData: action.payload };

        case SOCIAL_PROFILE_SUBSCRIBE_FAILURE:
            return { ...state, loading: false, subscribeData: action.payload };

        //Social Profile UnSubscribe...
        case SOCIAL_PROFILE_UNSUBSCRIBE:
            return { ...state, loading: true };

        case SOCIAL_PROFILE_UNSUBSCRIBE_SUCCESS:
            return { ...state, loading: false, subscribeData: action.payload };

        case SOCIAL_PROFILE_UNSUBSCRIBE_FAILURE:
            return { ...state, loading: false, subscribeData: action.payload };

        default:
            return { ...state };
    }
}