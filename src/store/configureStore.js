import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import getDataReducer from './reducers/GetDataReducer/GetDataReducer';
import accountVerifData from './reducers/SignupReducer/ValidationCodeReducer';
import codeIsValid from './reducers/SignupReducer/CodeValidationreducer';
import userRegisterInfo from './reducers/SignupReducer/StoreUserInfoReducer';
import passionsList from './reducers/PassionReducers/getAllPassionsReducer';
import signedUpUser from './reducers/SignupReducer/signupNewUserReducer';
import loginUser from './reducers/LoginReducer/LoginUserReducer';
import MyInfosReducer from './reducers/MyInfosReducer/MyInfosReducer';
import contentReducer from './reducers/ContentReducers/ContentReducer';
import modalsReducer from './reducers/ModalsReducer/ModalsReducers';
import usersReducer from './reducers/UsersReducers/UsersReducers';
import journalReducer from './reducers/JournalReducer/JournalReducer';
import exploreReducer from './reducers/ExploreReducer/ExploreReducer';
import contentPageReducer from './reducers/ContentPageReducer/ContentPageReducer';
import sidebarReducer from './reducers/SidebarReducer/SidebarReducer';

const reducers = combineReducers({
  loginUser: loginUser,
  signedUpUser: signedUpUser,
  passionsList: passionsList,
  userRegisterInfo: userRegisterInfo,
  codeIsValid: codeIsValid,
  accountVerifData: accountVerifData,
  getDataReducer: getDataReducer,
  routing: routerReducer,
  contentReducer: contentReducer,
  myInfo: MyInfosReducer,
  modals: modalsReducer,
  users: usersReducer,
  journals: journalReducer,
  explore: exploreReducer,
  contentPage: contentPageReducer,
  sidebar: sidebarReducer
});

export default reducers;
