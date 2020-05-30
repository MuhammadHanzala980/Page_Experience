import React from 'react';
import { getImageFullUrl } from "../../Utils/utils";
import './userProfileInfos.css';

const UserProfileInfos = ({ info, subscribed, subscribeToUser, unSubscribeFromUser }) => {
    return (
    <div className="user-profile-infos">
        <div className="profile-pic">
            <div className="image"
            style={{backgroundImage:`url(${getImageFullUrl(info.profilePhoto)})`}} />
        </div>
        <div className="items">
        <div className="user-profile-item" style={{marginTop:'26px'}}>
            <input placeholder="No Name found!"  style={{fontSize: '22px', fontWeight: 'bold', wordSpacing:'3px', textTransform: 'capitalize'}} disabled={true} type="text" value={info.fullname || ""} />
        </div>
        <div className="user-profile-item" style={{marginTop: '-9px', visibility:'hidden'}}>
            <input style={{fontSize:'10.5px'}} disabled={true} type="text" value="Activitst and film maker"/>
        </div>
        <div className="user-profile-item" style={{marginTop: '10px', marginLeft:'10px', width:'90%'}}>
            <textarea  placeholder="No Bio found! " style={{lineHeight:'16px', fontSize:'15px'}}  rows="2"  disabled={true} type="text" value={info.bio || ""} />
        </div>
        <div className="user-profile-item location" style={{marginTop:'4px', width: '50%'}}>
            <input placeholder="No Location found!" disabled={true} type="text" value={info.location || ""} />
        </div>
        </div>
        <div className="controls">
            {subscribed ? <button onClick={unSubscribeFromUser}>UnSubscribe</button>:<button onClick={subscribeToUser}>Subscribe</button>}
        </div>
    </div>
    )
}

export default UserProfileInfos;
