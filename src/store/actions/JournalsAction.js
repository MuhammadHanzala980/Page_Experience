import axios from "axios/index";

import { CREATE_JOURNAL, GET_MY_JOURNALS,/* DELETE_JOURNAL */} from "./ActionType";
import {checkTokenExpired} from "./check";

function getMyJournals(myInfo, dispatch) {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/journal/all/limit/100/page/0`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myInfo.token}`
      }
    })
    .then(results => {
      if (results.data !== undefined) {
      if (results.data.code === 200) {
           dispatch({
             type: GET_MY_JOURNALS,
             payload: results.data.data.data,
           });
         }
         return results.data.data;
     }
    })
    .catch(err => {
      console.error('create journal error:',err);

        if (checkTokenExpired(err.response, dispatch)) {
            return;
        }

      dispatch({
        type: GET_MY_JOURNALS,
        payload: {error: "somthing when wrong!"},
      });
      return err;
    });
}
export function getMyJournalsAction(myInfo) {
  return async function(dispatch) {
    return getMyJournals(myInfo, dispatch);
  };
}





function createJournal(myInfo, data, dispatch) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/v1/journal/new`,{data: data}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myInfo.token}`
        }
      })
      .then(results => {
          console.log("results create journal", results);
        if (results.data !== undefined) {
        if (results.data.code === 200) {
            console.log('journals', results.data.data);
             dispatch(getMyJournalsAction(myInfo));
           }
           return results.data.data;
       }
      })
      .catch(err => {
        console.error(err);

        if (checkTokenExpired(err.response, dispatch)) {
            return;
        }

        dispatch({
          type: CREATE_JOURNAL,
          payload: {error: "somthing when wrong!"},
        });
      });
  }
  export function createJournalAction(myInfo, journal) {
      const data ={
        userId: myInfo.userId,
        title: journal.title,
        form: journal.form,
      }
    return async function(dispatch) {
      return createJournal(myInfo, data, dispatch);
    };
  }



  function deleteJournal(myInfo, data, dispatch) {
    console.log('calling api delete', myInfo, data);
    console.log("myInfo.token", myInfo.token);
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization",  `Bearer ${myInfo.token}`);
    return fetch(`${process.env.REACT_APP_API_URL}/api/v1/journal/remove`,
    {
      method: 'DELETE',
      body : JSON.stringify({data : data}),
      headers: headers
      })
      .then(response  => response.json())
      .then(results => {
        console.log('delete results', results);
        if (results.code === 200) {
             dispatch(getMyJournalsAction(myInfo));
           return results.data;
       }
      })
      .catch(err => {
        console.error(err);

        dispatch({
          type: CREATE_JOURNAL,
          payload: {error: "somthing when wrong!"},
        });
      });
  }
  export function deleteJournalAction(myInfo, journal) {
      const data = {
        userId: myInfo.userId,
        journalId: journal._id,
      }
    return async function(dispatch) {
      return deleteJournal(myInfo, data, dispatch);
    };
  }
