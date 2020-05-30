import React, { useEffect } from 'react';
import ModalContainer from './components-no-duplication/ModalContainer/ModalContainer';
import { connect } from 'react-redux';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components-no-duplication/navigation/navbar/NavBar';
import Login from './components/Authentication/Login';
import Home from './Pages/Home/Home';
import Explore from './Pages/Explore/Explore';
import MyProfile from './Pages/MyProfile/MyProfile';
import Profile from './Pages/Profile/Profile';
import OldContent from './page/Content';
import Journals from './page/Journals';
import Notifications from './page/Notifications';
import Search from './page/Search';
import SignUp from './page/Signup/SignUp';
import ContentPage from './Pages/ContentPage/ContentPage'
import { getMyInfoAction, getMyJournalsAction } from './store/actions';

const App = ({ history, myInfo, getMyInfo, getMyJournals }) => {
  useEffect(() => {
    console.log('app.js useEffect');
    if (myInfo && myInfo.token && myInfo.userId && !myInfo.profilePhoto) {
      console.log('calling the functions');
      getMyInfo(myInfo);

    }
    if (myInfo && myInfo.token) {
      getMyJournals(myInfo);
    }
  }, [getMyInfo, myInfo, getMyJournals]);
  const isAuthenticated = myInfo && myInfo.token;
  console.log('re-render app');
  return (
    <div className="App">
      <ModalContainer />
      <ToastContainer />
      <Router history={history}>
        {isAuthenticated ? (
          <>
            <NavBar />

            <Switch>
              <Route
                exact
                path="/" component={Home}
              />
              <Route
                push
                exact
                path="/artform/:artform"
                component={Home}
              />
              <Route
                push
                exact
                path="/trending/:trend"
                component={Home}
              />
              <Route
                push
                exact
                path="/home"
                component={Home}
              />
              <Route
                push
                exact
                path="/content/:contentId"
                component={ContentPage}
              />
              <Route
                push
                exact
                path="/old-content/:article"
                component={OldContent}
              />
              <Route push exact path="/journals/" component={Journals} />
              <Route
                push
                exact
                path="/notifications/"
                component={Notifications}
              />
              <Route push exact path="/search/:data" component={Search} />
              <Route push exact path="/search/" component={Search} />
              <Route
                push
                exact
                path="/user-profile"
                component={() => (
                  <MyProfile />
                )}
              />
              <Route
                path="/user/:id"
                component={Profile} />
                    />
                    <Route
                path="/explore"
                component={Explore} />
                    />
                    <Route
                path="*"
                component={() =>
                  <Redirect to={{ pathname: '/' }} />
                }
              />
            </Switch>
          </>
        )
          :
          (
            <Switch>
              <Route push exact path="/login" component={Login} />
              <Route push exact path="/signup/" component={SignUp} />
              <Route
                path="*"
                component={() =>
                  <Redirect to={{ pathname: '/login' }} />
                }
              />
            </Switch>
          )
        }
      </Router>
    </div>

  );
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    myInfo: state.myInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMyInfo: (myInfo) =>
      dispatch(getMyInfoAction(myInfo)),
    getMyJournals: (myInfo) =>
      dispatch(getMyJournalsAction(myInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

