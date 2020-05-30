import React, { useRef, useState } from "react";
import styled from "styled-components";
import UploadIcon from "../../image/icone/uploadicon.png";
import ImageCrop from "./ImageCrop";
import defaultProfile from '../../image/default-profile.png';

const Wrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .hidenField {
    display: none;
  }
  h5 {
    margin-top: 10px;
  }
  .file-upload-icon {
    position: absolute;
    cursor: pointer;
    background-color: #ffffff3c;
    width: 30px;
    height: 30px;
    top:10px;
    left: 10px;
    z-index: 20;
    background-image: url(${UploadIcon});
    background-repeat: no-repeat;
    background-size: 80% 80%;
    border-radius: 10px;
    background-position: center center;
  }
  input[type="file"] {
    display: none;
  }
  .image-crop{
    flex-grow: 1;
    outline: 2px solid #ddd;
    position: relative;
    top: 0;
    left:0;
    width: 80%;
    height: 260px;
    background-color: white;
  }
  
`;

const StepFour = ({next, back, myInfo, updateMyInfos }) => {
  const [photoTmp, setPhotoTmp] = useState(defaultProfile);
  const [getCropedImage, setGetCropedImage] = useState(null);
  
  const ref = useRef(null);
  const handleValidatePhoto = () =>{
    if(defaultProfile === photoTmp) return;
    if(getCropedImage) {
      getCropedImage().then((img)=>{
        img.lastModifiedDate = new Date();
        img.name = `${new Date().getTime()}.jpg`;
        updateMyInfos({...myInfo,photo: img });
        next();
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
  const handleFileChange = (event) => {
    const target = event.target;
    updateTmpImage(target.files[0]);
  }
  const handleOpenBrowseFiles = () =>{
    if(ref.current) ref.current.click();
  }

    return (       
      <Wrapper>
        <div className="form">
          <div className="image-crop">
            <div className="file-upload-icon"  onClick={handleOpenBrowseFiles} />
            <ImageCrop image={photoTmp}  setGetCropedImage={setGetCropedImage} />
          </div>
          <input type="file" onChange={handleFileChange} ref={ref} />
          <input
            className="btn-next"
            type="button"
            value="Next"
            onClick={handleValidatePhoto}
            disabled={defaultProfile === photoTmp}
          />
          <button className="btn-back" type="button" onClick={back}>
            Back
          </button>
        </div>
      </Wrapper>
    );
}

export default StepFour;
