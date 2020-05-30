import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./profile.css";
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import { getContributionByUserAction, getContentsAction} from "../../store/actions/ContentAction/ContentAction";
import { openPromotePostModalAction, openReactToPostModalAction, openShowPictureModalAction } from '../../store/actions/ModalsAction/ModalsAction';
import {
  deleteContributionAction,
  editContributionAction,
  updateUserProfileAction,
  getMyInfoAction,
  getUserInfoAction,
  subscribeToUserAction,
  unSubscribeFromUserAction,
  getAllMySubscriptionsAction,
} from '../../store/actions';
import UserProfileInfos from "../../components-no-duplication/UserProfileInfos/UserProfileInfos";
import { Container } from '@material-ui/core';


const customNotification = require("../../Utils/notification");
const Profile = ({
  myInfo,
  subscriptions,
  loadContributes,
  openPromotePostModal,
  openReactToPostModal,
  openShowPictureModal,
  deleteContribution,
  editContribution,
  updateUserProfile,
  subscribeToUser,
  unSubscribeFromUser,
  contents,
  getContents,
  getMyInfo,
  match,
  users,
  getUserInfo,
  getAllMySubscriptions
}) => {
  console.log('users profile page', users);
  const [tagFilter, setTagFilter] = useState("");
  const userId = match.params.id;
  useEffect(()=>{
    if(userId) getUserInfo(myInfo.token, userId);
  },[userId, getUserInfo, myInfo]);
  useEffect(()=>{
      getContents(0, 100).then(()=>{
      loadContributes(0, 100, myInfo);
      })
  },[loadContributes, myInfo, getContents]);
  useEffect(()=>{
    getAllMySubscriptions(myInfo);
  },[userId, myInfo, getAllMySubscriptions]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  if(!userId) return <p>Page not found !</p>

  const handleSubscribeToUser = (myInfo, userId) =>{
    subscribeToUser(myInfo, userId).then((res)=>{
      if(res && res.error)
        customNotification.fireNotification(
          "warning",
          res.error,
        );
      });
  };

  const handleUnSubscribeFromUser = (myInfo, userId) =>{
    unSubscribeFromUser(myInfo, userId).then((res)=>{
      if(res && res.error)
        customNotification.fireNotification(
          "warning",
          res.error,
        );
      });
  };


  let contentsFilted = contents;

  if(contentsFilted && contentsFilted[0]){
    contentsFilted = contentsFilted.filter(content =>{
      let isTagMatch = true;
      if(tagFilter) isTagMatch = content.contentTag && content.contentTag.toLowerCase() === tagFilter;
      return  isTagMatch && content && content.user && content.user._id === userId;
    });
  }

  const info = users.find(user => user._id === userId);

  console.log(subscriptions);

  const subscribed = subscriptions && !!subscriptions.find(s => s._id === userId);


  return (
    <Container fixed style={{maxWidth: 700}}>
      <div className="home">
        <div className="mainWrapper">
          <div className="mainData">
            <UserProfileInfos info={info || {}} subscribed={subscribed} subscribeToUser={() => handleSubscribeToUser(myInfo, info._id)} unSubscribeFromUser={() => handleUnSubscribeFromUser(myInfo, info._id)} />
            <div className="separationLine" />
            <div className="subSections">
              <div className="topRow">
                <div className="sectionsSidebar">
                    <p>Contributions</p>
                    <p style={{color:"gray"}}>Work</p>
                    <p style={{color:"gray"}}>Audience</p>
                </div>
                <div className="content">
                  {contentsFilted && contentsFilted[0] ?
                      contentsFilted.map(content => (
                            <Contribution
                              key={content._id}
                              content={content}
                              openPromotePostModal={openPromotePostModal}
                              openReactToPostModal={openReactToPostModal}
                              openShowPictureModal={openShowPictureModal}
                              deleteContribution= {(contentId) => deleteContribution(contentId, myInfo)}
                              editContribution={(contentId) => editContribution(contentId, myInfo)}
                              myUserId={myInfo.userId}
                              setTagFilter={setTagFilter}
                              />)
                      )
                        : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};


const mapStateToProps = state => ({
  myInfo: state.myInfo,
  contents: state.contentReducer.contents,
  users: state.users.users,
  subscriptions: state.users.subscriptions
});

const mapDispatchToProps = dispatch => {
  return {
    loadContributes: (page, limit, myInfo) =>
      dispatch(getContributionByUserAction(page, limit, myInfo.userId)),
      openPromotePostModal: (data) => {
        dispatch(openPromotePostModalAction(data));
      },
      openReactToPostModal: (data) => {
        dispatch(openReactToPostModalAction(data));
      },
      openShowPictureModal: (data) => {
        dispatch(openShowPictureModalAction(data));
      },
      getContents: (page, limit) =>
        dispatch(getContentsAction(page, limit)),
      deleteContribution: (contentId, myInfo) =>
        dispatch(deleteContributionAction(contentId, myInfo)),
      editContribution: (contentId, myInfo) =>
        dispatch(editContributionAction(contentId, myInfo)),
      updateUserProfile: (myInfo) =>
        dispatch(updateUserProfileAction(myInfo)),
        getMyInfo: (myInfo) =>
          dispatch(getMyInfoAction(myInfo)),
      getUserInfo: (token ,userId) =>
          dispatch(getUserInfoAction(token ,userId)),
      subscribeToUser: (myInfo, userId) =>
          dispatch(subscribeToUserAction(myInfo, userId)),
      unSubscribeFromUser: (myInfo, userId) =>
          dispatch(unSubscribeFromUserAction(myInfo, userId)),
      getAllMySubscriptions : (myInfo) =>
          dispatch(getAllMySubscriptionsAction(myInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

