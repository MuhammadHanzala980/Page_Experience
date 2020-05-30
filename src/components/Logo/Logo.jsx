import React from "react";
import { withRouter } from "react-router-dom";

function Logo({history}) {
  return (
      <img 
        onClick={ () => history.push("/")}
        width="100px"
        style={{ marginRight: "10px", cursor: 'pointer' }} 
        src="/pagex-logo.png" 
        alt="pagex"
      />
  );
}

export default withRouter(Logo);
