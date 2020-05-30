import React from "react";
import styled from "styled-components";
import { getImageFullUrl } from "../../Utils/utils";

const Container = styled.div`
    // background-color: #492b2d;
    z-index: 100;
    top: 0;
    left: 0;  
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    .close-btn{
        top: 25px;
        left: 25px;
        position: absolute;
        font-size: 30px;
        border: 1px solid #1b95e0;
        border-radius: 40px;
        width: 40px;
        height: 40px;
        color: #1b95e0;
        padding: 0;
        line-height: 36px;
        text-align: center;
        // background-color: #492b2d22;
        
        background: #ffffff22;
        user-select: none;
        cursor: pointer;
    }
    .close-btn:hover{
        background-color: #1b95e022;
    }


`;

const ReactPost = ({close, image}) => {  
    console.log("image: ", image);
    return (
      <Container style={{backgroundImage:`url(${getImageFullUrl(image)})`}}>
          <div className="close-btn" onClick={close}>&times;</div>
          <div> </div>
      </Container>
    );
  }

export default ReactPost;
