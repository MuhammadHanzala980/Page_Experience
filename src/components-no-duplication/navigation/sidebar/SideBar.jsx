import React from 'react';
import { withRouter } from "react-router-dom";
import Logo from '../../../components/Logo/Logo';
import './SideBar.css';

function SideBar({ history }) {
  return (
    <div className="left-side-bar">
      <div className="side-bar-logo">
         <Logo /> 
      </div>
      <div className="side-bar-items" >
          <p onClick={()=>history.push("/home")} className="side-bar-item">
            Home
          </p>
          <p onClick={()=>history.push("/explore")} className="side-bar-item">
              Explore
          </p>
          <p onClick={()=>history.push("/notifications")} className="side-bar-item">
            Notifications
          </p>
      </div>
    </div>
  );
}

export default withRouter(SideBar);
