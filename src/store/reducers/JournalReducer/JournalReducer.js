import { GET_MY_JOURNALS, /*CREATE_JOURNAL, DELETE_JOURNAL*/ } from "../../actions/ActionType";
const initialState = [
];
export default function (state = initialState, action) { 
    switch (action.type) {
        case GET_MY_JOURNALS:
            return action.payload;
        default:
            return state;
    }
}

