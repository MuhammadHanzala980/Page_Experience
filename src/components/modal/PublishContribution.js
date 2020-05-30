import React, { useState } from 'react';
import styled from 'styled-components';
import  { getImageFullUrl } from '../../Utils/utils';
import defaultImageBackgroundUpload from './../../image/icone/imageBackground.svg';
import { connect } from 'react-redux';
import { PublishContributionAction } from '../../store/actions/ContentAction/ContentAction';

const customNotification = require('../../Utils/notification');

const Wrapper = styled.div`
  position: absolute;
  z-index: 213;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;

  .modal-react {
    width: 80%;
    max-width: 700px;
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    //margin: 500px auto auto auto;
    background: #fff;
    z-index: 13;
    box-shadow: 0px 3px 30px #00000029;
    border-radius: 20px;
    color: #000;
  }

  .modal-react-top {
    width: 95%;
    padding: 15px;
    border-bottom: 1px solid #00000026;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-react-title {
    font-size: 25px;
    font-weight: bold;
  }

  .btn-close {
    display: block;
    text-align: center;
    line-height: 20px;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    font-size: 15px;
    color: white;
    background-color: #707070;
    position: relative;
    cursor: pointer;
    .btn-close-left,
    .btn-close-right {
      width: 15px;
      height: 1px;
      background-color: white;
      position: absolute;
      top: 12px;
      left: 5px;
    }
    .btn-close-left {
      transform: rotate(-45deg);
    }
    .btn-close-right {
      transform: rotate(45deg);
    }
    &:hover {
      background-color: #59deff;
    }
  }

  img {
    display: block;
    width: 40px;
    height: 40px;
  }

  p {
    padding: 1px;
    height: 36px;
    line-height: 36px;
    margin: 0 5px;
    color: #8c8787;
    text-align: center;
  }

  .modal-react-people {
    padding: 15px;
  }

  .modal-group-img {
    display: flex;
  }

  .modal-react-form {
    width: 95%;
    margin: 15px auto;
    background: #f1f1f1;
    border-radius: 10px;
  }

  .input-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border-radius: 10px;

    img {
      width: 70px;
      height: 70px;
    }
  }

  .input-form-item-1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80%;
  }

  .input-form-item-2 {
    display: flex;
    align-items: center;
    padding: 2px;
    justify-content: space-between;
    border-top: 1px solid #00000026;
    height: 20%;
    font-size: 14px;
  }

  .input-react {
    border: none;
    width: 100%;
    height: 60%;
    font-size: 20px;
    font-family: 'Roboto';
    background: #f1f1f1;
  }

  .input-tags {
    border: none;
    padding: 5px;
    border-right: 1px solid #00000026;
    width: 100%;
    height: 90%;
    background: #f1f1f1;
  }

  .attach {
    width: 22px;
    height: 22px;
  }
  .modal-promote-bottom {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
    padding-bottom: 20px;
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
  .item {
    margin-left: 10px;
  }
  .custom-file-upload {
    margin-top: 13px;
    margin-right: 5px;
  }
`;

const PublishContribution = ({ MyInfo, close, onPublishContributionAction }) => {
  
  const [photo, setPhoto] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('')

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }
  const handleTagsChange = (event) => {
    setTag(event.target.value);
  }
  const handleFileUploadChange = (event) => {
    setPhoto(event.target.files[0]) ;
  }
  
const handlePublishContribution = () => {
    if (!description) {
      customNotification.fireNotification('warning', `Please type'Desciption'`);
      return;
    }

    const data = {
      userId: MyInfo.userId,
      tag: tag,
      description: description,
      photo: photo,
    };
    onPublishContributionAction(data, MyInfo.token).then((msg) => {
      customNotification.fireNotification('success', msg);
      close();
    });
  }
    return (
      <Wrapper className="PublishContribution">
        <div className="modal-react">
          <div className="modal-react-top">
            <h1 className="modal-react-title">Publish a contribution</h1>
            <div className="btn-close" onClick={close}>
              X
            </div>
          </div>
          <div className="modal-react-form">
            <div className="input-form">
              <div className="input-form-item-1">
                
                <img src={getImageFullUrl(MyInfo.profilePhoto)} alt="profile" />
                <textarea
                  className="input-react"
                  name="description"
                  placeholder="Feelings inspired ? share your thoughts...."
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="input-form-item-2">
                <input
                  className="input-tags"
                  placeholder="add a tag for this publication: #subject"
                  name="tag"
                  onChange={handleTagsChange}
                />
                <div className="item">
                  <input
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    name="photo"
                    onChange={handleFileUploadChange}
                  />
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <img
                      alt="bg"
                      style={{ width: '20px', cursor: 'pointer' }}
                      src={defaultImageBackgroundUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-promote-bottom">
            <button
              onClick={handlePublishContribution}
              className="btn-promote"
            >
              Publish
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }


const mapStateToProps = (state, ownProps = {}) => {
  return {
    MyInfo : state.MyInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPublishContributionAction: (data, token) =>
      dispatch(PublishContributionAction(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishContribution);
