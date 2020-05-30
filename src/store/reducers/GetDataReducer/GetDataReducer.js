import {
    GET_DATA,
    DUMMY_USER_SUCCESS,
} from "../../actions/ActionType";

const initialState = {
    getData: [],
    users: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_DATA:
            return {
                data: action.payload,
            };
        //update users in state or store
        case DUMMY_USER_SUCCESS:
            return { ...state, users: action.payload };

        default:
            return state;
    }
}