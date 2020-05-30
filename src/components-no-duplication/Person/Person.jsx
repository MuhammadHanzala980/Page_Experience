import React from 'react';
import { getImageFullUrl } from "../../Utils/utils";
import './person.css';
const Person = ({id, fullname, subscribed, onSubscribe, onUnsubscribe, passionTitle, profilePhoto}) => {
    return (
        <div className="person">
            <div className="img" style={{backgroundImage:`url(${getImageFullUrl(profilePhoto)})`}}/>
            <div className="infos">
                <p className="name">{fullname}</p>
                <p className="passion">{passionTitle}</p>
            </div>
            <div style={{flexGrow: 1}}/>
            {subscribed ? (
                <button onClick={() => onUnsubscribe(id)}>UnSubscribe</button>
            ):
            (
                <button onClick={() => onSubscribe(id)}>Subscribe</button>
            )
            }

        </div>
    )
}
export default Person;
