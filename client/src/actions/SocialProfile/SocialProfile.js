/**
 * Auther : Kevin Ladani
 * Created : 19/12/2018
 * UpdatedBy : Salim Deraiya 24/12/2018
 * Social Profile Actions
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
} from '../types';

/**
 * Redux Action To Get Leader Configuration
 */
export const getLeaderConfig = (data) => ({
    type: GET_LEADER_CONFIG,
    payload: data
});

/**
 * Redux Action Get LeaderConfig Success
 */
export const getLeaderConfigSuccess = (data) => ({
    type: GET_LEADER_CONFIG_SUCCESS,
    payload: data
});

/**
 * Redux Action Get LeaderConfig Failure
 */
export const getLeaderConfigFailure = (error) => ({
    type: GET_LEADER_CONFIG_FAILURE,
    payload: error
});

/**
 * Redux Action To Edit Leader Configuration
 */
export const editLeaderConfig = (data) => ({
    type: EDIT_LEADER_CONFIG,
    payload: data
});

/**
 * Redux Action Edit LeaderConfig Success
 */
export const editLeaderConfigSuccess = (data) => ({
    type: EDIT_LEADER_CONFIG_SUCCESS,
    payload: data
});

/**
 * Redux Action Edit LeaderConfig Failure
 */
export const editLeaderConfigFailure = (error) => ({
    type: EDIT_LEADER_CONFIG_FAILURE,
    payload: error
});

/**
 * Redux Action To Get Follower Configuration
 */
export const getFollowerConfig = (data) => ({
    type: GET_FOLLOWER_CONFIG,
    payload: data
});

/**
 * Redux Action Get FollowerConfig Success
 */
export const getFollowerConfigSuccess = (data) => ({
    type: GET_FOLLOWER_CONFIG_SUCCESS,
    payload: data
});

/**
 * Redux Action Get FollowerConfig Failure
 */
export const getFollowerConfigFailure = (error) => ({
    type: GET_FOLLOWER_CONFIG_FAILURE,
    payload: error
});

/**
 * Redux Action To Edit Follower Configuration
 */
export const editFollowerConfig = (data) => ({
    type: EDIT_FOLLOWER_CONFIG,
    payload: data
});

/**
 * Redux Action Edit FollowerConfig Success
 */
export const editFollowerConfigSuccess = (data) => ({
    type: EDIT_FOLLOWER_CONFIG_SUCCESS,
    payload: data
});

/**
 * Redux Action Edit FollowerConfig Failure
 */
export const editFollowerConfigFailure = (error) => ({
    type: EDIT_FOLLOWER_CONFIG_FAILURE,
    payload: error
});

/**
 * Redux Action To Get Social Profile Subscription
 */
export const getSocialProfileSubscription = () => ({
    type: GET_SOCIAL_PROFILE_SUBSCRIPTION
});

/**
 * Redux Action Get Social Profile Subscription Success
 */
export const getSocialProfileSubscriptionSuccess = (data) => ({
    type: GET_SOCIAL_PROFILE_SUBSCRIPTION_SUCCESS,
    payload: data
});

/**
 * Redux Action Get Social Profile Subscription Failure
 */
export const getSocialProfileSubscriptionFailure = (error) => ({
    type: GET_SOCIAL_PROFILE_SUBSCRIPTION_FAILURE,
    payload: error
});

/**
 * Redux Action To Get Social Profile Subscribe
 */
export const getSocialProfileSubscribe = (data) => ({
    type: SOCIAL_PROFILE_SUBSCRIBE,
    payload : data
});

/**
 * Redux Action Get Social Profile Subscribe Success
 */
export const getSocialProfileSubscribeSuccess = (data) => ({
    type: SOCIAL_PROFILE_SUBSCRIBE_SUCCESS,
    payload: data
});

/**
 * Redux Action Get Social Profile Subscribe Failure
 */
export const getSocialProfileSubscribeFailure = (error) => ({
    type: SOCIAL_PROFILE_SUBSCRIBE_FAILURE,
    payload: error
});

/**
 * Redux Action To Get Social Profile UnSubscribe
 */
export const getSocialProfileUnSubscribe = (data) => ({
    type: SOCIAL_PROFILE_UNSUBSCRIBE,
    payload : data
});

/**
 * Redux Action Get Social Profile UnSubscribe Success
 */
export const getSocialProfileUnSubscribeSuccess = (data) => ({
    type: SOCIAL_PROFILE_UNSUBSCRIBE_SUCCESS,
    payload: data
});

/**
 * Redux Action Get Social Profile UnSubscribe Failure
 */
export const getSocialProfileUnSubscribeFailure = (error) => ({
    type: SOCIAL_PROFILE_UNSUBSCRIBE_FAILURE,
    payload: error
});