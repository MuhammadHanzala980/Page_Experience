import { LOGIN_USER } from "../../actions/ActionType";

const initialState = {
  loginUser: false,
  myInfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        myInfo: action.payload
      };

    default:
      return state;
  }
}
