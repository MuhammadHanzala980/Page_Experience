import React, { useEffect } from 'react';
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import Promote from './Promote/Promote';
import Work from './Work/Work';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { getContentsAction } from '../../store/actions/ContentAction/ContentAction';
import { openPromotePostModalAction, openReactToPostModalAction } from '../../store/actions/ModalsAction/ModalsAction'
const Home = ( {
    onGetContentsAction,
    contents,
    openPromotePostModal,
    openReactToPostModal
  }) => {
  useEffect(()=>{
    onGetContentsAction(0, 100);
  },[onGetContentsAction]);

  return (
      <div>
        <hr />
        {contents && contents.data && contents.data.data  && contents.data.data.map((content) => {
          if (content.contentType === 'Work') {
            return <Work key={content._id} content={content} />;
          }

          if (content.contentType === 'Promotion') {
            return <Promote key={content._id} content={content} />;
          }

          return <Contribution 
            key={content._id} 
            content={content}
            openPromotePostModal={openPromotePostModal}
            openReactToPostModal={openReactToPostModal}
            />;
        })}
      </div>
    );
}


const mapStateToProps  = (state, ownProps = {}) => {
  return {
    contents: state.contentReducer.data,
    location: state.location,
    loginUser: state.loginUser.data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    openPromotePostModal: (data) => {
      dispatch(openPromotePostModalAction(data));
    },
    openReactToPostModal: (data) => {
      dispatch(openReactToPostModalAction(data));
    },
    onGetContentsAction: (page, limit) =>
      dispatch(getContentsAction(page, limit)),
  };
};

export default connect(mapStateToProps , mapDispatchToProps)(Home);
