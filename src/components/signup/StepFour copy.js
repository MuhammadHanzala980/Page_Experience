import React, { Component } from "react";
import styled from "styled-components";
import Masque from "../../image/icone/masques1.svg";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import UploadIcon from "../../image/icone/uploadicon.png";

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  label {
    width: 60%;
    margin: 15px 0;
    font-weight: bold;
  }
  .hidenField {
    display: none;
  }
  input[type="text"] {
    border: none;
    background: #f1f1f1;
    height: 30px;
    border-radius: 5px;
    width: 60%;
    
  }
  input[type="file"] {
    border: none;
    background: #f1f1f1;
    margin-top: 15px;
    border-radius: 5px;
  }
  .masque {
    height: 100px;
    width: 80px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;    
  }
  h5 {
    margin-top: 10px;
  }
  .custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    background: #f1f1f1;
    height: 40px;
    border-radius: 5px;
    width: 60%;
  }
  input[type="file"] {
    display: none;
  }
`;

class StepFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "", 
      photoTmp: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidatePhoto = this.handleValidatePhoto.bind(this);
    this.handleOpenBrowseFiles = this.handleOpenBrowseFiles.bind(this);
  }

  handleValidatePhoto() {
    setTimeout(() => {
      this.props.myInfo.photo = this.state.photo;
      document.getElementById("next").click();
    }, 200);
  }
  updateTmpImage = (file)=> {
    const fr = new FileReader();
    fr.onload =  () => {
      this.setState({
        photoTmp: fr.result,
      });
    }
    fr.readAsDataURL(file);
  }
  handleChange(event) {
    console.log(event.target);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (target.type === "file") {
      this.updateTmpImage(target.files[0]);
      this.setState({
        photo: target.files[0]
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }
  handleOpenBrowseFiles(){
    //use ref
    document.getElementById("file-upload").click();
  }

  render() {
    return (
      <Wrapper>
        <form>
          <div className="masque" style={{backgroundImage:`url(${this.state.photoTmp || Masque})`}} onClick={this.handleOpenBrowseFiles}>
          </div>
          <input
            id="file-upload"
            type="file"
            name="file"
            onChange={this.handleChange}
          />
          <label className="custom-file-upload"  onClick={this.handleOpenBrowseFiles}>
            <img
              style={{ float: "right", position: "relative", top: "3px" }}
              src={UploadIcon}
              alt="upload-icon"
              onClick={this.handleOpenBrowseFiles}
            />
          </label>
          <h5>Please upload a profile picture</h5>
          <p>
            This step is mandatory in order to complete creating your profile.
          </p>
          <input
            className="btn-next"
            type="button"
            value="Next"
            onClick={this.handleValidatePhoto}
          />
          <input
            className="hidenField"
            id="next"
            type="button"
            value="Next"
            onClick={this.props.next}
          />
          <button className="btn-back" type="button" onClick={this.props.back}>
            Back
          </button>
        </form>
      </Wrapper>
    );
  }
}

const state = (state, ownProps = {}) => {
  return {
    location: state.location
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(push(location));
    }
  };
};

export default connect(state, mapDispatchToProps)(StepFour);
