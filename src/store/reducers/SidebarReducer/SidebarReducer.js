import {
    LOGIN_USER,
    LOGOUT_USER,
    SIDEBAR_GET_TRENDING,
    SIDEBAR_GET_ARTFORMS
} from '../../actions/ActionType';

const initialState = {
    trending: [],
    artforms: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return initialState;
        case LOGOUT_USER:
            return initialState;
        case SIDEBAR_GET_ARTFORMS:
            console.log('SIDEBAR_GET_ARTFORMS');
            console.log(action);
            return {
                ...state,
                artforms: action.payload
            };
        case SIDEBAR_GET_TRENDING:
            console.log('SIDEBAR_GET_TRENDING');
            console.log(action);
            return {
                ...state,
                trending: action.payload
            };
        default:
            return state;
    }
}
