import {
    GET_DATA,
    DUMMY_USER_SUCCESS,
    DUMMY_USER_FAILURE
} from '../ActionType';
import axios from "axios/index";


export function getData() {
    let data = {
        id: 1,
        username: "John Doe",
        age: "42",
        position: "Software engineer"
    };

    return function (dispatch) {
        dispatch({
            type: GET_DATA,
            payload: data
        })

    }
}

// Get Dummy User Data
export const getDummyUser = (dispatch) => {
    axios.get("http://jsonplaceholder.typicode.com/users")
        .then(resp => {
            dispatch({
                type: DUMMY_USER_SUCCESS,
                payload: resp.data,
            })
        })
        .catch(err => {
            dispatch({
                type: DUMMY_USER_FAILURE,
                payload: false,
            })
        })
}