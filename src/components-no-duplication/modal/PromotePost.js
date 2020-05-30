import React, {useState} from "react";
import styled from "styled-components";
import PromotedPost from './PromotedPost';
import moment from "moment";
import { getImageFullUrl } from "../../Utils/utils";
import {connect} from "react-redux";
import {promotePostAction} from "../../store/actions/ContentAction/ContentAction";
const customNotification = require('../../Utils/notification');

const Wrapper = styled.div`
  background: #00000055;
  z-index: 500;
  top: 0;
  left: 0;  
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
justify-content: center;
  .modal-promote {
    width: 600px;
    background: #fff;
    z-index: 13;
    box-shadow: 0px 3px 30px #00000029;
    border-radius: 20px;
    color: #000;
    min-height: 400px;
    max-height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal-promote-title {
    width: 95%;
    padding: 15px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #00000029;
    font-size: 12;
  }
  .modal-promote-title h1 {
    font-size: 24px;
    font-family: 'Roboto';
  }

  .btn-close {
    display: block;
    text-align: center;
    line-height: 20px;
    width: 20px;
    height: 20px;
    border-radius: 25px;
    font-size: 15px;
    color: #899EFF;
    border: 1px solid  #899EFF;
    cursor: pointer;
  }

  .modal-promote-content {
    width: 100%;
    height: 65px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 60px;
      height: 60px;
    }
  }

  .modal-promote-input {
    flex-grow: 1;
    height: 60px;
    padding: 10px;
    background: #f2f2f2;
    border: none;
    margin: 0 10px;
    border-radius: 10px;
    resize: none;
  }

  .modal-promote-bottom {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }

  .btn-promote {
    width: 100px;
    height: 31px;
    border: none;
    background: #000000;
    color: #fff;
    box-shadow: 0px 3px 2px #00000029;
    font-size: 13px;
    border-radius: 21px;
    cursor: pointer;
  }
  .modal-promote-article {
  }
`;

const PromotePost = ({close, content, myInfo, onPromotePostAction}) => {
    console.log(content);

    const [postContent, setPostContent] = useState(null);


    const handlePromote = () => {
      onPromotePostAction(content._id, postContent).then( (res) => {
        console.log(res);
        if(res && res.msg){
          customNotification.fireNotification('success', res.msg);
        }else{
          customNotification.fireNotification('warning', `Something went wrong!`);
        }
        close();
      });
    };

    const postContentChange = (event) => {
      setPostContent(event.target.value);
    };

    const modalPhoto= getImageFullUrl(content.user.profilePhoto);
    const modalUser = content.user.fullname;
    const modalHour= moment(content.dateOfCreation).fromNow();
    const modalContent= content.contentDescription;

    return (
      <Wrapper>
        <div className="modal-promote">
          <div className="modal-promote-title">
            <h1>Promote this Contribution</h1>
            <p className="btn-close" onClick={close}>
              &times;
            </p>
          </div>
          <div className="modal-promote-content">
            <img
              style={{borderRadius:"10px", marginLeft:"5px"}}
              src={getImageFullUrl(myInfo.profilePhoto)} alt="profile"
            />
            <textarea
              className="modal-promote-input"
              placeholder="Share your throughts about this..."
              onChange={postContentChange}
            />
          </div>
          <div className="modal-promote-article">
            <PromotedPost
              photo={modalPhoto}
              user={modalUser}
              hour={modalHour}
              content={modalContent}
              tag={content.contentTag}
              image={content.contentImage}
            />
          </div>
          <div className="modal-promote-bottom">
            <button
                onClick={handlePromote}
                className="btn-promote"
            >
              Promote
            </button>
          </div>
        </div>
      </Wrapper>
    );
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
    myInfo : state.myInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPromotePostAction: (contentId, contentDescription) =>
        dispatch(promotePostAction(contentId, contentDescription)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotePost);
