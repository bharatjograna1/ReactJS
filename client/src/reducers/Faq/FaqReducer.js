/* 
    Createdby : Kushal parekh
    Updateby : Kushal parekh
    CreatedDate : 19-09-2018
    UpdatedDate : 19-09-2018
    Description : Faq data Reducer action manager
*/
import update from 'react-addons-update';
import { NotificationManager } from 'react-notifications';
// action types
import {
    GET_FAQ,
    GET_FAQ_SUCCESS,
    GET_FAQ_FAILURE,
    GET_FAQ_CATEGORIES,
    GET_FAQ_CATEGORIES_SUCCESS,
    GET_FAQ_CATEGORIES_FAILURE,
    GET_FAQ_QUESTIONS,
    GET_FAQ_QUESTIONS_SUCCESS,
    GET_FAQ_QUESTIONS_FAILURE,
    UPDATE_SEARCH_FAQ,
    ON_SEARCH_FAQ,
    SHOW_FAQ_LOADING_INDICATOR,
    HIDE_FAQ_LOADING_INDICATOR,
} from 'Actions/types';

// initial state
const INIT_STATE = {
    faqs_categories_list:[],
    allfaqs:null,
    faqs:null,
    faqloading: false,
    searchFaqText: ''
};

export default (state = INIT_STATE, action) => {
   // console.log("actiontype",action.type);
    switch (action.type) {

        // get Faq Category
        case GET_FAQ_CATEGORIES:
            return { ...state,faqloading:true};

        // get Faq Category success
        case GET_FAQ_CATEGORIES_SUCCESS:
            return { ...state, faqloading: false,faqs_categories_list:action.payload};

        // get Faq Category failure
        case GET_FAQ_CATEGORIES_FAILURE:
            return {...state, faqloading: false};

        // get Faq Question
        case GET_FAQ_QUESTIONS:
            return { ...state,faqloading:true};

        // get Faq Question success
        case GET_FAQ_QUESTIONS_SUCCESS:
            return { ...state, faqloading: false,allfaqs:action.payload,faqs:action.payload};

        // get Faq Question failure
        case GET_FAQ_QUESTIONS_FAILURE:
            return {...state, faqloading: false}

        // get Faq
        case GET_FAQ:
            return { ...state,faqloading:true};

        // get Faq success
        case GET_FAQ_SUCCESS:
        //console.log("payloadFaq",action.payload);
            return { ...state, faqloading: false,allfaqs:action.payload,faqs: action.payload };

        // get Faq failure
        case GET_FAQ_FAILURE:
            NotificationManager.error(action.payload)
            return {...state, faqloading: false,};

         // show loading indicator
         case SHOW_FAQ_LOADING_INDICATOR:
            return { ...state, faqloading: true };

        // hide loading indicator
        case HIDE_FAQ_LOADING_INDICATOR:
            return { ...state, faqloading: false };
        
        // update search
        case UPDATE_SEARCH_FAQ:
            return { ...state, searchFaqText: action.payload };

        // on search faq
        case ON_SEARCH_FAQ:
            if (action.payload === '') {
                return { ...state, faqs: state.allfaqs, faqloading: false };
            } else {
                const searchFaqs = state.allfaqs.filter((faq) =>
                    faq.locale[localStorage.getItem('locale')].question.toLowerCase().indexOf(action.payload.toLowerCase()) > -1);
                return { ...state, faqs: searchFaqs, faqloading: false }
            }
            
        default: return { ...state };
    }
}
