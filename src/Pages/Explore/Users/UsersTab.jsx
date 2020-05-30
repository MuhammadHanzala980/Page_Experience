import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Person from '../../../components-no-duplication/Person/Person';
import {
    getAllMySubscriptionsAction,
    getPassionsAction,
    getUsersAction,
    subscribeToUserAction, unSubscribeFromUserAction
} from '../../../store/actions';
import './UsersTab.css';
import UsersPageHeader from "../../../components-no-duplication/UsersPageHeader/UsersPageHeader";

const customNotification = require("../../../Utils/notification");

const UsersTab = ({passions, users, subscriptions, myInfo, getPassions, getUsers, getAllMySubscriptions, subscribeToUser, unsubscribeFromUser}) => {
    const [activePassion, setActivePassion] = useState(null);

    useEffect( () => {
        getPassions();
        getAllMySubscriptions(myInfo);
    }, [myInfo, getPassions, getAllMySubscriptions]);

    useEffect( () => {
        if (passions && passions.length > 0) {
            let currentPassion = activePassion;
            if (!activePassion) {
                currentPassion = passions[0]._id;
                setActivePassion(currentPassion);
            }
            getUsers(currentPassion, 0, 1000);
        }

    }, [passions, activePassion, getUsers]);

    const handleChangeTab = (tab) => {
        setActivePassion(tab);
    };

    const handleSubscribeToUser = (userId) =>{
        subscribeToUser(myInfo, userId).then((res)=>{
            if(res && res.error)
                customNotification.fireNotification(
                    "warning",
                    res.error,
                );
        });
    };

    const handleUnsubscribeFromUser = (userId) =>{
        unsubscribeFromUser(myInfo, userId).then((res)=>{
            if(res && res.error)
                customNotification.fireNotification(
                    "warning",
                    res.error,
                );
        });
    };

    return (
        <React.Fragment>
            <UsersPageHeader passions={passions} activeTab={activePassion} onChange={handleChangeTab}/>
            {users && users[0] ? users.map(user => {
                    const subscribed = subscriptions && !!subscriptions.find(s => s._id === user._id);

                    return <Person key={user._id} id={user._id} fullname={user.fullname} subscribed={subscribed} onSubscribe={handleSubscribeToUser} onUnsubscribe={handleUnsubscribeFromUser} passionTitle={user.passion && user.passion.title} profilePhoto={user.profilePhoto} />
                })
                :
                null}
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    myInfo: state.myInfo,
    users: state.users.users,
    subscriptions: state.users.subscriptions,
    passions: state.explore.passions
});

const mapDispatchToProps = dispatch => {
    return {
        getUsers: (passion, page, limit) =>
            dispatch(getUsersAction(passion, page, limit)),
        getPassions: () => dispatch(getPassionsAction()),
        getAllMySubscriptions: (myInfo) => dispatch(getAllMySubscriptionsAction(myInfo)),
        subscribeToUser: (myInfo, userId) =>
            dispatch(subscribeToUserAction(myInfo, userId)),
        unsubscribeFromUser: (myInfo, userId) =>
            dispatch(unSubscribeFromUserAction(myInfo, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
