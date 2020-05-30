import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "react-router-redux";
const customNotification = require("../../Utils/notification");

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
  input[type="password"] {
    border: none;
    background: #f1f1f1;
    height: 30px;
    border-radius: 5px;
    width: 60%;
  }
  p {
    text-align: center;
    a {
      font-weight: bold;
    }
  }
`;

const StepThree =  ({ myInfo, updateMyInfos, next, back }) => {
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleValidatePwd = () => {
    if (!myInfo.password|| !passwordConfirmation) {
      customNotification.fireNotification("warning", "All fields are required");
    } 
    else if (myInfo.password !== passwordConfirmation) {
      customNotification.fireNotification(
        "warning",
        "Passwords does not match"
      );
    } else {
      next();
    }
  }

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    updateMyInfos({...myInfo, password});
  }
  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  }
  return (
    <Wrapper>
        <div className="form">
          <label>Please set a password</label>
          <input
            type="password"
            value={myInfo.password || ""}
            onChange={handlePasswordChange}
            required
          />
          <label>Confirm your password</label>
          <input
            type="password"
            value={passwordConfirmation || ""}
            onChange={handlePasswordConfirmationChange}
            required
          />
          <input
            className="btn-next"
            type="button"
            onClick={handleValidatePwd}
            value="Next"
          />
          <button
            className="btn-back"
            type="button"
            value="Back"
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

export default connect(state, mapDispatchToProps)(StepThree);
