// Reduceders for Currency Details Data By Tejas Date: 17/9/2018

import {
    GET_CURRENCY_LIST,
    GET_CURRENCY_LIST_SUCCESS,
    GET_CURRENCY_LIST_FAILURE,
    GET_CURRENT_PRICE,
    GET_CURRENT_PRICELIST_SUCCESS,
    GET_CURRENT_PRICE_FAILURE,
    UPDATE_BALANCE,
    UPDATE_BALANCE_SUCCESS,
    UPDATE_BALANCE_FAILURE,
}
    from 'Actions/types';

// Set Initial State
const INITIAL_STATE = {
    loading: false,
    wallets: [],
    currentPrice: [],
    updateBalance: []
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        // get Currency list
        case GET_CURRENCY_LIST:
            return { ...state, loading: true };

        // set Data Of  Currency list
        case GET_CURRENCY_LIST_SUCCESS:

            return { ...state, wallets: action.payload, loading: false };

        // Display Error for Currency list failure
        case GET_CURRENCY_LIST_FAILURE:

            return { ...state, loading: false, wallets: [] };

        // get Current Price list
        case GET_CURRENT_PRICE:
            return { ...state, loading: true };

        // set Data Of  Current Price list
        case GET_CURRENT_PRICELIST_SUCCESS:

            return { ...state, currentPrice: action.payload, loading: false };

        // Display Error for Current Price list failure
        case GET_CURRENT_PRICE_FAILURE:

            return { ...state, loading: false, currentPrice: [] };

        //  update balance
        case UPDATE_BALANCE:
            return { ...state, loading: true };

        // set Data Of   update balance
        case UPDATE_BALANCE_SUCCESS:

            return { ...state, updateBalance: action.payload, loading: false };

        // Display Error for update balance failure
        case UPDATE_BALANCE_FAILURE:

            return { ...state, loading: false, updateBalance: [] };


        default: return { ...state };
    }
}