import axios from "axios";
import {SIDEBAR_GET_TRENDING, SIDEBAR_GET_ARTFORMS} from "../ActionType";
import {checkTokenExpired} from "../check";

function getTrending(dispatch) {
    const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
    return axios
        .get(
            process.env.REACT_APP_API_URL +
            `/api/v1/content/trending/subjects`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myInfo.token}`,
                },
            }
        )
        .then((results) => {
            console.log('getTrending');
            console.log(results);
            dispatch({
                type: SIDEBAR_GET_TRENDING,
                payload: results.data.data,
            });
        })
        .catch((err) => {
            if (checkTokenExpired(err.response, dispatch)) {
                return;
            }
            //todo error catch
        });
}

export function getTrendingAction() {
    return async function (dispatch) {
        return getTrending(dispatch);
    };
}

function getUserArtforms(dispatch) {
    const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
    return axios
        .get(
            process.env.REACT_APP_API_URL +
            `/api/v1/artforms/activity/user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${myInfo.token}`,
                },
            }
        )
        .then((results) => {
            console.log('getUserArtforms');
            console.log(results);
            dispatch({
                type: SIDEBAR_GET_ARTFORMS,
                payload: results.data.data,
            });
        })
        .catch((err) => {
            console.log('ERROR:');
            console.log(err);

            if (checkTokenExpired(err.response, dispatch)) {
                return;
            }
            //todo error catch
        });
}

export function getUserArtformsAction() {
    return async function (dispatch) {
        return getUserArtforms(dispatch);
    };
}
