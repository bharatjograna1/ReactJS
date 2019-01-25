/**
 * Page Content App Reducer
 */

// action types
import {
    GET_PAGE_CONTENTS,
    GET_PAGE_CONTENTS_SUCCESS,
    GET_PAGE_CONTENTS_FAILURE,
} from 'Actions/types';

// initial state
const INIT_STATE = {
    pageContents: {
        locale:{
            en:{
                title:'',
                content:''
            }
        }
    },
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        // get PAGE_CONTENTS
        case GET_PAGE_CONTENTS:
            return { ...state, pageContents: null };

        // get PAGE_CONTENTS success
        case GET_PAGE_CONTENTS_SUCCESS: 
            //console.log("from reducer",action);
            return { ...state, pageContents: action.payload };

        // get PAGE_CONTENTS failure
        case GET_PAGE_CONTENTS_FAILURE:
            return {}
        
        default: return { ...state };
    }
}
