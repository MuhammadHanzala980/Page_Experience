import React from 'react';
import { connect } from 'react-redux';
import PromotePost from '../modal/PromotePost';
import ReactPost from '../modal/ReactPost';
import PublishWork from '../modal/PublishWork';
import PublishContribution from '../modal/PublishContribution';
import ShowPicture from '../modal/ShowPicture';
import { closePromotePostModalAction,
         closeReactToPostModalAction,
         closePublishContributionModalAction,
         closePublishWorkModalAction,
         closeShowPictureModalAction,
        }
        from '../../store/actions/ModalsAction/ModalsAction'
import {createJournalAction} from '../../store/actions';
import './ModalContainer.css';

const ModalContainer = ({
    modals,
    closePromotePostModal,
    closeReactToPostModal,
    closePublishContributionModal,
    closePublishWorkModal,
    closeShowPictureModal,
    promotePostData,
    reactToPostData,
    showPcitureData,
    myInfo,
    journals,
    createJournal,
  }) => {
    const { promotePostisOpen, reactToPostisOpen, publishContributionisOpen, publishWorkisOpen, showPictureisOpen } = modals;
    return (
      <div className="modal-container">
        {promotePostisOpen ? <PromotePost close={closePromotePostModal} content={promotePostData} myInfo={myInfo}/> : null}
        {reactToPostisOpen ? <ReactPost close={closeReactToPostModal} content={reactToPostData} myInfo={myInfo}/>  : null}
        {publishWorkisOpen ? <PublishWork close={closePublishWorkModal} /> : null}
        {publishContributionisOpen ? <PublishContribution close={closePublishContributionModal} journals={journals} createJournal={(data) => createJournal(myInfo, data) } /> : null}
        {showPictureisOpen ? <ShowPicture close={closeShowPictureModal} image={showPcitureData} /> : null}
      </div>)
} 
const mapStateToProps  = (state) => {
    return {
      modals: state.modals,
      myInfo: state.myInfo,
      promotePostData : state.modals.promotePostData,
      reactToPostData : state.modals.reactToPostData,
      showPcitureData: state.modals.showPcitureData,
      journals: state.journals,
    };
  };
  
const mapDispatchToProps = (dispatch) => (
    {
      closePromotePostModal: (data) => dispatch(closePromotePostModalAction(data)), 
      closeReactToPostModal: (data) => dispatch(closeReactToPostModalAction(data)), 
      closePublishContributionModal: (data) => dispatch(closePublishContributionModalAction(data)), 
      closePublishWorkModal: (data) => dispatch(closePublishWorkModalAction(data)), 
      closeShowPictureModal: (data) => dispatch(closeShowPictureModalAction(data)),
      createJournal: (myInfo, data) => dispatch(createJournalAction(myInfo,data)),
    }
)
    
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
  
;