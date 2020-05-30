import {
    GET_USER_INFO,
    GET_USERS,
    GET_SUBSCRIPTIONS,
    SUBSCRIBE_TO_USER,
    UNSUBSCRIBE_FROM_USER,
    UPDATE_SUBSCRIBTIONS, LOGIN_USER, LOGOUT_USER,
} from "../../actions/ActionType";

const initialState = {
    users : [],
    subscriptions: []
};

export default function (state = initialState, action) {
    //console.log('action', action);
    switch (action.type) {
        case LOGIN_USER:
            return initialState;
        case LOGOUT_USER:
            return initialState;
        case GET_USER_INFO:
            if (!action.payload || !action.payload._id || !action.payload.fullname) {
                return state;
            }
            const user = state.users.find(user => user._id === action.payload._id);
            if (user) return state;
            return {...state, users: [...state.users, action.payload]}
        case GET_USERS:
            return {...state, users: action.payload};
        case GET_SUBSCRIPTIONS:
            return {...state, subscriptions: action.payload};
        case UNSUBSCRIBE_FROM_USER:
            {
                let userId = action.payload;
                let newSubscriptions = state.subscriptions.filter((item) => item._id !== userId);
                return {...state, subscriptions: newSubscriptions};
            }
        case SUBSCRIBE_TO_USER:
            {
                let userId = action.payload;
                const subscribedUser = state.subscriptions.find((item) => item._id === userId);
                if (!subscribedUser) {
                    return {...state, subscriptions: [...state.subscriptions, {"_id": userId}] }
                }
                return state;
            }
        case UPDATE_SUBSCRIBTIONS:
            if(action.payload && action.payload[0]){
                const usersUpdated = [...state.users]
                let needUpdate = false;
                action.payload.forEach(subscription =>
                {
                    if(subscription.userId && subscription.subscribed !== undefined){
                        const user = usersUpdated.find(user => user._id === subscription.userId);
                        if(user) {
                            user.subscribed = subscription.subscribed;
                            needUpdate = true;
                        }
                    }
                }
                )
                const newState = {...state, users: usersUpdated};
                console.log(needUpdate);
                if(needUpdate) return newState;
                else return state;
            }
            else return state;
        default:
            return state;
    }
}
