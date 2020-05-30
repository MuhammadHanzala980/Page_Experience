import React from 'react';
import styled from "styled-components";
import { getImageFullUrl } from "../../Utils/utils";
const Container = styled.div`
{
    background: #f2f2f2;
    background: white;
    border:1px solid #ddd;
    font-family: 'Roboto';
    padding: 0 20px;
    padding-bottom: 10px;
    .promoted-text {
        width: 100%;
        padding: 10px;
        padding-bottom: 0;
        font-family: 'Roboto';
        color: black;
        min-height: 40px;
        text-align: justify;
        font-size: 16px;
        font-weight: normal;
        max-height: 100px;
        overflow-x: hidden;
        overflow-y: auto;
        margin: 0;
    }
    .image{
        padding: 0 10px;
        margin: 0;
        margin-top: 10px;
        height: 200px;
        border-radius: 20px;
        width: 100%;
        background-color: #ddd;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% auto;
    }
    .tag {
        color: #1b95e0;
        padding: 0 10px;
        margin: 0;
    }
    .user {
        display:flex;
        align-items: center;
        .profile-pic {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            margin-left: 5px;
        }
        .user-infos {
            margin: 0 10px;
            .user-name {
                font-family: 'Roboto';
                font-weight: bold;
                font-size: 15px;
                margin: 0;
                padding: 0;
            }
            .ago {
                font-family: 'Roboto';
                font-size: 10px;
                color: gray;
                margin: 0;
                padding: 0;
            }   
        }
    }    
}`

const PromotedPost = ({photo, user, hour, content, tag, image }) => {
    console.log(photo, hour, user, content);
return (
    <Container>
        <p className="promoted-text">{content}</p>
        <p className="tag">{tag}</p>
        {image ? <div className="image" style={{backgroundImage: `url(${getImageFullUrl(image)})`}}/>: null}
        <hr style={{margin:'10px'}}/>
        <div className="user">
            <img className="profile-pic" src={photo} alt="profile pic"/>
            <div className="user-infos">
                <p className="user-name">
                    {user}
                </p>
                <p className="ago">
                    {hour}    
                </p>
            </div>
            
        </div>
    </Container>
)
}

export default PromotedPost;