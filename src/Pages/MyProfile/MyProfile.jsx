import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./MyProfile.module.css";
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import { getContributionByUserAction, getContentsAction} from "../../store/actions/ContentAction/ContentAction";
import {
  openPromotePostModalAction,
  openReactToPostModalAction,
  openShowPictureModalAction
} from '../../store/actions/ModalsAction/ModalsAction';
import {
  deleteContributionAction,
  editContributionAction,
  updateUserProfileAction,
  getMyInfoAction,
  deleteJournalAction,
  createJournalAction
} from '../../store/actions';
import UserProfileEditor from "../../components-no-duplication/UserProfileEditor/UserProfileEditor";
import { Container } from '@material-ui/core';


const customNotification = require('../../Utils/notification');

const MyProfile = ({
  myInfo,
  loadContributes,
  openPromotePostModal,
  openReactToPostModal,
  openShowPictureModal,
  deleteContribution,
  editContribution,
  updateUserProfile,
  myContents,
  contents,
  getContents,
  getMyInfo,
  journals,
  deleteJournal,
  createJournal
}) => {
const [tagFilter, setTagFilter] = useState("");
useEffect(()=>{
        getContents(0, 100).then(()=>{
        loadContributes(0, 100, myInfo);
      });
},[loadContributes, myInfo, getContents]);
useEffect(()=>{
  if(!myInfo.passion.title || !myInfo.bio || !myInfo.headline) {
    getMyInfo(myInfo);
  }
},[getMyInfo, myInfo]);
useEffect(()=>{
  //filter only user contributiosn / mapped to get by user
  loadContributes(0, 100, myInfo);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[contents, loadContributes])

const [selectedJournal, setSelectedJournal] = useState(null);
const [creatingJournal, setCreatingJournal] = useState(false);
const [createdJournalTitle, setCreatedJaurnalTitle] = useState("");
const [createdJournalArtForm, setCreatedJaurnalArtForm] = useState("");
  const handleCreateJournalTitleChange = (event) => {
    const value = event.target.value;
    if(value.split(" ").length < 8 )
        setCreatedJaurnalTitle(value);
    else customNotification.fireNotification('warning', `Title must not exceed 7 words`);

  }
  const handleCreateJournalArtFormChange = (event) => {
    const value = event.target.value;
    if(value.split(" ").length < 5 )
        setCreatedJaurnalArtForm(value);
    else customNotification.fireNotification('warning', `Art form must not exceed 7 words`);
  }
const handleCreateNewJournal = ()=>{
    if(!createdJournalTitle){
      customNotification.fireNotification('warning', `Please type the Title of the journal`);
      return;
    }
    if(!createdJournalArtForm){
      customNotification.fireNotification('warning', `Please type the Art form of the journal`);
      return;
    }
    createJournal(myInfo, {title: createdJournalTitle, form: createdJournalArtForm}).then(res =>{
      console.log('create journal ', res);
      if(res && res.msg){
        customNotification.fireNotification('success', res.msg);
        setCreatingJournal(false);
      }else{
        customNotification.fireNotification('warning', `Somthing went wrong!`);
      }
    }).catch(error=>{
      console.log(error);
      customNotification.fireNotification('warning', `Somthing went wrong!`);
    })
  }

let contentsFilted = myContents;
  if(tagFilter && contentsFilted && contentsFilted){
    contentsFilted = contentsFilted.filter(content => content.contentTag && content.contentTag.toLowerCase() === tagFilter);
  }


  return (
      <Container fixed style={{maxWidth: 700}}>
          <div className={classes.mainData}>
            {myInfo ? <UserProfileEditor myInfo={myInfo} updateUserProfile={updateUserProfile} /> : null}
            <div className={classes.separationLine} />
              {!creatingJournal ? (
                <div className={classes.createJournal}>
                  <p onClick={() => setCreatingJournal(true)} className={classes.plus}>+</p>
                  <p onClick={() => setCreatingJournal(true)}>Start journal</p>
                </div>
                ):(
                  <React.Fragment>
                  <div className={classes.createJournal}  style={{justifyContent: 'space-between', marginLeft: '40px', lineHeight: '16px'}}>
                    <p style={{cursor:'default'}}>New Journal</p>
                    <p className={classes.plus} onClick={() => setCreatingJournal(false)}>&times;</p>
                  </div>
                  <div>
                      <div className={classes.create}>
                        <p>Title:</p>
                        <input type="text" value={createdJournalTitle} placeholder="Title" onChange={handleCreateJournalTitleChange}/>
                      </div>
                      <div className={classes.create}>
                        <p>Art from:</p>
                        <input type="text" value={createdJournalArtForm}  placeholder="ex. Poetry " onChange={handleCreateJournalArtFormChange}/>
                      </div>
                      <div className={classes.create} style={{justifyContent: 'flex-end'}}>
                        <button className={classes.saveButton} onClick={handleCreateNewJournal}>Save</button>
                      </div>
                  </div>
                  </React.Fragment>
                )}
            <div className={classes.subSections}>
              <div className={classes.topRow}>
                <div className={classes.sectionsSidebar}>
                    <p>Contributions</p>
                    <p style={{color:"gray"}}>Work</p>
                    <p style={{color:"gray"}}>Audience</p>
                </div>

                <div className={classes.content}>
                {journals && journals[0] && journals.map(journal => {
                    return (
                    <div key={journal._id} >
                    <div className={classes.journalItem}>
                    <p className={classes.journalTitle} onClick={()=> selectedJournal === journal._id ? setSelectedJournal(null) : setSelectedJournal(journal._id)}>{journal.title}</p>
                    <p  className={classes.deleteJournal} onClick={() => deleteJournal(myInfo, journal)}>&times;</p>
                    </div>
                    {contentsFilted && contentsFilted[0] ?
                      contentsFilted.map(content => {
                        if(!content.journal || content.journal !== journal._id || content.journal !== selectedJournal) return null;
                            return (<Contribution
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
                            }
                      )
                        : null
                  }
                  </div>
                    )
                  })
                  }
                  {/* without category */}
                  {contentsFilted && contentsFilted[0] &&
                    contentsFilted.find(content => content.journal === undefined) ?
                    (
                  <div className={classes.journalItem}>
                    <p className={classes.journalTitle} onClick={()=> selectedJournal === "uncategorized" ? setSelectedJournal(null) : setSelectedJournal("uncategorized")}>Uncategorized</p>
                  </div>
                    ):
                  null}
                  {contentsFilted && contentsFilted[0] && selectedJournal === "uncategorized" ?
                      contentsFilted.map(content => {
                        if(!content.journal || !journals[0] ||
                          (content.journal && journals && journals[0] &&
                            !journals.find(journal => journal._id === content.journal))
                            )
                            return (<Contribution
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
                              return null;
                            }
                      )
                        : null
                  }
                </div>
              </div>
            </div>
          </div>
        </Container>
  );
};


const mapStateToProps = state => ({
  myInfo: state.myInfo,
  myContents: state.contentReducer.myContents,
  journals : state.journals,
  contents: state.contentReducer.contents,
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
      deleteJournal: (myInfo, journal) =>
          dispatch(deleteJournalAction(myInfo, journal)),
      createJournal: (myInfo, data) =>
          dispatch(createJournalAction(myInfo,data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

