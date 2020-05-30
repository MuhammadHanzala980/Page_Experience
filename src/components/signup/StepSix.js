import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  
`;

const  StepSix = ({ myInfo,  history}) => {
  const goTologinPage = () => {
    history.push('/');
  }
    return (
      <Wrapper>
        <div className="form">
          <p>Thank you <strong>{myInfo.fullname}</strong>, You can now login into your account </p>
            <button
              className="btn-back"
              onClick={goTologinPage}
            >
              Go to login page
            </button>
          </div>
      </Wrapper>
    );
};

export default withRouter(StepSix);
