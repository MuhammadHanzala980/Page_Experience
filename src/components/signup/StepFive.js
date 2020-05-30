import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getAllPassionsAction } from "../../store/actions/PassionActions/getAllPassionsAction";
import { signupNewUserAction } from "../../store/actions/SignupAction/SignupNewUserAction";
import { withRouter } from 'react-router-dom';

const customNotification = require("../../Utils/notification");

const Wrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  select {
    width: 40%;
    border: 0.5px solid #70707036;
    height: 30px;
    border-radius: 5px;
    font-weight: bold;

    option {
      font-weight: bold;
      :hover{
        background:#EBEBEB
        color:#111;
      }
    }
    button{
      background-color: red;
    }
  }
`;

const  StepFive = ({ myInfo, updateMyInfos, back, next, passionsList, onGetAllPassionsAction, onSignupNewUserAction, signedUpUser, history}) => {
  const [passions, setPassions] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(()=>{
    if (signedUpUser && fetching){
      if (signedUpUser && signedUpUser.data.code === 200) {
        customNotification.fireNotification(
          "success",
          signedUpUser.data.data.msg
        );
        next();
      } else {
        customNotification.fireNotification(
          "warning",
          signedUpUser.data.data.msg
        );
      }
    }
  },[signedUpUser, fetching, next])
  
  const handleFinish = () => {
    if (!myInfo.passion) {
      customNotification.fireNotification(
        "warning",
        "You should choose a passion"
      );
    } else {
      setFetching(true);
      onSignupNewUserAction(myInfo).then(()=>
        {
          setFetching(false);
        }
      )
    }
  }

  useEffect(()=>{
    if(!passions[0] && passionsList && passionsList.data && passionsList.data.data && passionsList.data.data.data){
      setPassions(passionsList.data.data.data);
    }    
  },[passions, passionsList]);
  useEffect(()=>{
    onGetAllPassionsAction(0, 10);
  },[onGetAllPassionsAction]);
    
  const handlePassionChange = (event) =>{
    const passion = event.target.value;
    updateMyInfos({...myInfo, passion});
  }

  //remove Singing (for now in the front end)
  const passionsCpy = [...passions];
  const indexPaintingPassion = passionsCpy.findIndex(passion => passion.passionTitle === "Singing");
  if(indexPaintingPassion !== -1) passionsCpy.splice(indexPaintingPassion,1);

    return (
      <Wrapper>
        <div className="form">
          <h3>What form of expression you're interested in?</h3>.
          <select
            value={myInfo.passion}
            onChange={handlePassionChange}
          >
            <option>Select your Art form</option>
            {passionsCpy.length > 0
              ? passionsCpy.map((passion) => {
                  return (
                    <option key={passion._id} value={passion._id}>
                      {passion.passionTitle}
                    </option>
                  );
                })
              : null}
          </select>
          <div>
          <button
              style={{ marginRight: "10px" }}
              className="btn-back"
              onClick={back}
            >
              Back
            </button>
          <button
            className="btn-next"
            onClick={handleFinish}
          >
            Finish
          </button>            
          </div>
        </div>
      </Wrapper>
    );
}

const state = (state, ownProps = {}) => {
  return {
    signedUpUser: state.signedUpUser.data,
    accountVerifData: state.accountVerifData.data,
    passionsList: state.passionsList,
    location: state.location
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(push(location));
    },
    onGetAllPassionsAction: (page, limit) =>
     dispatch(getAllPassionsAction(page, limit)),
    onSignupNewUserAction: data => 
      dispatch(signupNewUserAction(data))
  };
};

export default withRouter(connect(state, mapDispatchToProps)(StepFive));
