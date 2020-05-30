import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import  { getImageFullUrl } from '../../Utils/utils';
import defaultImageBackgroundUpload from './../../image/icone/image.svg';
import videoSvg from './../../image/icone/film.svg';
import { connect } from 'react-redux';
import { publishContributionAction } from '../../store/actions/ContentAction/ContentAction';
import ImageCrop from '../ImageCrop/ImageCrop';
import styles from './PublishConribution.module.scss';

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
  .modal-react {
    width: 80%;
    max-width: 700px;
    background: #fff;
    z-index: 13;
    box-shadow: 0px 3px 30px #00000029;
    border-radius: 20px;
    color: #000;
  }

  .modal-react-top {
    width: 95%;
    padding: 10px 0 0;
    border-bottom: 1px solid #00000026;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-react-title {
    font-size: 1.2rem;
    color: #6d6d6d;
    margin-top: 10px;
  }

  .btn-close {
    color: #3f53a9;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    font-size: 1.8rem;
  }

  img {
    display: block;
    width: 40px;
    height: 40px;
    margin-lef: 2px;
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
    margin: 40px auto 0;
    background: #FFF;
    border-radius: 10px;
  }
  .journal-public-contribution {
    color: #212529;
    margin: 12px auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    p{
      color: #212529;
    }
    .left{
      flex-grow: 1;
      width: 50%;
      display: flex;
      justify-content: center;
      .add-to{
      }
      select {
        width: 130px;
      }
      .create{
        display: flex;
        align-content: center;
        justify-content: space-between;
        margin: 3px 0;
        p {
          font-size: 14px;
        }
        input {
          width: 70%;
        }
        p{
        
        }
      }
    }
    .right{
      min-width: 10%;
      display: flex;
      user-select: none;
      cursor: pointer;
      justify-content: center;
      .plus {
        color: #1a73e8;
        font-size: 28px;
        padding: 0;
        margin: 0;
        user-select: none;
      }
    }
    
    
  }
  .input-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border-radius: 10px;
    margin-right: 25px;
    img {
      width: 70px;
      height: 70px;
      margin-right: 10px;
      border-radius: 7px;
      align-self: baseline;
      
    }
  }

  .input-form-item-1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80%;
  }
  .input-form-item-1 img {
    margin-lef:5px;
  }

  .input-form-item-2 {
    display: flex;
    align-items: center;
    padding: 2px;
    justify-content: space-between;
    // border-top: 1px solid #00000026;
    height: 20%;
    font-size: 14px;
  }

  .input-react {
    border: 2px solid #DDD;
    width: 100%;
    font-size: 20px;
    font-family: 'Roboto';
    background: #f7f7f7;
    min-height: 190px;
    padding: 16px;
    border-radius: 12px;
    &:focus {
      outline: none;
    }
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
    margin-right: 5px;
    margin-top: 5px;
    img {
      height: 20px;
      width: 20px;
      display: inline-block;
      margin: 0;
      margin-right: 5px;
      border-radius: 20px
    }
  }
  .image-crop {
    outline: 1px dashed gray;
    position: relative;
    width:80%;
    height: 300px;
    margin: 10px 10%;
  }
  .createJournal{
    font-size: 22px;
    font-weight: bold;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #1a73e8;
    justify-content: flex-end;
  }
  .createJournal .plus{
  font-size: 35px;
  padding-right: 4px;
  }
  
`;

const PublishContribution = ({ myInfo, close, onPublishContributionAction, journals, createJournal }) => {
  const [getCropedImage, setGetCropedImage] = useState(null);
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [photoTmp, setPhotoTmp] = useState('');
  const ref = useRef(null);
  const [artForm, setArtForm] = useState("");
  const [subject, setSubject] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleFileUploadChange = (event) => {
    setPhoto(event.target.files[0]) ;
    updateTmpImage(event.target.files[0]);
  }


const handlePublishContribution = () => {

    if (!description) {
      customNotification.fireNotification('warning', `Please type'Desciption'`);
      return;
    }
    if(photo) handleValidatePhoto().then((img)=>{
      const data = {
        userId: myInfo.userId,
        description: description,
        artForms: artForm ? [artForm] : [],
        subject: subject,
        photo: img,
      };
      onPublishContributionAction(data, myInfo.token).then((msg) => {
        customNotification.fireNotification('success', msg);
        close();
      });
    })
    else {
      const data = {
        userId: myInfo.userId,
        description: description,
        artForms: artForm ? [artForm] : [],
        subject: subject
      };
      onPublishContributionAction(data, myInfo.token).then((msg) => {
        customNotification.fireNotification('success', msg);
        close();
      });
    }
  }

  const handleValidatePhoto = () =>{
    if(getCropedImage) {
      return getCropedImage().then((img)=>{
        img.lastModifiedDate = new Date();
        img.name = `${new Date().getTime()}.jpg`;
        setPhoto(img);
        return img;
      }).catch(err =>{
        console.log("croping error",err);
      })
    }
  }
  const updateTmpImage = (file)=> {
    const fr = new FileReader();
    fr.onload =  () => {
      setPhotoTmp(fr.result);
    }
    fr.readAsDataURL(file);
  }
  const handleOpenBrowseFiles = () =>{
    if(ref.current) ref.current.click();
  }
    return (
      <Wrapper className="PublishContribution">
        <div className={`${styles.modal}`}>
          <div className="modal-react-top">
            <h1 className="modal-react-title">Publish a Contribution</h1>
            <div className="btn-close" onClick={close}>
              &times;
            </div>
          </div>

          <div className="modal-react-form">
            <div className="input-form">
              <div className="input-form-item-1">
                <img src={getImageFullUrl(myInfo.profilePhoto)} alt="profile" />
                <div style={{flexGrow: 1}}>
                  <textarea
                    className="input-react"
                    name="description"
                    placeholder="Feelings inspired ? share your thoughts...."
                    onChange={handleDescriptionChange}
                  />
                  <div className="item">
                    <input
                      ref={ref}
                      style={{ display: 'none' }}
                      type="file"
                      name="photo"
                      onChange={handleFileUploadChange}
                    />
                    <label style={{visibility: 'visible'}} htmlFor="file-upload" className="custom-file-upload">
                      <img
                        alt="bg"
                        style={{ cursor: 'pointer' }}
                        src={defaultImageBackgroundUpload}
                        onClick={handleOpenBrowseFiles}
                      />
                      <img
                        alt="bg"
                        style={{ cursor: 'pointer' }}
                        src={videoSvg}
                        onClick={handleOpenBrowseFiles}
                      />
                    </label>
                  </div>
                </div>


              </div>
              <div className="input-form-item-2" >
                {/* <input
                  style={{visibility:'hidden'}}
                  className="input-tags"
                  placeholder="add a tag for this publication: #subject"
                  name="tag"
                  onChange={handleTagsChange}
                /> */}
              </div>
            </div>
          </div>

          {photo  && <div className="image-crop" style={{display: 'block'}} >
            <ImageCrop image={photoTmp}  setGetCropedImage={setGetCropedImage} />
          </div>
          }
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="artForm">Art Form</label>
              <input placeholder="Ex: poetry" id="artForm" onChange={(e) => setArtForm(e.target.value)} value={artForm} name='artForm' />
            </div>
            <div className={styles.formGroup}>
              <label  htmlFor="subject">Subject</label>
              <input placeholder="Ex: Shakespeare" id="subject" onChange={(e) => setSubject(e.target.value)} value={subject} name='subject'  />
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
    myInfo : state.myInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPublishContributionAction: (data, token) =>
      dispatch(publishContributionAction(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishContribution);
