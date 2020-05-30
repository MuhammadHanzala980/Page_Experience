import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { emailVerifficationAction } from '../../store/actions/SignupAction/ValidationCodeAction';
import { connect } from "react-redux";
import { push } from "react-router-redux";

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
  p {
    text-align: center;
    font-size: 11px;
    color: grey;
    a {
      font-weight: bold;
    }
  }
  li {
    float: left;
    list-style-type: disc;   
  }
`;

const StepOne =  ({ myInfo, updateMyInfos, next, accountVerifData, onEmailVerifficationAction}) => {
  const [fetching, setFetching] = useState(false);
  useEffect(()=>{
    if(fetching){
      if(accountVerifData && accountVerifData.data && accountVerifData.data.code === 200){
        next();
      }
      if(accountVerifData && accountVerifData.data && accountVerifData.data.code !== 200){
        customNotification.fireNotification("warning", accountVerifData.data.msg)
      }      
    }
  },[fetching, accountVerifData, next])

  const handlefullnameChange = (event) => {
    const fullname = event.target.value;
    updateMyInfos({...myInfo, fullname});
  }
  const handleEmailChange = (event) => {
    const email = event.target.value;
    updateMyInfos({...myInfo, email});
  }

  const validateFormData = () => {
    let validateEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    if (!myInfo.email || !myInfo.fullname) {
      customNotification.fireNotification("warning", "All fields are required")
      return false;
    }
    if (!validateEmail.test(myInfo.email)) {
      customNotification.fireNotification("warning", "Email not valid")
      return false;
    }
    return true;
  }
  const handleNext = () => {
    if(validateFormData()){
      let data = {
        data: {
          email: myInfo.email,
          fullname: myInfo.fullname
        }
      }
      setFetching(true);
      onEmailVerifficationAction(data).then(()=>{
        setFetching(false);
      });      
    }
  }
  return (
      <Wrapper>
        <div className="form">
          <p>First and last Name</p>
          <input type="text" value={myInfo.fullname || ""} onChange={handlefullnameChange} required />
          <p>Email address</p>
          <input type="text" value={myInfo.email || ""} onChange={handleEmailChange} required />
          <button
            className="btn-next"
            onClick={handleNext}
          >Next</button>
        <p>
          By signing in, you agree to our <Link to="/">terms of use</Link>, our privacy
          policy and <Link to="/">use of cookies</Link>.
        </p>
        </div>
      </Wrapper>
    );
  }



const state = (state, ownProps = {}) => {
  return {
    location: state.location,
    accountVerifData: state.accountVerifData.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    onEmailVerifficationAction: (data) => dispatch(emailVerifficationAction(data)),
  }
};

export default connect(state, mapDispatchToProps)(StepOne);
