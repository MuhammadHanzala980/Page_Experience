import axios from "axios/index";

import { GET_USER_INFO, GET_USERS, GET_SUBSCRIPTIONS, SUBSCRIBE_TO_USER, UNSUBSCRIBE_FROM_USER } from "./ActionType";
import { checkTokenExpired } from "./check";

function getUserInfo(token, userId, dispatch) {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/info/userId/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(results => {

      //console.log("results", results);
      if (results.data !== undefined) {
        if (results.data.code === 200) {
          dispatch({
            type: GET_USER_INFO,
            payload: { ...results.data.data, _id: userId },
          });
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
        type: GET_USER_INFO,
        payload: { error: "somthing when wrong!" },
      });
    });
}

export function getUserInfoAction(token, userId) {
  if (!userId) return;
  return async function (dispatch) {
    return getUserInfo(token, userId, dispatch);
  };
}


function getUsers(passion, page, limit, dispatch) {
  const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));

  return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/explore/passionId/${passion}/limit/${limit}/page/${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myInfo.token}`
    }
  })
    .then(results => {
      dispatch({
        type: GET_USERS,
        payload: results.data.data.data
      });
      return results;
    })
    .catch(err => {
      console.error(err);

      if (checkTokenExpired(err.response, dispatch)) {
        return;
      }
    });
}

function subscribeToUser(myInfo, userId, dispatch) {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/users/subscription/create`,
    {
      data: {
        userId: myInfo.userId,
        subscribeToUserId: userId
      }
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myInfo.token}`
      }
    }
  ).then(results => {
    if (results && results.data) {
      if (results.data.error) return { error: results.data.error.msg }
      if (results.data.code === 200) {
        dispatch(
          {
            type: SUBSCRIBE_TO_USER,
            payload: userId,
          }
        );
        return;
      }
    }

    return { error: "something went wrong!" };
  }).catch(error => {
    console.log(error);

    if (checkTokenExpired(error.response, dispatch)) {
      return;
    }

    return { error: "something went wrong!" };
  })
}

function unSubscribeFromUser(myInfo, userId, dispatch) {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/api/v1/users/subscription/remove`,
    {
      data: {
        data: {
          userId: myInfo.userId,
          unSubscribeToUserId: userId
        }
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myInfo.token}`
      }
    }
  ).then(results => {
    console.log(results);

    if (results && results.data) {
      if (results.data.error) return { error: results.data.error.msg }
      if (results.data.code === 200) {

        dispatch(
          {
            type: UNSUBSCRIBE_FROM_USER,
            payload: userId,
          }
        );
        return;
      }
    }
    return { error: "something went wrong!" };
  }).catch(error => {
    console.log(error);

    if (checkTokenExpired(error.response, dispatch)) {
      return;
    }

    return { error: "something went wrong!" };
  })
};

export function subscribeToUserAction(myInfo, userId) {
  return async function (dispatch) {
    return subscribeToUser(myInfo, userId, dispatch);
  };
}

export function unSubscribeFromUserAction(myInfo, userId) {
  return async function (dispatch) {
    return unSubscribeFromUser(myInfo, userId, dispatch);
  };
}


export function getUsersAction(passion, page, limit) {
  return async function (dispatch) {
    return getUsers(passion, page, limit, dispatch);
  };
}
function getAllMySubscriptions(myInfo, dispatch) {

  return axios.get(
    `${process.env.REACT_APP_API_URL}/api/v1/users/subscription/list/userId/${myInfo.userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myInfo.token}`
    }
  }
  ).then(results => {
    if(results && results.data){
      if(results.data.error) return {error: results.data.error.msg }
      if(results.data.code === 200){
        dispatch(
            {
              type: GET_SUBSCRIPTIONS,
              payload: results.data.data,
            }
        )
      }
    }
    return { error: "something went wrong!" };
  }).catch(error => {
    console.log(error);

    if (checkTokenExpired(error.response, dispatch)) {
      return;
    }

    return { error: "something went wrong!" };
  })
}

export function getAllMySubscriptionsAction(myInfo) {
  return async function (dispatch) {
    return getAllMySubscriptions(myInfo, dispatch);
  };
}
