import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
z-index: 55;
  position: absolute;
  width: 250px;
  top: 45px;
  right: 60px;
  border-radius: 10px;
  background: white;
  .drop-down-list{
    overflow: hidden;
    box-shadow: 0px 0px 2px #899eff;
    border-radius: 10px;
    .drop-down-item {
      border: 1px solid #00000011;
      padding: 0 10px;
      text-align: center;
      line-height:40px;
      font-size: 20px;
      cursor: pointer;
      user-select: none;
    }
    .drop-down-item:hover {
      transform: scale(1.05);
    }
  
  }
`;

const CreateDropDown = ({close , openWorkModal, openContributionModal }) => {
  const [entred, setEntred] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timeOut, setTimOut] = useState(false);
  useEffect(()=>{
    if(timeOut && !entred){
      close();
      setTimer(null);
      setEntred(false);
    }
    if(!timer){
      setTimer(setTimeout(()=>setTimOut(true), 3000));
    }
    return () => {
      clearTimeout(timer);
    }
  },[timer, entred, timeOut, close]);

  const setContributionModal = () => {
    close();
    openContributionModal();
  };

  const setWorkModalOpen = () => {
    close();
    openWorkModal();
  };

  return (
      <React.Fragment>
        <Wrapper className="CreateDropDown" onMouseLeave={close}>
          <div className="drop-down-list">
            <div className="drop-down-item" onClick={() =>  setContributionModal()}>
              Publish a contribution
            </div>
            <div className="drop-down-item" onClick={() => setWorkModalOpen()}>
              Publish a work
            </div>
          </div>
        </Wrapper>
      </React.Fragment>
    );
  }

export default CreateDropDown;
