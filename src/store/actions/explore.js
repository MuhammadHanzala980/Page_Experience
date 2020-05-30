import {
    EXPLORE_PASSIONS_LIST,
    EXPLORE_FORMS_LIST,
    EXPLORE_JOURNALS_LIST,
    EXPLORE_SELECT_SECTION,
    EXPLORE_RESET_NAVIGATION,
    EXPLORE_RESET_JOURNAL_SELECTION
} from "./ActionType";
import { checkTokenExpired } from "./check";
import axios from "axios";

function getPassions(page, limit, dispatch) {
    console.log('GET PASSIONS');
    return axios
        .get(
            process.env.REACT_APP_API_URL +
            `/api/v1/passion/all/limit/${limit}/page/${page}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(results => {
            console.log('Get passions results');
            console.log(results);

            if(results && results.data && results.data.data && results.data.data.data[0]){
                dispatch({
                    type: EXPLORE_PASSIONS_LIST,
                    payload: results.data.data.data
                });
            }
        })
        .catch(err => {
            dispatch({
                type: EXPLORE_PASSIONS_LIST,
                payload: false
            });
        });
}

export function getPassionsAction() {
    return async function(dispatch) {
        return getPassions(0, 1000, dispatch);
    };
}

function getForms(page, limit, passion, dispatch) {
    const myInfo = JSON.parse(sessionStorage.getItem("myinfo"));
    return axios
        .get(
            process.env.REACT_APP_API_URL +
            `/api/v1/journal/forms/all/passion/${passion}/limit/${limit}/page/${page}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${myInfo.token}`
                }
            }
        )
        .then(results => {
            if(results && results.data && results.data.data && results.data.data.data){
                dispatch({
                    type: EXPLORE_FORMS_LIST,
                    payload: results.data.data.data
                });
            }
        })
        .catch(err => {
            if (checkTokenExpired(err.response, dispatch)) {
                return;
            }

            dispatch({
                type: EXPLORE_FORMS_LIST,
                payload: false
            });
        });
}

export function getFormsAction(passion) {
    return async function(dispatch) {
        return getForms(0, 1000, passion, dispatch);
    };
}

function getJournals(page, limit, passion, form, dispatch) {
    const myInfo = JSON.parse(sessionStorage.getItem("myinfo"));
    return axios
        .get(
            process.env.REACT_APP_API_URL +
            `/api/v1/journal/all/passion/${passion}/form/${form}/limit/${limit}/page/${page}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${myInfo.token}`
                }
            }
        )
        .then(results => {
            if(results && results.data && results.data.data && results.data.data.data){
                dispatch({
                    type: EXPLORE_JOURNALS_LIST,
                    payload: results.data.data.data
                });
            }
        })
        .catch(err => {
            if (checkTokenExpired(err.response, dispatch)) {
                return;
            }

            dispatch({
                type: EXPLORE_JOURNALS_LIST,
                payload: false
            });
        });
}

export function getJournalsAction(passion, form) {
    return async function(dispatch) {
        return getJournals(0, 1000, passion, form, dispatch);
    };
}

export function selectSection(passion, form, journal) {
    return {
        type: EXPLORE_SELECT_SECTION,
        payload: {passion, form, journal}
    };
}

export function exploreResetNavigationAction() {
    return {
        type: EXPLORE_RESET_NAVIGATION
    };
}

export function exploreResetJournalSelectionAction() {
    return {
        type: EXPLORE_RESET_JOURNAL_SELECTION
    };
}
