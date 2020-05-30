import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PublishContribution from '../modal/PublishContribution';
import ModalPublishWork from '../modal/PublishWork';

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

const CreateDropDown = ({close}) => {
  const [contributionModalOpen,setContributionModalOpen] = useState(false);
  const [workModalOpen, setWorkModalOpen] = useState(false);
  useEffect(()=>{
    if (contributionModalOpen || workModalOpen) {
      document.getElementById('root').style.filter = 'blur(3px)';
      document.getElementById('root').classList.add('cover-blur');
    } else {
      document.getElementById('root').style.filter = 'blur(0px)';
      document.getElementById('root').classList.remove('cover-blur');
    }
    if (
      document.getElementsByClassName('PublishContribution')[0] &&
      contributionModalOpen
    ) {
      document.body.appendChild(
        document.getElementsByClassName('PublishContribution')[0]
      );
    }
    if (
      document.getElementsByClassName('PublishWork')[0] &&
      workModalOpen
    ) {
      document.body.appendChild(
        document.getElementsByClassName('PublishWork')[0]
      );
    }
  })
  /*

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.openContributionModal || this.state.openWorkModal) {
      document.getElementById('root').style.filter = 'blur(3px)';
      document.getElementById('root').classList.add('cover-blur');
    } else {
      document.getElementById('root').style.filter = 'blur(0px)';
      document.getElementById('root').classList.remove('cover-blur');
    }
    if (
      document.getElementsByClassName('PublishContribution')[0] &&
      this.state.openContributionModal
    ) {
      document.body.appendChild(
        document.getElementsByClassName('PublishContribution')[0]
      );
    }
    if (
      document.getElementsByClassName('PublishWork')[0] &&
      this.state.openWorkModal
    ) {
      document.body.appendChild(
        document.getElementsByClassName('PublishWork')[0]
      );
    }
  }
*/
  const showContributionModal = () => {
    if (!contributionModalOpen) {
      setContributionModalOpen(true);
    } else {
      document
        .querySelector('.CreateDropDown')
        .appendChild(document.getElementsByClassName('PublishContribution')[0]);
        setContributionModalOpen(false);
    }
  };

  const showWorkModal = () => {
    if (!workModalOpen) {
      setWorkModalOpen(true);
    } else {
      document
        .querySelector('.CreateDropDown')
        .appendChild(document.getElementsByClassName('PublishWork')[0]);
      setWorkModalOpen(false);
    }
  };

  return (
      <React.Fragment>
        <Wrapper className="CreateDropDown" onMouseLeave={close}>
          <div className="drop-down-list">
            <div className="drop-down-item" onClick={() =>  setContributionModalOpen(true)}>
              Publish a contribution
            </div>
            <div className="drop-down-item" onClick={() => setWorkModalOpen(true)}>
              Publish a work
            </div>
          </div>
          
          {contributionModalOpen && (
            <PublishContribution close={showContributionModal} />
          )}
          {workModalOpen && (
            <ModalPublishWork close={showWorkModal} />
          )}
        </Wrapper>
      </React.Fragment>
    );
  }

export default CreateDropDown;
