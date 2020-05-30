import {
  DELETE_CONTRIBUTION,
  EDIT_CONTRIBUTION,
} from "../ActionType";
import axios from "axios/index";
import { getContentsAction } from '../ContentAction/ContentAction';
import {checkTokenExpired} from "../check";
console.log(getContentsAction);


export function deleteContribution(contentId, myInfo, dispatch) {
  return axios
    .delete(`${process.env.REACT_APP_API_URL}/api/v1/content/contribution/contentId/${contentId}/user/${myInfo.userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myInfo.token}`
    }})
    .then(results => {
      if(results && results.data){
        if(results.data.code === 200) {
          //dispatch(getContentsAction(0,100));
            dispatch({
              type: DELETE_CONTRIBUTION,
              payload: {contentId, myUserId: myInfo.userId},
            });
          return results.data.data;
        }
        if(results.data.code === 406) return {error: "Invalid content"};
        if(results.data.code === 500) return {error: "An error has occured"};
        return {error: "Error Please try again later!"}
      }else
      {
        return {error: "Error Please try again later!"}
      }

      // dispatch({
      //   type: DELETE_CONTRIBUTION,
      //   payload: results.data
      // });
    })
    .catch(err => {
      console.log("delete error:", err);

      if (checkTokenExpired(err.response, dispatch)) {
        return;
      }

      return {error: "Error Please try again later!"}
      // dispatch({
      //   type: PUBLISH_WORK,
      //   payload: false
      // });
    });
}

export function deleteContributionAction(contentId, myInfo) {
  return async function(dispatch) {
    return deleteContribution(contentId, myInfo, dispatch);
  };
}



export function editContribution(contentId, data, myInfo, dispatch) {
  return axios
    .post(
        `${process.env.REACT_APP_API_URL}/api/v1/content/contribution/edit`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myInfo.token}`
          }
        }
    )
    .then(results => {
      console.log("edit contr. results", results);

      if (checkTokenExpired(results, dispatch)) {
        return;
      }

      if(results && results.data){
        if(results.data.code === 200) {
            dispatch({
              type: EDIT_CONTRIBUTION,
              payload: {contentId, myUserId: myInfo.userId},
            });
          return results.data.data;
        }
        if(results.data.code === 406) return {error: "Invalid content"};
        if(results.data.code === 500) return {error: "An error has occured"};
        return {error: "Error Please try again later!"}
      }else
      {
        return {error: "Error Please try again later!"}
      }
    })
    .catch(err => {
      console.log("delete error:", err);

      if (checkTokenExpired(err.response, dispatch)) {
        return;
      }

      return {error: "Error Please try again later!"}
      // dispatch({
      //   type: PUBLISH_WORK,
      //   payload: false
      // });
    });
}


export function editContributionAction(contentId, data, myInfo) {
  console.log(contentId, data, myInfo);
  return {type: EDIT_CONTRIBUTION, payload: {}}
}

