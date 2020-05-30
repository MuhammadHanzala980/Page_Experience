import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUserAction } from '../../store/actions';
const Wrapper = styled.div`
  z-index: 55;
  position: absolute;
  width: 200px;
  top: 45px;
  right: 40px;
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

const DownProfile = ({ history, onlogoutUser, close }) => {
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
    const handleItemClick = (item) =>{
      close();
      if(item) history.push(item);
    }
    const handleLogout = () => {
      onlogoutUser();
    }
    return (
      <Wrapper className="ProfileDropDown" onMouseLeave={close} onMouseEnter={() =>{setEntred(true)}}>
        <div className="drop-down-list" >
          <div className="drop-down-item" onClick={()=> handleItemClick("/user-profile")}>
              My Profile
          </div>
          <div className="drop-down-item" onClick={()=> handleItemClick("/notifications/")}>
              Notifications
          </div>
          <div className="drop-down-item" onClick={()=> handleItemClick(null)}>
              Explore
          </div>
          <div className="drop-down-item" onClick={()=> handleItemClick(null)}>
              Settings and Privacy
          </div>
          <div className="drop-down-item" onClick={handleLogout}>
              Log out
          </div>
        </div>
      </Wrapper>
    );
  }



const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onlogoutUser: (data) => dispatch(logoutUserAction(data)), 
  }
)  
export default withRouter(connect(null, mapDispatchToProps)(DownProfile));

