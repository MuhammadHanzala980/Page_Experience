import {
    EXPLORE_PASSIONS_LIST,
    EXPLORE_FORMS_LIST,
    EXPLORE_JOURNALS_LIST,
    EXPLORE_SELECT_SECTION,
    EXPLORE_RESET_NAVIGATION,
    EXPLORE_RESET_JOURNAL_SELECTION, LOGIN_USER, LOGOUT_USER
} from "../../actions/ActionType";

const initialState = {
    passions: [],
    forms: [],
    journals: [],
    selectedSection: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return initialState;
        case LOGOUT_USER:
            return initialState;
        case EXPLORE_PASSIONS_LIST:
            console.log('REDUCER EXPLORE_PASSIONS_LIST');
            return {
                ...state, passions: action.payload, forms: [], journals: []
            };
        case EXPLORE_FORMS_LIST:
            return {
                ...state, forms: action.payload, journals: []
            };
        case EXPLORE_JOURNALS_LIST:
            return {
                ...state, journals: action.payload
            };
        case EXPLORE_SELECT_SECTION:
            return {
                ...state, selectedSection: action.payload
            };
        case EXPLORE_RESET_NAVIGATION:
            console.log('REDUCER EXPLORE_RESET_NAVIGATION');
            return {
                ...state, selectedSection: null, passions: [], forms: [], journals: []
            };
        case EXPLORE_RESET_JOURNAL_SELECTION:
            console.log('EXPLORE_RESET_JOURNAL_SELECTION');

            let newSelectedSection = null;

            if (state.selectedSection) {
                newSelectedSection = {...state.selectedSection, journal: null};
            }

            console.log(newSelectedSection);

            return {
                ...state, selectedSection: newSelectedSection
            };
        default:
            return state;
    }
}
