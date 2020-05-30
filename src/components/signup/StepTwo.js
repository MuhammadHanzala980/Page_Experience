import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { codeValidateAction } from '../../store/actions/SignupAction/CodeValidationAction';

const customNotification = require('../../Utils/notification');

const Wrapper = styled.div`
  .form {
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
    height: 40px;
    border-radius: 5px;
    width: 60%;
  }
`;

const StepTwo = ({ myInfo, updateMyInfos, onCodeValidateAction, next, back, codeIsValid, accountVerifData }) => {
  if(accountVerifData && accountVerifData.data && accountVerifData.data && accountVerifData.data.data.id){
    const id = accountVerifData.data.data.id;
    if(id !== myInfo.id)  updateMyInfos({...myInfo, id})
  }
  const [fetching, setFetching] = useState(false);
  useEffect(()=>{
    if(fetching){
      if(codeIsValid && codeIsValid.data && codeIsValid.data.valid) next();
      if(codeIsValid && codeIsValid.data && !codeIsValid.data.valid){
        customNotification.fireNotification("warning", codeIsValid.data.msg)  
      } 
        
    }
  },[fetching, codeIsValid, next])
  
  const handleValidateCodeChange = (event) => {
    const validationCode = event.target.value;
    updateMyInfos({...myInfo, validationCode})
  }
  const handleValidateCode = () => {
    if(!myInfo.validationCode) customNotification.fireNotification("warning", "All fields are required");
    else{
      setFetching(true);
      let data = {
        data: {
          id: myInfo.id,
          validationCode: myInfo.validationCode
        }
      }
      onCodeValidateAction(data).then(()=>{
        setFetching(false);
      })
    }

  }
  return (
    <Wrapper>
      <div className="form">
        <p>Please enter the verification code we sent you via email</p>
        <input type="text" value={myInfo.validationCode || ""}  onChange={handleValidateCodeChange} />
        <button
          className="btn-next"
          onClick={handleValidateCode}
        >
          Next           
        </button>
        <button
          className="btn-back"
          onClick={back}
        >
          Back
        </button>
      </div>
    </Wrapper>
  );
  }

const state = (state, ownProps = {}) => {
  return {
    codeIsValid: state.codeIsValid.data,
    accountVerifData: state.accountVerifData.data,
    location: state.location,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    onCodeValidateAction: (data) => dispatch(codeValidateAction(data)),
  }
};

export default connect(state, mapDispatchToProps)(StepTwo);
